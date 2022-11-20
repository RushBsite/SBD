import React from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";

function Form() {
    return (
    <>

    <form>
        <div class="form-group" style={{marginTop: '100px', width: '500px'}}>
            <label for="title">제목</label>
            <input type="text" class="form-control" id="titleText" aria-describedby="titleHelp" placeholder="제목 입력"></input>
            
            <div style={{marginTop: '20px'}}>
                <label for="shopName">업체명</label>
                <input type="text" class="form-control" id="shopNameSearch" placeholder="업체명 입력하기"></input>
            </div>

            <div style={{marginTop: '20px'}}>
                <label for="myMenu">내 주문 메뉴</label>
                <input type="text" class="form-control" id="내주문 메뉴" placeholder="주문 메뉴 입력하기"></input>
            </div>

            <div class="form-group" style={{marginTop: '20px'}}>
                <label for="exampleFormControlSelect1"> 함께 주문할 인원 수</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div>

                <FormGroup style={{marginTop: '20px'}}>
                    <Label for="contextText">
                        모집 글 내용
                    </Label>
                    <Input
                        id="GroupText"
                        name="text"
                        type="textarea"
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

        <button type="submit" class="btn btn-info" style={{marginTop: '50px'}}>접수하기</button>

        </div>
    </form>
    </>
    );
};

export default Form;
