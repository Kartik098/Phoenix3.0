import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import './rsim.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './navbar';
import Button from 'react-bootstrap/Button'
import { parse } from 'papaparse';
function Rsim() {
  const [csvdata, setcsvdata] = useState([]);
  const [meter1, setmeter1] = useState([]);
  useEffect(()=>{
    searchMeter();
    // console.log(meter1)
  },[csvdata]);
  
  const searchMeter = () =>{
    const reg = /^[1-9]/
    const text = /Facility\s[\d]/ ;
    
    if(csvdata.data){
      var meter = []
      for(var i = 0;i < (csvdata.data).length;i++){
        for(var j = 0;j < (csvdata.data[i]).length;j++){
          if(csvdata.data[i][j].search(text) != -1){
            // console.log(csvdata.data[i][0])
            
            meter.push(csvdata.data[i][0])
          
            
            
          }
        }
       
      }
      setmeter1(meter)  
    }
    else{
      console.log("No facility found")
    }
  }

  <script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>
  // var checkbox = document.querySelectorAll(".check")
  const [ battery, setBattery] = useState([{battery:"battery1", key:"1"}, {battery:"battery2", key:"2"}]);
  const [highlighted, setHighlighted] = useState(false)
  var newbattery = {battery:"battery3", key:"3"}
  // var [...battery, newbattery];
  
  function handleBattery(){
    setBattery(prev =>[...prev, newbattery])

   
  }
 
   
  return (
    <>
    <div>
      {/* {console.log(meter1)} */}
        <Navbar />
        {/* <div>
          <form action='/company/simple/' method='get'>
            <button>do it</button>
          </form>
        </div> */}
        <Form className='rsimform'>
        <div className='uploadfile'>
        <Form.Group controlId="formFile" className="mb-3" id='upload_etb'>
       <Form.Label className='etblabel'>Upload ETB File </Form.Label><br/>
       <br/>
          <Form.Control  type="file" 
          onChange={(e)=>{
            // console.log(e.target.files)
            Array.from(e.target.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
                const text = await file.text()
                const result = parse(text)
                // console.log(result)
                setcsvdata(result);
          })}}
          onDragEnter={(e)=>{
            setHighlighted(true)
          }}
          onDragLeave={(e)=>{
            setHighlighted(false)
          }}
          OnDragOver={(e)=>{
            e.preventDefault();
          }}
          onDrop={(e)=>{
            setHighlighted(false)
            Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
                const text = await file.text()
                const result = parse(text)
                // console.log(result)
                setcsvdata(result)
          })}}  multiple required/>
        </Form.Group>
        </div>
        
        <div className='boxes'>
        <div className='container'>
          {/* <br/><br/><br/><br/><br/>     */}
          <div className='heading'><h4 className='meter-title'>Selected meters</h4></div>
          <br/>
          {console.log(meter1)}
         {meter1.map((single_meter)=>{
           return(<div className='checkboxes'>
           <label>{single_meter}</label>
           <input type="checkbox"/>
           </div>)
         })}
      
         
       
      
   
    
    </div>
    {/* <div className='container'>       
    
    <h4 className='meter-title'>Select Meter Elements</h4>
        
        {[ 'checkbox'].map((type) => (
         <div key={`inline-${type}`} className="mb-3 checkbox-group required" id="checkbox">
           
      <Form.Check
        inline
        label="Load"
        name="pv-type"
        className='check'
        data-key="12"
        data-battery={JSON.stringify("kartik")}
        // onChange={handleBattery} 
        type={type}
        id={`inline-${type}-3`}
       
      /> <br/>
       <Form.Check
        inline
        label="PV"
        name="pv-type"
        data-key="12"
        className='check'
        data-battery={newbattery}
        onClick={()=>handleBattery()}
        type={type}
        id={`inline-${type}-3`}
      /> <br/>
      
       <Form.Check
        inline
        label="BESS"
        name="pv-type"
        // onClick={handleBattery}
        className='check'
        type={type}
        value={{battery:"kjhlk", key:"kjhlkj"}}
        data-key="12"
        data-battery={JSON.stringify(newbattery)}
        id={`inline-${type}-3`}
      /> 
      </div>
        ))}
      
   
    
    </div> */}
    <div className='container'> 
    
    <div className='heading2'><h4 className='meter-title'>Sizes</h4></div>
    <br/>
    
    <Form.Group className="mb-3 loadinput" >
    <Form.Label>BESS:</Form.Label>
    <Form.Control type="text" placeholder="BESS" className='textinput'/>
  </Form.Group>
  <Form.Group className="mb-3 loadinput" >
    <Form.Label>PV:</Form.Label>
    <Form.Control type="text" placeholder="PV" className='textinput'/>
  </Form.Group>
  <Form.Group className="mb-3 loadinput" >
    <Form.Label>Annual Load:</Form.Label>
    <Form.Control type="text" placeholder="Annual Load" className='textinput'/>
  </Form.Group>
  <Form.Group className="mb-3 loadinput" >
    <Form.Label>Annual PV Generation:</Form.Label>
    <Form.Control type="text" placeholder="Annual PV Generation" className='textinput'/>
  </Form.Group>
  </div>
        </div>
        <div className='boxes'>
        <div className='container'>
        <div className='heading3'><h4 className='meter-title'>Battery-info</h4></div>
         <Form.Group className="mb-3 loadinput" >
    <Form.Label>Battery rating</Form.Label>
    <Form.Control type="text" placeholder="Battery rating" className='textinput'/>
  </Form.Group>
  <Form.Group className="mb-3 loadinput" >
    <Form.Label>Battery reserve</Form.Label>
    <Form.Control type="text" placeholder="Battery reserve" className='textinput'/>
  </Form.Group>
          </div>
        </div>
        <br/>
        <h4 className='meter-title2'>WorkBench</h4>
        <section className='edit_values_section'>
      
 <div className='element_section'>
 <Form.Group className="mb-3" >
    <Form.Label> Load:</Form.Label>
    <Form.Control type="text" placeholder="Load" className='textinput2'/>
  </Form.Group>
 </div>
 <div className='element_section'>
 <Form.Group className="mb-3" >
    <Form.Label>PV(KW) Rating:</Form.Label>
    <Form.Control type="text" placeholder="PV(KW) Rating" className='textinput2'/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Annual PV Generation:</Form.Label>
    <Form.Control type="text" placeholder="Annual PV Generation" className='textinput2'/>
  </Form.Group>
 </div>
 <div className='element_section'>
 <Form.Group className="mb-3" >
    <Form.Label>BESS KWH:</Form.Label>
    <Form.Control type="text" placeholder="BESS KWH" className='textinput2'/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>BESS KW:</Form.Label>
    <Form.Control type="text" placeholder="BESS KW" className='textinput2'/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>BESS Reserve:</Form.Label>
    <Form.Control type="text" placeholder="BESS Reserve" className='textinput2'/>
  </Form.Group>
 </div>

  
        </section>
        <br/>
        <h4 className='meter-title2'>Scale the meter elements(%)</h4>
        <section className='set_values'>
         
        <div className='load_section'>
        <Form.Group className="mb-3" >
    <Form.Label>Load:</Form.Label>
    <Form.Control type="number" placeholder="100" defaultValue={100} step="10"/>
  </Form.Group>
        </div>
        <div className='PV_section'>
        <Form.Group className="mb-3" >
    <Form.Label>PV:</Form.Label>
    <Form.Control type="number" placeholder="100" defaultValue={100} step="10"/>
  </Form.Group>
        </div>

        <div className='BESS_section'>
        <Form.Group className="mb-3" >
    <Form.Label>BESS:</Form.Label>
    <Form.Control type="number" placeholder="100" defaultValue={100} step="10"/>
  </Form.Group>
        </div>
        </section>
        <br/>
        <section className='buttons2'>
        <div className="d-grid gap-2 large">
    <Button variant="primary" size="lg">
      Select Output file
    </Button>{' '}
    <Button variant="secondary" size="lg">
      Save Output file
    </Button>
  </div>
  <div className="d-grid gap-2 extra-large">
  <Button variant="secondary" size="lg" className='simulation_button'>
     Run simulation
    </Button>
    </div>
        </section>
    </Form>
    </div>
    </>
  )
}

export default Rsim