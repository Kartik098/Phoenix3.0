import React,{ useEffect }  from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './solar.css';
import Navbar from '../navbar';
import Form from 'react-bootstrap/Form'
import axios from 'axios';

function Solarsize() {
  
  
  const getCompanys = async ()=>{
    const res = await axios.get("https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=E85,ELEC&state=CA&limit=2&api_key=TREHn2q72pWbK7lHsQz8jpbxV8tbuLGdnJ4rW20n")
    const data = res.data
    console.log(data)
    
    
}
useEffect(()=>{
  getCompanys();
  
}, [])
  return (

<>

<div class name="App">
  <Navbar/>
</div>

<div className ="solarcalci">
    
    <Form.Group className="mb-3" >
    <Form.Label>Company Name*</Form.Label>
    <Form.Control type="text" placeholder="e.g Gridscape Solutions" className='formcont'  required />
    
  </Form.Group>
  


<div   class name ="row mb-3 ">
    <div class="form-group">
  <label for="sel1"> Site Name : </label>
  <select class="form-control" id="autoSizingSelect">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
  </select>
</div>
</div>

<div   class name ="row mb-3">
    <div class="form-group">
  <label for="sel1"> Meter : </label>
  <select class="form-control" id="autoSizingSelect">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
  </select>
</div>
</div>


<br/>
<div   class name ="Select-load">
<div className='text-center'>

<div class="interval text-left custom-control custom-radio">

<label for="sel1" class="Solarload text-center"  >  Select Load  </label>

    
  <input  class name="form-check-input " type="radio"   id="Radio"/>
  <label  class name="form-check-label" for="flexRadioDefault2">
      Interval Data
  </label>
    
</div>
</div>
</div>
</div>
<div class="mt-3">
  
  <table class="table table-bordered table">
           
    <thead>
      <tr className='row1'>
      <th className="select">select</th>
        <th>Year</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Load Data</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        <div>
                  <input type="checkbox" class="form-check-input" id="customCheck1"/>
                  <label  for="customCheck1 "></label>
              </div>
 

        </td>
        <td>2018</td>
        <td>24/01</td>
        <td>09/07</td>
        <td>189</td>
        </tr>
      <tr>
      <td className="select">
        <div>
                  <input type="checkbox" class="form-check-input" id="Check1"/>
                  <label  for="customCheck1"></label>
              </div>
             
    

        </td>
        <td>2019</td>
        <td>01/01</td>
        <td>31/12</td>
        <td>249</td>
        </tr>
      
    </tbody>
  </table>
</div>



<div class="Button">
<div className='text-center'>
<Button type="button" class="btn btn-primary btn-lg calculatebutton text-center">Calculate</Button>
  
</div>
 </div>


<div className ="solar-size">
  
  <div class="form-group">
  <label>Solar Size </label>
  

 <input type="text" class="form-contol form-group "></input> 

  </div>
</div>

</>
  

    );
}

export default Solarsize;
