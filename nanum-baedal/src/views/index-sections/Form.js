import React, { useState } from "react";
import axios from 'axios';
import { FormGroup, Label, Input, FormText } from "reactstrap";

function Form() {
    const [market, setmarket] = useState('');
    const [content, setcontent] = useState('');

    const handlemarket = (e) => {
        setmarket(e.target.value)
    }
    const handlecontent = (e) => {
        setcontent(e.target.value)
    }

    const Formsubmit = () => {
        axios.post('http://localhost:3001/user_inform/formsubmit', null, {
            params: {
                'user_id': sessionStorage.getItem('user_id'),
                'market': market,
                'content': content
            }
        })
        .then(res => console.log(res))
        .catch()

    }



    return (
    <>

    <form>
        <div class="form-group" style={{marginTop: '100px', width: '500px', paddingLeft: '15px', paddingRight: '15px'}}>



            <div class="form-group" style={{marginTop: '20px'}}>
                <label for="exampleFormControlSelect1"> 주문 음식 카테고리</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>치킨</option>
                    <option>피자</option>
                    <option>패스트푸드</option>
                    <option>한식</option>
                    <option>일식</option>
                    <option>중식</option>
                    <option>분식</option>
                    <option>일식</option>
                    <option>족발/보쌈</option>
                </select>
            </div>
            
            <div style={{marginTop: '20px'}}>
                <label for="shopName">업체명</label>
                <input type="text" onChange={handlemarket} class="form-control" id="shopNameSearch" placeholder="업체명 입력하기"></input>
            </div>

            <div style={{marginTop: '20px'}}>
                <label for="myMenu">배달장소 - api 연결필요</label>
                <input type="text" class="form-control" id="내주문 메뉴" placeholder="주문 메뉴 입력하기"></input>
            </div>

                <FormGroup style={{marginTop: '20px'}}>
                    <Label for="contextText">
                        모집 글 내용
                    </Label>
                    <Input
                        id="GroupText"
                        name="text"
                        type="textarea"
                        onChange={handlecontent}
                    />
                </FormGroup>

                <div class="form-group" style={{marginTop: '20px'}}>
                    <label for="exampleFormControlSelect1"> 최대 모집 시간</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                    </select>
                </div>

                <FormGroup style={{marginTop: '20px'}}>
                    <Label for="exampleFile">
                        결제용 QR 첨부
                    </Label>
                    <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                    />
                     <FormText>
                        클릭해서 결제용 QR 올리기.
                    </FormText>
                </FormGroup>

        <button type="submit" onClick={Formsubmit} class="btn btn-info" style={{marginTop: '50px'}}>접수하기</button>

        </div>
    </form>
    </>
    );
};

export default Form;
