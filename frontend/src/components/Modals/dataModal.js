import React,{ useState }  from 'react'
import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import "bootstrap/dist/css/bootstrap.min.css";
import Tippy from '@tippyjs/react'
import { DataState } from './dataState';


function DataModal() {
   
     const [lgShow, setLgShow] = useState(false);
    const [mdShow, setMdShow] = useState(false);
    const [dataselect,setdata] = useState(false);
    const [dataselect2,setdata2] = useState(false);
    const [validated, setValidated] = useState(false);
    const [loaddata, setLoaddata] = useState();
    const [pdfbills, setPDFbills] = useState("");
    const [data3, setdata3] = useState("");
    // const [color, setColor] = useState("Green");
    
    //  const onChange2 = (e) =>{
    //   let files = e.target.files;
    //   console.log("data files", files);
    //   let reader  = new FileReader();
    //   reader.readAsDataURL(files[0]);
    //   reader.onload=(e)=>{
    //     console.log("File data", e.target.result)
    //     setPDFbills(e.target.result)
    //   }
    //  }
    
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        setMdShow(true)
        event.stopPropagation();
      } else{
        setMdShow(false)
      }
    
      setValidated(true);
     
       
    };
    const handleSubmit2 = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        setLgShow(true)
        event.stopPropagation();
      } else{
        setLgShow(false)
      }
    
      setValidated(true);
     
       
    };
    
        return (
          <>
          <DataState value={data3}/>
            {[ 'checkbox'].map((type) => (
    <div key={`inline-${type}`} className="mb-3">
      <Form.Check
        inline
        label="Upload load data"
        name="group1"
        
        onChange={()=>{setMdShow(true);setdata(true)}}
        className="radio"
        checked = {dataselect===true}
        
        type={type}
        id={`inline-${type}-1`}
      
      />
      <Form.Check
        inline
        label="Sharemydata"
        name="group1"
        onChange={()=>{setLgShow(true);setdata2(true)}}
        checked={dataselect2===true}
       
       type={type}
        id={`inline-${type}-2`}
       
      />
      <Form.Control.Feedback type="invalid">
   please select atleast on option!
    </Form.Control.Feedback>
       </div>
  ))}
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
              centered
            >
              <Modal.Header closeButton onClick={()=>setdata2(false)}>
                <Modal.Title id="example-modal-sizes-title-lg">
                  <h3>Share my data</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form className="form" action='#'  noValidate validated={validated} onSubmit={handleSubmit2}>
  <Form.Group className="mb-3" >
    <Form.Label><h4>PG & E authorization</h4></Form.Label><br/>
    
    <Form.Text className="text-muted">
    PG&E ShareMyData Instructions
Follow instructions in the following PDF  <br/>  <a href='https://drive.google.com/file/d/1G0uP3qKHtjzrvOY0VZlKbWF_0bi4ytQ4/view?usp=sharing' >Link</a><br/><br/>

Or
<br/><br/>
1. Go to <a href='https://sharemydata.pge.com/myAuthorization/home'>Sharemydata</a><br/>
2. Log in with your Utility Credentials<br/>
3. Input & Select "Gridscape" under "Add new authorization<br/>
4. Click Next, Read over & Verify sharing information, Terms, & Conditions<br/>
5. Scroll down and click Submit.
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label><h4>SCE Authorization</h4></Form.Label><br/>
    
    <Form.Text className="text-muted">
    PG&E ShareMyData Instructions
Follow instructions in the following PDF  <br/>  <a href='https://www.google.com/url?q=https://drive.google.com/file/d/1ssm_6yHS5RO1VQEsepI4kV1uP4eZlL8I/view?usp%3Dsharing&sa=D&source=editors&ust=1644922944057859&usg=AOvVaw0l3NHtH-5uRZXoc5hRtXhg' >Link</a><br/><br/>

Or
<br/><br/>
1. Log In to My Account<br/>
2. Select the Data Sharing tab<br/>
3. Click on the green Authorize a Third Party button<br/>
4. Download and read the Terms and Conditions – If you agree, select the green Continue button<br/>
5. Select the Third Party Vendor of your choice, and continue following the next steps<br/>
<br/>
More details at:<br/>
<a href='https://www.google.com/url?q=https://www.sce.com/residential/rebates-savings/budget-assistant-and-you/Share-My-Data&sa=D&source=editors&ust=1644922944057938&usg=AOvVaw0QLCSOpppQy3VVRQncuSB3' >SCE</a>
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label><h4>SDGE Authorization</h4></Form.Label><br/>
    
    <Form.Text className="text-muted">
1. Go to: <br/>  <a href='https://myaccount.sdge.com/portal/PreLogin/Validate?SaveGreenButton&sa=D&source=editors&ust=1644922944058258&usg=AOvVaw1jsbPIST3cyhMzXmeYcCh0' >Link</a><br/>
2. Login, & follow instructions on website.
</Form.Text>
  </Form.Group>
  <label for="group2" className='PVEV'>Is ShareMyData Acknowledgement completed successfully?</label> 
  {['radio'].map((type) => (
    <div key={`inline-${type}`} className="mb-3">
      <Form.Check
        inline
        label="Yes"
        name="group2"
        type={type}
        id={`inline-${type}-1`}
        required
      />
       <Form.Check
        inline
        label="No"
        name="group2"
        type={type}
        id={`inline-${type}-1`}
        required
      /> 
      </div>
       ))}
        <div className='buttons'>
          <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button'    onClick={()=> {setLgShow(false);setdata2(false)}}>Cancel</button></Tippy>
          <button className='save' type='submit' >Save</button>
        </div>
  </Form>
  </Modal.Body>
            </Modal>
           
           
            <Modal
              size="md"
              show={mdShow}
              onHide={() => setMdShow(false)}
              aria-labelledby="example-modal-sizes-title-md"
              centered
              
              
            >
              <Modal.Header closeButton  onClick={()=> setdata(false)}>
                <Modal.Title id="example-modal-sizes-title-md">
                Upload Data
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
            <Form className='PV-Form' action='#'  noValidate validated={validated} onSubmit={handleSubmit} >
            <Form.Group className="mb-3" >
    <Form.Label>Usage point* <Tippy content='Find this detail written on your meter.'><button className='t'>?</button></Tippy></Form.Label>
    <Form.Control type="text" placeholder="Usage point" className='formcont'  required />
    
  </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
       <Form.Label>Attach Load Data <Tippy content='Fill the template given in right and upload it using button below and please verify that the address in the bill and site address given by you are the same.'><button className='t'>?</button></Tippy></Form.Label><br/>
       <Form.Text className="text-muted">
                  Please provide data for atleast 1 year!**
              </Form.Text><br/>
          <Form.Control  type="file" name='loaddata' defaultValue={loaddata} onChange={(e)=> setLoaddata(e.target.files[0])} multiple required/>
        </Form.Group>
        
        <Form.Group controlId="formFile" className="mb-3">
       <Form.Label>Attach PDF Bills <Tippy content='You can upload more than 1 bill here so please provide bills for atleast 1 year.*'><button className='t'>?</button></Tippy></Form.Label><br/>
       <Form.Text className="text-muted">
                  Please provide data for atleast 1 year!**
              </Form.Text><br/>
          <Form.Control type="file" name='pdfbills' defaultValue={pdfbills} onChange={(e)=> setPDFbills(e.target.files[0])} multiple required/>
        </Form.Group>
          <DataState loadfile={loaddata}/>
            <div className='buttons'>
            <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button'    onClick={()=> {setMdShow(false);setdata(false)}}>Cancel</button></Tippy> 
          <button className='save' type='submit'   >Save</button>
        </div>

            </Form> </Modal.Body>
            </Modal>
           
          </>
        );
      }
    
export default DataModal
