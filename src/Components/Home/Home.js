import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import './Home.css'


const Home = () => {
  const [id, setid] = useState("1");
  const table = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [limit, setlimit] = useState(table.length);

  const [dataFetched, setdataFetched] = useState(false)

  const handleSubmit = (e) => {
    setdataFetched(true);
    e.preventDefault();


  }

  const limitChange = (e) => {
    setlimit(e.target.value);
  }

  const handleClick = (e) => {
    setid(e.target.getAttribute("id"))
  }

  return (
    <>
    <Navbar />
      <div className='container main-page'>
        <ul className="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className={`nav-link tab-btn${id === "1" ? 'active active-tab' : ""}`} id="1" data-bs-toggle="pill" type="button" role="tab" onClick={handleClick}>Link1</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link tab-btn${id === "2" ? 'active active-tab' : ""}`} id="2" data-bs-toggle="pill" type="button" role="tab" onClick={handleClick}>Link2</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link tab-btn${id === "3" ? 'active active-tab' : ""}`} id="3" data-bs-toggle="pill" type="button" role="tab" onClick={handleClick}>Link3</button>
          </li>
        </ul>




        {/********************Tabs*************************** */}
        <div className="tab-content" id="pills-tabContent">

          {/******************Tab 1************** */}
          <div className={`tab-pane fade ${id === "1" ? "show active" : ""}`} role="tabpanel">
            <div className='form-body cal-form'>
              <div className='heading mb-2'>
                <h1 style={{ fontSize: "1.5rem", color: "white" }} align="center">Enter the Info!</h1>
              </div>
              <form>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 1</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 2</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 3</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 4</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 5</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className='d-flex justify-content-center my-1'>
                  <button type="submit" className="btn btn-form" onClick={handleSubmit}>Calculate</button>
                </div>
              </form>
            </div>
          </div>


          {/************************Tab 2************** */}
          <div className={`tab-pane fade ${id === "2" ? "show active" : ""}`} role="tabpanel">
            <div className='form-body cal-form'>
              <div className='heading mb-2'>
                <h1 style={{ fontSize: "1.5rem", color: "white" }} align="center">Enter the Info!</h1>
              </div>
              <form>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 1</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 2</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 3</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 4</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3 form-row d-flex justify-content-center">
                  <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Item 5</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                  </div>
                </div>
                <div className='d-flex justify-content-center my-1'>
                  <button type="submit" className="btn btn-form" onClick={handleSubmit}>Calculate</button>
                </div>
              </form>
            </div>
          </div>

          {/**************************Tab 3******************* */}
          <div className={`tab-pane fade ${id === "3" ? "show active" : ""}`} role="tabpanel">
            <div className='cal-form'>
              <div className="row mb-3 d-flex justify-content-center">
                <label for="inputEmail3" className="col-sm-3 col-form-label form-label d-flex justify-content-center">Email Address</label>
                <div className="col-sm-4">
                  <input type="email" className="form-control shadow-none calculator-input input-form" id="inputEmail3" />
                </div>
              </div>
              <div className='d-flex justify-content-center my-1'>
                <button type="submit" className="btn btn-form" >Send Mail</button>
                <button type="submit" className="btn btn-form" >Save Project</button>
              </div>
            </div>
            <div className='tables'>
              <table className='table'>
                <tr className='table-row'>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
                <tr>
                  <td>Ernst Handel</td>
                  <td>Roland Mendel</td>
                  <td>Austria</td>
                </tr>
                <tr>
                  <td>Island Trading</td>
                  <td>Helen Bennett</td>
                  <td>UK</td>
                </tr>
                <tr>
                  <td>Laughing Bacchus Winecellars</td>
                  <td>Yoshi Tannamuri</td>
                  <td>Canada</td>
                </tr>
                <tr>
                  <td>Magazzini Alimentari Riuniti</td>
                  <td>Giovanni Rovelli</td>
                  <td>Italy</td>
                </tr>
              </table>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home