import React, { useState,Fragment, useEffect } from 'react'
import BreadCrumb from '../layout/Breadcrumb'
import { Container, Row, Col, Card, CardBody, CardHeader, Button, CardFooter, Table, Input, Label, Form, FormGroup } from 'reactstrap'
import { Database, ShoppingBag, MessageCircle, UserPlus, Layers, ShoppingCart, DollarSign, ArrowDown, ArrowUp, CloudDrizzle} from 'react-feather';
import {useHistory} from 'react-router-dom'
import fb from '../data/base'
import _ from 'lodash'

const Default = () => {

    const [ ready, setReady ] = React.useState(null);
    const [ jobList, setJobList ] = React.useState();
    const [ exJobList, setExJobList ] = React.useState();
    const [ otherList, setOtherList ] = React.useState();
    const [ exOtherList, setExOtherList ] = React.useState();


    const dateChecker = n => {
      const rgx = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
      if(rgx.test(n)){
        let d = new Date()
        let y = d.getFullYear();
        let m = d.getMonth();
        let day = d.getDate()
        let date = n.split('-')
        
        if( parseInt(date[0]) >= y ){
            if(parseInt(date[0]) === y){
              if(parseInt(date[1]) >= m+1){
                if(parseInt(date[1]) === m+1){
                  if(parseInt(date[2]) >= day){
                    return 0
                  }else{
                    return true
                  }
                }else{
                  return 0
                }
              }else{
              return true
              }
            }else{
              return 0
            }
        }else{
            return true
        } 
      }else{
        return 0
      }

  }


    useEffect(()=>{
      
      fb.database().ref('/jobs').on('value', snapshot => {           
        const allJobs = _.map(snapshot.val(), (val, key)=>{
            return {
              ...val,
              key: key
            }
          })

          let expJob = allJobs.filter(function (job) {
            return dateChecker(job.date)
          });
          setExJobList(expJob);
          setJobList(allJobs)
          setReady(true)
      })

      fb.database().ref('/others').on('value', snapshot => {           
        const allOthers = _.map(snapshot.val(), (val, key)=>{
            return {
              ...val,
              key: key
            }
          })
          let expOther = allOthers.filter(function (other) {
            console.log(other.date)
              return dateChecker(other.date)
          });
          setExOtherList(expOther);
          setOtherList(allOthers)
      })
    },[])


    const cartProducts = [
      {
        details: "Simply dummy text of the printing",
        qty: "1",
        status: "pending",
        statusColor:"primary",
        price: "6523",
        className: "pill-badge-secondary"
      },
      {
        details: "Long established",
        qty: "5",
        status: "cancle",
        statusColor:"secondary",
        price: "6565",
        className: "pill-badge-success"
      },
      {
        details: "sometimes by accident",
        qty: "10",
        status: "cancle",
        statusColor:"primary",
        price: "9361",
        className: "pill-badge-warning"
      },
      {
        details: "Classical Latin literature",
        qty: "9",
        status: "return",
        statusColor:"primary",
        price: "2658",
        className: "pill-badge-primary"
      },
      {
        details: "keep the site on the Internet",
        qty: "8",
        status: "pending",
        statusColor:"primary",
        price: "6328",
        className: "pill-badge-secondary"
      },
      {
        details: "Molestiae consequatur",
        qty: "3",
        status: "cancle",
        statusColor:"secondary",
        price: "4852",
        className: "pill-badge-info"
      },
      {
        details: "Pain can procure",
        qty: "8",
        status: "return",
        statusColor:"primary",
        price: "3589",
        className: "pill-badge-primary"
      }
  ]

    return (
      <Fragment>
            <BreadCrumb parent="Home" subparent="Main" title="Overview"/>
        {ready? (
        <Container fluid={true}>
        <Row>
          <Col sm="6" xl="3" lg="6">
            <Card className="o-hidden">
              <CardBody className="bg-primary b-r-4 card-body">
                <div className="media static-top-widget">
                  <div className="align-self-center text-center"><ShoppingBag /></div>
                  <div className="media-body"><span className="m-0">Total Jobs</span>
                    <h4 className="mb-0 counter">{jobList?jobList.length : jobList}</h4><ShoppingBag className="icon-bg"/>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
              <Col sm="6" xl="3" lg="6">
                <Card className="o-hidden">
                  <div className="bg-primary b-r-4 card-body">
                    <div className="media static-top-widget">
                      <div className="align-self-center text-center"><MessageCircle /></div>
                      <div className="media-body"><span className="m-0">Total Others</span>
                        <h4 className="mb-0 counter">{otherList?otherList.length : otherList}</h4><MessageCircle className="icon-bg"/>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
          <Col sm="6" xl="3" lg="6">
            <Card className="o-hidden">
                <CardBody className="bg-secondary b-r-4">
                <div className="media static-top-widget">
                    <div className="align-self-center text-center"><ShoppingBag /></div>
                    <div className="media-body"><span className="m-0">Expired Jobs</span>
                    <h4 className="mb-0 counter">{exJobList?exJobList.length : exJobList}</h4><ShoppingBag className="icon-bg"/>
                    </div>
                </div>
                </CardBody>
            </Card>
            </Col>
          <Col sm="6" xl="3" lg="6">
            <Card className="o-hidden">
                <CardBody className="bg-secondary b-r-4">
                <div className="media static-top-widget">
                    <div className="align-self-center text-center"><MessageCircle /></div>
                    <div className="media-body"><span className="m-0">Expired Others</span>
                    <h4 className="mb-0 counter">{exOtherList? exOtherList.length : exOtherList}</h4><MessageCircle className="icon-bg"/>
                    </div>
                </div>
                </CardBody>
            </Card>
            </Col>            
          <Col xl="6" className="xl-100 box-col-12">
            <Card>
              <CardHeader>
                <h5>Jobs Overview</h5>
              </CardHeader>
              <CardBody>
                <div className="user-status table-responsive">
                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                    {cartProducts.map(data => (
                       <tr key={data.details}>
                          <td>{data.details}</td>
                          <td>
                            <div className={`span badge badge-pill ${data.className}`}>{data.price}</div>
                          </td>
                       </tr>
                    ))}                     
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" className="xl-100 box-col-12">
            <Card>
              <CardHeader>
                <h5>Others Overview</h5>
              </CardHeader>
              <CardBody>
                <div className="user-status table-responsive">
                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                    {cartProducts.map(data => (
                       <tr key={data.details}>
                          <td>{data.details}</td>
                          <td>
                            <div className={`span badge badge-pill ${data.className}`}>{data.price}</div>
                          </td>
                       </tr>
                    ))}                     
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        
        </Row>
        </Container>
        ) : <Col md="6" style={{marginLeft: '100px', marginTop: '50px'}}>
                <div className="loader-box">
                    <div className="loader-9"></div>
                </div>
            </Col>}
        </Fragment>
    )
}

export default Default

