import React, { Fragment, useEffect } from 'react';
import BreadCrumb from '../layout/Breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';
import CardView from './jobs/Card';
import fb from '../data/base'
import _ from 'lodash'


const  JobList = (props) => {

  const [jobList, setJobList] = React.useState();
  useEffect(()=>{
    
    fb.database().ref('/jobs').on('value', snapshot => {           
      const jobsList = _.map(snapshot.val(), (val, key)=>{
          return {
            ...val,
            key: key
          }
        })
        setJobList(jobsList.reverse())
    })

  },[])

  let allJobsList = null
  if(jobList){
    allJobsList = jobList.map((job)=>{
      return <CardView title={job.title} jobKey={job.key} key={job.key} description={job.description} image={job.image} date={job.date}/>
    })
  }
    return (
         <Fragment>
         <BreadCrumb parent="Home" subparent="Job" title="All"/>
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