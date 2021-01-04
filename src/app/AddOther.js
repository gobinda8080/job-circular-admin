import React, { Fragment } from 'react';
import BreadCrumb from '../layout/Breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody,CardFooter,Button,Form,FormGroup,Label,Input} from 'reactstrap'
import fb, { db } from '../data/base'


const OthersInput = () => {

  const [success, setSuccess] = React.useState(null)

  const [info, setInfo] = React.useState({
    title: '',
    description: '',
    date: '',
    category: '',
    extra: ''
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

  fetch('https://jobcircular-a4e2d.firebaseio.com/index.json')
  .then(res => res.json())
  .then(data =>{
      const PRE_LIMIT = data.LIMIT
      const START = data.START
      const {title, description, date, category, extra } = info

    if(title !== ''){
      if(files.image !== '' && files.pdf !== ''){
          //uploading PDF
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
                      const { title, description, date, category, extra } = info
                      fb.database().ref(`/index`).set({LIMIT : PRE_LIMIT+1, START: START})
                      fb.database().ref('/others').push({title, description, date, category, image: imageUrl, pdf: pdfUrl, create: PRE_LIMIT, status: 'other', extra })
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
                  const { title, description, date, category, extra} = info
                  fb.database().ref(`/index`).set({LIMIT : PRE_LIMIT+1, START: START})
                  fb.database().ref('/others').push({title, description, date, category, image: url, pdf: '', create: PRE_LIMIT, status: 'other', extra })
                  handleSuccess();
                  console.log(url);
                  handleClear();
                })
              }
            ) 

          }else if(files.image === '' && files.pdf !== ''){
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
                  const { title, description, date, category, extra } = info
                  fb.database().ref(`/index`).set({LIMIT : PRE_LIMIT+1, START: START})
                  fb.database().ref('/others').push({title, description, date, category, image: '', pdf: url, create: PRE_LIMIT, status: 'other', extra })
                  handleSuccess();
                  console.log(url);
                  handleClear();
                })
              }
            ) 
          }else{
            fb.database().ref(`/index`).set({LIMIT : PRE_LIMIT+1, START: START})
            fb.database().ref('/others').push({title, description, date, category, image: '', pdf: '', create: PRE_LIMIT, status: 'other', extra })
            handleSuccess();
            handleClear();
            let payload  = {
              included_segments : ["Subscribed Users"],
              app_id : "bf9448fe-8819-43c1-a836-774c986f1f71",
              contents : { en: "This is new"},
              headings : { en : "........."}
            }
            fetch('https://onesignal.com/api/v1/notifications', {
              method: 'post',
              headers: {
                'Authorization': `Basic NTJiOTZiNzctNWMwOS00MmZiLTkyOWUtMWQ3NzJjZjExMzZj`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            })
          }

        }
      } 
    }).catch( err=>{
      console.log(err)
  })
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

console.log(files)
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
                        <Input className="form-control" name="title"  type="text" placeholder="..." value={info.title} onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-2">
                        <Label>Description</Label>
                        <Input type="textarea" name="description" className="form-control"  rows="3" value={info.description}  onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlInput1">Extra</Label>
                        <Input className="form-control" type="text" name="extra" placeholder=" " value={info.extra} onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleInputPassword2">End of the date</Label>
                        <Input className="form-control" name="date" type="date" value={info.date} onChange={handleInfo}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect9">Category</Label>
                        <Input type="select" name="category" className="form-control digits" value={info.category}  onChange={handleInfo}>
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
                        <Input className="form-control" name="image" accept="image/png, image/jpeg" type="file" onChange={handleFile}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="exampleFormControlSelect3">Choose a pdf</Label>
                        <Input className="form-control" name="pdf" type="file"  accept="application/pdf" onChange={handleFile}/>
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

export default OthersInput;