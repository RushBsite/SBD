import React, { useState } from "react";
import axios from 'axios';
import url from '../../url';
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
        axios.post(url + '/user_inform/commentsubmit', null, {
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
        axios.post(url + '/user_inform/commentreturn', null, {
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
                        ????????? ??????</CardTitle>
                    <CardText style={{color: 'black', marginLeft: '15px', marginRight: '15px', display: 'flex', alignContent: 'center'}}>
                        ????????? ????????? ?????? ????????? ????????? ???????????? ????????? ???????????? ??????????????? ??????????????????!! ?????? ????
                        <br/><br/>
                        ?????? ???????????? -> URL ?????? ??????
                        </CardText>
                    <CardText style={{paddingLeft:'10px'}}>
                        <small className="text-muted">????????? ?????? - 5??????</small>
                    </CardText>
            </Card>

            <Card border='primary' style={{ width: '29.5rem', paddingLeft: '10px', paddingBottom: '10px'}}>
                <div style={{marginTop: '20px'}}>
                    <label for="myMenu" style={{fontWeight: 'bold', color: 'info'}}>?????? ????????? ??????</label>
                    <span style={{color: '#4bb5ff', fontWeight: 'bold'}}> 3/4</span>
                    <br/>
                    <span class="badge badge-primary">????????? ????????? ????</span>
                    <br/>
                    <span class="badge badge-info">???????????? ?????? ????</span>
                    <br/>
                    <span class="badge badge-success">???????????? ????????? ????</span>
                    <br/>
                    
                </div>
            </Card>

            <div style={{marginTop: '50px'}}>
                <label for="myMenu">?????????</label>
                <input type="text" onChange={handlemenu} class="form-control" id="menuName" placeholder="????????? ????????????"></input>
            </div>

            <div style={{marginTop: '20px'}}>
                <label for="menuPrice">??????</label>
                <input type="text" onChange={handleprice} class="form-control" id="menuPrice" placeholder="?????? ?????? ?????? ????????????"></input>
            </div>

                <FormGroup style={{marginTop: '20px'}}>
                    <Label for="contextText">
                        ?????? ??? ?????????
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
        ???????????? <br/> ????????????</button>
    </form>
    </>
    );
};

export default FormComment;
