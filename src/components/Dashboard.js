import React, { useEffect, useState } from 'react'
import Home from './Home'
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Dashboard() {

  let [data, setData] = useState([])

  let handlegetData = async() => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/data`)
      if(res.status === 200){
        setData(res.data.details)
      }
    } catch (error) {
      // console.log(error)
    }
  }
  useEffect(()=>{
    handlegetData()
  },[])
  return <>
  <div className='dashboard-body'>
    <Home />
    <div className='dashboard-table'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.map((e, i) => {
            return <tr key={i}>
              <td>{i+1}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.gender}</td>
            </tr>
          })
        }
      </tbody>
    </Table>
    </div>
  </div>
  </>
}

export default Dashboard
