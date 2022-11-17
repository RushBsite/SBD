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
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '450px'}}>
      <div className="card">
         <Container style = {{justifyContent:'center', alignItems: 'center', height: '0vh'}}>
            <Row className="ml-auto mr-auto">
               <p className="category"></p>
               <CardColumns style={{alignItems: 'center'}}>
                <Card style= {{flexBasis: 'auto', flexShrink: '1', flexGrow: '1'}}>
                <CardImg style={{flexBasis: 'auto', height: '200px'}} src="https://cdnweb01.wikitree.co.kr/webdata/editor/202007/10/img_20200710134132_8741c24c.webp" alt="Card image cap" />
                   <CardBody>
                     <CardTitle>피자헛 강남점</CardTitle>
                      <CardSubtitle>현재 모집 인원수 3/4</CardSubtitle>
                      <CardText></CardText>
                      <Button color="info">공동모집글 참여하기</Button>
                   </CardBody>
                  </Card>
                  <Card style= {{flexBasis: 'auto', flexShrink: '1', flexGrow: '1'}}>
                   <CardImg style={{flexBasis: 'auto', height: '200px'}} src="https://img.insight.co.kr/static/2020/01/09/700/67x2l9sj0ezg2s756225.jpg" alt="Card image cap" />
                   <CardBody>
                     <CardTitle>동대문 엽기떡볶이 양재점</CardTitle>
                      <CardSubtitle>현재 모집 인원수 2/4</CardSubtitle>
                     <CardText></CardText>
                     <Button color="info">공동모집글 참여하기</Button>
                    </CardBody>
                  </Card>
                  <Card style= {{flexBasis: 'auto', flexShrink: '1', flexGrow: '1'}}>
                  <CardImg style={{flexBasis: 'auto', height: '200px'}} src="https://www.fetv.co.kr/data/photos/20191044/art_15725058306776_a462fe.jpg" alt="Card image cap" />
                    <CardBody>
                      <CardTitle>밴엔제리스 선릉DV점</CardTitle>
                      <CardSubtitle>현재 모집 인원수 1/4</CardSubtitle>
                      <CardText></CardText>
                      <Button color="info">공동모집글 참여하기</Button>
                    </CardBody>
                  </Card>
                </CardColumns>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Tabs;