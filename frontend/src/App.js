import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Chart from './charts/Chart';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import wordCloud from 'highcharts-wordcloud';
require("highcharts/modules/wordcloud")(Highcharts);




function App() {

  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.',
    lines = text.split(/[,]+/g),
    data1 = lines.reduce((arr, word) => {
      let obj = Highcharts.find(arr, obj => obj.name === word);
      if (obj) {
        obj.weight += 1;
      } else {
        obj = {
          name: word,
          weight: 1
        };
        arr.push(obj);
      }
      return arr;
    }, []);

  const testChart = {
    title: {
      text: 'Peer Survey Word Cloud'
    },
    series: [{
      type: 'wordcloud',
      placementStrategy: 'random',
      data: data1,
      name: 'Frequency'
    }],

  }

  function handleNowTrendingClick() {
    // fetch('http://localhost:8000/now_trending')
    //   .then(response => response.json())
    //   .then(data => console.log(data));
    // console.log('asdf');




    // return (
    //   // <div>
    //   //   <h1>asdfasdf</h1>
    //   // </div>
    //   // <div>
    //   //   <h1>asdfasdf</h1>
    //   //   {/* <HighchartsReact highcharts={Highcharts} options={testChart} /> */}
    //   //   <HighchartsReact
    //   //     highcharts={Highcharts}
    //   //     options={testChart} />
    //   // </div>
    // )

  }

  // const [Hashtag] = useState([{}])
  // const [] = useState('')

  // useEffect(() => {
  //   axios.get('http://localhost:8000/now_trending')
  //     .then(res => {
  //       Hashtag(res.data)
  //     })
  // });


  return (
    
    <div className="App">
      Melboure - the most liveable city?
      <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{
        "width": "400px",
        "backgroundColor": "white", "marginTop": "15px"
      }}>
        <h1 className="card text-white bg-dark mb-1" styleName="max-width: 20rem;">Melbourne</h1>
        <Router>
          <Sidebar />
          <Routes>
            <Route exact path="/popular" element = {<Chart />} />
        </Routes>
          
        </Router>
        <div className="card-body">
          <h5 className="card text-white bg-dark mb-3">Liveability Categories</h5>
          <h6 className="card text-white bg-dark mb-3"> select the liveanility category to explore</h6>
          <span className="btn-group-vertical">
            <button className="btn btn-outline-dark mx-2 mb-2" style={{ "borderRadius": "50px", "font-weight": "bold" }} onClick={handleNowTrendingClick} >Now Trending</button>
            <button className="btn btn-outline-dark mx-2 mb-2" style={{ "borderRadius": "50px", "font-weight": "bold" }} >Opportunity</button>
            <button className="btn btn-outline-dark mx-2 mb-2" style={{ "borderRadius": "50px", "font-weight": "bold" }} >Housing</button>
            <button className="btn btn-outline-dark mx-2 mb-2" style={{ "borderRadius": "50px", "font-weight": "bold" }} >Transportation</button>
            <button className="btn btn-outline-dark mx-2 mb-2" style={{ "borderRadius": "50px", "font-weight": "bold" }} >Cost of Living</button>
          </span>
        </div>
        <h6 className="card text-dark bg-warning py-1 mb-0">Copyright 2022, All rights reserved &copy;</h6>
      </div>
    </div>
  );
}

export default App;
