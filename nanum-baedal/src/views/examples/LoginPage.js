import React from "react";
import axios from 'axios';

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

function LoginPage() {
  const [inputId, setInputId] = React.useState(false);
  const [inputPw, setInputPw] = React.useState(false);
  const handleInputId = (e) => {
      setInputId(e.target.value)
  }

  const handleInputPw = (e) => {
      setInputPw(e.target.value)
  }
  

  //const [firstFocus, setFirstFocus] = React.useState(false);
  //const [lastFocus, setLastFocus] = React.useState(false);

// login 버튼 클릭 이벤트
  const onClickLogin = () => {
      console.log('click login')
      console.log('ID : ', inputId)
      console.log('PW : ', inputPw)

      axios.post('http://localhost:3001/user_inform/onLogin', null, {
          params: {
              'user_id': inputId,
              'user_pw': inputPw
          }
      })
      .then(res => {
          console.log(res)
          console.log('res.data.userId :: ', res.data.userId)
          console.log('res.data.msg :: ', res.data.msg)
          if(res.data.userId === undefined){
              // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
              console.log('======================',res.data.msg)
              alert('입력하신 id 가 일치하지 않습니다.')
          } else if(res.data.userId === null){
              // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
              console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
              alert('입력하신 비밀번호 가 일치하지 않습니다.')
          } else if(res.data.userId === inputId) {
              // id, pw 모두 일치 userId = userId1, msg = undefined
              console.log('======================','로그인 성공')
              sessionStorage.setItem('user_id', inputId)
          }
          // 작업 완료 되면 페이지 이동(새로고침)
          document.location.href = '/index'
      })
      .catch()
  }

  
  React.useEffect(() => {
    axios.get('/user_inform/login')
    .then(res => console.log(res))
    .catch()
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
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
                        placeholder="ID..."
                        type="text"
                        //name='input_id'
                        //value={inputId}
                        onChange={handleInputId}
                        //onFocus={() => setInputId(true)}
                        //onBlur={() => setInputId(false)}
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
                        placeholder="Password..."
                        type="text"
                        //name='input_pw'
                        //value={inputPw}
                        onChange={handleInputPw}
                        //onFocus={() => setInputPw(true)}
                        //onBlur={() => setInputPw(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={onClickLogin}
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Create Account
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
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
