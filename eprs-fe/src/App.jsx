import React, { useState } from 'react'

// some constants, why not
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-Api-Key", "");

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
  return fetch("", requestOptions(queryString))
      .then((response) => {
        return response.json().then((data) => {
          console.log(data);
          return data;
        }).catch((err) => {
          consoles.log(err);
        })
      });
}

function MyButton() {
  function handleClick() {
    callEPRS(raw).then((data) =>{
      var jsonData = data;
    });
    };
  return (
    <button onClick={handleClick}>
      I'm a button
    </button>
  );
}

function MyForm() {
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
    trainNum: '064',
    carNum: '10',
    dateNum: '045'
  })

  const handleSubmit = (event) => {
    const sCityChar1 = formData.sCityLower1?.[parseInt(formData.sCityUpper1)] || ' ';
    const eCityChar1 = formData.eCityLower1?.[parseInt(formData.eCityUpper1)] || ' ';
    const sCityChar2 = formData.sCityLower2?.[parseInt(formData.sCityUpper2)] || ' ';
    const eCityChar2 = formData.eCityLower2?.[parseInt(formData.eCityUpper2)] || ' ';
    const sCityChar3 = formData.sCityLower3?.[parseInt(formData.sCityUpper3)] || ' ';
    const eCityChar3 = formData.eCityLower3?.[parseInt(formData.eCityUpper3)] || ' ';
    const parsedString = formData.operation + formData.accom + sCityChar1 + sCityChar2 + sCityChar3 + eCityChar1 + eCityChar2 + eCityChar3 + "0"+ formData.numseats + formData.trainNum + formData.carNum + formData.dateNum
    
    callEPRS(parsedString).then((data) =>{
      var jsonData = data;
      alert(`EPRS returned: ${jsonData}`);
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
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper1" 
                  value="0" 
                  checked={formData.sCityUpper1 === "0" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper1" 
                  value="0" 
                  checked={formData.eCityUpper1 === "0" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper2" 
                  value="0" 
                  checked={formData.sCityUpper2 === "0" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper2" 
                  value="0" 
                  checked={formData.eCityUpper2 === "0" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper3" 
                  value="0" 
                  checked={formData.sCityUpper3 === "0" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper3" 
                  value="0" 
                  checked={formData.eCityUpper3 === "0" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper1" 
                  value="1" 
                  checked={formData.sCityUpper1 === "1" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper2" 
                  value="1" 
                  checked={formData.sCityUpper2 === "1" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper3" 
                  value="1" 
                  checked={formData.sCityUpper3 === "1" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper1" 
                  value="1" 
                  checked={formData.eCityUpper1 === "1" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper2" 
                  value="1" 
                  checked={formData.eCityUpper2 === "1" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper3" 
                  value="1" 
                  checked={formData.eCityUpper3 === "1" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper1" 
                  value="2" 
                  checked={formData.sCityUpper1 === "2" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper2" 
                  value="2" 
                  checked={formData.sCityUpper2 === "2" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityUpper3" 
                  value="2" 
                  checked={formData.sCityUpper3 === "2" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper1" 
                  value="2" 
                  checked={formData.eCityUpper1 === "2" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper2" 
                  value="2" 
                  checked={formData.eCityUpper2 === "2" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityUpper3" 
                  value="2" 
                  checked={formData.eCityUpper3 === "2" } 
                  onChange={handleChange} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="blankqty" 
                  value="0" 
                  checked={true} 
                /> 
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="0" 
                  checked={formData.numseats === "0" } 
                  onChange={handleChange} 
                /> 0
              </label>
            </td>
          </tr>
          <tr>{/* fourth row */}
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="AJ " 
                  checked={formData.sCityLower1 === "AJ " } 
                  onChange={handleChange} 
                />  AJ
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="AJ " 
                  checked={formData.sCityLower2 === "AJ " } 
                  onChange={handleChange} 
                />  AJ
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="AJ " 
                  checked={formData.sCityLower3 === "AJ " } 
                  onChange={handleChange} 
                />  AJ
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="AJ " 
                  checked={formData.eCityLower1 === "AJ " } 
                  onChange={handleChange} 
                /> AJ
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="AJ " 
                  checked={formData.eCityLower2 === "AJ " } 
                  onChange={handleChange} 
                /> AJ
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="AJ " 
                  checked={formData.eCityLower3 === "AJ " } 
                  onChange={handleChange} 
                /> AJ
              </label>
            </td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="1" 
                  checked={formData.numseats === "1" } 
                  onChange={handleChange} 
                /> 1
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="operation" 
                  value="K" 
                  checked={formData.operation === 'K'} 
                  onChange={handleChange} 
                /> K
              </label>
            </td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="BKS" 
                  checked={formData.sCityLower1 === "BKS" } 
                  onChange={handleChange} 
                />  BKS
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="BKS" 
                  checked={formData.sCityLower2 === "BKS" } 
                  onChange={handleChange} 
                />  BKS
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="BKS" 
                  checked={formData.sCityLower3 === "BKS" } 
                  onChange={handleChange} 
                />  BKS
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="BKS" 
                  checked={formData.eCityLower1 === "BKS" } 
                  onChange={handleChange} 
                /> BKS
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="BKS" 
                  checked={formData.eCityLower2 === "BKS" } 
                  onChange={handleChange} 
                /> BKS
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="BKS" 
                  checked={formData.eCityLower3 === "BKS" } 
                  onChange={handleChange} 
                /> BKS
              </label>
            </td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="2" 
                  checked={formData.numseats === "2" } 
                  onChange={handleChange} 
                /> 2
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="CLT" 
                  checked={formData.sCityLower1 === "CLT" } 
                  onChange={handleChange} 
                />  CLT
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="CLT" 
                  checked={formData.sCityLower2 === "CLT" } 
                  onChange={handleChange} 
                />  CLT
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="CLT" 
                  checked={formData.sCityLower3 === "CLT" } 
                  onChange={handleChange} 
                />  CLT
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="CLT" 
                  checked={formData.eCityLower1 === "CLT" } 
                  onChange={handleChange} 
                /> CLT
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="CLT" 
                  checked={formData.eCityLower2 === "CLT" } 
                  onChange={handleChange} 
                /> CLT
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="CLT" 
                  checked={formData.eCityLower3 === "CLT" } 
                  onChange={handleChange} 
                /> CLT
              </label>
            </td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="3" 
                  checked={formData.numseats === "3" } 
                  onChange={handleChange} 
                /> 3
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="DMU" 
                  checked={formData.sCityLower1 === "DMU" } 
                  onChange={handleChange} 
                />  DMU
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="DMU" 
                  checked={formData.sCityLower2 === "DMU" } 
                  onChange={handleChange} 
                />  DMU
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="DMU" 
                  checked={formData.sCityLower3 === "DMU" } 
                  onChange={handleChange} 
                />  DMU
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="DMU" 
                  checked={formData.eCityLower1 === "DMU" } 
                  onChange={handleChange} 
                /> DMU
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="DMU" 
                  checked={formData.eCityLower2 === "DMU" } 
                  onChange={handleChange} 
                /> DMU
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="DMU" 
                  checked={formData.eCityLower3 === "DMU" } 
                  onChange={handleChange} 
                /> DMU
              </label>
            </td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="4" 
                  checked={formData.numseats === "4" } 
                  onChange={handleChange} 
                /> 4
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="accom" 
                  value="Y" 
                  checked={formData.accom === 'Y'} 
                  onChange={handleChange} 
                /> Y
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower1" 
                  value="ENV" 
                  checked={formData.sCityLower1 === "ENV" } 
                  onChange={handleChange} 
                />  ENV
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower2" 
                  value="ENV" 
                  checked={formData.sCityLower2 === "ENV" } 
                  onChange={handleChange} 
                />  ENV
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="sCityLower3" 
                  value="ENV" 
                  checked={formData.sCityLower3 === "ENV" } 
                  onChange={handleChange} 
                />  ENV
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower1" 
                  value="ENV" 
                  checked={formData.eCityLower1 === "ENV" } 
                  onChange={handleChange} 
                /> ENV
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower2" 
                  value="ENV" 
                  checked={formData.eCityLower2 === "ENV" } 
                  onChange={handleChange} 
                /> ENV
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="eCityLower3" 
                  value="ENV" 
                  checked={formData.eCityLower3 === "ENV" } 
                  onChange={handleChange} 
                /> ENV
              </label>
            </td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="5" 
                  checked={formData.numseats === "5" } 
                  onChange={handleChange} 
                /> 5
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="operation" 
                  value="O" 
                  checked={formData.operation === 'O'} 
                  onChange={handleChange} 
                /> O
              </label>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="6" 
                  checked={formData.numseats === "6" } 
                  onChange={handleChange} 
                /> 6
              </label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="7" 
                  checked={formData.numseats === "7" } 
                  onChange={handleChange} 
                /> 7
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="operation" 
                  value="Q" 
                  checked={formData.operation === 'Q'} 
                  onChange={handleChange} 
                /> Q
              </label>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="8" 
                  checked={formData.numseats === "8" } 
                  onChange={handleChange} 
                /> 8
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="operation" 
                  value="R" 
                  checked={formData.operation === 'R'} 
                  onChange={handleChange} 
                /> R
              </label>
            </td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="accom" 
                  value="Z" 
                  checked={formData.accom === 'Z'} 
                  onChange={handleChange} 
                /> Z
              </label>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <label>
                <input 
                  type="radio" 
                  name="numseats" 
                  value="9" 
                  checked={formData.numseats === "9" } 
                  onChange={handleChange} 
                /> 9
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

  return (
    <div>
      <div>
        <h1>CN Electronic Passenger Reservation System</h1>
        <a href='https://github.com/coneypylon/cnr-reservations-1967'>View the code for the underlying system!</a>
      </div>
      <div>
        <h2>punchcard</h2>
        <MyForm />
      </div>
      <h2>submit results</h2>
      <MyButton />
    </div>
  );
}
