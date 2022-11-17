import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  const [isLogin, setIsLogin] = useState(false)
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {

    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
    }
    
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 49 ||
        document.body.scrollTop > 49
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 50 ||
        document.body.scrollTop < 50
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      sessionStorage.removeItem('user_id')
      // App 으로 이동(새로고침)
      document.location.href = '/'
  }
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              target="_blank"
              id="navbar-brand"
            >
            <img
              alt="..."
              className="main_logo"
              src={require("assets/img/logo_long.png")}
            ></img>
            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>              
              <NavItem>    
                <Button
                  className="btn-round btn-white"
                  color="default"
                  id="login_btn"
                  to="/login-page"
                  tag={Link}
                >
                  <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                  <p>로그인</p>
                </Button>
                <UncontrolledTooltip target="#login_btn">
                  로그인 하러 가기
                </UncontrolledTooltip>


              </NavItem>
              <NavItem>    
                <Button
                  className="btn-neutral"
                  color="info"
                  href=""
                  id="change_adress"
                  target="_blank"
                >
                  <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                  <p>[주소지명]</p>
                </Button>
                <UncontrolledTooltip target="#change_adress">
                  주소를 변경하려면 클릭
                </UncontrolledTooltip>
              </NavItem>                         
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
