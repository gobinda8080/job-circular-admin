import React, { Fragment } from 'react';
import BreadCrumb from '../layout/Breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody,CardFooter,Button,Form,FormGroup,Label,Input} from 'reactstrap'
import fb from '../data/base'


const OthersInput = () => {

  const [info, setInfo] = React.useState({
    title: '',
    description: '',
    date: '',
    category: '',
  })
  const [files, setFiles] = React.useState({
    image: '',
    pdf: '',
  })

  const handleInfo = event =>{  
    setInfo({
      ...info,
      [event.target.name] : event.target.value
    })
  }
  const handleFile = event => {
    console.log(event.target.files);
    setFiles({
      ...files,
      [event.target.name] : event.target.files
    })
  }
  const handleSubmit = ()=>{
    const {title, description, date, category} = info
    if(files.image === '' || files.pdf === ''){
      fb.database().ref('/others').push({title, description, date, category, image: '', pdf: ''})
    }else{

    }



    // if(files.image){
    //   let file = files.image[0]
    //   let uploadTask = fb.storage().ref(`images/${file.name}`).put(file)
    //   uploadTask.on('state_changed', 
    //     (snapshot)=>{
    //       // console.log(snapshot);
    //     },
    //     (error)=>{
    //       // console.log(error);
    //     },
    //     ()=>{
    //       fb.storage().ref('images').child(files.image[0].name).getDownloadURL().then( url=>{
    //         const {title, description, date, category} = info
    //         fb.database().ref('/others').push({title, description, date, category, image: url})
    //         console.log(url);
    //       })
    //     }
    //   )        
    // }
    
    




  }

const handleClear = ()=>{
  setInfo({
    title: '',
    description: '',
    date: '',
    category: '',
  })
}
console.log(info)
  return (
    <Fragment>
      <BreadCrumb parent="Home" subparent="Others" title="New"/>
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
                        <Input className="form-control" name="title"  type="text" placeholder="Circular title..." onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-2">
                        <Label>Description</Label>
                        <Input type="textarea" name="description" className="form-control"  rows="3" onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleInputPassword2">End of the date</Label>
                        <Input className="form-control" name="date" type="date" onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect9">Category</Label>
                        <Input type="select" name="category" className="form-control digits" defaultValue="1"  onChange={handleInfo}>
                          <option value="">Select a Category</option>
                          <option value="প্রতিদিনের তথ্য">প্রতিদিনের তথ্য</option>
                          <option value="সাম্প্রতিক তথ্য">সাম্প্রতিক তথ্য</option>
                          <option value="প্রিলিমিনারি প্রস্তুতি">প্রিলিমিনারি প্রস্তুতি</option>
                          <option value="BCS প্রস্তুতি">BCS প্রস্তুতি</option>
                          <option value="চাকরির প্রস্তুতি">চাকরির প্রস্তুতি</option>
                          <option value="নোটিশ">নোটিশ</option>
                          <option value="পরীক্ষার সময়সূচি">পরীক্ষার সময়সূচি</option>
                          <option value="Job Exam Notice">Job Exam Notice</option>
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
                  <Button  color="primary" onClick={handleSubmit} className="mr-1" >Submit</Button>
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

export default OthersInput;