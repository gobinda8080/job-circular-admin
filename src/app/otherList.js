import React, { Fragment, useEffect } from 'react';
import BreadCrumb from '../layout/Breadcrumb'
import {Container,Row,Col,Card} from 'reactstrap';
import CardView from './others/Card';
import fb from '../data/base'
import _ from 'lodash'


const  JobList = (props) => {

  const [jobList, setJobList] = React.useState();
  useEffect(()=>{
    
    fb.database().ref('/others').on('value', snapshot => {           
      let jobsmapList = _.map(snapshot.val(), (val, key)=>{
          return {
            ...val,
            key: key
          }
        })
        setJobList(jobsmapList.reverse())
    })

  },[])

  let allJobsList = null
  if(jobList){
    allJobsList = jobList.map((job)=>{
      return <CardView title={job.title} jobKey={job.key} description={job.description} date={job.date} image={job.image} description={job.description}/>
    })
  }
    return (
         <Fragment>
         <BreadCrumb parent="Home" subparent="Others" title="All"/>
          <Container fluid={true}>
            {
              !jobList &&(
                <Col md="6" style={{marginLeft: '100px', marginTop: '50px'}}>
                  <div className="loader-box">
                    <div className="loader-9"></div>
                  </div>
              </Col>
              )
            }
            {allJobsList}
          </Container>   
         </Fragment> 
    );
}

export default JobList;