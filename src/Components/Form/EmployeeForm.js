import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'

// import TextField from '@material-ui/core/TextField';
function EmployeeForm() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [dept, setdept] = useState('');
    const [jobTitles, setjobTitles] = useState([])
    useEffect(() => {
        const call = async () => {
          await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/jobTitles', {headers:{'auth':'Rose '+ localStorage.getItem('auth'),'department':dept }}).then((res) => {
            setjobTitles(res.data.res)
            console.log(res.data);
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[dept])
    const [form, setform] = useState({
      'salutation':"",
      'firstname':"",
      'lastname':"",
      'department':"",
      'jobtitle':"",
      'directManager':"",
      'emailWork':"",
      'emailPersonal':"",
      'joiningDate':'',
      'business':"",
      'mobile':"",
      'address':"",
      'city':"",
      'state':"",
      'zip':"",
      'country':"",
      'expertise':"",
      'webpage':"",
      'resume':"",
      'attachments':"",
      'notes':"",
      'birthday':"",
      'anniversary':"",
      'sports':"",
      'activity':"",
      'beverage':"",
      'alcohol':"",
      'travelDest':"",
      'spouseName':"",
      'children':"",
      'tvShow':"",
      'movie':"",
      'actor':"",
      'dislikes':"",
      'proficiency':"",
      'interests':"",
      'cocurricular':"",
      'trainings':"",
      'strengths':"",
      'weakness':"",
      'activeIndex':"",
      'username':"",
      'password':"",
      'confpassword':"",
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newForm = form
      if(name==='department') {
        setdept(value)
      }
      // if(name==="joiningDate" || name==="resignationDate") {
      //   console.log(value);
      //   value = formatDate(value);
      // }
      // if('password' && name==="confpassword") {
      //   if(form.password!==value) {
      //     throw "Passwords Don't Match";
      //   }
      // }
      newForm[name] = value
      setform(newForm);
    };
    const navigate = useNavigate();
    const [nav, setnav] = useState(1)
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split('-');
      let newDate = `${day}-${month}-${year}`;
      return newDate;
    };
    // const handleChange1=()=>{ {handleChange1}; reformatDate();}
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmit(true);
      axios.post('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/add/employee', {
        'username':form.username,
        'password':form.password,
        'department':form.department,
        'salutation':form.salutation,
        'firstName':form.firstname,
        'lastName':form.lastname,
        'directManagerId':form.directManager,
        'joiningDate':form.joiningDate,
        'resignationDate':form.resignationDate,
        'emailWork':form.emailWork,
        'emailPersonal':form.emailPersonal,
        'jobTitleId':form.jobtitle,
        'business':form.business,
        'mobile':form.mobile,
        'address':form.address,
        'city':form.city,
        'state':form.state,
        'zip':form.zip,
        'country':form.country,
        'expertise':form.expertise,
        'webpage':form.webpage,
        'notes':form.notes,
        'resume':form.resume,
        'attachments':form.attachments,
        'proficiency':form.proficiency,
        'interest':form.interests,
        'cocurricular':form.cocurricular,
        'training':form.trainings,
        'birthday':form.birthday,
        'anniversary':form.anniversary,
        'sports':form.sports,
        'activities':form.activity,
        'beverage':form.beverage,
        'alcohol':form.alcohol,
        'travelDestination':form.travelDest,
        'spouseName':form.spouseName,
        'children':form.children,
        'tvShow':form.tvShow,
        'movies':form.movie,
        'actor':form.actor,
        'tvShow':form.tvShow,
        'dislikes':form.dislikes,
        'strengths':form.strengths,
        'weaknesses':form.weakness,
        'socialActiveIndex':form.activeIndex
      },
       {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
        console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    };
    const [employees, setemployees] = useState([])
    useEffect(() => {
      const call = async () => {
        await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/employeeNames', {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          setemployees(res.data.res)
        }).catch((err) => {
          console.log(err)
        })
      }
      call()
    },[])
    const departments=[
      {
        value: "Admin",
        label: "Admin"
      },
      {
        value: "Engineer",
        label: "Engineer"
      },
      {
        value: "Manager",
        label: "Manager"
      },
      {
        value: "Sales",
        label: "Sales"
      },
      {
        value: "Logistics",
        label: "Logistics"
      },
      {
        value: "Supplier",
        label: "Supplier"
      },
      {
        value: "IT",
        label: "IT"
      },
    ]
    const admin=[
      {
        value: 'Senior Engineer',
        label:'Senior Engineer'
      }
    ]
    const engineer=[
      {
        value: 'Engineer-in-Training',
        label:'Engineer-in-Training'
      }
    ]
    const manager=[
      {
        value: 'Engineer',
        label:'Engineer'
      },
      {
        value:'Intern',
        label:'Intern'
      }
    ]
    const sales=[
      {
        value: 'null',
        label:'None'
      }
    ]
    const logistics=[
      {
        value: 'null',
        label:'None'
      }
    ]
    const supplier=[
      {
        value: 'null',
        label:'None'
      }
    ]
    const it=[
      {
        value: 'Sr Engineer',
        label:'Sr Engineer'
      }
    ]
    const [selected, setSelected] = useState("");

  // let type=[];
 const [type, settype] = useState([])
  if (selected === "Admin") {
    // type = admin;
    settype(admin)
    console.log(type);
  } else if (selected === "Engineer") {
    // type = engineer;
    settype(engineer)
  } else if (selected === "Manager") {
    // type = manager;
    settype(manager)
  } else if (selected === "Sales") {
    // type = sales;
    settype(sales)
  } else if (selected === "Logistics") {
    // type = logistics;
    settype(logistics)
  } else if (selected === "Supplier") {
    // type = supplier;
    settype(supplier)
  } else if (selected === "IT") {
    // type = it;
    settype(it)
  }

  const changeSelectOptionHandler = (event) => {
    setSelected(event.value);
  };
  return (
    <>
    <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Add Employee</h1>
  <Form className='form-main'>
      <Row className="mb-4">
      <Form.Group as={Col} >
          {/* <Form.Control name='salutation' type="text" placeholder="Salutation" onChange={handleChange} /> */}
          <Form.Select name='salutation' type="text" placeholder="Salutation" onChange={handleChange} >
            <option value="">Salutation</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='firstname' type="text" placeholder="First Name*" onChange={handleChange} required/>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control name='lastname' type="text" placeholder="Last Name" onChange={handleChange} />
        </Form.Group>
      </Row>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Select name='department' type="text" onChange={handleChange}  required>
            <option value="">Select Department</option>
            {departments.map((option) => (
            <option value={option.value}>
              {option.label}
            </option>
        ))}
          </Form.Select>
          </Form.Group>
        <Form.Group as={Col} >
          {/* <Form.Control name='jobtitle' type="text" placeholder="Job Title*" onChange={handleChange} required/> */}
          <Form.Select name='jobtitle' type="text" onChange={handleChange} required>
            <option value="">Job Title</option>
            {jobTitles.map((option) => (
            <option value={option.Title_ID}>
              {option.Title}
            </option>
        ))}
          </Form.Select>
      </Form.Group>
      <Form.Group as={Col}>
        <Button style={{'width':'100%','backgroundColor':'grey','border':'none'}} onClick={(e) => {navigate("/jobTitleform")}}>Add Job Title</Button>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}/*  controlId="formGridEmail" */>
        <Form.Select onChange={handleChange} name='directManager' required>
          <option value="">Direct Manager</option>
        {employees.map((option) => (
          <option value={option.Employee_ID}>
            {option.Full_Name}
          </option>
        ))}
        </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail" >
          <Form.Control name='emailWork' type="email" placeholder="Email Work*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail" >
          <Form.Control name='emailPersonal' type="email" placeholder="Email Personal" onChange={handleChange} />
        </Form.Group>
      </Row>
      
      <Row className="mb-4">
        <Form.Group as={Col}>
        <Form.Label>Joining Date</Form.Label>
          <Form.Control name="joiningDate" type="date" placeholder="Joining Date*" onChange={handleChange}/>
        </Form.Group>

        {/* <Form.Group as={Col}>
        <Form.Label>Resignation Date</Form.Label>
          <Form.Control name="resignationDate" type="date" placeholder="Resignation Date" onChange={handleChange} />
        </Form.Group> */}
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='business' type="tel" placeholder="Business Phone*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='mobile' type="tel" placeholder="Mobile Phone*" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      <Form.Group className="mb-4" controlId="formGridAddress1">
        <Form.Control name='address' placeholder="Address" onChange={handleChange} />
      </Form.Group>

      <Row className="mb-4">
      <Form.Group as={Col} controlId="formGridCity">
        
        <Form.Select onChange={handleChange} name='city' required>
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
                  <option value="Barrière">Barrière</option>
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
                  <option value="Ile des Chênes">Ile des Chênes</option>
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
                  <option value="Saint-Léonard">Saint-Léonard</option>
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
                  <option value="Behchokǫ̀">Behchokǫ̀</option>
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
                  <option value="Abitibi-Témiscamingue">Abitibi-Témiscamingue</option>
                  <option value="Acton Vale">Acton Vale</option>
                  <option value="Adstock">Adstock</option>
                  <option value="Albanel">Albanel</option>
                  <option value="Alma">Alma</option>
                  <option value="Amos">Amos</option>
                  <option value="Amqui">Amqui</option>
                  <option value="Ange-Gardien">Ange-Gardien</option>
                  <option value="Asbestos">Asbestos</option>
                  <option value="Baie-Comeau">Baie-Comeau</option>
                  <option value="Baie-D'Urfé">Baie-D'Urfé</option>
                  <option value="Baie-Saint-Paul">Baie-Saint-Paul</option>
                  <option value="Barraute">Barraute</option>
                  <option value="Bas-Saint-Laurent">Bas-Saint-Laurent</option>
                  <option value="Beaconsfield">Beaconsfield</option>
                  <option value="Beauceville">Beauceville</option>
                  <option value="Beauharnois">Beauharnois</option>
                  <option value="Beaupré">Beaupré</option>
                  <option value="Bécancour">Bécancour</option>
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
                  <option value="Cap-Santé">Cap-Santé</option>
                  <option value="Capitale-Nationale">Capitale-Nationale</option>
                  <option value="Carignan">Carignan</option>
                  <option value="Carleton">Carleton</option>
                  <option value="Carleton-sur-Mer">Carleton-sur-Mer</option>
                  <option value="Centre-du-Québec">Centre-du-Québec</option>
                  <option value="Chambly">Chambly</option>
                  <option value="Chambord">Chambord</option>
                  <option value="Chandler">Chandler</option>
                  <option value="Chapais">Chapais</option>
                  <option value="Charlemagne">Charlemagne</option>
                  <option value="Château-Richer">Château-Richer</option>
                  <option value="Châteauguay">Châteauguay</option>
                  <option value="Chaudière-Appalaches">Chaudière-Appalaches</option>
                  <option value="Chertsey">Chertsey</option>
                  <option value="Chibougamau">Chibougamau</option>
                  <option value="Chute-aux-Outardes">Chute-aux-Outardes</option>
                  <option value="Coaticook">Coaticook</option>
                  <option value="Contrecoeur">Contrecoeur</option>
                  <option value="Cookshire">Cookshire</option>
                  <option value="Cookshire-Eaton">Cookshire-Eaton</option>
                  <option value="Côte-Nord">Côte-Nord</option>
                  <option value="Côte-Saint-Luc">Côte-Saint-Luc</option>
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
                  <option value="Gaspé">Gaspé</option>
                  <option value="Gaspésie-Îles-de-la-Madeleine">Gaspésie-Îles-de-la-Madeleine</option>
                  <option value="Gatineau">Gatineau</option>
                  <option value="Godefroy">Godefroy</option>
                  <option value="Granby">Granby</option>
                  <option value="Hampstead">Hampstead</option>
                  <option value="Hauterive">Hauterive</option>
                  <option value="Havre-Saint-Pierre">Havre-Saint-Pierre</option>
                  <option value="Hérouxville">Hérouxville</option>
                  <option value="Hudson">Hudson</option>
                  <option value="Huntingdon">Huntingdon</option>
                  <option value="Joliette">Joliette</option>
                  <option value="Jonquière">Jonquière</option>
                  <option value="Kingsey Falls">Kingsey Falls</option>
                  <option value="Kirkland">Kirkland</option>
                  <option value="L'Ancienne-Lorette">L'Ancienne-Lorette</option>
                  <option value="L'Ange-Gardien">L'Ange-Gardien</option>
                  <option value="L'Ascension-de-Notre-Seigneur">L'Ascension-de-Notre-Seigneur</option>
                  <option value="L'Assomption">L'Assomption</option>
                  <option value="L'Épiphanie">L'Épiphanie</option>
                  <option value="L'Île-Perrot">L'Île-Perrot</option>
                  <option value="La Conception">La Conception</option>
                  <option value="La Haute-Saint-Charles">La Haute-Saint-Charles</option>
                  <option value="La Malbaie">La Malbaie</option>
                  <option value="La Minerve">La Minerve</option>
                  <option value="La Pocatière">La Pocatière</option>
                  <option value="La Prairie">La Prairie</option>
                  <option value="La Sarre">La Sarre</option>
                  <option value="La Tuque">La Tuque</option>
                  <option value="Labelle">Labelle</option>
                  <option value="Lac-Alouette">Lac-Alouette</option>
                  <option value="Lac-Brome">Lac-Brome</option>
                  <option value="Lac-Connelly">Lac-Connelly</option>
                  <option value="Lac-Lapierre">Lac-Lapierre</option>
                  <option value="Lac-Mégantic">Lac-Mégantic</option>
                  <option value="Lac-Simon">Lac-Simon</option>
                  <option value="Lachute">Lachute</option>
                  <option value="Lacolle">Lacolle</option>
                  <option value="Lanoraie">Lanoraie</option>
                  <option value="Laval">Laval</option>
                  <option value="Lavaltrie">Lavaltrie</option>
                  <option value="Le Bic">Le Bic</option>
                  <option value="le Plateau">le Plateau</option>
                  <option value="Lebel-sur-Quévillon">Lebel-sur-Quévillon</option>
                  <option value="Leblanc">Leblanc</option>
                  <option value="Les Cèdres">Les Cèdres</option>
                  <option value="Les Coteaux">Les Coteaux</option>
                  <option value="Les Escoumins">Les Escoumins</option>
                  <option value="Lévis">Lévis</option>
                  <option value="Linière">Linière</option>
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
                  <option value="Maskinongé">Maskinongé</option>
                  <option value="Matagami">Matagami</option>
                  <option value="Matane">Matane</option>
                  <option value="Mauricie">Mauricie</option>
                  <option value="Melocheville">Melocheville</option>
                  <option value="Mercier">Mercier</option>
                  <option value="Métabetchouan">Métabetchouan</option>
                  <option value="Metabetchouan-Lac-a-la-Croix">Metabetchouan-Lac-a-la-Croix</option>
                  <option value="Mirabel">Mirabel</option>
                  <option value="Mistissini">Mistissini</option>
                  <option value="Mont-Joli">Mont-Joli</option>
                  <option value="Mont-Laurier">Mont-Laurier</option>
                  <option value="Mont-Royal">Mont-Royal</option>
                  <option value="Mont-Saint-Grégoire">Mont-Saint-Grégoire</option>
                  <option value="Mont-Saint-Hilaire">Mont-Saint-Hilaire</option>
                  <option value="Mont-Tremblant">Mont-Tremblant</option>
                  <option value="Montmagny">Montmagny</option>
                  <option value="Montréal">Montréal</option>
                  <option value="Montréal-Est">Montréal-Est</option>
                  <option value="Montréal-Ouest">Montréal-Ouest</option>
                  <option value="Morin-Heights">Morin-Heights</option>
                  <option value="Napierville">Napierville</option>
                  <option value="Neuville">Neuville</option>
                  <option value="New Carlisle">New Carlisle</option>
                  <option value="New-Richmond">New-Richmond</option>
                  <option value="Nicolet">Nicolet</option>
                  <option value="Nord-du-Québec">Nord-du-Québec</option>
                  <option value="Normandin">Normandin</option>
                  <option value="Notre-Dame-de-Grâce">Notre-Dame-de-Grâce</option>
                  <option value="Notre-Dame-de-l'Île-Perrot">Notre-Dame-de-l'Île-Perrot</option>
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
                  <option value="Pohénégamook">Pohénégamook</option>
                  <option value="Pointe-Calumet">Pointe-Calumet</option>
                  <option value="Pointe-Claire">Pointe-Claire</option>
                  <option value="Pointe-du-Lac">Pointe-du-Lac</option>
                  <option value="Pont Rouge">Pont Rouge</option>
                  <option value="Pont-Rouge">Pont-Rouge</option>
                  <option value="Port-Cartier">Port-Cartier</option>
                  <option value="Portneuf">Portneuf</option>
                  <option value="Prévost">Prévost</option>
                  <option value="Princeville">Princeville</option>
                  <option value="Québec">Québec</option>
                  <option value="Rawdon">Rawdon</option>
                  <option value="Repentigny">Repentigny</option>
                  <option value="Richelieu">Richelieu</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Rigaud">Rigaud</option>
                  <option value="Rimouski">Rimouski</option>
                  <option value="Rivière-du-Loup">Rivière-du-Loup</option>
                  <option value="Rivière-Rouge">Rivière-Rouge</option>
                  <option value="Roberval">Roberval</option>
                  <option value="Rock Forest">Rock Forest</option>
                  <option value="Rosemère">Rosemère</option>
                  <option value="Rougemont">Rougemont</option>
                  <option value="Rouyn-Noranda">Rouyn-Noranda</option>
                  <option value="Sacré-Coeur">Sacré-Coeur</option>
                  <option value="Saguenay">Saguenay</option>
                  <option value="Saint-Adolphe-d'Howard">Saint-Adolphe-d'Howard</option>
                  <option value="Saint-Alexandre">Saint-Alexandre</option>
                  <option value="Saint-Amable">Saint-Amable</option>
                  <option value="Saint-Ambroise">Saint-Ambroise</option>
                  <option value="Saint-André-Avellin">Saint-André-Avellin</option>
                  <option value="Saint-Anselme">Saint-Anselme</option>
                  <option value="Saint-Antoine-de-Tilly">Saint-Antoine-de-Tilly</option>
                  <option value="Saint-Augustin">Saint-Augustin</option>
                  <option value="Saint-Augustin-de-Desmaures">Saint-Augustin-de-Desmaures</option>
                  <option value="Saint-Barnabé-Sud">Saint-Barnabé-Sud</option>
                  <option value="Saint-Basile-le-Grand">Saint-Basile-le-Grand</option>
                  <option value="Saint-Boniface">Saint-Boniface</option>
                  <option value="Saint-Bruno">Saint-Bruno</option>
                  <option value="Saint-Bruno-de-Guigues">Saint-Bruno-de-Guigues</option>
                  <option value="Saint-Bruno-de-Montarville">Saint-Bruno-de-Montarville</option>
                  <option value="Saint-Canut">Saint-Canut</option>
                  <option value="Saint-Césaire">Saint-Césaire</option>
                  <option value="Saint-Charles">Saint-Charles</option>
                  <option value="Saint-Côme--Linière">Saint-Côme--Linière</option>
                  <option value="Saint-Constant">Saint-Constant</option>
                  <option value="Saint-Cyrille-de-Wendover">Saint-Cyrille-de-Wendover</option>
                  <option value="Saint-Damase">Saint-Damase</option>
                  <option value="Saint-Denis-sur-Richelieu">Saint-Denis-sur-Richelieu</option>
                  <option value="Saint-Donat-de-Montcalm">Saint-Donat-de-Montcalm</option>
                  <option value="Saint-Édouard">Saint-Édouard</option>
                  <option value="Saint-Elzéar">Saint-Elzéar</option>
                  <option value="Saint-Éphrem-de-Beauce">Saint-Éphrem-de-Beauce</option>
                  <option value="Saint-Eustache">Saint-Eustache</option>
                  <option value="Saint-Félicien">Saint-Félicien</option>
                  <option value="Saint-Félix-de-Valois">Saint-Félix-de-Valois</option>
                  <option value="Saint-Gabriel">Saint-Gabriel</option>
                  <option value="Saint-Gédéon">Saint-Gédéon</option>
                  <option value="Saint-Georges">Saint-Georges</option>
                  <option value="Saint-Germain-de-Grantham">Saint-Germain-de-Grantham</option>
                  <option value="Saint-Henri">Saint-Henri</option>
                  <option value="Saint-Hippolyte">Saint-Hippolyte</option>
                  <option value="Saint-Honoré">Saint-Honoré</option>
                  <option value="Saint-Hyacinthe">Saint-Hyacinthe</option>
                  <option value="Saint-Isidore">Saint-Isidore</option>
                  <option value="Saint-Jacques-le-Mineur">Saint-Jacques-le-Mineur</option>
                  <option value="Saint-Jean-Baptiste">Saint-Jean-Baptiste</option>
                  <option value="Saint-Jean-sur-Richelieu">Saint-Jean-sur-Richelieu</option>
                  <option value="Saint-Jérôme">Saint-Jérôme</option>
                  <option value="Saint-Joseph">Saint-Joseph</option>
                  <option value="Saint-Joseph-de-Beauce">Saint-Joseph-de-Beauce</option>
                  <option value="Saint-Joseph-de-Coleraine">Saint-Joseph-de-Coleraine</option>
                  <option value="Saint-Joseph-du-Lac">Saint-Joseph-du-Lac</option>
                  <option value="Saint-Lambert-de-Lauzon">Saint-Lambert-de-Lauzon</option>
                  <option value="Saint-Laurent">Saint-Laurent</option>
                  <option value="Saint-Lazare">Saint-Lazare</option>
                  <option value="Saint-Léonard">Saint-Léonard</option>
                  <option value="Saint-Léonard-d'Aston">Saint-Léonard-d'Aston</option>
                  <option value="Saint-Liboire">Saint-Liboire</option>
                  <option value="Saint-Lin-Laurentides">Saint-Lin-Laurentides</option>
                  <option value="Saint-Marc-des-Carrières">Saint-Marc-des-Carrières</option>
                  <option value="Saint-Mathieu">Saint-Mathieu</option>
                  <option value="Saint-Michel">Saint-Michel</option>
                  <option value="Saint-Michel-des-Saints">Saint-Michel-des-Saints</option>
                  <option value="Saint-Nazaire">Saint-Nazaire</option>
                  <option value="Saint-Norbert">Saint-Norbert</option>
                  <option value="Saint-Pacôme">Saint-Pacôme</option>
                  <option value="Saint-Pascal">Saint-Pascal</option>
                  <option value="Saint-Philippe-de-La Prairie">Saint-Philippe-de-La Prairie</option>
                  <option value="Saint-Pie">Saint-Pie</option>
                  <option value="Saint-Pierre-les-Becquets">Saint-Pierre-les-Becquets</option>
                  <option value="Saint-Prime">Saint-Prime</option>
                  <option value="Saint-Raphaël">Saint-Raphaël</option>
                  <option value="Saint-Raymond">Saint-Raymond</option>
                  <option value="Saint-Rémi">Saint-Rémi</option>
                  <option value="Saint-Rémi-de-Tingwick">Saint-Rémi-de-Tingwick</option>
                  <option value="Saint-Sauveur">Saint-Sauveur</option>
                  <option value="Saint-Sauveur-des-Monts">Saint-Sauveur-des-Monts</option>
                  <option value="Saint-Siméon">Saint-Siméon</option>
                  <option value="Saint-Thomas">Saint-Thomas</option>
                  <option value="Saint-Tite">Saint-Tite</option>
                  <option value="Saint-Victor">Saint-Victor</option>
                  <option value="Saint-Zotique">Saint-Zotique</option>
                  <option value="Sainte Catherine de la Jacques Cartier">Sainte Catherine de la Jacques Cartier</option>
                  <option value="Sainte-Adèle">Sainte-Adèle</option>
                  <option value="Sainte-Agathe-des-Monts">Sainte-Agathe-des-Monts</option>
                  <option value="Sainte-Anne-de-Bellevue">Sainte-Anne-de-Bellevue</option>
                  <option value="Sainte-Anne-des-Monts">Sainte-Anne-des-Monts</option>
                  <option value="Sainte-Anne-des-Plaines">Sainte-Anne-des-Plaines</option>
                  <option value="Sainte-Béatrix">Sainte-Béatrix</option>
                  <option value="Sainte-Catherine">Sainte-Catherine</option>
                  <option value="Sainte-Croix">Sainte-Croix</option>
                  <option value="Sainte-Élisabeth">Sainte-Élisabeth</option>
                  <option value="Sainte-Julie">Sainte-Julie</option>
                  <option value="Sainte-Julienne">Sainte-Julienne</option>
                  <option value="Sainte-Madeleine">Sainte-Madeleine</option>
                  <option value="Sainte-Marie">Sainte-Marie</option>
                  <option value="Sainte-Marthe-sur-le-Lac">Sainte-Marthe-sur-le-Lac</option>
                  <option value="Sainte-Martine">Sainte-Martine</option>
                  <option value="Sainte-Sophie">Sainte-Sophie</option>
                  <option value="Sainte-Thècle">Sainte-Thècle</option>
                  <option value="Sainte-Thérèse">Sainte-Thérèse</option>
                  <option value="Salaberry-de-Valleyfield">Salaberry-de-Valleyfield</option>
                  <option value="Salluit">Salluit</option>
                  <option value="Senneterre">Senneterre</option>
                  <option value="Sept-Îles">Sept-Îles</option>
                  <option value="Shannon">Shannon</option>
                  <option value="Shawinigan">Shawinigan</option>
                  <option value="Shawville">Shawville</option>
                  <option value="Sherbrooke">Sherbrooke</option>
                  <option value="Sorel-Tracy">Sorel-Tracy</option>
                  <option value="St-Jean-Port-Joli">St-Jean-Port-Joli</option>
                  <option value="Sutton">Sutton</option>
                  <option value="Témiscaming">Témiscaming</option>
                  <option value="Terrasse-des-Pins">Terrasse-des-Pins</option>
                  <option value="Terrebonne">Terrebonne</option>
                  <option value="Thetford-Mines">Thetford-Mines</option>
                  <option value="Thurso">Thurso</option>
                  <option value="Trois-Rivières">Trois-Rivières</option>
                  <option value="Val-d'Or">Val-d'Or</option>
                  <option value="Val-David">Val-David</option>
                  <option value="Val-des-Monts">Val-des-Monts</option>
                  <option value="Val-Morin">Val-Morin</option>
                  <option value="Valcourt">Valcourt</option>
                  <option value="Vallée-Jonction">Vallée-Jonction</option>
                  <option value="Varennes">Varennes</option>
                  <option value="Vaudreuil-Dorion">Vaudreuil-Dorion</option>
                  <option value="Venise-en-Québec">Venise-en-Québec</option>
                  <option value="Verchères">Verchères</option>
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
        <Form.Select onChange={handleChange} name='state'>
                  <option selected>Select Province</option>
                  <option value="Alberta">Alberta</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="Manitoba">Manitoba</option>
                  <option value="New Brunswick">New Brunswick</option>
                  <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                  <option value="Nova Scotia">Nova Scotia</option>
                  <option value="Ontario" selected>Ontario</option>
                  <option value="Prince Edward Island">Prince Edward Island</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Saskatchewan">Saskatchewan</option>
                  <option value="Northwest Territories">Northwest Territories</option>
                  <option value="Nunavut">Nunavut</option>
                  <option value="Yukon">Yukon</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Select name='country' defaultValue="Canada"  onChange={handleChange} >
          <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada" selected>Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                    <option value="Korea, Republic of">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States" >United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Control name='zip' type='text' pattern="[0-9]{6}" placeholder='Pin Code' onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
          <Form.Control name='expertise' type='text' placeholder='Expertise' onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='webpage' type="url" placeholder="Web-Page" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Label>Resume</Form.Label>
          <Form.Control name='resume' type="file" placeholder="Resume" onChange={handleChange} />
        </Form.Group>
        
        <Form.Group as={Col}>
          <Form.Label>Attachment</Form.Label>
          <Form.Control name='attachments' type="file" placeholder="Attachments" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Control name='notes' as="textarea" rows={1} type="text" placeholder="Notes" onChange={handleChange} />
        </Form.Group>


      {/* personal details */}
      <h2 style={{'margin':'auto', 'width':'30%', 'marginTop':'5vh', 'marginBottom':'2vh','textDecoration':'underline'}}>Personal Details</h2>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Label>Birthday</Form.Label>
          <Form.Control name='birthday' type="date" placeholder="Birthday" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Anniversary</Form.Label>
          <Form.Control name='anniversary' type="date" placeholder="Anniversary" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          {/* <Form.Label>Birthday</Form.Label> */}
          {/* <Form.Control name='sports' type="date" placeholder="Birthday" onChange={handleChange} /> */}
          <Form.Select onChange={handleChange} name='sports'>
            <option value="">Select Sports</option>
            <option value="Soccer">Soccer</option>
            <option value="Hockey">Hockey</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Boxing">Boxing</option>
            <option value="MMA">MMA</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
        {/* <Form.Label>Anniversary</Form.Label> */}
        {/* <Form.Control name='anniversary' type="date" placeholder="Anniversary" onChange={handleChange} /> */}
        <Form.Select onChange={handleChange} name='activity'>
          <option value="">Select Activity</option>
          <option value="Walking">Walking</option>
          <option value="Running">Running</option>
          <option value="Travelling">Travelling</option>
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Select onChange={handleChange} name='beverage'>
            <option value="">Select Beverage</option>
            <option value="Coffee">Coffee</option>
            <option value="Tea">Tea</option>
            <option value="Ice Cap">Ice Cap</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Select onChange={handleChange} name='alcohol'>
          <option value="">Select Alcohol</option>
          <option value="Vodka">Vodka</option>
          <option value="Scotch">Scotch</option>
          <option value="Beer">Beer</option>
          <option value="Tequila">Tequila</option>
          <option value="Rum">Rum</option>
          <option value="Cocktail">Cocktail</option>
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='travelDest' type='text' placeholder='Travel Destination' onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='spouseName' type='text' placeholder='Spouse Name' onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='children' type='text' placeholder='Children' onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='tvShow' type='text' placeholder='TV Show' onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='movie' type='text' placeholder='Movie' onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='actor' type='text' placeholder='Actor' onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='dislikes' type='text' placeholder='Dislikes' onChange={handleChange}/>
        </Form.Group>
      </Row>

      <h2 style={{'margin':'auto', 'width':'25%', 'marginTop':'5vh', 'marginBottom':'4vh','textDecoration':'underline'}}>Employee Skills</h2>
      <Row className="mb-4">
        <Form.Group as={Col}>
          {/* <Form.Control name='tvShow' type='text' placeholder='TV Show' onChange={handleChange}/> */}
          <Form.Select name='proficiency' onChange={handleChange}>
            <option value="">Proficiency</option>
            <option value="AutoCAD">AutoCAD</option>
            <option value="Civil3D">Civil3D</option>
            <option value="Microstation">Microstation</option>
            <option value="Syncro">Syncro</option>
            <option value="Cidra">Cidra</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='interests' type='text' onChange={handleChange} placeholder='Interests' />
        </Form.Group>
      </Row>
      <Row classname="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='cocurricular' type='text' onChange={handleChange} placeholder='Co-Curriculars' />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='trainings' type='text' onChange={handleChange} placeholder='Trainings' />
        </Form.Group>
      </Row>
      {/* <h2 style={{'margin':'auto', 'width':'30%', 'marginTop':'5vh', 'marginBottom':'4vh','textDecoration':'underline'}}>Employee Titles</h2>
      <Row classname="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='hrrate' type='text' onChange={handleChange} placeholder='Hourly Rate' />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='multiplier' type='text' onChange={handleChange} placeholder='Multiplier' />
        </Form.Group>
      </Row> */}
      <h2 style={{'margin':'auto', 'width':'40%', 'marginTop':'5vh', 'marginBottom':'4vh','textDecoration':'underline'}}>Employee Traits</h2>
      <Row classname="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='strengths' type='text' onChange={handleChange} placeholder='Strengths' />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='weakness' type='text' onChange={handleChange} placeholder='Weakness' />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='activeIndex' type='text' onChange={handleChange} placeholder='Social Active Index' />
        </Form.Group>
      </Row>
      <h2 style={{'margin':'auto', 'width':'40%', 'marginTop':'5vh', 'marginBottom':'4vh','textDecoration':'underline'}}>Authentication</h2>
      
      <Form.Group classname='mb-4' >
          <Form.Control name='username' type="text" placeholder="Username*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group classname='mb-4' controlId="formGridPassword">
          <Form.Control name='password' type="password" placeholder="Password*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group classname='mb-4' controlId="formGridPassword">
          <Form.Control name='confpassword' type="password" placeholder="Confirm Password*" onChange={handleChange} required/>
        </Form.Group>
      <Button className='submit-btn' variant="primary" type="submit" style={{'marginTop':'4vh', 'width':'10vw'}} onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </>
  )
}

export default EmployeeForm