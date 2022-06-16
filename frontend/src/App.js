import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './Pages/signup';

import './home.css'
import Login from './Pages/login';
import IntakeModal from './components/Modals/IntakeModal';
import CompanyDetail from './components/ShowModule/CompanyDetail';
import Rsim from './components/rsim';
import UpdateCompany from './components/UpdateModule/updateCompany';
import ShowCompany from './components/ShowModule/ShowCompany';
import Solarsize from './components/Modals/solar';
import { DataContext } from './components/Modals/dataModal';
import { DataState } from './components/Modals/dataState';

  
const App = () => {
  const [ inputValue, setInputvalue] = useState("")
  const [token, setToken] = useState('');
  const userLogin = (tok)=>{
    setToken(tok);
      console.log(token)
  }
  const handleChange = (new_value) =>{
    setInputvalue(new_value)
    console.log(inputValue)
  }
  return (
    <>
    <DataState>
      {console.log(DataState)}
    <Router>
    <img className='logo' src="/images/gshlogo.jpg" alt='logo is not available'/>
   <Routes>

    <Route path="/signup" exact element={<Signup />}  />
    <Route path="/login" exact element={<Login userLogin={userLogin} />}  />
    
    <Route path="/companys/" exact element={<IntakeModal inputValue={handleChange} />}  />
    <Route path="/:id/update" exact element={<UpdateCompany />  }  />
    <Route path="/solarcalculator" exact element={<Solarsize />}  />
    <Route path="/" exact element={<ShowCompany />}  />
    <Route path="/:id/" exact element={<CompanyDetail inputValue={handleChange}/>} />
    <Route path="/rsim" exact element={<Rsim/>}/>
   </Routes>
      
    
  </Router>
  </DataState>
  </>
  )
};


export default App;
