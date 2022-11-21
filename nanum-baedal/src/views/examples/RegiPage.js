import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import AddressPage2 from "./AddressPage2";
import useLocalStorage from "components/useLocalStorage";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import { func } from "prop-types";


function RegiPage(props)
{
    //const [check, setCheck] = React.useState(false);
    const [inputId, setInputId] = React.useState('');
    const [inputPw, setInputPw] = React.useState('');
    const [inputEmail, setInputEmail] = React.useState('');
    const [inputBirth, setInputBirth] = React.useState('');
    const [inputAddress, setInputAddress] = React.useState('주소지명');

    const initData = () =>{
        window.localStorage.setItem("userAddress", '주소지명');
    }

    const handleInputId = (e) => {
      sessionStorage.setItem('inputId',e.target.value)
      setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
      sessionStorage.setItem('inputPw',e.target.value)
      setInputPw(e.target.value)
    }
    const handleInputEmail = (e) => {
      sessionStorage.setItem('inputEmail',e.target.value)
      setInputEmail(e.target.value)
    }
    const handleInputBirth = (e) => {
      sessionStorage.setItem('inputBirth',e.target.value)
      setInputBirth(e.target.value)
    }
    const handleInputAddress = (e) => {
        setInputAddress(e.target.value)
    }
    const onclick = (e) => {
        document.location.assign('/regi-address')
    }

    const onClickRegister = () => {
        axios.post('http://10.104.156.38:3001/user_inform/onRegister', null, {
          params: {
              'user_id': inputId,
              'user_pw': inputPw,
              'user_email': inputEmail,
              'user_birth': inputBirth,
              'user_address': inputAddress
          }
      })
      .then(res => {
        console.log(res.data)
        if(res.data == true){
          alert('회원가입이 완료되었습니다. 로그인 페이지에서 로그인해 주십시오.')
          document.location.href = '/login-page'
        } else {
          alert('회원가입에 실패했습니다. 올바른 정보를 입력해 주십시오.')
          document.location.href = '/register-page'
        }
      })
      .catch()
    }
    
    React.useEffect(() => {
      if(window.localStorage.getItem("userAddress")==null){
        initData()
      }else{
        setInputAddress(window.localStorage.getItem("userAddress"))
      }
      axios.get('http://10.104.156.38:3001/user_inform/register')
      .then(res => {
        console.log(res)
        setInputId(sessionStorage.getItem('inputId'));
        setInputPw(sessionStorage.getItem('inputPw'));
        setInputEmail(sessionStorage.getItem('inputEmail'));
        setInputBirth(sessionStorage.getItem('inputBirth'));
        console.log(inputId);
        console.log(inputPw);
        console.log(inputEmail);
        console.log(inputBirth);
      })
      .catch()
      document.body.classList.add("register-page");
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      return function cleanup() {
        document.body.classList.remove("register-page");
        document.body.classList.remove("sidebar-collapse");
      };
    }, []);

    return (
      <>
        {/* <ExamplesNavbar /> */}
        {/* <button onClick={ ()=>{ useHistory.goBack(); }} style={{zIndex: '1', color: 'black', margin: '10px'}}>◁ 이전 페이지</button> */}
        <div className="page-header clear-filter" /*filter-color="blue"*/ /*style={{position: 'absolute',
          zIndex: '0',
          width: '100%',
          height: '100%',
          display: 'block',
          left: '0',
          top: '0',
          content: ""}}*/>
          <div
            className="page-header-image"
            // style={{
            //   backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
            // }}
          ></div>
          <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" md="4">
                <Card className="card-login card-plain">
                  <Form action="" className="form" method="">
                    <CardHeader className="text-center">
                      {/* <div className="logo-container"> */}
                        <img
                          alt="..."
                          src={require("assets/img/logo_tr.png")}
                        ></img>
                      {/* </div> */}
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (inputId ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={'아이디'}
                          value={inputId}
                          type="text"
                          onChange={handleInputId}
                        ></Input>
                      </InputGroup>

                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (inputPw ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={'비밀번호'}
                          value={inputPw}
                          type="text"
                          onChange={handleInputPw}
                        ></Input>
                      </InputGroup>

                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (inputEmail ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={'E-Mail'}
                          value={inputEmail}
                          type="text"
                          onChange={handleInputEmail}
                        ></Input>
                      </InputGroup>

                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (inputBirth ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={'생년월일'}
                          value={inputBirth}
                          type="text"
                          onChange={handleInputBirth}
                        ></Input>
                        
                      </InputGroup>
                      <div style={{display: 'flex',}}>
                      <InputGroup
                        className="no-border input-lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons location_pin"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={inputAddress}
                          type="text"
                          readOnly
                        ></Input>
                  
                      </InputGroup>
                      </div>
                      <Button color="success"
                          onClick={onclick}
                      >
                        주소지정하기</Button>

                      {/* {check ? <p style={{color: 'black'}}>{window.localStorage.getItem("userName")}</p> : 
                        <Link to="/regi-address">
                          <p style={{color: 'black'}} onClick={()=>setCheck(true)} >주소지정하기</p>
                        </Link>
                      }  */}
                      
                     {/****************************** */}

                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        href="#pablo"
                        onClick={onClickRegister}
                        size="lg"
                      >
                        회원가입하기
                      </Button>
                      
                        <div className="pull-left">
                        <h6>
                            <a
                            className="link"
                            href="/login-page"
                            //onClick={(e) => e.preventDefault()}
                            >
                            로그인
                            </a>
                        </h6>
                        </div>

                      <div className="pull-right">
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                             문의하기
                          </a>
                        </h6>
                      </div>

                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Container>
          </div>
          {/* <TransparentFooter /> */}
        </div>
      </>
    );
}

export default RegiPage;