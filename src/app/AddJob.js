import React, { Fragment } from 'react';
import BreadCrumb from '../layout/Breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody,CardFooter,Button,Form,FormGroup,Label,Input} from 'reactstrap'
import fb, { db } from '../data/base'



const BaseInput = () => {

  const [success, setSuccess] = React.useState(null)
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
if(title !== ''){

  if(files.image !== '' && files.pdf !== ''){
      //uploading PDF
      let curDate = new Date();
      let pdf = files.pdf[0]
      let uploadTask = fb.storage().ref(`images/${pdf.name}`).put(pdf)
      uploadTask.on('state_changed', 
        (snapshot)=>{
                      
        },
        (error)=>{
          console.log(error)
        },
        ()=>{
          fb.storage().ref('images').child(files.pdf[0].name).getDownloadURL().then( pdfUrl=>{
        //uploading IMAGE
            let image = files.image[0]
            let uploadTask = fb.storage().ref(`images/${image.name}`).put(image)
            uploadTask.on('state_changed', 
              (snapshot)=>{
    
              },
              (error)=>{
                console.log(error)
              },
              ()=>{
                fb.storage().ref('images').child(files.image[0].name).getDownloadURL().then( imageUrl=>{
                  const { title, description, date, category} = info
                  fb.database().ref('/jobs').push({title, description, date, category, image: imageUrl, pdf: pdfUrl, create: curDate.toString() })
                  handleSuccess();
                  handleClear();
                })
              }
            ) 
    
          })
        }
      ) 

    }else{
      if(files.image !== '' && files.pdf === ''){
        let curDate = new Date();
        let image = files.image[0]
        let uploadTask = fb.storage().ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', 
          (snapshot)=>{

          },
          (error)=>{
            console.log(error)
          },
          ()=>{
            fb.storage().ref('images').child(files.image[0].name).getDownloadURL().then( url=>{
              const { title, description, date, category} = info
              fb.database().ref('/jobs').push({title, description, date, category, image: url, pdf: '', create: curDate.toString() })
              handleSuccess();
              console.log(url);
              handleClear();
            })
          }
        ) 

      }else if(files.image === '' && files.pdf !== ''){
        let curDate = new Date();
        let pdf = files.pdf[0]
        let uploadTask = fb.storage().ref(`images/${pdf.name}`).put(pdf)
        uploadTask.on('state_changed', 
          (snapshot)=>{
                        
          },
          (error)=>{
            console.log(error)
          },
          ()=>{
            fb.storage().ref('images').child(files.pdf[0].name).getDownloadURL().then( url=>{
              const { title, description, date, category} = info
              fb.database().ref('/jobs').push({title, description, date, category, image: '', pdf: url, create: curDate.toString() })
              handleSuccess();
              console.log(url);
              handleClear();
            })
          }
        ) 
      }else{
        let curDate = new Date();
        fb.database().ref('/jobs').push({title, description, date, category, image: '', pdf: '', create: curDate.toString()})
        handleSuccess();
        handleClear();
      }

    }
  }    

}

const handleSuccess = ()=>{
  setSuccess(true)
  setTimeout(()=>{
    setSuccess(false)
  }, 2000)
}
const handleClear = ()=>{
  setInfo({
    title: '',
    description: '',
    date: '',
    category: '',
  })
  setFiles({
    image: '',
    pdf: ''
  })
}


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
                        <Input className="form-control" type="text" name="title" placeholder="সিভিল সার্ভিস প্রশাসন একাডেমি-তে নিয়োগ..." value={info.title} onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-2">
                        <Label>Description</Label>
                        <Input type="textarea" className="form-control" name="description"  rows="3" value={info.description} onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleInputPassword2">End of the date</Label>
                        <Input className="form-control"  type="date" name="date" value={info.date} onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect9">Category</Label>
                        <Input type="select" name="select" className="form-control digits" name="category" value={info.category} onChange={handleInfo}>
                          <option value="">Select a Category</option>
                          <option value="ব্যাংক জবস">ব্যাংক জবস</option>
                          <option value="এনজিও জবস">এনজিও জবস</option>
                          <option value="সেলস/মার্কেটিং">সেলস/মার্কেটিং</option>
                          <option value="রেলওয়ে জবস">রেলওয়ে জবস</option>
                          <option value="ডিফেন্স জবস">ডিফেন্স জবস</option>
                          <option value="শিক্ষক নিয়োগ">শিক্ষক নিয়োগ</option>
                          <option value="হেলথ/মেডিকেল">হেলথ/মেডিকেল</option>
                          <option value="হেলথ/মেডিকেল">সরকারি চাকরি</option>
                          <option value="অন্যান্য/Others">অন্যান্য/Others</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect3">Choose an image</Label>
                        <Input className="form-control" name="image" accept="image/png, image/jpeg" type="file" onChange={handleFile}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect3">Choose a pdf</Label>
                        <Input className="form-control" name="pdf" accept="application/pdf"  type="file" onChange={handleFile}/>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                <Button  color="primary" onClick={ handleSubmit } className="mr-1" disabled={success? true: false}>{success? 'Success': 'Submit'}</Button>
                <Button className="btn btn-light" onClick={handleClear} type="reset" >Cancel</Button>
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