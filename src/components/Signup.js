import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(true);
  const [nameF, setNamef] = useState(true);
  const [passc, setPassC] = useState(true);
  const [mobile, setMobile] = useState("");
  const [mobileC, setMobileC] = useState(true);
  const [data, setData] = useState([]);
  const [cdata, setCdata] = useState([]);
  const [sdata, setSdata] = useState([]);

  useEffect(() => {
    (async () => {
      let fetchedData = await axios.get("https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json");
      setData(fetchedData.data);
      let arr = fetchedData.data.map(d => d.name);
      setCdata(arr);
    })()

  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Hi");
    if (name.length < 4 || name.length > 10) {
      setNamef("Enter name between 4-10 characters")
      return;
    } else if (!email.includes("@") || !email.includes(".") || email.length === 0) {
      setNamef("")
      setFlag("Enter Valid Email")
      return;
    } else if (password.length < 6 || password.length > 16) {
      setFlag("")
      setPassC("Password should be between 6-16 characters")
      return;
    } else if (mobile.length !== 10) {
      setPassC("")
      setMobileC("Contact number should be of 10 digit")
      return;
    }else{
      alert("Successfully Filled all the filled")
    }
  }
  const handleState = (country) => {
    const idx = cdata.indexOf(country);
    console.log(data[idx].states);
    setSdata(data[idx].states);
  }
  return <form>
    {nameF && <p style={{ color: "red", fontSize: "12px" }}>{nameF}</p>}
    <label htmlFor='name'>Name</label><br />
    <input type="text" placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)}></input><br />
    {flag && <p style={{ color: "red", fontSize: "12px" }}>{flag}</p>}
    <label htmlFor='email'>Email</label><br />
    <input type="email" placeholder='example@example.com' value={email} onChange={e => setEmail(e.target.value)}></input><br />
    {passc && <p style={{ color: "red", fontSize: "12px" }}>{passc}</p>}
    <label htmlFor='password'>Password</label><br />
    <input type="password" placeholder='enter your Password' value={password} onChange={e => setPassword(e.target.value)}></input><br />
    <label htmlFor='dob'>Date of Birth</label><br />
    <input type="date" ></input><br />
    <label htmlFor="country">Country</label><br />
    <select onChange={(e) => { handleState(e.target.value) }}>
      {cdata.map((ele, id) => {
        return <option key={id}>{ele}</option>
      })}
    </select><br />
    <label htmlFor='state'>State</label><br />
    <select>
      {sdata.map((e, i) => {
        return <option key={i}>{e.name}</option>
      })}
    </select><br />
    {mobileC && <p style={{ color: "red", fontSize: "12px" }}>{mobileC}</p>}
    <label htmlFor='mobile'>Contact Number</label><br />
    <input type="tel" maxLength='10' placeholder='98xxxxxxxx' value={mobile} onChange={e => setMobile(e.target.value)}></input><br />
    <button onClick={handleSubmit}>Submit</button>
  </form>
}
