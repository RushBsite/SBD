import React, { useState } from "react";
import styled from "styled-components";
import axios, { AxiosHeaders } from 'axios';
import Login from '../components/Login';
import Main from '../components/Main';
import url from '../url';

import { 
  Card, 
  Button, 
  CardImg,
  CardHeader,
  CardTitle, 
  CardText,
  Modal,
  ModalBody, 
  CardColumns,
  CardSubtitle, 
  CardBody,
  Container,
  Row,
  Col, } from 'reactstrap';

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import InfiniteScroll from "react-infinite-scroll-component";

// sections for this page
import Images from "./index-sections/Images.js";
import BasicElements from "./index-sections/BasicElements.js";
import Navbars from "./index-sections/Navbars.js";
import Tabs from "./index-sections/Tabs.js";
import ModalText from "./index-sections/Modal.js";
import Form from "./index-sections/Form.js";
import FormComment from "./index-sections/FormComment.js";
import Pagination from "./index-sections/Pagination.js";
import Notifications from "./index-sections/Notifications.js";
import Typography from "./index-sections/Typography.js";
import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
import NucleoIcons from "./index-sections/NucleoIcons.js";
import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";

import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions
} from 'react-floating-button-menu';
import 'react-floating-button-menu/dist/index.css';


function Index() {
  // 로그인 상태 관리
   const [isLogin, setIsLogin] = React.useState(false)
   const [answer,setAnser] = React.useState('')
   const [address,setAddress] = React.useState('')
   //index 페이지 시작 시 설정할 parameter
   //게시글이 더 없다면 InfinityScroll을 정지시키기 위한 변수
   const [isMoreBulltin,setisMoreBulltin] = React.useState(true)
   const [isOpen,setOpen] = useState(false);
  const [modal1, setModal1] = React.useState(false);

   // setAnser(location.state.g)
   console.log(answer)
  
  React.useEffect(() => {
    
    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :::: ', isLogin)
    }

    //index 페이지 시작 시 설정할 parameter
    //게시글을 query로 불러올때 필요한 서버쪽의 변수를 초기화시키기 위함
    axios.get(url + '/user_inform/InitIndex')

    axios.post(url + '/user_inform/index_defaul_address', null, {
      params: {'user_id' : sessionStorage.getItem('user_id')}
    })
    .then(res => {
      setAddress(res.data.ADDRESS)
      //console.log(address)
    })
    .catch()

    //if (window.localStorage.getItem("AddressChoice")) {
    //  setModal1(true)
    //}
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  React.useEffect(()=> {
    if (window.localStorage.getItem("ModalOpen")) {
      setModal1(true)
    }
    else{ setModal1(false)}

  },[setModal1])


  const [items,setItems] = useState([]);
  const [itemIndex,setitemIndex] = useState(2);
  const [itemsolo,setitemsolo] = useState('');
  const [modal2, setModal2] = React.useState(false);
  const [bulletin_ID, setbulletin_ID] = React.useState(0);

  
  const fetchMoreData = (e) => {
    //@TODO , db에서 data 가져오기
    axios.get(url + '/user_inform/indexbulletin')
    .then(res => {
      //console.log(res.data)
      if(res.data !== ""){
        setItems([...items, res.data]);
        setitemIndex(itemIndex + 1);
      } else {
        setisMoreBulltin(false)
      }
      console.log(itemIndex);
      console.log(items);
      //console.log(itemsolo);
      //console.log(res.data.members)
    })
    .catch()

  };


  return (
    <>
      <IndexNavbar answer={address}/>
      <div className="wrapper">
      <IndexHeader></IndexHeader>
        <div className="main">
        <Modal isOpen={modal1} toggle={() => setModal1(false)}>

          <Form></Form>
        </Modal>
        <Modal isOpen={modal2} toggle={() => {
          setModal2(false)
          }}>
          <FormComment formID = {bulletin_ID}></FormComment>
        </Modal>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={isMoreBulltin}
          loader={<h4>Loading...</h4>}
          >
            {items.map((i, index) => (
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '700px', width: 'auto'}}>
              <div className="card">
                 <Container style = {{justifyContent:'center', alignItems: 'center', height: '0vh'}}>
                    <Row className="ml-auto mr-auto">
                       <p className="category"></p>
                        <Card style= {{display: 'flex' ,justifyContent: 'center' ,flexBasis: 'auto', flexShrink: '1', flexGrow: '1'}}>
                          <CardImg style={{flexBasis: 'auto', height: '400px', width: 'auto', objectFit: 'cover'}} src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956&q=80&rw=750&rh=536" alt="Card image cap" />
                          <CardBody>
                            <CardTitle>작성자: {i.owner} 작성시간: {i.datetime}</CardTitle>
                            <CardTitle>매장: {i.market}</CardTitle>
                            <CardTitle>배달 주소: {i.pickupAddress}</CardTitle>
                            <CardSubtitle>현재 모집 인원수: {i.members}</CardSubtitle>
                            <CardText></CardText>
                            <Button color="info" onClick={() => {
                              setModal2(true)
                              setbulletin_ID(i.ID)
                            }}>공동모집글 참여하기</Button>

                          </CardBody>
                        </Card>
                    </Row>
                  </Container>
                </div>
              </div>

          ))}

          </InfiniteScroll>
          
        </div>
        <div style={{position: "fixed",
              bottom: "20px",
              right: "20px",
              width: "auto",
              padding: "10px"}}>
          <FloatingMenu
            slideSpeed={500}
            direction={Directions.Up}
            spacing={8}
            isOpen={isOpen}
          >
            <MainButton
              iconResting={<img className="main_icon" src={require("assets/img/main_icon.png")}></img>}
              iconActive={<img className="main_icon_click" src={require("assets/img/menu_icon.png")}></img>}
              background="#2ca8ff"
              onClick={() => setOpen(!isOpen)}
              size={100}
            />
            <ChildButton
              icon={<img
                alt="..."
                className="user_post"
                src={require("assets/img/user_icon.png")}
              ></img>}
              background="#ffb236"
              size={70}
              onClick={() => console.log('First button clicked')}
            />
            <ChildButton
              icon={<img
                alt="..."
                className="post"
                src={require("assets/img/post_icon.png")}
              ></img>}
              background="#ffb236"
              size={70}
              onClick={() => setModal1(true)}
            >
            </ChildButton>
          </FloatingMenu>
          </div>    
        <DarkFooter />
      </div>
      
    </>
  );
}

export default Index;
