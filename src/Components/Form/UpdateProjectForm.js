import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { HOST, GET_EMPLOYEENAMES, GET_DEPARTMENTS, GET_PROJECT_CATEGORIES, UPDATE_PROJECT } from '../Constants/Constants';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { useNavigate,useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

function UpdateProjectForm(props) {
  console.log(props.row)
  const [pname, setpname] = useState(props.row.Project_Name)
  const [pCategory, setpCategory] = useState(props.row.Project_Category)
  const [pStage, setpStage] = useState(props.row.Project_Stage)
  const [state, setstate] = useState(props.row.Status)
  const [fNotes, setfNotes] = useState(props.row.Follow_Up_Notes)
  const [pManager, setpManager] = useState(props.row.Project_Manager)
  const [pValue, setpValue] = useState(props.row.Project_Value)
  const [city, setcity] = useState(props.row.City)
  const [province, setprovince] = useState(props.row.Province)
  const [dept, setdept] = useState(props.row.Department)
  const [members, setmembers] = useState(props.row.Team_Members)



  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [depts, setdepts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    const call = async () => {
      await axios.get(HOST + GET_EMPLOYEENAMES, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
        setemployees(res.data.res)
      }).catch((err) => {
        console.log(err)
      })
      await axios.get(HOST + GET_DEPARTMENTS, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
        setdepts(res.data.res)
      }).catch((err) => {
        console.log(err)
      })
      await axios.get(HOST + GET_PROJECT_CATEGORIES, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
        setcategories(res.data.res)
      }).catch((err) => {
        console.log(err)
      })
    }
    call()
  },[])
  const [form, setform] = useState({
    'projectName':"",
    'dueDate':"",
    'dateCreated':"",
    'projectStage':"",
    'followNotes':"",
    'nextFollow':"",
    'tentativeClosing':"",
    'projectValue':"",
    'city':"",
    'state':"",
    'department':"",
    'assignedTo':"",
    'projectManager':'',
    'projectCategory':'',
    'status':''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='projectName') {
      setpname(value)
    }
    if(name==='projectStage') {
      setpStage(value)
    }
    if(name==='followNotes') {
      setfNotes(value)
    }
    if(name==='projectStage') {
      setpStage(value)
    }
    if(name==='projectValue') {
      setpValue(value)
    }
    if(name==='city') {
      setcity(value)
    }
    if(name==='state') {
      setprovince(value)
    }
    if(name==='projectManager') {
      setpManager(value)
    }
    if(name==='projectCategory') {
      setpCategory(value)
    }
    if(name==='status') {
      setstate(value)
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    console.log(form.dueDate);
    axios.post(HOST + UPDATE_PROJECT, {
      'projectName':form.projectName,
      'dueDate':form.dueDate,
      'stage':form.projectStage,
      'followUpNotes':form.followNotes,
      'nextFollowUp':form.nextFollow,
      'tentClosing':form.tentativeClosing,
      'value':form.projectValue,
      'city':form.city,
      'province':form.state,
      'department':DisplayValue1?DisplayValue1.toString():'',
      'teamMembers':DisplayValue?DisplayValue.toString():'',
      'projectManager':form.projectManager,
      'projectCategory':form.projectCategory,
      'status':form.status,
      'projectId':props.row.Project_Id
    }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
      console.log(res);
      if(res.data.success) {
        handleShow()
      }
      }).catch((err) => {
          console.log(err)
          if(!err.data.success) {
            handleShow1()
          }
      })
  };
  let attendees = [];
    employees.map((e)=>{
      attendees.push({
        label: e.Full_Name,
        value: e.Full_Name
      })
    })
    let [DisplayValue, getValue] = useState()
    let doChange=(e)=>{
      getValue(Array.isArray(e)?e.map(x=>x.value):[])
    }

    let departments = [];
    depts.map((e)=>{
      departments.push({
        label: e.Department,
        value: e.Department
      })
    })
    let [DisplayValue1, getValue1] = useState()
    let doChange1=(e)=>{
      getValue1(Array.isArray(e)?e.map(x=>x.value):[])
    }
    const navigate = useNavigate()
    const callFunc = ()=>{
      handleClose();
      navigate('/updateProject')
    }
    let value1 = new Date(props.row.Due_Date)
      let startMonth, startDay;
      if(value1.getMonth()<10) {
        startMonth=`0${value1.getMonth()}`;
      } else {
        startMonth = value1.getMonth();
      }
      if(value1.getDate()<10) {
        startDay = `0${value1.getDate()}`;
      } else {
        startDay = value1.getDate();
      }
      let due = `${value1.getFullYear()}-${startMonth}-${startDay}`

      let value2 = new Date(props.row.Next_Follow_Up)
      let dueMonth, dueDay;
      if(value2.getMonth()<10) {
        dueMonth=`0${value2.getMonth()}`;
      } else {
        dueMonth = value2.getMonth();
      }
      if(value2.getDate()<10) {
        dueDay = `0${value2.getDate()}`;
      } else {
        dueDay = value2.getDate();
      }
      let nextFollow = `${value2.getFullYear()}-${dueMonth}-${dueDay}`

      let value3 = new Date(props.row.Tentative_Closing)
      let tMonth, tDay;
      if(value2.getMonth()<10) {
        tMonth=`0${value2.getMonth()}`;
      } else {
        tMonth = value2.getMonth();
      }
      if(value2.getDate()<10) {
        tDay = `0${value2.getDate()}`;
      } else {
        tDay = value2.getDate();
      }
      let tClosing = `${value2.getFullYear()}-${dueMonth}-${dueDay}`
  return (
    <div>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control value={pname} name='projectName' type="text" placeholder="Project Name*" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
        <Form.Label>Project Due Date</Form.Label>
          <Form.Control name='dueDate' type="date" placeholder="Project Due Date*" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
        <Select isMulti onChange={doChange1} options={departments} name="employee" placeholder='Select Department(s)'>Team Members</Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={fNotes} name='followNotes' type="text" placeholder="Follow Up Notes" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={pStage} name='stage' type="text" placeholder="Project Stage" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
        <Form.Label>Next Follow Up</Form.Label>
            <Form.Control  name='nextFollow' type="date" placeholder="Next Follow Up" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Tentative Closing Date</Form.Label>
          <Form.Control  name="tentativeClosing" type="date" placeholder="Tentative Closing*" onChange={handleChange} required/>
        </Form.Group>
       
        
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control value={pValue} name='projectValue' type="text" placeholder="Project Value*" onChange={handleChange} required />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Select defaultValue={pCategory} name='projectCategory' onChange={handleChange}>
            <option value=''>Project Category</option>
          {categories.length!==0?categories.map((option) => (
          <option value={option.Design_Project}>
            {option.Design_Project}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} controlId="formGridCity">
        
        <Form.Select defaultValue={city} onChange={handleChange} name='city'>
                  <option value="">Select City</option>
                  <option value="Airdrie">Airdrie</option>
                  <option value="Athabasca">Athabasca</option>
                  <option value="Banff">Banff</option>
                  <option value="Barrhead">Barrhead</option>
                  <option value="Bassano">Bassano</option>
                  <option value="Beaumont">Beaumont</option>
                  <option value="Beaverlodge">Beaverlodge</option>
                  <option value="Black Diamond">Black Diamond</option>
                  <option value="Blackfalds">Blackfalds</option>
                  <option value="Bon Accord">Bon Accord</option>
                  <option value="Bonnyville">Bonnyville</option>
                  <option value="Bow Island">Bow Island</option>
                  <option value="Brooks">Brooks</option>
                  <option value="Calgary">Calgary</option>
                  <option value="Calmar">Calmar</option>
                  <option value="Camrose">Camrose</option>
                  <option value="Canmore">Canmore</option>
                  <option value="Cardston">Cardston</option>
                  <option value="Carstairs">Carstairs</option>
                  <option value="Chestermere">Chestermere</option>
                  <option value="Claresholm">Claresholm</option>
                  <option value="Coaldale">Coaldale</option>
                  <option value="Coalhurst">Coalhurst</option>
                  <option value="Cochrane">Cochrane</option>
                  <option value="Cold Lake">Cold Lake</option>
                  <option value="Crossfield">Crossfield</option>
                  <option value="Devon">Devon</option>
                  <option value="Didsbury">Didsbury</option>
                  <option value="Drayton Valley">Drayton Valley</option>
                  <option value="Edmonton">Edmonton</option>
                  <option value="Edson">Edson</option>
                  <option value="Elk Point">Elk Point</option>
                  <option value="Fairview">Fairview</option>
                  <option value="Falher">Falher</option>
                  <option value="Fort Macleod">Fort Macleod</option>
                  <option value="Fort McMurray">Fort McMurray</option>
                  <option value="Fort Saskatchewan">Fort Saskatchewan</option>
                  <option value="Fox Creek">Fox Creek</option>
                  <option value="Gibbons">Gibbons</option>
                  <option value="Grand Centre">Grand Centre</option>
                  <option value="Grande Cache">Grande Cache</option>
                  <option value="Grande Prairie">Grande Prairie</option>
                  <option value="Grimshaw">Grimshaw</option>
                  <option value="Hanna">Hanna</option>
                  <option value="Heritage Pointe">Heritage Pointe</option>
                  <option value="High Level">High Level</option>
                  <option value="High Prairie">High Prairie</option>
                  <option value="High River">High River</option>
                  <option value="Hinton">Hinton</option>
                  <option value="Irricana">Irricana</option>
                  <option value="Jasper Park Lodge">Jasper Park Lodge</option>
                  <option value="Killam">Killam</option>
                  <option value="Lac La Biche">Lac La Biche</option>
                  <option value="Lacombe">Lacombe</option>
                  <option value="Lamont">Lamont</option>
                  <option value="Larkspur">Larkspur</option>
                  <option value="Laurel">Laurel</option>
                  <option value="Leduc">Leduc</option>
                  <option value="Lethbridge">Lethbridge</option>
                  <option value="Lloydminster">Lloydminster</option>
                  <option value="Magrath">Magrath</option>
                  <option value="Manning">Manning</option>
                  <option value="Mannville">Mannville</option>
                  <option value="Maple Ridge">Maple Ridge</option>
                  <option value="Mayerthorpe">Mayerthorpe</option>
                  <option value="Medicine Hat">Medicine Hat</option>
                  <option value="Mill Woods Town Centre">Mill Woods Town Centre</option>
                  <option value="Millet">Millet</option>
                  <option value="Morinville">Morinville</option>
                  <option value="Nanton">Nanton</option>
                  <option value="Okotoks">Okotoks</option>
                  <option value="Olds">Olds</option>
                  <option value="Peace River">Peace River</option>
                  <option value="Penhold">Penhold</option>
                  <option value="Picture Butte">Picture Butte</option>
                  <option value="Pincher Creek">Pincher Creek</option>
                  <option value="Ponoka">Ponoka</option>
                  <option value="Provost">Provost</option>
                  <option value="Raymond">Raymond</option>
                  <option value="Red Deer">Red Deer</option>
                  <option value="Rideau Park">Rideau Park</option>
                  <option value="Rimbey">Rimbey</option>
                  <option value="Rocky Mountain House">Rocky Mountain House</option>
                  <option value="Sexsmith">Sexsmith</option>
                  <option value="Sherwood Park">Sherwood Park</option>
                  <option value="Silver Berry">Silver Berry</option>
                  <option value="Slave Lake">Slave Lake</option>
                  <option value="Smoky Lake">Smoky Lake</option>
                  <option value="Spirit River">Spirit River</option>
                  <option value="Springbrook">Springbrook</option>
                  <option value="Spruce Grove">Spruce Grove</option>
                  <option value="St. Albert">St. Albert</option>
                  <option value="Stettler">Stettler</option>
                  <option value="Stony Plain">Stony Plain</option>
                  <option value="Strathmore">Strathmore</option>
                  <option value="Sundre">Sundre</option>
                  <option value="Swan Hills">Swan Hills</option>
                  <option value="Sylvan Lake">Sylvan Lake</option>
                  <option value="Taber">Taber</option>
                  <option value="Tamarack">Tamarack</option>
                  <option value="Three Hills">Three Hills</option>
                  <option value="Tofield">Tofield</option>
                  <option value="Two Hills">Two Hills</option>
                  <option value="Valleyview">Valleyview</option>
                  <option value="Vegreville">Vegreville</option>
                  <option value="Vermilion">Vermilion</option>
                  <option value="Viking">Viking</option>
                  <option value="Vulcan">Vulcan</option>
                  <option value="Wainwright">Wainwright</option>
                  <option value="Wembley">Wembley</option>
                  <option value="Westlake">Westlake</option>
                  <option value="Westlock">Westlock</option>
                  <option value="Wetaskiwin">Wetaskiwin</option>
                  <option value="Whitecourt">Whitecourt</option>
                  <option value="Wild Rose">Wild Rose</option>
                  <option value="Abbotsford">Abbotsford</option>
                  <option value="Agassiz">Agassiz</option>
                  <option value="Aldergrove">Aldergrove</option>
                  <option value="Aldergrove East">Aldergrove East</option>
                  <option value="Anmore">Anmore</option>
                  <option value="Arbutus Ridge">Arbutus Ridge</option>
                  <option value="Armstrong">Armstrong</option>
                  <option value="Ashcroft">Ashcroft</option>
                  <option value="Barri??re">Barri??re</option>
                  <option value="Bowen Island">Bowen Island</option>
                  <option value="Burnaby">Burnaby</option>
                  <option value="Burns Lake">Burns Lake</option>
                  <option value="Cache Creek">Cache Creek</option>
                  <option value="Campbell River">Campbell River</option>
                  <option value="Castlegar">Castlegar</option>
                  <option value="Cedar">Cedar</option>
                  <option value="Central Coast Regional District">Central Coast Regional District</option>
                  <option value="Chase">Chase</option>
                  <option value="Chemainus">Chemainus</option>
                  <option value="Chetwynd">Chetwynd</option>
                  <option value="Chilliwack">Chilliwack</option>
                  <option value="Colwood">Colwood</option>
                  <option value="Coombs">Coombs</option>
                  <option value="Coquitlam">Coquitlam</option>
                  <option value="Courtenay">Courtenay</option>
                  <option value="Cowichan Bay">Cowichan Bay</option>
                  <option value="Cranbrook">Cranbrook</option>
                  <option value="Creston">Creston</option>
                  <option value="Cumberland">Cumberland</option>
                  <option value="Dawson Creek">Dawson Creek</option>
                  <option value="Delta">Delta</option>
                  <option value="Denman Island">Denman Island</option>
                  <option value="Denman Island Trust Area">Denman Island Trust Area</option>
                  <option value="Duck Lake">Duck Lake</option>
                  <option value="Duncan">Duncan</option>
                  <option value="East Wellington">East Wellington</option>
                  <option value="Elkford">Elkford</option>
                  <option value="Ellison">Ellison</option>
                  <option value="Enderby">Enderby</option>
                  <option value="Fairwinds">Fairwinds</option>
                  <option value="Fernie">Fernie</option>
                  <option value="Fort Nelson">Fort Nelson</option>
                  <option value="Fort St. John">Fort St. John</option>
                  <option value="Fraser Valley Regional District">Fraser Valley Regional District</option>
                  <option value="French Creek">French Creek</option>
                  <option value="Fruitvale">Fruitvale</option>
                  <option value="Gibsons">Gibsons</option>
                  <option value="Golden">Golden</option>
                  <option value="Grand Forks">Grand Forks</option>
                  <option value="Hanceville">Hanceville</option>
                  <option value="Hope">Hope</option>
                  <option value="Hornby Island">Hornby Island</option>
                  <option value="Houston">Houston</option>
                  <option value="Invermere">Invermere</option>
                  <option value="Kamloops">Kamloops</option>
                  <option value="Kelowna">Kelowna</option>
                  <option value="Kimberley">Kimberley</option>
                  <option value="Kitimat">Kitimat</option>
                  <option value="Ladner">Ladner</option>
                  <option value="Ladysmith">Ladysmith</option>
                  <option value="Lake Cowichan">Lake Cowichan</option>
                  <option value="Langford">Langford</option>
                  <option value="Langley">Langley</option>
                  <option value="Lillooet">Lillooet</option>
                  <option value="Lions Bay">Lions Bay</option>
                  <option value="Logan Lake">Logan Lake</option>
                  <option value="Lumby">Lumby</option>
                  <option value="Mackenzie">Mackenzie</option>
                  <option value="Maple Ridge">Maple Ridge</option>
                  <option value="Merritt">Merritt</option>
                  <option value="Metchosin">Metchosin</option>
                  <option value="Metro Vancouver Regional District">Metro Vancouver Regional District</option>
                  <option value="Mission">Mission</option>
                  <option value="Nakusp">Nakusp</option>
                  <option value="Nanaimo">Nanaimo</option>
                  <option value="Nelson">Nelson</option>
                  <option value="New Westminster">New Westminster</option>
                  <option value="North Cowichan">North Cowichan</option>
                  <option value="North Oyster/Yellow Point">North Oyster/Yellow Point</option>
                  <option value="North Saanich">North Saanich</option>
                  <option value="North Vancouver">North Vancouver</option>
                  <option value="Oak Bay">Oak Bay</option>
                  <option value="Okanagan">Okanagan</option>
                  <option value="Okanagan Falls">Okanagan Falls</option>
                  <option value="Oliver">Oliver</option>
                  <option value="Osoyoos">Osoyoos</option>
                  <option value="Parksville">Parksville</option>
                  <option value="Peace River Regional District">Peace River Regional District</option>
                  <option value="Peachland">Peachland</option>
                  <option value="Pemberton">Pemberton</option>
                  <option value="Penticton">Penticton</option>
                  <option value="Pitt Meadows">Pitt Meadows</option>
                  <option value="Port Alberni">Port Alberni</option>
                  <option value="Port Coquitlam">Port Coquitlam</option>
                  <option value="Port McNeill">Port McNeill</option>
                  <option value="Port Moody">Port Moody</option>
                  <option value="Powell River">Powell River</option>
                  <option value="Prince George">Prince George</option>
                  <option value="Prince Rupert">Prince Rupert</option>
                  <option value="Princeton">Princeton</option>
                  <option value="Puntledge">Puntledge</option>
                  <option value="Quesnel">Quesnel</option>
                  <option value="Regional District of Alberni-Clayoquot">Regional District of Alberni-Clayoquot</option>
                  <option value="Regional District of Central Okanagan">Regional District of Central Okanagan</option>
                  <option value="Revelstoke">Revelstoke</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Rossland">Rossland</option>
                  <option value="Royston">Royston</option>
                  <option value="Salmo">Salmo</option>
                  <option value="Salmon Arm">Salmon Arm</option>
                  <option value="Salt Spring Island">Salt Spring Island</option>
                  <option value="Saltair">Saltair</option>
                  <option value="Sechelt">Sechelt</option>
                  <option value="Sicamous">Sicamous</option>
                  <option value="Six Mile">Six Mile</option>
                  <option value="Smithers">Smithers</option>
                  <option value="Sooke">Sooke</option>
                  <option value="South Pender Harbour">South Pender Harbour</option>
                  <option value="Sparwood">Sparwood</option>
                  <option value="Summerland">Summerland</option>
                  <option value="Surrey">Surrey</option>
                  <option value="Terrace">Terrace</option>
                  <option value="Tofino">Tofino</option>
                  <option value="Trail">Trail</option>
                  <option value="Tsawwassen">Tsawwassen</option>
                  <option value="Tumbler Ridge">Tumbler Ridge</option>
                  <option value="Ucluelet">Ucluelet</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="Vanderhoof">Vanderhoof</option>
                  <option value="Vernon">Vernon</option>
                  <option value="Victoria">Victoria</option>
                  <option value="Walnut Grove">Walnut Grove</option>
                  <option value="Welcome Beach">Welcome Beach</option>
                  <option value="West End">West End</option>
                  <option value="West Kelowna">West Kelowna</option>
                  <option value="West Vancouver">West Vancouver</option>
                  <option value="Whistler">Whistler</option>
                  <option value="White Rock">White Rock</option>
                  <option value="Williams Lake">Williams Lake</option>
                  <option value="Altona">Altona</option>
                  <option value="Beausejour">Beausejour</option>
                  <option value="Boissevain">Boissevain</option>
                  <option value="Brandon">Brandon</option>
                  <option value="Carberry">Carberry</option>
                  <option value="Carman">Carman</option>
                  <option value="Cross Lake 19A">Cross Lake 19A</option>
                  <option value="Dauphin">Dauphin</option>
                  <option value="De Salaberry">De Salaberry</option>
                  <option value="Deloraine">Deloraine</option>
                  <option value="Flin Flon">Flin Flon</option>
                  <option value="Gimli">Gimli</option>
                  <option value="Grunthal">Grunthal</option>
                  <option value="Headingley">Headingley</option>
                  <option value="Ile des Ch??nes">Ile des Ch??nes</option>
                  <option value="Killarney">Killarney</option>
                  <option value="La Broquerie">La Broquerie</option>
                  <option value="Lac du Bonnet">Lac du Bonnet</option>
                  <option value="Landmark">Landmark</option>
                  <option value="Lorette">Lorette</option>
                  <option value="Melita">Melita</option>
                  <option value="Minnedosa">Minnedosa</option>
                  <option value="Moose Lake">Moose Lake</option>
                  <option value="Morden">Morden</option>
                  <option value="Morris">Morris</option>
                  <option value="Neepawa">Neepawa</option>
                  <option value="Niverville">Niverville</option>
                  <option value="Portage la Prairie">Portage la Prairie</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Roblin">Roblin</option>
                  <option value="Selkirk">Selkirk</option>
                  <option value="Shilo">Shilo</option>
                  <option value="Souris">Souris</option>
                  <option value="St. Adolphe">St. Adolphe</option>
                  <option value="Steinbach">Steinbach</option>
                  <option value="Stonewall">Stonewall</option>
                  <option value="Swan River">Swan River</option>
                  <option value="The Pas">The Pas</option>
                  <option value="Thompson">Thompson</option>
                  <option value="Virden">Virden</option>
                  <option value="West St. Paul">West St. Paul</option>
                  <option value="Winkler">Winkler</option>
                  <option value="Winnipeg">Winnipeg</option>
                  <option value="Baie Ste. Anne">Baie Ste. Anne</option>
                  <option value="Bathurst">Bathurst</option>
                  <option value="Bouctouche">Bouctouche</option>
                  <option value="Campbellton">Campbellton</option>
                  <option value="Dieppe">Dieppe</option>
                  <option value="Edmundston">Edmundston</option>
                  <option value="Florenceville-Bristol">Florenceville-Bristol</option>
                  <option value="Fredericton">Fredericton</option>
                  <option value="Fundy Bay">Fundy Bay</option>
                  <option value="Grande-Digue">Grande-Digue</option>
                  <option value="Greater Lakeburn">Greater Lakeburn</option>
                  <option value="Hampton">Hampton</option>
                  <option value="Harrison Brook">Harrison Brook</option>
                  <option value="Keswick Ridge">Keswick Ridge</option>
                  <option value="Lincoln">Lincoln</option>
                  <option value="Lutes Mountain">Lutes Mountain</option>
                  <option value="McEwen">McEwen</option>
                  <option value="Miramichi">Miramichi</option>
                  <option value="Moncton">Moncton</option>
                  <option value="Nackawic">Nackawic</option>
                  <option value="New Maryland">New Maryland</option>
                  <option value="Noonan">Noonan</option>
                  <option value="Oromocto">Oromocto</option>
                  <option value="Richibucto">Richibucto</option>
                  <option value="Sackville">Sackville</option>
                  <option value="Saint Andrews">Saint Andrews</option>
                  <option value="Saint John">Saint John</option>
                  <option value="Saint-Antoine">Saint-Antoine</option>
                  <option value="Saint-L??onard">Saint-L??onard</option>
                  <option value="Salisbury">Salisbury</option>
                  <option value="Shediac">Shediac</option>
                  <option value="Shediac Bridge-Shediac River">Shediac Bridge-Shediac River</option>
                  <option value="Shippagan">Shippagan</option>
                  <option value="Starlight Village">Starlight Village</option>
                  <option value="Sussex">Sussex</option>
                  <option value="Tracadie-Sheila">Tracadie-Sheila</option>
                  <option value="Wells">Wells</option>
                  <option value="Bay Roberts">Bay Roberts</option>
                  <option value="Bay St. George South">Bay St. George South</option>
                  <option value="Bonavista">Bonavista</option>
                  <option value="Botwood">Botwood</option>
                  <option value="Burgeo">Burgeo</option>
                  <option value="Carbonear">Carbonear</option>
                  <option value="Catalina">Catalina</option>
                  <option value="Channel-Port aux Basques">Channel-Port aux Basques</option>
                  <option value="Clarenville-Shoal Harbour">Clarenville-Shoal Harbour</option>
                  <option value="Conception Bay South">Conception Bay South</option>
                  <option value="Corner Brook">Corner Brook</option>
                  <option value="Deer Lake">Deer Lake</option>
                  <option value="Fogo Island">Fogo Island</option>
                  <option value="Gambo">Gambo</option>
                  <option value="Goulds">Goulds</option>
                  <option value="Grand Bank">Grand Bank</option>
                  <option value="Grand Falls-Windsor">Grand Falls-Windsor</option>
                  <option value="Happy Valley-Goose Bay">Happy Valley-Goose Bay</option>
                  <option value="Harbour Breton">Harbour Breton</option>
                  <option value="Labrador City">Labrador City</option>
                  <option value="Lewisporte">Lewisporte</option>
                  <option value="Marystown">Marystown</option>
                  <option value="Mount Pearl">Mount Pearl</option>
                  <option value="Pasadena">Pasadena</option>
                  <option value="Springdale">Springdale</option>
                  <option value="St. Anthony">St. Anthony</option>
                  <option value="St. John's">St. John's</option>
                  <option value="Stephenville">Stephenville</option>
                  <option value="Stephenville Crossing">Stephenville Crossing</option>
                  <option value="Torbay">Torbay</option>
                  <option value="Upper Island Cove">Upper Island Cove</option>
                  <option value="Wabana">Wabana</option>
                  <option value="Behchok????">Behchok????</option>
                  <option value="Fort McPherson">Fort McPherson</option>
                  <option value="Fort Smith">Fort Smith</option>
                  <option value="Hay River">Hay River</option>
                  <option value="Inuvik">Inuvik</option>
                  <option value="Norman Wells">Norman Wells</option>
                  <option value="Yellowknife">Yellowknife</option>
                  <option value="Amherst">Amherst</option>
                  <option value="Annapolis County">Annapolis County</option>
                  <option value="Antigonish">Antigonish</option>
                  <option value="Berwick">Berwick</option>
                  <option value="Bridgewater">Bridgewater</option>
                  <option value="Cape Breton County">Cape Breton County</option>
                  <option value="Chester">Chester</option>
                  <option value="Colchester">Colchester</option>
                  <option value="Cole Harbour">Cole Harbour</option>
                  <option value="Cow Bay">Cow Bay</option>
                  <option value="Dartmouth">Dartmouth</option>
                  <option value="Digby">Digby</option>
                  <option value="Digby County">Digby County</option>
                  <option value="English Corner">English Corner</option>
                  <option value="Eskasoni 3">Eskasoni 3</option>
                  <option value="Fall River">Fall River</option>
                  <option value="Glace Bay">Glace Bay</option>
                  <option value="Greenwood">Greenwood</option>
                  <option value="Halifax">Halifax</option>
                  <option value="Hantsport">Hantsport</option>
                  <option value="Hayes Subdivision">Hayes Subdivision</option>
                  <option value="Kentville">Kentville</option>
                  <option value="Lake Echo">Lake Echo</option>
                  <option value="Lantz">Lantz</option>
                  <option value="Lower Sackville">Lower Sackville</option>
                  <option value="Lunenburg">Lunenburg</option>
                  <option value="Middleton">Middleton</option>
                  <option value="New Glasgow">New Glasgow</option>
                  <option value="Oxford">Oxford</option>
                  <option value="Parrsboro">Parrsboro</option>
                  <option value="Pictou">Pictou</option>
                  <option value="Pictou County">Pictou County</option>
                  <option value="Port Hawkesbury">Port Hawkesbury</option>
                  <option value="Port Williams">Port Williams</option>
                  <option value="Princeville">Princeville</option>
                  <option value="Shelburne">Shelburne</option>
                  <option value="Springhill">Springhill</option>
                  <option value="Sydney">Sydney</option>
                  <option value="Sydney Mines">Sydney Mines</option>
                  <option value="Truro">Truro</option>
                  <option value="Windsor">Windsor</option>
                  <option value="Wolfville">Wolfville</option>
                  <option value="Yarmouth">Yarmouth</option>
                  <option value="Clyde River">Clyde River</option>
                  <option value="Gjoa Haven">Gjoa Haven</option>
                  <option value="Iqaluit">Iqaluit</option>
                  <option value="Kugluktuk">Kugluktuk</option>
                  <option value="Pangnirtung">Pangnirtung</option>
                  <option value="Rankin Inlet">Rankin Inlet</option>
                  <option value="Ajax">Ajax</option>
                  <option value="Algoma">Algoma</option>
                  <option value="Alliston">Alliston</option>
                  <option value="Amherstburg">Amherstburg</option>
                  <option value="Amigo Beach">Amigo Beach</option>
                  <option value="Ancaster">Ancaster</option>
                  <option value="Angus">Angus</option>
                  <option value="Arnprior">Arnprior</option>
                  <option value="Atikokan">Atikokan</option>
                  <option value="Attawapiskat">Attawapiskat</option>
                  <option value="Aurora">Aurora</option>
                  <option value="Aylmer">Aylmer</option>
                  <option value="Azilda">Azilda</option>
                  <option value="Ballantrae">Ballantrae</option>
                  <option value="Bancroft">Bancroft</option>
                  <option value="Barrie">Barrie</option>
                  <option value="Bath">Bath</option>
                  <option value="Belleville">Belleville</option>
                  <option value="Bells Corners">Bells Corners</option>
                  <option value="Belmont">Belmont</option>
                  <option value="Binbrook">Binbrook</option>
                  <option value="Bluewater">Bluewater</option>
                  <option value="Bourget">Bourget</option>
                  <option value="Bracebridge">Bracebridge</option>
                  <option value="Brampton">Brampton</option>
                  <option value="Brant">Brant</option>
                  <option value="Brantford">Brantford</option>
                  <option value="Brockville">Brockville</option>
                  <option value="Brussels">Brussels</option>
                  <option value="Burford">Burford</option>
                  <option value="Burlington">Burlington</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Camlachie">Camlachie</option>
                  <option value="Capreol">Capreol</option>
                  <option value="Carleton Place">Carleton Place</option>
                  <option value="Casselman">Casselman</option>
                  <option value="Chatham">Chatham</option>
                  <option value="Chatham-Kent">Chatham-Kent</option>
                  <option value="Clarence-Rockland">Clarence-Rockland</option>
                  <option value="Cobourg">Cobourg</option>
                  <option value="Cochrane District">Cochrane District</option>
                  <option value="Collingwood">Collingwood</option>
                  <option value="Concord">Concord</option>
                  <option value="Constance Bay">Constance Bay</option>
                  <option value="Cookstown">Cookstown</option>
                  <option value="Cornwall">Cornwall</option>
                  <option value="Corunna">Corunna</option>
                  <option value="Deep River">Deep River</option>
                  <option value="Delaware">Delaware</option>
                  <option value="Deseronto">Deseronto</option>
                  <option value="Dorchester">Dorchester</option>
                  <option value="Dowling">Dowling</option>
                  <option value="Dryden">Dryden</option>
                  <option value="Durham">Durham</option>
                  <option value="Ear Falls">Ear Falls</option>
                  <option value="East Gwillimbury">East Gwillimbury</option>
                  <option value="East York">East York</option>
                  <option value="Elliot Lake">Elliot Lake</option>
                  <option value="Elmvale">Elmvale</option>
                  <option value="Englehart">Englehart</option>
                  <option value="Espanola">Espanola</option>
                  <option value="Essex">Essex</option>
                  <option value="Etobicoke">Etobicoke</option>
                  <option value="Fort Erie">Fort Erie</option>
                  <option value="Fort Frances">Fort Frances</option>
                  <option value="Gananoque">Gananoque</option>
                  <option value="Glencoe">Glencoe</option>
                  <option value="Goderich">Goderich</option>
                  <option value="Golden">Golden</option>
                  <option value="Gravenhurst">Gravenhurst</option>
                  <option value="Greater Napanee">Greater Napanee</option>
                  <option value="Greater Sudbury">Greater Sudbury</option>
                  <option value="Greenstone">Greenstone</option>
                  <option value="Guelph">Guelph</option>
                  <option value="Haldimand County">Haldimand County</option>
                  <option value="Haliburton Village">Haliburton Village</option>
                  <option value="Halton">Halton</option>
                  <option value="Hamilton">Hamilton</option>
                  <option value="Hanover">Hanover</option>
                  <option value="Harriston">Harriston</option>
                  <option value="Hawkesbury">Hawkesbury</option>
                  <option value="Hearst">Hearst</option>
                  <option value="Hornepayne">Hornepayne</option>
                  <option value="Huntsville">Huntsville</option>
                  <option value="Huron East">Huron East</option>
                  <option value="Ingersoll">Ingersoll</option>
                  <option value="Innisfil">Innisfil</option>
                  <option value="Iroquois Falls">Iroquois Falls</option>
                  <option value="Jarvis">Jarvis</option>
                  <option value="Kanata">Kanata</option>
                  <option value="Kapuskasing">Kapuskasing</option>
                  <option value="Kawartha Lakes">Kawartha Lakes</option>
                  <option value="Kenora">Kenora</option>
                  <option value="Keswick">Keswick</option>
                  <option value="Kincardine">Kincardine</option>
                  <option value="King">King</option>
                  <option value="Kingston">Kingston</option>
                  <option value="Kirkland Lake">Kirkland Lake</option>
                  <option value="Kitchener">Kitchener</option>
                  <option value="L'Orignal">L'Orignal</option>
                  <option value="Lakefield">Lakefield</option>
                  <option value="Lambton Shores">Lambton Shores</option>
                  <option value="Lappe">Lappe</option>
                  <option value="Leamington">Leamington</option>
                  <option value="Limoges">Limoges</option>
                  <option value="Lindsay">Lindsay</option>
                  <option value="Listowel">Listowel</option>
                  <option value="Little Current">Little Current</option>
                  <option value="Lively">Lively</option>
                  <option value="London">London</option>
                  <option value="Lucan">Lucan</option>
                  <option value="Madoc">Madoc</option>
                  <option value="Manitoulin District">Manitoulin District</option>
                  <option value="Manitouwadge">Manitouwadge</option>
                  <option value="Marathon">Marathon</option>
                  <option value="Markdale">Markdale</option>
                  <option value="Markham">Markham</option>
                  <option value="Mattawa">Mattawa</option>
                  <option value="Meaford">Meaford</option>
                  <option value="Metcalfe">Metcalfe</option>
                  <option value="Midland">Midland</option>
                  <option value="Mildmay">Mildmay</option>
                  <option value="Millbrook">Millbrook</option>
                  <option value="Milton">Milton</option>
                  <option value="Mississauga">Mississauga</option>
                  <option value="Mississauga Beach">Mississauga Beach</option>
                  <option value="Moose Factory">Moose Factory</option>
                  <option value="Moosonee">Moosonee</option>
                  <option value="Morrisburg">Morrisburg</option>
                  <option value="Mount Albert">Mount Albert</option>
                  <option value="Mount Brydges">Mount Brydges</option>
                  <option value="Napanee">Napanee</option>
                  <option value="Napanee Downtown">Napanee Downtown</option>
                  <option value="Neebing">Neebing</option>
                  <option value="Nepean">Nepean</option>
                  <option value="New Hamburg">New Hamburg</option>
                  <option value="Newmarket">Newmarket</option>
                  <option value="Niagara Falls">Niagara Falls</option>
                  <option value="Nipissing District">Nipissing District</option>
                  <option value="Norfolk County">Norfolk County</option>
                  <option value="North Bay">North Bay</option>
                  <option value="North Perth">North Perth</option>
                  <option value="North York">North York</option>
                  <option value="Norwood">Norwood</option>
                  <option value="Oakville">Oakville</option>
                  <option value="Omemee">Omemee</option>
                  <option value="Orangeville">Orangeville</option>
                  <option value="Orillia">Orillia</option>
                  <option value="Osgoode">Osgoode</option>
                  <option value="Oshawa">Oshawa</option>
                  <option value="Ottawa">Ottawa</option>
                  <option value="Owen Sound">Owen Sound</option>
                  <option value="Paisley">Paisley</option>
                  <option value="Paris">Paris</option>
                  <option value="Parkhill">Parkhill</option>
                  <option value="Parry Sound">Parry Sound</option>
                  <option value="Parry Sound District">Parry Sound District</option>
                  <option value="Peel">Peel</option>
                  <option value="Pembroke">Pembroke</option>
                  <option value="Perth">Perth</option>
                  <option value="Petawawa">Petawawa</option>
                  <option value="Peterborough">Peterborough</option>
                  <option value="Petrolia">Petrolia</option>
                  <option value="Pickering">Pickering</option>
                  <option value="Picton">Picton</option>
                  <option value="Plantagenet">Plantagenet</option>
                  <option value="Plattsville">Plattsville</option>
                  <option value="Port Colborne">Port Colborne</option>
                  <option value="Port Hope">Port Hope</option>
                  <option value="Port Rowan">Port Rowan</option>
                  <option value="Port Stanley">Port Stanley</option>
                  <option value="Powassan">Powassan</option>
                  <option value="Prescott">Prescott</option>
                  <option value="Prince Edward">Prince Edward</option>
                  <option value="Queenswood Heights">Queenswood Heights</option>
                  <option value="Quinte West">Quinte West</option>
                  <option value="Rainy River District">Rainy River District</option>
                  <option value="Rayside-Balfour">Rayside-Balfour</option>
                  <option value="Red Lake">Red Lake</option>
                  <option value="Regional Municipality of Waterloo">Regional Municipality of Waterloo</option>
                  <option value="Renfrew">Renfrew</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Richmond Hill">Richmond Hill</option>
                  <option value="Ridgetown">Ridgetown</option>
                  <option value="Rockwood">Rockwood</option>
                  <option value="Russell">Russell</option>
                  <option value="Sarnia">Sarnia</option>
                  <option value="Sault Ste. Marie">Sault Ste. Marie</option>
                  <option value="Scarborough">Scarborough</option>
                  <option value="Seaforth">Seaforth</option>
                  <option value="Shelburne">Shelburne</option>
                  <option value="Simcoe">Simcoe</option>
                  <option value="Sioux Lookout">Sioux Lookout</option>
                  <option value="Skatepark">Skatepark</option>
                  <option value="Smiths Falls">Smiths Falls</option>
                  <option value="South Huron">South Huron</option>
                  <option value="South River">South River</option>
                  <option value="St. Catharines">St. Catharines</option>
                  <option value="St. George">St. George</option>
                  <option value="St. Thomas">St. Thomas</option>
                  <option value="Stirling">Stirling</option>
                  <option value="Stoney Point">Stoney Point</option>
                  <option value="Stratford">Stratford</option>
                  <option value="Sudbury">Sudbury</option>
                  <option value="Tavistock">Tavistock</option>
                  <option value="Temiskaming Shores">Temiskaming Shores</option>
                  <option value="Thessalon">Thessalon</option>
                  <option value="Thorold">Thorold</option>
                  <option value="Thunder Bay">Thunder Bay</option>
                  <option value="Thunder Bay District">Thunder Bay District</option>
                  <option value="Timiskaming District">Timiskaming District</option>
                  <option value="Timmins">Timmins</option>
                  <option value="Tobermory">Tobermory</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Toronto county">Toronto county</option>
                  <option value="Tottenham">Tottenham</option>
                  <option value="Tweed">Tweed</option>
                  <option value="Uxbridge">Uxbridge</option>
                  <option value="Valley East">Valley East</option>
                  <option value="Vanier">Vanier</option>
                  <option value="Vaughan">Vaughan</option>
                  <option value="Vineland">Vineland</option>
                  <option value="Virgil">Virgil</option>
                  <option value="Walpole Island">Walpole Island</option>
                  <option value="Wasaga Beach">Wasaga Beach</option>
                  <option value="Waterford">Waterford</option>
                  <option value="Waterloo">Waterloo</option>
                  <option value="Watford">Watford</option>
                  <option value="Wawa">Wawa</option>
                  <option value="Welland">Welland</option>
                  <option value="Wellesley">Wellesley</option>
                  <option value="Wendover">Wendover</option>
                  <option value="West Lorne">West Lorne</option>
                  <option value="Willowdale">Willowdale</option>
                  <option value="Winchester">Winchester</option>
                  <option value="Windsor">Windsor</option>
                  <option value="Wingham">Wingham</option>
                  <option value="Woodstock">Woodstock</option>
                  <option value="York">York</option>
                  <option value="Alberton">Alberton</option>
                  <option value="Belfast">Belfast</option>
                  <option value="Charlottetown">Charlottetown</option>
                  <option value="Cornwall">Cornwall</option>
                  <option value="Fallingbrook">Fallingbrook</option>
                  <option value="Kensington">Kensington</option>
                  <option value="Montague">Montague</option>
                  <option value="Souris">Souris</option>
                  <option value="Summerside">Summerside</option>
                  <option value="Abitibi-T??miscamingue">Abitibi-T??miscamingue</option>
                  <option value="Acton Vale">Acton Vale</option>
                  <option value="Adstock">Adstock</option>
                  <option value="Albanel">Albanel</option>
                  <option value="Alma">Alma</option>
                  <option value="Amos">Amos</option>
                  <option value="Amqui">Amqui</option>
                  <option value="Ange-Gardien">Ange-Gardien</option>
                  <option value="Asbestos">Asbestos</option>
                  <option value="Baie-Comeau">Baie-Comeau</option>
                  <option value="Baie-D'Urf??">Baie-D'Urf??</option>
                  <option value="Baie-Saint-Paul">Baie-Saint-Paul</option>
                  <option value="Barraute">Barraute</option>
                  <option value="Bas-Saint-Laurent">Bas-Saint-Laurent</option>
                  <option value="Beaconsfield">Beaconsfield</option>
                  <option value="Beauceville">Beauceville</option>
                  <option value="Beauharnois">Beauharnois</option>
                  <option value="Beaupr??">Beaupr??</option>
                  <option value="B??cancour">B??cancour</option>
                  <option value="Bedford">Bedford</option>
                  <option value="Beloeil">Beloeil</option>
                  <option value="Berthierville">Berthierville</option>
                  <option value="Blainville">Blainville</option>
                  <option value="Bois-des-Filion">Bois-des-Filion</option>
                  <option value="Boisbriand">Boisbriand</option>
                  <option value="Bonaventure">Bonaventure</option>
                  <option value="Boucherville">Boucherville</option>
                  <option value="Breakeyville">Breakeyville</option>
                  <option value="Bromont">Bromont</option>
                  <option value="Brossard">Brossard</option>
                  <option value="Brownsburg-Chatham">Brownsburg-Chatham</option>
                  <option value="Buckingham">Buckingham</option>
                  <option value="Cabano">Cabano</option>
                  <option value="Cacouna">Cacouna</option>
                  <option value="Candiac">Candiac</option>
                  <option value="Cantley">Cantley</option>
                  <option value="Cap-Chat">Cap-Chat</option>
                  <option value="Cap-Sant??">Cap-Sant??</option>
                  <option value="Capitale-Nationale">Capitale-Nationale</option>
                  <option value="Carignan">Carignan</option>
                  <option value="Carleton">Carleton</option>
                  <option value="Carleton-sur-Mer">Carleton-sur-Mer</option>
                  <option value="Centre-du-Qu??bec">Centre-du-Qu??bec</option>
                  <option value="Chambly">Chambly</option>
                  <option value="Chambord">Chambord</option>
                  <option value="Chandler">Chandler</option>
                  <option value="Chapais">Chapais</option>
                  <option value="Charlemagne">Charlemagne</option>
                  <option value="Ch??teau-Richer">Ch??teau-Richer</option>
                  <option value="Ch??teauguay">Ch??teauguay</option>
                  <option value="Chaudi??re-Appalaches">Chaudi??re-Appalaches</option>
                  <option value="Chertsey">Chertsey</option>
                  <option value="Chibougamau">Chibougamau</option>
                  <option value="Chute-aux-Outardes">Chute-aux-Outardes</option>
                  <option value="Coaticook">Coaticook</option>
                  <option value="Contrecoeur">Contrecoeur</option>
                  <option value="Cookshire">Cookshire</option>
                  <option value="Cookshire-Eaton">Cookshire-Eaton</option>
                  <option value="C??te-Nord">C??te-Nord</option>
                  <option value="C??te-Saint-Luc">C??te-Saint-Luc</option>
                  <option value="Coteau-du-Lac">Coteau-du-Lac</option>
                  <option value="Cowansville">Cowansville</option>
                  <option value="Crabtree">Crabtree</option>
                  <option value="Danville">Danville</option>
                  <option value="Daveluyville">Daveluyville</option>
                  <option value="Delson">Delson</option>
                  <option value="Deux-Montagnes">Deux-Montagnes</option>
                  <option value="Disraeli">Disraeli</option>
                  <option value="Dolbeau-Mistassini">Dolbeau-Mistassini</option>
                  <option value="Dollard-Des Ormeaux">Dollard-Des Ormeaux</option>
                  <option value="Donnacona">Donnacona</option>
                  <option value="Dorval">Dorval</option>
                  <option value="Drummondville">Drummondville</option>
                  <option value="Dunham">Dunham</option>
                  <option value="East Angus">East Angus</option>
                  <option value="East Broughton">East Broughton</option>
                  <option value="Farnham">Farnham</option>
                  <option value="Ferme-Neuve">Ferme-Neuve</option>
                  <option value="Fermont">Fermont</option>
                  <option value="Forestville">Forestville</option>
                  <option value="Fort-Coulonge">Fort-Coulonge</option>
                  <option value="Fossambault-sur-le-Lac">Fossambault-sur-le-Lac</option>
                  <option value="Franklin">Franklin</option>
                  <option value="Gasp??">Gasp??</option>
                  <option value="Gasp??sie-??les-de-la-Madeleine">Gasp??sie-??les-de-la-Madeleine</option>
                  <option value="Gatineau">Gatineau</option>
                  <option value="Godefroy">Godefroy</option>
                  <option value="Granby">Granby</option>
                  <option value="Hampstead">Hampstead</option>
                  <option value="Hauterive">Hauterive</option>
                  <option value="Havre-Saint-Pierre">Havre-Saint-Pierre</option>
                  <option value="H??rouxville">H??rouxville</option>
                  <option value="Hudson">Hudson</option>
                  <option value="Huntingdon">Huntingdon</option>
                  <option value="Joliette">Joliette</option>
                  <option value="Jonqui??re">Jonqui??re</option>
                  <option value="Kingsey Falls">Kingsey Falls</option>
                  <option value="Kirkland">Kirkland</option>
                  <option value="L'Ancienne-Lorette">L'Ancienne-Lorette</option>
                  <option value="L'Ange-Gardien">L'Ange-Gardien</option>
                  <option value="L'Ascension-de-Notre-Seigneur">L'Ascension-de-Notre-Seigneur</option>
                  <option value="L'Assomption">L'Assomption</option>
                  <option value="L'??piphanie">L'??piphanie</option>
                  <option value="L'??le-Perrot">L'??le-Perrot</option>
                  <option value="La Conception">La Conception</option>
                  <option value="La Haute-Saint-Charles">La Haute-Saint-Charles</option>
                  <option value="La Malbaie">La Malbaie</option>
                  <option value="La Minerve">La Minerve</option>
                  <option value="La Pocati??re">La Pocati??re</option>
                  <option value="La Prairie">La Prairie</option>
                  <option value="La Sarre">La Sarre</option>
                  <option value="La Tuque">La Tuque</option>
                  <option value="Labelle">Labelle</option>
                  <option value="Lac-Alouette">Lac-Alouette</option>
                  <option value="Lac-Brome">Lac-Brome</option>
                  <option value="Lac-Connelly">Lac-Connelly</option>
                  <option value="Lac-Lapierre">Lac-Lapierre</option>
                  <option value="Lac-M??gantic">Lac-M??gantic</option>
                  <option value="Lac-Simon">Lac-Simon</option>
                  <option value="Lachute">Lachute</option>
                  <option value="Lacolle">Lacolle</option>
                  <option value="Lanoraie">Lanoraie</option>
                  <option value="Laval">Laval</option>
                  <option value="Lavaltrie">Lavaltrie</option>
                  <option value="Le Bic">Le Bic</option>
                  <option value="le Plateau">le Plateau</option>
                  <option value="Lebel-sur-Qu??villon">Lebel-sur-Qu??villon</option>
                  <option value="Leblanc">Leblanc</option>
                  <option value="Les C??dres">Les C??dres</option>
                  <option value="Les Coteaux">Les Coteaux</option>
                  <option value="Les Escoumins">Les Escoumins</option>
                  <option value="L??vis">L??vis</option>
                  <option value="Lini??re">Lini??re</option>
                  <option value="Longueuil">Longueuil</option>
                  <option value="Lorraine">Lorraine</option>
                  <option value="Louiseville">Louiseville</option>
                  <option value="Luceville">Luceville</option>
                  <option value="Macamic">Macamic</option>
                  <option value="Magog">Magog</option>
                  <option value="Malartic">Malartic</option>
                  <option value="Maliotenam">Maliotenam</option>
                  <option value="Manawan">Manawan</option>
                  <option value="Mandeville">Mandeville</option>
                  <option value="Maniwaki">Maniwaki</option>
                  <option value="Maria">Maria</option>
                  <option value="Marieville">Marieville</option>
                  <option value="Mascouche">Mascouche</option>
                  <option value="Maskinong??">Maskinong??</option>
                  <option value="Matagami">Matagami</option>
                  <option value="Matane">Matane</option>
                  <option value="Mauricie">Mauricie</option>
                  <option value="Melocheville">Melocheville</option>
                  <option value="Mercier">Mercier</option>
                  <option value="M??tabetchouan">M??tabetchouan</option>
                  <option value="Metabetchouan-Lac-a-la-Croix">Metabetchouan-Lac-a-la-Croix</option>
                  <option value="Mirabel">Mirabel</option>
                  <option value="Mistissini">Mistissini</option>
                  <option value="Mont-Joli">Mont-Joli</option>
                  <option value="Mont-Laurier">Mont-Laurier</option>
                  <option value="Mont-Royal">Mont-Royal</option>
                  <option value="Mont-Saint-Gr??goire">Mont-Saint-Gr??goire</option>
                  <option value="Mont-Saint-Hilaire">Mont-Saint-Hilaire</option>
                  <option value="Mont-Tremblant">Mont-Tremblant</option>
                  <option value="Montmagny">Montmagny</option>
                  <option value="Montr??al">Montr??al</option>
                  <option value="Montr??al-Est">Montr??al-Est</option>
                  <option value="Montr??al-Ouest">Montr??al-Ouest</option>
                  <option value="Morin-Heights">Morin-Heights</option>
                  <option value="Napierville">Napierville</option>
                  <option value="Neuville">Neuville</option>
                  <option value="New Carlisle">New Carlisle</option>
                  <option value="New-Richmond">New-Richmond</option>
                  <option value="Nicolet">Nicolet</option>
                  <option value="Nord-du-Qu??bec">Nord-du-Qu??bec</option>
                  <option value="Normandin">Normandin</option>
                  <option value="Notre-Dame-de-Gr??ce">Notre-Dame-de-Gr??ce</option>
                  <option value="Notre-Dame-de-l'??le-Perrot">Notre-Dame-de-l'??le-Perrot</option>
                  <option value="Notre-Dame-des-Prairies">Notre-Dame-des-Prairies</option>
                  <option value="Notre-Dame-du-Lac">Notre-Dame-du-Lac</option>
                  <option value="Notre-Dame-du-Mont-Carmel">Notre-Dame-du-Mont-Carmel</option>
                  <option value="Oka">Oka</option>
                  <option value="Ormstown">Ormstown</option>
                  <option value="Otterburn Park">Otterburn Park</option>
                  <option value="Outaouais">Outaouais</option>
                  <option value="Papineauville">Papineauville</option>
                  <option value="Parc-Boutin">Parc-Boutin</option>
                  <option value="Piedmont">Piedmont</option>
                  <option value="Pierreville">Pierreville</option>
                  <option value="Pincourt">Pincourt</option>
                  <option value="Plessisville">Plessisville</option>
                  <option value="Poh??n??gamook">Poh??n??gamook</option>
                  <option value="Pointe-Calumet">Pointe-Calumet</option>
                  <option value="Pointe-Claire">Pointe-Claire</option>
                  <option value="Pointe-du-Lac">Pointe-du-Lac</option>
                  <option value="Pont Rouge">Pont Rouge</option>
                  <option value="Pont-Rouge">Pont-Rouge</option>
                  <option value="Port-Cartier">Port-Cartier</option>
                  <option value="Portneuf">Portneuf</option>
                  <option value="Pr??vost">Pr??vost</option>
                  <option value="Princeville">Princeville</option>
                  <option value="Qu??bec">Qu??bec</option>
                  <option value="Rawdon">Rawdon</option>
                  <option value="Repentigny">Repentigny</option>
                  <option value="Richelieu">Richelieu</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Rigaud">Rigaud</option>
                  <option value="Rimouski">Rimouski</option>
                  <option value="Rivi??re-du-Loup">Rivi??re-du-Loup</option>
                  <option value="Rivi??re-Rouge">Rivi??re-Rouge</option>
                  <option value="Roberval">Roberval</option>
                  <option value="Rock Forest">Rock Forest</option>
                  <option value="Rosem??re">Rosem??re</option>
                  <option value="Rougemont">Rougemont</option>
                  <option value="Rouyn-Noranda">Rouyn-Noranda</option>
                  <option value="Sacr??-Coeur">Sacr??-Coeur</option>
                  <option value="Saguenay">Saguenay</option>
                  <option value="Saint-Adolphe-d'Howard">Saint-Adolphe-d'Howard</option>
                  <option value="Saint-Alexandre">Saint-Alexandre</option>
                  <option value="Saint-Amable">Saint-Amable</option>
                  <option value="Saint-Ambroise">Saint-Ambroise</option>
                  <option value="Saint-Andr??-Avellin">Saint-Andr??-Avellin</option>
                  <option value="Saint-Anselme">Saint-Anselme</option>
                  <option value="Saint-Antoine-de-Tilly">Saint-Antoine-de-Tilly</option>
                  <option value="Saint-Augustin">Saint-Augustin</option>
                  <option value="Saint-Augustin-de-Desmaures">Saint-Augustin-de-Desmaures</option>
                  <option value="Saint-Barnab??-Sud">Saint-Barnab??-Sud</option>
                  <option value="Saint-Basile-le-Grand">Saint-Basile-le-Grand</option>
                  <option value="Saint-Boniface">Saint-Boniface</option>
                  <option value="Saint-Bruno">Saint-Bruno</option>
                  <option value="Saint-Bruno-de-Guigues">Saint-Bruno-de-Guigues</option>
                  <option value="Saint-Bruno-de-Montarville">Saint-Bruno-de-Montarville</option>
                  <option value="Saint-Canut">Saint-Canut</option>
                  <option value="Saint-C??saire">Saint-C??saire</option>
                  <option value="Saint-Charles">Saint-Charles</option>
                  <option value="Saint-C??me--Lini??re">Saint-C??me--Lini??re</option>
                  <option value="Saint-Constant">Saint-Constant</option>
                  <option value="Saint-Cyrille-de-Wendover">Saint-Cyrille-de-Wendover</option>
                  <option value="Saint-Damase">Saint-Damase</option>
                  <option value="Saint-Denis-sur-Richelieu">Saint-Denis-sur-Richelieu</option>
                  <option value="Saint-Donat-de-Montcalm">Saint-Donat-de-Montcalm</option>
                  <option value="Saint-??douard">Saint-??douard</option>
                  <option value="Saint-Elz??ar">Saint-Elz??ar</option>
                  <option value="Saint-??phrem-de-Beauce">Saint-??phrem-de-Beauce</option>
                  <option value="Saint-Eustache">Saint-Eustache</option>
                  <option value="Saint-F??licien">Saint-F??licien</option>
                  <option value="Saint-F??lix-de-Valois">Saint-F??lix-de-Valois</option>
                  <option value="Saint-Gabriel">Saint-Gabriel</option>
                  <option value="Saint-G??d??on">Saint-G??d??on</option>
                  <option value="Saint-Georges">Saint-Georges</option>
                  <option value="Saint-Germain-de-Grantham">Saint-Germain-de-Grantham</option>
                  <option value="Saint-Henri">Saint-Henri</option>
                  <option value="Saint-Hippolyte">Saint-Hippolyte</option>
                  <option value="Saint-Honor??">Saint-Honor??</option>
                  <option value="Saint-Hyacinthe">Saint-Hyacinthe</option>
                  <option value="Saint-Isidore">Saint-Isidore</option>
                  <option value="Saint-Jacques-le-Mineur">Saint-Jacques-le-Mineur</option>
                  <option value="Saint-Jean-Baptiste">Saint-Jean-Baptiste</option>
                  <option value="Saint-Jean-sur-Richelieu">Saint-Jean-sur-Richelieu</option>
                  <option value="Saint-J??r??me">Saint-J??r??me</option>
                  <option value="Saint-Joseph">Saint-Joseph</option>
                  <option value="Saint-Joseph-de-Beauce">Saint-Joseph-de-Beauce</option>
                  <option value="Saint-Joseph-de-Coleraine">Saint-Joseph-de-Coleraine</option>
                  <option value="Saint-Joseph-du-Lac">Saint-Joseph-du-Lac</option>
                  <option value="Saint-Lambert-de-Lauzon">Saint-Lambert-de-Lauzon</option>
                  <option value="Saint-Laurent">Saint-Laurent</option>
                  <option value="Saint-Lazare">Saint-Lazare</option>
                  <option value="Saint-L??onard">Saint-L??onard</option>
                  <option value="Saint-L??onard-d'Aston">Saint-L??onard-d'Aston</option>
                  <option value="Saint-Liboire">Saint-Liboire</option>
                  <option value="Saint-Lin-Laurentides">Saint-Lin-Laurentides</option>
                  <option value="Saint-Marc-des-Carri??res">Saint-Marc-des-Carri??res</option>
                  <option value="Saint-Mathieu">Saint-Mathieu</option>
                  <option value="Saint-Michel">Saint-Michel</option>
                  <option value="Saint-Michel-des-Saints">Saint-Michel-des-Saints</option>
                  <option value="Saint-Nazaire">Saint-Nazaire</option>
                  <option value="Saint-Norbert">Saint-Norbert</option>
                  <option value="Saint-Pac??me">Saint-Pac??me</option>
                  <option value="Saint-Pascal">Saint-Pascal</option>
                  <option value="Saint-Philippe-de-La Prairie">Saint-Philippe-de-La Prairie</option>
                  <option value="Saint-Pie">Saint-Pie</option>
                  <option value="Saint-Pierre-les-Becquets">Saint-Pierre-les-Becquets</option>
                  <option value="Saint-Prime">Saint-Prime</option>
                  <option value="Saint-Rapha??l">Saint-Rapha??l</option>
                  <option value="Saint-Raymond">Saint-Raymond</option>
                  <option value="Saint-R??mi">Saint-R??mi</option>
                  <option value="Saint-R??mi-de-Tingwick">Saint-R??mi-de-Tingwick</option>
                  <option value="Saint-Sauveur">Saint-Sauveur</option>
                  <option value="Saint-Sauveur-des-Monts">Saint-Sauveur-des-Monts</option>
                  <option value="Saint-Sim??on">Saint-Sim??on</option>
                  <option value="Saint-Thomas">Saint-Thomas</option>
                  <option value="Saint-Tite">Saint-Tite</option>
                  <option value="Saint-Victor">Saint-Victor</option>
                  <option value="Saint-Zotique">Saint-Zotique</option>
                  <option value="Sainte Catherine de la Jacques Cartier">Sainte Catherine de la Jacques Cartier</option>
                  <option value="Sainte-Ad??le">Sainte-Ad??le</option>
                  <option value="Sainte-Agathe-des-Monts">Sainte-Agathe-des-Monts</option>
                  <option value="Sainte-Anne-de-Bellevue">Sainte-Anne-de-Bellevue</option>
                  <option value="Sainte-Anne-des-Monts">Sainte-Anne-des-Monts</option>
                  <option value="Sainte-Anne-des-Plaines">Sainte-Anne-des-Plaines</option>
                  <option value="Sainte-B??atrix">Sainte-B??atrix</option>
                  <option value="Sainte-Catherine">Sainte-Catherine</option>
                  <option value="Sainte-Croix">Sainte-Croix</option>
                  <option value="Sainte-??lisabeth">Sainte-??lisabeth</option>
                  <option value="Sainte-Julie">Sainte-Julie</option>
                  <option value="Sainte-Julienne">Sainte-Julienne</option>
                  <option value="Sainte-Madeleine">Sainte-Madeleine</option>
                  <option value="Sainte-Marie">Sainte-Marie</option>
                  <option value="Sainte-Marthe-sur-le-Lac">Sainte-Marthe-sur-le-Lac</option>
                  <option value="Sainte-Martine">Sainte-Martine</option>
                  <option value="Sainte-Sophie">Sainte-Sophie</option>
                  <option value="Sainte-Th??cle">Sainte-Th??cle</option>
                  <option value="Sainte-Th??r??se">Sainte-Th??r??se</option>
                  <option value="Salaberry-de-Valleyfield">Salaberry-de-Valleyfield</option>
                  <option value="Salluit">Salluit</option>
                  <option value="Senneterre">Senneterre</option>
                  <option value="Sept-??les">Sept-??les</option>
                  <option value="Shannon">Shannon</option>
                  <option value="Shawinigan">Shawinigan</option>
                  <option value="Shawville">Shawville</option>
                  <option value="Sherbrooke">Sherbrooke</option>
                  <option value="Sorel-Tracy">Sorel-Tracy</option>
                  <option value="St-Jean-Port-Joli">St-Jean-Port-Joli</option>
                  <option value="Sutton">Sutton</option>
                  <option value="T??miscaming">T??miscaming</option>
                  <option value="Terrasse-des-Pins">Terrasse-des-Pins</option>
                  <option value="Terrebonne">Terrebonne</option>
                  <option value="Thetford-Mines">Thetford-Mines</option>
                  <option value="Thurso">Thurso</option>
                  <option value="Trois-Rivi??res">Trois-Rivi??res</option>
                  <option value="Val-d'Or">Val-d'Or</option>
                  <option value="Val-David">Val-David</option>
                  <option value="Val-des-Monts">Val-des-Monts</option>
                  <option value="Val-Morin">Val-Morin</option>
                  <option value="Valcourt">Valcourt</option>
                  <option value="Vall??e-Jonction">Vall??e-Jonction</option>
                  <option value="Varennes">Varennes</option>
                  <option value="Vaudreuil-Dorion">Vaudreuil-Dorion</option>
                  <option value="Venise-en-Qu??bec">Venise-en-Qu??bec</option>
                  <option value="Verch??res">Verch??res</option>
                  <option value="Victoriaville">Victoriaville</option>
                  <option value="Ville-Marie">Ville-Marie</option>
                  <option value="Wakefield">Wakefield</option>
                  <option value="Warwick">Warwick</option>
                  <option value="Waskaganish">Waskaganish</option>
                  <option value="Waswanipi">Waswanipi</option>
                  <option value="Waterloo">Waterloo</option>
                  <option value="Weedon Centre">Weedon Centre</option>
                  <option value="Westmount">Westmount</option>
                  <option value="Weymontachie">Weymontachie</option>
                  <option value="Windsor">Windsor</option>
                  <option value="Yamachiche">Yamachiche</option>
                  <option value="Assiniboia">Assiniboia</option>
                  <option value="Biggar">Biggar</option>
                  <option value="Canora">Canora</option>
                  <option value="Carlyle">Carlyle</option>
                  <option value="Dalmeny">Dalmeny</option>
                  <option value="Esterhazy">Esterhazy</option>
                  <option value="Estevan">Estevan</option>
                  <option value="Foam Lake">Foam Lake</option>
                  <option value="Gravelbourg">Gravelbourg</option>
                  <option value="Hudson Bay">Hudson Bay</option>
                  <option value="Humboldt">Humboldt</option>
                  <option value="Indian Head">Indian Head</option>
                  <option value="Kamsack">Kamsack</option>
                  <option value="Kerrobert">Kerrobert</option>
                  <option value="Kindersley">Kindersley</option>
                  <option value="La Ronge">La Ronge</option>
                  <option value="Langenburg">Langenburg</option>
                  <option value="Langham">Langham</option>
                  <option value="Lanigan">Lanigan</option>
                  <option value="Lumsden">Lumsden</option>
                  <option value="Macklin">Macklin</option>
                  <option value="Maple Creek">Maple Creek</option>
                  <option value="Martensville">Martensville</option>
                  <option value="Meadow Lake">Meadow Lake</option>
                  <option value="Melfort">Melfort</option>
                  <option value="Melville">Melville</option>
                  <option value="Moose Jaw">Moose Jaw</option>
                  <option value="Moosomin">Moosomin</option>
                  <option value="Nipawin">Nipawin</option>
                  <option value="North Battleford">North Battleford</option>
                  <option value="Outlook">Outlook</option>
                  <option value="Oxbow">Oxbow</option>
                  <option value="Pelican Narrows">Pelican Narrows</option>
                  <option value="Pilot Butte">Pilot Butte</option>
                  <option value="Preeceville">Preeceville</option>
                  <option value="Prince Albert">Prince Albert</option>
                  <option value="Regina">Regina</option>
                  <option value="Regina Beach">Regina Beach</option>
                  <option value="Rosetown">Rosetown</option>
                  <option value="Rosthern">Rosthern</option>
                  <option value="Saskatoon">Saskatoon</option>
                  <option value="Shaunavon">Shaunavon</option>
                  <option value="Shellbrook">Shellbrook</option>
                  <option value="Swift Current">Swift Current</option>
                  <option value="Tisdale">Tisdale</option>
                  <option value="Unity">Unity</option>
                  <option value="Wadena">Wadena</option>
                  <option value="Warman">Warman</option>
                  <option value="Watrous">Watrous</option>
                  <option value="Weyburn">Weyburn</option>
                  <option value="White City">White City</option>
                  <option value="Wilkie">Wilkie</option>
                  <option value="Wynyard">Wynyard</option>
                  <option value="Yorkton">Yorkton</option>
                  <option value="Dawson City">Dawson City</option>
                  <option value="Haines Junction">Haines Junction</option>
                  <option value="Watson Lake">Watson Lake</option>
                  <option value="Whitehorse">Whitehorse</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Select defaultValue={province} onChange={handleChange} name='state'>
                  <option selected>Select Province</option>
                  <option value="Alberta">Alberta</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="Manitoba">Manitoba</option>
                  <option value="New Brunswick">New Brunswick</option>
                  <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                  <option value="Nova Scotia">Nova Scotia</option>
                  <option value="Ontario">Ontario</option>
                  <option value="Prince Edward Island">Prince Edward Island</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Saskatchewan">Saskatchewan</option>
                  <option value="Northwest Territories">Northwest Territories</option>
                  <option value="Nunavut">Nunavut</option>
                  <option value="Yukon">Yukon</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Select isMulti onChange={doChange} options={attendees} name="employee" placeholder='Team Members'>Team Members</Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Select defaultValue={pManager} name='projectManager' onChange={handleChange}>
            <option value=''>Project Manager</option>
          {employees.length!==0?employees.map((option) => (
          <option value={option.Full_Name} >
            {option.Full_Name}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
      <Form.Select defaultValue={state} name='status' onChange={handleChange}>
        <option value="">Status</option>
        <option value="Not Started Yet">Not Started Yet</option>
        <option value="Completed">Completed</option>
        <option value="Ongoing">Ongoing</option>
      </Form.Select>
      </Form.Group>
      </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Relevent Files</Form.Label>
          <Form.Control name='attachments' type="file" placeholder="Attachments*" onChange={handleChange} required />
          </Form.Group>
        </Row>
      <Button className='submit-btn' variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project Updated Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1} >
        <Modal.Header closeButton>
          <Modal.Title>Error Occured</Modal.Title>
        </Modal.Header>
        <Modal.Body>Check Your Input Fields Properly</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateProjectForm