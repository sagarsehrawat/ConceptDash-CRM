import React,{useEffect, useState} from 'react';
import CardTemplate from '../HeaderCards/CardTemplate';
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrgTable';
import axios from 'axios';
import { ORGANIZATION_COUNT, PEOPLE_COUNT, HOST } from '../../../Constants/Constants';
import PeopleTable from '../Tables/PeopleTable';
import AddNewPerson from '../Forms/AddnewPerson';
import AddNewOrganisation from '../Forms/addNewOrganisation';
import Pagination from '../Pagination/Pagination';
type Props= {
    case: String
    setnav: Function,
    setOrganizationData: Function
    setContactPersonData: Function
}
const Consultants = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [count,setCount] = useState<number>(0);
    const [apicall, setApicall] = useState<any>(ORGANIZATION_COUNT);
    const [show, setShow] = useState<boolean>(false)
    const [pages, setpages] = useState<number>(1);
    const [currPage, setcurrPage] = useState<number>(1);

    useEffect(() => {
        const apiUrl = props.case === "org" ? HOST + ORGANIZATION_COUNT : HOST + PEOPLE_COUNT;

        const call = async () => {
            await axios
                .get(apiUrl, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                })
                .then((res) => {
                     console.log(res);
                     let clientData = res.data.res.filter(each => each.company_type === 'Consultant');
                     if (clientData.length > 0)  setCount(clientData[0].count_per_type);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [])

      return (
          <>
              <CardTemplate name="Consultants" count={count}/>
              <SearchBar value={value} setValue={setValue} api={api} setApi={setApi} show={show} setShow={setShow} name="Consultant"/>
               {show && props.case ==="org" && <AddNewOrganisation api={api} setApi={setApi} show={show} setShow={setShow} />}
               {show && props.case !=="org" && <AddNewPerson  api={api} setApi={setApi} show={show} setShow={setShow} />}
               {props.case==="org" ?  <OrgTable api={api} setApi={setApi} case="Consultant" currPage={currPage} setPages={setpages}  setnav={props.setnav} setOrganizationData={props.setOrganizationData}/> : <PeopleTable  currPage={currPage} setPages={setpages}   api={api} setApi={setApi} case="Consultant" setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
               <Pagination pages={pages} currPage={currPage} setcurrPage={setcurrPage} />
          </>
      )

}

export default Consultants;