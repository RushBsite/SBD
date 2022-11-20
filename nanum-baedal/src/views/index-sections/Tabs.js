import React from 'react';
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
      <div className="card">
         <Container style = {{justifyContent:'center', alignItems: 'center', height: '0vh'}}>
            <Row className="ml-auto mr-auto" style={{height: '500px',width: 'auto', paddingTop: '50px'}}>
               <p className="category"></p>
                <Card style= {{display: 'flex' ,justifyContent: 'center' ,flexBasis: 'auto', flexShrink: '1', flexGrow: '1'}}>
                  <CardImg style={{flexBasis: 'auto', height: '400px', width: 'auto', objectFit: 'cover'}} src="https://cdnweb01.wikitree.co.kr/webdata/editor/202007/10/img_20200710134132_8741c24c.webp" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>피자헛 강남점</CardTitle>
                    <CardSubtitle>현재 모집 인원수 3/4</CardSubtitle>
                    <CardText></CardText>
                    <Button color="info">공동모집글 참여하기</Button>
                  </CardBody>
                </Card>
            </Row>
          </Container>
      </div>
    </>
  );
};

export default Tabs;