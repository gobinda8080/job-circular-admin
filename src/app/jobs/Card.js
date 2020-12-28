import React from 'react'
import {Row,Col,Card,CardHeader,CardBody} from 'reactstrap';
import Cbody from '../common/cbody'
import fb from '../../data/base'
const  CardView = (props) => {
    const [details, setDetails] = React.useState(null);
    console.log(props)
    let headerRadius = null
    if(!details){
        headerRadius = { 
            borderBottomLeftRadius: '20px', 
            borderBottomRightRadius: '20px'
        }
     }
    const handleCollapse = () =>{
        if(details){
            setDetails(false)
        }else{
            setDetails(true)
        }
    }
    const handleDelete = (key) =>{
        alert('Are you want to sure delete ?')
        fb.database().ref(`/jobs/${key}`).remove() 
    }

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
  

    let endDeadline = null
    if(props.date){
        let end = dateChecker(props.date)
        if(end){
            endDeadline ={
                color: 'red'
            }
        }
    }

    return (
        <Row>
            <Col sm="12">
            <Card>
                <CardHeader style={{...headerRadius}}>
                <Row>
                    <Col sm="10">
                    <h5 style={{ fontSize: '14px', lineHeight: '25px', marginBottom: '4px'}}>{props.title}</h5>
                    {props.date && (
                        <span style={{ fontSize: '12px', ...endDeadline}}>Date : {props.date}</span>
                    )}
                    </Col>
                    <Col sm="2" style={{background: '#fff'}}>
                    <i style={{color: 'red'}} onClick={()=>{ handleDelete(props.jobKey)}} className="fa fa-trash-o mr-3"></i>
                    <i onClick={handleCollapse} className={details ? "fa fa-angle-up": "fa fa-angle-down"}></i>
                    </Col>
                </Row>
                </CardHeader>
                {details && ( <Cbody image={ props.image } description={ props.description}/> )
                }
                
            </Card>
            </Col>
        </Row>
    );
}

export default CardView;