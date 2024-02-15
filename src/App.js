import React from 'react';
import { useState } from 'react';
import './App.css';
import Content from './components/content.js'



function App() {
  const [loader, setLoader] = useState(false);

  return (
   
    <div className="container-fluid m-0 p-0 d-flex justify-content-center ">
      <img src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg" className='bg_Image col-xxl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12 p-0 m-0'/>
  
      <Content setLoader ={setLoader}/>
    
    </div>
  );
}

export default App;
