import React, { useState } from "react";
import axios from 'axios';
import { FormGroup, Label, Input, FormText, Card, CardTitle, CardImg, CardImgOverlay, CardText } from "reactstrap";

function FormComment(props) {
    const formID = props.formID
    const [menu, setmenu] = useState('');
    const [price, setprice] = useState('');
    const [content, setcontent] = useState('');
    
    const [comment, setcomment] = useState([]);

    const handlemenu = (e) => {
        setmenu(e.target.value)
    }
    const handleprice = (e) => {
        setprice(e.target.value)
    }
    const handlecontent = (e) => {
        setcontent(e.target.value)
    }

    const Formsubmit = () => {
        axios.post('http://localhost:3001/user_inform/commentsubmit', null, {
            params: {
                'user_id': sessionStorage.getItem('user_id'),
                'menu': menu,
                'price': price,
                'content': content,
                'partyID': formID
            }
        })
        .then(res => console.log(res))
        .catch()

    }


    React.useEffect(() => {
        axios.post('http://localhost:3001/user_inform/commentreturn', null, {
            params: {'form_id': formID}
        })
        .then(res =>{
            console.log(res.data);
            for(var i=0; i<res.data.length; i++){
                console.log(res.data[i])
                setcomment([...comment], res.data[i])
            }
            console.log(comment)
        })
        .catch()

    },[]);

    return (
    <>

    <form>
        <div class="form-group" style={{marginTop: '100px', width: '500px', paddingLeft: '15px', paddingRight: '15px'}}>

            <Card inverse>
                <CardImg width="100%" src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956&q=80&rw=750&rh=536" alt="Card image cap" />
                    <CardTitle style={{color: 'black', fontWeight: 'bold', marginTop: '20px', fontSize: '30px', marginLeft: '160px', marginRight: 'auto'}}>
                        호랑이 스시</CardTitle>
                    <CardText style={{color: 'black', marginLeft: '15px', marginRight: '15px', display: 'flex', alignContent: 'center'}}>
                        호랑이 스시는 당일 들어온 신선한 횟감으로 손님을 대접하는 자부심있는 일식집입니다!! 어흥 🐯
                        <br/><br/>
                        메뉴 확인하기 -> URL 링크 삽입
                        </CardText>
                    <CardText>
                        <small className="text-muted">모집글 작성 5분전</small>
                    </CardText>
            </Card>

            <div style={{marginTop: '20px'}}>
                <label for="myMenu">현재 참여한 사람</label>
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="배고픈 호랑이"></input>
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="흥미로운 사자"></input>
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="남은자리1"></input>
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="남은자리2"></input>
            </div>

            <div style={{marginTop: '20px'}}>
                <label for="myMenu">메뉴명</label>
                <input type="text" onChange={handlemenu} class="form-control" id="menuName" placeholder="메뉴명 입력하기"></input>
            </div>

            <div style={{marginTop: '20px'}}>
                <label for="menuPrice">가격</label>
                <input type="text" onChange={handleprice} class="form-control" id="menuPrice" placeholder="주문 메뉴 가격 입력하기"></input>
            </div>

                <FormGroup style={{marginTop: '20px'}}>
                    <Label for="contextText">
                        참여 글 남기기
                    </Label>
                    <Input
                        id="GroupText"
                        name="text"
                        type="textarea"
                        onChange={handlecontent}
                    />
                </FormGroup>
                </div>

        <button type="submit" onClick={Formsubmit} class="btn btn-info btn-lg" style=
        {{marginTop: '50px', display: 'flex', marginLeft: '170px', marginRight: 'auto'}}>
        공동배달 <br/> 참가하기</button>
    </form>
    </>
    );
};

export default FormComment;
