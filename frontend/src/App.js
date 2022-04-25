import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {

    function handleNowTrendingClick(){
    fetch('http://localhost:8000/now_trending')
  .then(response => response.json())
  .then(data => console.log(data));
    }

  const [Hashtag] = useState([{}])
  const [] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/now_trending')
      .then(res => {
        Hashtag(res.data)
      })
  });


  return (
    <div className="App">
    Melboure - the most liveable city?
    <div className = "App list-group-item justify-content-center align-items-center mx-auto" style = {{"width":"400px", 
    "backgroundColor":"white", "marginTop":"15px"}}>
    <h1 className = "card text-white bg-dark mb-1" styleName = "max-width: 20rem;">Melbourne</h1>

    <div className="card-body">
    <h5 className="card text-white bg-dark mb-3">Liveability Categories</h5>
    <h6 className="card text-white bg-dark mb-3"> select the liveanility category to explore</h6>
      <span className="btn-group-vertical">
        <button className="btn btn-outline-dark mx-2 mb-2" style={{"borderRadius":"50px", "font-weight":"bold"}} onClick = {handleNowTrendingClick} >Now Trending</button>
        <button className="btn btn-outline-dark mx-2 mb-2" style={{"borderRadius":"50px", "font-weight":"bold"}} >Opportunity</button>
        <button className="btn btn-outline-dark mx-2 mb-2" style={{"borderRadius":"50px", "font-weight":"bold"}} >Housing</button>
        <button className="btn btn-outline-dark mx-2 mb-2" style={{"borderRadius":"50px", "font-weight":"bold"}} >Transportation</button>
        <button className="btn btn-outline-dark mx-2 mb-2" style={{"borderRadius":"50px", "font-weight":"bold"}} >Cost of Living</button>
      </span>
    </div>
    <h6 className="card text-dark bg-warning py-1 mb-0">Copyright 2022, All rights reserved &copy;</h6>
    </div>
    </div>
  );
}

export default App;
