import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import "bootstrap/dist/css/bootstrap.min.css";
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react'
import axios from 'axios';

function PVModal() {
   
  const [mdShow, setMdShow] = useState(false);
  const [PVSelect,setPV] = useState(false);
  const [validated, setValidated] = useState(false); 
  const [existingpvsize, setExistingpvsize] = useState("")
  const [existingpvtype, setExistingPVtype] = useState([]);
  const [solarGenerationdata, setsolarGenerationdata] = useState();
  const [systemSLD, setSystemSLD] = useState();
  const PostData = async (e) => {  
    e.preventDefault();
    setMdShow(false);
    setPV(true);
    let FormField = new FormData()
    
    FormField.append('existingpvsize',existingpvsize)
    FormField.append('existingsitetype', existingpvtype)
    FormField.append('solarGenerationdata',solarGenerationdata)
    FormField.append('systemSLD', systemSLD)
    await axios({
      method:'post',
      url: 'http://127.0.0.1:8000/existing_pv/',
      data:FormField,
     
      
    }).then((res) => {
      console.log(res.data)
     
      console.log(res.data);
      
    })
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      setMdShow(true)
      event.stopPropagation();
    } else{
      setMdShow(false)
      setPV(true)
    }
    
    setValidated(true);
   
     
  };
  function handlesitetype(event){
     
    setExistingPVtype((oldArray)=>
      [...oldArray, event.target.value]);
  
   console.log(existingpvtype)
  }
  return (
    
    <>
        {[ 'radio'].map((type) => (
         <div key={`inline-${type}`} className="mb-3" >
      <Form.Check
        inline
        label="Yes"
        name="group2"
       
        onChange={()=>{ setMdShow(true);}}
        checked={PVSelect === true}
        
        type={type}
        id={`inline-${type}-3`} 
      />
       <Form.Check
        inline
        label="No"
        name="group2"
      
        type={type}
        id={`inline-${type}-4`}
        
      /> 
      </div>
        ))}
        
          <Modal
        size="md"
        show={mdShow}
        onHide={() => setMdShow(false)}
        aria-labelledby="example-modal-sizes-title-md"
      >
        <Modal.Header closeButton onClick={()=>setPV(0)}>
          <Modal.Title id="example-modal-sizes-title-md">
           PV Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form enctype="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Existing PV size</Form.Label>
    <Form.Control type="text" placeholder="Solar PV Size(kW)" name="existingpvsize" value={existingpvsize} onChange={(e)=>setExistingpvsize(e.target.value)} required />
   
  </Form.Group>
  <label htmlFor="group3">Existing PV types</label>
        {[ 'checkbox'].map((type) => (
         <div key={`inline-${type}`} className="mb-3">
           
      <Form.Check
        inline
        label="Carport"
        name="existingpvtype"
        value="Carpot"
        onChange={handlesitetype}
        type={type}
        id={`inline-${type}-3`}
        required
      /> <br/>
       <Form.Check
        inline
        label="Rooftop"
        value="Rooftop"
        onChange={handlesitetype}
        name="existingpvtype"
        type={type}
        id={`inline-${type}-3`}
      /> <br/>
       <Form.Check
        inline
        label="GroundMount"
        name="existingpvtype"
        onChange={handlesitetype}
        value="Rooftop"
        type={type}
        id={`inline-${type}-3`}
      /> 
      </div>
        ))}
  <Form.Group controlId="formFile" className="mb-3">
       <Form.Label>Attach Solar Generation Data <Tippy content='Your Solar generation data of atleast 1 year*'><button className='t'>?</button></Tippy></Form.Label>
          <Form.Control type="file" accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name="solarGenerationdata" value={solarGenerationdata} onChange={(e)=> setsolarGenerationdata(e.target.value)} multiple/>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
       <Form.Label>Attach System SLD</Form.Label>
          <Form.Control type="file" accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name="systemSLD" value={systemSLD} onChange={(e)=> setSystemSLD(e.target.value)} multiple />
        </Form.Group>
       
        <div className='buttons'>
        <Tippy content='Warning!: Your info is not saved if you press cancel all your info will be gone!'><button className='cancel' type='button' onClick={()=>{setMdShow(false);setPV(0)}}>Cancel</button></Tippy>
          
          <button className='save' type='submit' onClick={PostData}>Save</button>
        </div>
</Form>
        </Modal.Body>
      </Modal>
    
    </>
  )
}

export default PVModal
