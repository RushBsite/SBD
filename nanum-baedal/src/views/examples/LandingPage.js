import React from "react";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function LandingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">나눔의 민족이란?</h2>
                <h5 className="description">
                  우리 동네 공동배달 플랫폼 <span style={{color: '#4bb5ff', fontWeight: 'bold'}}>
                    "나눔의 민족을"</span> 소개합니다.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/landingImage1.jpg") + ")"
                    }}
                  >
                    <p className="blockquote blockquote-info">
                      "나눔의 민족은 배달비가 너무 비싸다는 작은 아이디어에서 시작했습니다." <br></br>
                      <br></br>
                      <small>-Goorm-team5</small>
                    </p>
                  </div>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/landingImage3.jpg") + ")"
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/landingImage2.jpg") + ")"
                    }}
                  ></div>
                  <h3>
                    "공동배달이라는 새로운 공유 문화"
                  </h3>
                  <p>
                    나눔의 민족은 배달이라는 서비스를 이웃과 공유합니다.
                    공동 배달을 통해 이웃과 함께 주문하고 배달료를 아껴보세요.
                    배달음식은 먹고 싶은데 배달료 때문에 망설이는 당신을 위한
                    단 하나의 서비스, <span style={{fontWeight: 'bold'}}>'나눔의 민족'</span>입니다.
                    
                  </p>
                  <p>
                    공동 배달이라는 공유문화는 경제적으로도, 환경적으로도 우리의 미래를 생각합니다.
                    한 아파트에, 한 동네에 하루에도 수십 번 왕복하는 현재의 배달
                  </p>
                  <p>
                    이젠 한 아파트에 한 건으로, 한 동네에 한 건으로 우리의 돈, 시간 그리고 환경을 아낄 수 있습니다.
                  </p>
                  <p>
                    당신도 함께 해보세요, 나눔의 민족.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
