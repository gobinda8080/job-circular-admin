import React, { Fragment } from 'react';
import BreadCrumb from '../layout/Breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody,CardFooter,Button,Form,FormGroup,Label,Input} from 'reactstrap'
const BaseInput = () => {
  return (
    <Fragment>
      <BreadCrumb parent="Home" subparent="Jobs" title="New"/>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CardHeader>
                <h5>Basic form control</h5>
              </CardHeader> */}
              {/* <Form className="form theme-form"> */}
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlInput1">Title</Label>
                        <Input className="form-control"  type="text" placeholder="সিভিল সার্ভিস প্রশাসন একাডেমি-তে নিয়োগ..." />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-2">
                        <Label>Description</Label>
                        <Input type="textarea" className="form-control"  rows="3"/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleInputPassword2">End of the date</Label>
                        <Input className="form-control"  type="date"/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect9">Category</Label>
                        <Input type="select" name="select" className="form-control digits" defaultValue="1">
                          <option value="">Select a Category</option>
                          <option value="ব্যাংক জবস">ব্যাংক জবস</option>
                          <option value="এনজিও জবস">এনজিও জবস</option>
                          <option value="সেলস/মার্কেটিং">সেলস/মার্কেটিং</option>
                          <option value="রেলওয়ে জবস">রেলওয়ে জবস</option>
                          <option value="ডিফেন্স জবস">ডিফেন্স জবস</option>
                          <option value="শিক্ষক নিয়োগ">শিক্ষক নিয়োগ</option>
                          <option value="হেলথ/মেডিকেল">হেলথ/মেডিকেল</option>
                          <option value="অন্যান্য/Others">অন্যান্য/Others</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect3">Choose an image</Label>
                        <Input className="form-control"  type="file"/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect3">Choose a pdf</Label>
                        <Input className="form-control"  type="file"/>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button  color="primary" className="mr-1" >Submit</Button>
                  <Button className="btn btn-light" type="reset" >Cancel</Button>
                </CardFooter>
              {/* </Form> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BaseInput;