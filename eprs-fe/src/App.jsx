import React, { useState} from 'react'
import './App.css';
import { useQueueState } from 'rooks';

// some constants, why not
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-Api-Key", "omLEeExspff66tddII2Z9iOqonqdra25vSroLKo0");

const raw = "QZTORMTL0606410045"

function requestOptions(queryString) { return {
  method: "POST",
  headers: myHeaders,
  body: JSON.stringify({
    "query": queryString,
  }),
  redirect: "follow"
};
}

function callEPRS(queryString) {
  console.log(queryString);
  return fetch("https://6eybfhhyye.execute-api.ca-central-1.amazonaws.com/default/cnr-eprs-runner", requestOptions(queryString))
      .then((response) => {
        return response.json().then((data) => {
          console.log(data);
          return data;
        }).catch((err) => {
          console.log(err);
        })
      });
}


function MyForm({paper,writePaper}) {
  const [formData, setFormData] = useState({
    operation: 'Q',
    accom: 'Z',
    sCityLower1: 'CLT',
    sCityLower2: 'FOW',
    sCityLower3: 'IRZ',
    eCityLower1: 'DMU',
    eCityLower2: 'CLT',
    eCityLower3: 'CLT',
    sCityUpper1: '2',
    sCityUpper2: '1',
    sCityUpper3: '1',
    eCityUpper1: '1',
    eCityUpper2: '2',
    eCityUpper3: '1',
    numseats: '6',
    trainDigit1: '0',
    trainDigit2: '6',
    trainDigit3: '4',
    carDigit1: '1',
    carDigit2: '0',
    dateDigit1: '0',
    dateDigit2: '0',
    dateDigit3: '2'
  })

  const handleSubmit = (event) => {
    // Start City
    const sCityChar1 = formData.sCityLower1?.[parseInt(formData.sCityUpper1)] || ' ';
    const sCityChar2 = formData.sCityLower2?.[parseInt(formData.sCityUpper2)] || ' ';
    const sCityChar3 = formData.sCityLower3?.[parseInt(formData.sCityUpper3)] || ' ';
    const startCity = sCityChar1 + sCityChar2 + sCityChar3
    // End City
    const eCityChar1 = formData.eCityLower1?.[parseInt(formData.eCityUpper1)] || ' ';
    const eCityChar2 = formData.eCityLower2?.[parseInt(formData.eCityUpper2)] || ' ';
    const eCityChar3 = formData.eCityLower3?.[parseInt(formData.eCityUpper3)] || ' ';
    const endCity = eCityChar1 + eCityChar2 + eCityChar3
    // Train Number
    const trainNum = formData.trainDigit1 + formData.trainDigit2 + formData.trainDigit3
    // Car Number
    const carNum = formData.carDigit1 + formData.carDigit2
    // Date
    const dateNum = formData.dateDigit1 + formData.dateDigit2 + formData.dateDigit3
    const parsedString = formData.operation + formData.accom + startCity + endCity + "0"+ formData.numseats + trainNum + carNum + dateNum

    writePaper(prevPaper => ([
      ...prevPaper.slice(1),
      `${parsedString}`
    ]));
    
    callEPRS(parsedString).then((data) =>{
      var jsonData = data;
      
      writePaper(prevPaper => ([
        ...prevPaper.slice(1),
        `${jsonData}`
      ]));
    });
    
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper1" 
                  value="0" 
                  checked={formData.sCityUpper1 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper1" 
                  value="0" 
                  checked={formData.eCityUpper1 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper2" 
                  value="0" 
                  checked={formData.sCityUpper2 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper2" 
                  value="0" 
                  checked={formData.eCityUpper2 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper3" 
                  value="0" 
                  checked={formData.sCityUpper3 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper3" 
                  value="0" 
                  checked={formData.eCityUpper3 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper1" 
                  value="1" 
                  checked={formData.sCityUpper1 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper2" 
                  value="1" 
                  checked={formData.sCityUpper2 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper3" 
                  value="1" 
                  checked={formData.sCityUpper3 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper1" 
                  value="1" 
                  checked={formData.eCityUpper1 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper2" 
                  value="1" 
                  checked={formData.eCityUpper2 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper3" 
                  value="1" 
                  checked={formData.eCityUpper3 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper1" 
                  value="2" 
                  checked={formData.sCityUpper1 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper2" 
                  value="2" 
                  checked={formData.sCityUpper2 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityUpper3" 
                  value="2" 
                  checked={formData.sCityUpper3 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper1" 
                  value="2" 
                  checked={formData.eCityUpper1 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper2" 
                  value="2" 
                  checked={formData.eCityUpper2 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityUpper3" 
                  value="2" 
                  checked={formData.eCityUpper3 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="blankqty" 
                  value="0" 
                  checked={true} 
                /><span class="mark"></span> 
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="0" 
                  checked={formData.numseats === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="0" 
                  checked={formData.trainDigit1 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="0" 
                  checked={formData.trainDigit2 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="0" 
                  checked={formData.trainDigit3 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="0" 
                  checked={formData.carDigit1 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="0" 
                  checked={formData.carDigit2 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="0" 
                  checked={formData.dateDigit1 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="0" 
                  checked={formData.dateDigit2 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="0" 
                  checked={formData.dateDigit3 === "0" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 0
              </label>
            </td>
          </tr>
          <tr>{/* fourth row */}
            <td></td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="AJ " 
                  checked={formData.sCityLower1 === "AJ " } 
                  onChange={handleChange} 
                /><span class="mark"></span>  AJ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="AJ " 
                  checked={formData.sCityLower2 === "AJ " } 
                  onChange={handleChange} 
                /><span class="mark"></span>  AJ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="AJ " 
                  checked={formData.sCityLower3 === "AJ " } 
                  onChange={handleChange} 
                /><span class="mark"></span>  AJ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="AJ " 
                  checked={formData.eCityLower1 === "AJ " } 
                  onChange={handleChange} 
                /><span class="mark"></span> AJ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="AJ " 
                  checked={formData.eCityLower2 === "AJ " } 
                  onChange={handleChange} 
                /><span class="mark"></span> AJ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="AJ " 
                  checked={formData.eCityLower3 === "AJ " } 
                  onChange={handleChange} 
                /><span class="mark"></span> AJ
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="1" 
                  checked={formData.numseats === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="1" 
                  checked={formData.trainDigit1 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="1" 
                  checked={formData.trainDigit2 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="1" 
                  checked={formData.trainDigit3 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="1" 
                  checked={formData.carDigit1 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="1" 
                  checked={formData.carDigit2 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="1" 
                  checked={formData.dateDigit1 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="1" 
                  checked={formData.dateDigit2 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="1" 
                  checked={formData.dateDigit3 === "1" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 1
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="operation" 
                  value="K" 
                  checked={formData.operation === 'K'} 
                  onChange={handleChange} 
                /><span class="mark"></span> K
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="BKS" 
                  checked={formData.sCityLower1 === "BKS" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  BKS
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="BKS" 
                  checked={formData.sCityLower2 === "BKS" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  BKS
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="BKS" 
                  checked={formData.sCityLower3 === "BKS" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  BKS
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="BKS" 
                  checked={formData.eCityLower1 === "BKS" } 
                  onChange={handleChange} 
                /><span class="mark"></span> BKS
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="BKS" 
                  checked={formData.eCityLower2 === "BKS" } 
                  onChange={handleChange} 
                /><span class="mark"></span> BKS
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="BKS" 
                  checked={formData.eCityLower3 === "BKS" } 
                  onChange={handleChange} 
                /><span class="mark"></span> BKS
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="2" 
                  checked={formData.numseats === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="2" 
                  checked={formData.trainDigit1 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="2" 
                  checked={formData.trainDigit2 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="2" 
                  checked={formData.trainDigit3 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="2" 
                  checked={formData.carDigit1 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="2" 
                  checked={formData.carDigit2 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="2" 
                  checked={formData.dateDigit1 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="2" 
                  checked={formData.dateDigit2 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="2" 
                  checked={formData.dateDigit3 === "2" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 2
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="CLT" 
                  checked={formData.sCityLower1 === "CLT" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  CLT
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="CLT" 
                  checked={formData.sCityLower2 === "CLT" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  CLT
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="CLT" 
                  checked={formData.sCityLower3 === "CLT" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  CLT
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="CLT" 
                  checked={formData.eCityLower1 === "CLT" } 
                  onChange={handleChange} 
                /><span class="mark"></span> CLT
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="CLT" 
                  checked={formData.eCityLower2 === "CLT" } 
                  onChange={handleChange} 
                /><span class="mark"></span> CLT
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="CLT" 
                  checked={formData.eCityLower3 === "CLT" } 
                  onChange={handleChange} 
                /><span class="mark"></span> CLT
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="3" 
                  checked={formData.numseats === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="3" 
                  checked={formData.trainDigit1 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="3" 
                  checked={formData.trainDigit2 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="3" 
                  checked={formData.trainDigit3 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="3" 
                  checked={formData.carDigit1 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="3" 
                  checked={formData.carDigit2 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="3" 
                  checked={formData.dateDigit1 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="3" 
                  checked={formData.dateDigit2 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="3" 
                  checked={formData.dateDigit3 === "3" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 3
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="DMU" 
                  checked={formData.sCityLower1 === "DMU" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  DMU
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="DMU" 
                  checked={formData.sCityLower2 === "DMU" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  DMU
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="DMU" 
                  checked={formData.sCityLower3 === "DMU" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  DMU
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="DMU" 
                  checked={formData.eCityLower1 === "DMU" } 
                  onChange={handleChange} 
                /><span class="mark"></span> DMU
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="DMU" 
                  checked={formData.eCityLower2 === "DMU" } 
                  onChange={handleChange} 
                /><span class="mark"></span> DMU
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="DMU" 
                  checked={formData.eCityLower3 === "DMU" } 
                  onChange={handleChange} 
                /><span class="mark"></span> DMU
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="4" 
                  checked={formData.numseats === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="4" 
                  checked={formData.trainDigit1 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="4" 
                  checked={formData.trainDigit2 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="4" 
                  checked={formData.trainDigit3 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="4" 
                  checked={formData.carDigit1 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="4" 
                  checked={formData.carDigit2 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="4" 
                  checked={formData.dateDigit1 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="4" 
                  checked={formData.dateDigit2 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="4" 
                  checked={formData.dateDigit3 === "4" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 4
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="accom" 
                  value="Y" 
                  checked={formData.accom === 'Y'} 
                  onChange={handleChange} 
                /><span class="mark"></span> Y
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="ENV" 
                  checked={formData.sCityLower1 === "ENV" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  ENV
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="ENV" 
                  checked={formData.sCityLower2 === "ENV" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  ENV
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="ENV" 
                  checked={formData.sCityLower3 === "ENV" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  ENV
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="ENV" 
                  checked={formData.eCityLower1 === "ENV" } 
                  onChange={handleChange} 
                /><span class="mark"></span> ENV
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="ENV" 
                  checked={formData.eCityLower2 === "ENV" } 
                  onChange={handleChange} 
                /><span class="mark"></span> ENV
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="ENV" 
                  checked={formData.eCityLower3 === "ENV" } 
                  onChange={handleChange} 
                /><span class="mark"></span> ENV
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="5" 
                  checked={formData.numseats === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="5" 
                  checked={formData.trainDigit1 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="5" 
                  checked={formData.trainDigit2 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="5" 
                  checked={formData.trainDigit3 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="5" 
                  checked={formData.carDigit1 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="5" 
                  checked={formData.carDigit2 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="5" 
                  checked={formData.dateDigit1 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="5" 
                  checked={formData.dateDigit2 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="5" 
                  checked={formData.dateDigit3 === "5" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 5
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="operation" 
                  value="O" 
                  checked={formData.operation === 'O'} 
                  onChange={handleChange} 
                /><span class="mark"></span> O
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="FOW" 
                  checked={formData.sCityLower1 === "FOW" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  FOW
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="FOW" 
                  checked={formData.sCityLower2 === "FOW" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  FOW
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="FOW" 
                  checked={formData.sCityLower3 === "FOW" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  FOW
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="FOW" 
                  checked={formData.eCityLower1 === "FOW" } 
                  onChange={handleChange} 
                /><span class="mark"></span> FOW
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="FOW" 
                  checked={formData.eCityLower2 === "FOW" } 
                  onChange={handleChange} 
                /><span class="mark"></span> FOW
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="FOW" 
                  checked={formData.eCityLower3 === "FOW" } 
                  onChange={handleChange} 
                /><span class="mark"></span> FOW
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="6" 
                  checked={formData.numseats === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="6" 
                  checked={formData.trainDigit1 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="6" 
                  checked={formData.trainDigit2 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="6" 
                  checked={formData.trainDigit3 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="6" 
                  checked={formData.carDigit1 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="6" 
                  checked={formData.carDigit2 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="6" 
                  checked={formData.dateDigit1 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="6" 
                  checked={formData.dateDigit2 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="6" 
                  checked={formData.dateDigit3 === "6" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 6
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="GPX" 
                  checked={formData.sCityLower1 === "GPX" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  GPX
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="GPX" 
                  checked={formData.sCityLower2 === "GPX" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  GPX
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="GPX" 
                  checked={formData.sCityLower3 === "GPX" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  GPX
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="GPX" 
                  checked={formData.eCityLower1 === "GPX" } 
                  onChange={handleChange} 
                /><span class="mark"></span> GPX
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="GPX" 
                  checked={formData.eCityLower2 === "GPX" } 
                  onChange={handleChange} 
                /><span class="mark"></span> GPX
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="GPX" 
                  checked={formData.eCityLower3 === "GPX" } 
                  onChange={handleChange} 
                /><span class="mark"></span> GPX
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="7" 
                  checked={formData.numseats === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="7" 
                  checked={formData.trainDigit1 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="7" 
                  checked={formData.trainDigit2 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="7" 
                  checked={formData.trainDigit3 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="7" 
                  checked={formData.carDigit1 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="7" 
                  checked={formData.carDigit2 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="7" 
                  checked={formData.dateDigit1 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="7" 
                  checked={formData.dateDigit2 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="7" 
                  checked={formData.dateDigit3 === "7" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 7
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="operation" 
                  value="Q" 
                  checked={formData.operation === 'Q'} 
                  onChange={handleChange} 
                /><span class="mark"></span> Q
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="HQY" 
                  checked={formData.sCityLower1 === "HQY" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  HQY
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="HQY" 
                  checked={formData.sCityLower2 === "HQY" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  HQY
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="HQY" 
                  checked={formData.sCityLower3 === "HQY" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  HQY
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="HQY" 
                  checked={formData.eCityLower1 === "HQY" } 
                  onChange={handleChange} 
                /><span class="mark"></span> HQY
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="HQY" 
                  checked={formData.eCityLower2 === "HQY" } 
                  onChange={handleChange} 
                /><span class="mark"></span> HQY
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="HQY" 
                  checked={formData.eCityLower3 === "HQY" } 
                  onChange={handleChange} 
                /><span class="mark"></span> HQY
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="8" 
                  checked={formData.numseats === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="8" 
                  checked={formData.trainDigit1 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="8" 
                  checked={formData.trainDigit2 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="8" 
                  checked={formData.trainDigit3 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="8" 
                  checked={formData.carDigit1 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="8" 
                  checked={formData.carDigit2 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="8" 
                  checked={formData.dateDigit1 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="8" 
                  checked={formData.dateDigit2 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="8" 
                  checked={formData.dateDigit3 === "8" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 8
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="operation" 
                  value="R" 
                  checked={formData.operation === 'R'} 
                  onChange={handleChange} 
                /><span class="mark"></span> R
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="accom" 
                  value="Z" 
                  checked={formData.accom === 'Z'} 
                  onChange={handleChange} 
                /><span class="mark"></span> Z
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="IRZ" 
                  checked={formData.sCityLower1 === "IRZ" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  IRZ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="IRZ" 
                  checked={formData.sCityLower2 === "IRZ" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  IRZ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="IRZ" 
                  checked={formData.sCityLower3 === "IRZ" } 
                  onChange={handleChange} 
                /><span class="mark"></span>  IRZ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="IRZ" 
                  checked={formData.eCityLower1 === "IRZ" } 
                  onChange={handleChange} 
                /><span class="mark"></span> IRZ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="IRZ" 
                  checked={formData.eCityLower2 === "IRZ" } 
                  onChange={handleChange} 
                /><span class="mark"></span> IRZ
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="IRZ" 
                  checked={formData.eCityLower3 === "IRZ" } 
                  onChange={handleChange} 
                /><span class="mark"></span> IRZ
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="numseats" 
                  value="9" 
                  checked={formData.numseats === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit1" 
                  value="9" 
                  checked={formData.trainDigit1 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit2" 
                  value="9" 
                  checked={formData.trainDigit2 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="trainDigit3" 
                  value="9" 
                  checked={formData.trainDigit3 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit1" 
                  value="9" 
                  checked={formData.carDigit1 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="carDigit2" 
                  value="9" 
                  checked={formData.carDigit2 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td></td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit1" 
                  value="9" 
                  checked={formData.dateDigit1 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit2" 
                  value="9" 
                  checked={formData.dateDigit2 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
            <td>
              <label class="mark-sense">
                <input 
                  type="radio" 
                  name="dateDigit3" 
                  value="9" 
                  checked={formData.dateDigit3 === "9" } 
                  onChange={handleChange} 
                /><span class="mark"></span> 9
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}


export default function MyApp() {
  const location = 'MTL';
  const [paper,writePaper] = useState(['','','','','']);

  return (
    <div>
      <div>
        <h1>CN Electronic Passenger Reservation System</h1>
        <a href='https://github.com/coneypylon/cnr-reservations-1967'>View the code for the underlying system!</a>
      </div>
      <div>
        <h2>punchcard</h2>
        <MyForm paper={paper} writePaper={writePaper}/>
      </div>
      <div className="centering-div">
        <h2>teleprinter</h2><br />
        <div className="bordered-div">
        {paper.map((item, index) => (
        <span key={index}>{item}<br /></span>
        ))}
        </div>
      </div>
    </div>
  );
}
