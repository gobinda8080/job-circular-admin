import React,{useState, Fragment} from 'react';
import BreadCrumb from '../../../layout/Breadcrumb'
import { Container,Row,Col,Card,CardBody,CardHeader,Button,Tooltip } from 'reactstrap';
import {MultiTooltipDirection,MultiTooltipHtmlElement,MultiTooltipOffset} from './TooltipComponent'

const Tooltips = (props) => {
    const [basictooltip, setbasictooltip] = useState(false);
    const toggle = () => setbasictooltip(!basictooltip);
    return (
            <Fragment>
            <BreadCrumb parent="Home" subparent="Base" title="Tooltip"/>
            <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Basic Tooltip</h5>
                  </CardHeader>
                  <CardBody className="btn-showcase">
                    <Button color="primary" id="TooltipExample">Hover Me</Button>
                    <Tooltip 
                        placement="top" 
                        isOpen={basictooltip} 
                        target="TooltipExample" 
                        toggle={toggle}>
                        Popover title
                    </Tooltip>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Directions</h5>
                  </CardHeader>
                  <CardBody className="btn-showcase">
                    <MultiTooltipDirection/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>HTML elements</h5>
                  </CardHeader>
                  <CardBody className="btn-showcase">
                    <MultiTooltipHtmlElement/>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Offset</h5>
                  </CardHeader>
                  <CardBody className="btn-showcase">
                    <MultiTooltipOffset/>
                  </CardBody>
                </Card>
              </Col>
              
            </Row>
          </Container>
          </Fragment>
    );
}

export default Tooltips;