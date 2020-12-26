import React from 'react'
import {Row, Col, CardBody} from 'reactstrap';

const Cbody = props =>{
  return(
    <CardBody>
        <Row>
            <Col sm="4">
                <a href={props.image} target="_blank" alt="Photo"><img height="200px" width="200px" src={props.image}></img></a>
            </Col>
            <Col sm="8">
                <p>{props.description}</p>
            </Col>
        </Row>
    </CardBody>
  )
}

export default Cbody