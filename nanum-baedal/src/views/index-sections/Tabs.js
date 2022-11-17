import React from 'react';
import '../../assets/css/bootstrap.min.css'
import { 
  Card, 
  Button, 
  CardImg,
  CardHeader,
  CardTitle, 
  CardText, 
  CardColumns,
  CardSubtitle, 
  CardBody,
  Container,
  Row,
  Col, } from 'reactstrap';

  function Tabs() {
    return (
    <>
    <div className="section section-tabs">
        <Container fluid>
          <Row>
            <Col className="ml-auto mr-auto" md="5" xl="10">
              <p className="category"></p>
              <CardColumns>
                <Card>
                  <CardImg top width="100%" src="https://cdnweb01.wikitree.co.kr/webdata/editor/202007/10/img_20200710134132_8741c24c.webp" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>피자헛 강남점</CardTitle>
                    <CardSubtitle>현재 모집 인원수 3/4</CardSubtitle>
                    <CardText></CardText>
                    <Button color="primary">공동모집글 참여하기</Button>
                  </CardBody>
                </Card>
              </CardColumns>
              <CardColumns>
                <Card>
                  <CardImg top width="100%" src="https://cdnweb01.wikitree.co.kr/webdata/editor/202007/10/img_20200710134132_8741c24c.webp" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>피자헛 강남점</CardTitle>
                    <CardSubtitle>현재 모집 인원수 3/4</CardSubtitle>
                    <CardText></CardText>
                    <Button color="primary">공동모집글 참여하기</Button>
                  </CardBody>
                </Card>
              </CardColumns>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Tabs;