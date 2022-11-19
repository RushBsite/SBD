import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Head extends React.Component {
  render() {
    return (
      <div className='topbar' style={{ padding: '20px 20px', borderBottom: '1px solid rgba(128, 128, 128, 0.25)'}}>
        <input id="back" type="button" value="←" style={{backgroundColor: 'white', border: 'none', color: '#06f'}}/>
        <span style={{ textAlign: 'center' }}>위치 찾기</span>
      </div>
    );
  }
}

function AddressPage() {
  const mapElement = useRef(null);
  const [getLatitude, setLatitude] = useState(37.5656); // 초기 위치는 query에서 받아와서 넣을 예정
  const [getLongitude, setLongitude] = useState(126.9769);
  const [getAddress, setAddress] = useState("-");
  const [getJAddress, setJAddress] = useState("서울특별시");
  const [getMoreAddress, setMoreAddress] = useState("");
  const [search, setSearch] = useState("");
  let mapRef = useRef(null);
  let pinRef = useRef(null);
  let lat, long;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS 정보가 확인되지 않습니다.');
    }
  };
  getLocation();// 현재 디바이스의 위치로 La, Lo 받아옴
  //지도
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    //getLocation();  

    const location = new naver.maps.LatLng(lat, long);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);
    pinRef.current = new naver.maps.Marker({
      position: location,
      map: mapRef.current,
    });
  }, []);

  //검색
  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const onChangeAdd = (e) => {
    e.preventDefault();
    setMoreAddress(e.target.value);
  }

  const onAddressSave = (e) => {
    console.log(getJAddress)
    axios.post('http://localhost:3001/user_inform/address_save', null, {
        params: {
          'user_id': sessionStorage.getItem('user_id'),
          'user_address': getJAddress
        }
      }).catch()
    
  }

  const onSearch = (e) => {
    if (search === ''){
      return alert('주소를 입력해주세요.');
    }
    e.preventDefault();
    naver.maps.Service.geocode({
      query: search
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }
        if (response.v2.meta.totalCount === 0) {
            return alert('올바른 주소를 입력해주세요.');
        }
        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);
        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }
        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }
        
        // Vanila에서 쓰던 코드
        //insertAddress(item.roadAddress, item.x, item.y);
        
        // 필요할 때 언젠가 쓸 state들
        setLatitude(item.x);
        setLongitude(item.y);
        setAddress(item.roadAddress);
        setJAddress(item.jibunAddress);
        //const pin = new naver.maps.LatLng(item.x, item.y);
        mapRef.current.panTo(point); // panto는 LatLng가 아니라 point 사용해야 전환됨
        pinRef.current.setPosition(point);

        // const loc = new naver.maps.LatLng(getLatitude, getLongitude);
        // const mapO: naver.maps.MapOptions = {
        //   center: loc,
        //   zoom: 17,
        //   zoomControl: true,
        //   zoomControlOptions: {
        //     position: naver.maps.Position.TOP_RIGHT,
        //   },
        // };
        // const map = new naver.maps.Map(mapElement.current, mapO);
        // new naver.maps.Marker({
        //   position: loc,
        //   map,
        // });
        //alert(item.x)
      });
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Head/>
      <div style={{ flex: 1 }}>
        <div ref={mapElement} style={{ width: '100%', height: '100%'}}/>
        <div style={{ position: 'absolute', bottom: '-10%', transform: 'translate(-50%, -50%)', left: '50%', width: '30%', minWidth:'200px', backgroundColor: 'white', zIndex: 1, padding: '10px', borderRadius: '10%', textAlign: 'center'}}>
        
          <div id='searchPlace'>
            <input type="text" value={search} onChange={onChange} style={{border: 'none', borderBottom: '1px solid', margin: '2px', blockSize: '16px', width: '60%'}}/>
            <button onClick={onSearch} style={{border: 'none', backgroundColor: 'white', fontSize: 'large'}}>🔍</button><br/>
          </div><br/>
          
          <div style={{ fontWeight: 'Bold', whiteSpace: 'pre-line'}}>ex) 서울특별시 강남구 ~로까지 입력해주세요</div><br></br>
          
          <div style={{ fontWeight: 'Bold', whiteSpace: 'pre-line' }}>현재 주소</div><div>{getAddress}({getJAddress})</div>
          {/* <div style={{ fontWeight: 'Bold' }}>상세주소</div><input type='text' value={getMoreAddress} onChange={onChangeAdd} style={{border: 'none', borderBottom: '1px solid', margin: '2px', blockSize: '16px', width: '60%'}}/> */}
          
          <div id="button-box">
            <Link to={{pathname:'/index', state: {g : getJAddress}}}> <button id="accept" onClick={onAddressSave} style={{padding: '15px 50px 15px 50px', borderRadius: '15px', backgroundColor: '#06f', fontSize: 'medium', color: 'white', outline: '0', borderColor: 'white'}}>이 위치로 지정</button></Link>
          </div>
          
        </div>
      </div>
    </div>
    );
}


export default AddressPage;