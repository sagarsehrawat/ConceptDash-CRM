import React,{useState,useEffect} from 'react';
import OrganisationCards from '../HeaderCards/AllCards'
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrgTable';
import CardTemplate from '../HeaderCards/CardTemplate';
import { HOST1,PEOPLE_COUNT,ORGANIZATION_COUNT } from '../../../Constants/Constants';
import axios from 'axios';
import PeopleTable from '../Tables/PeopleTable';
import AddNewOrganisation from '../Forms/addNewOrganisation';
import AddNewPeople from '../Forms/addNewPeople';
import AddNewPerson from '../Forms/AddnewPerson';
type Props= {
    case : String
    setnav: Function,
    setOrganizationData: Function,
    setContactPersonData: Function,
}
const Clients = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [count, setCount] =useState<number>(0);
    const [apicall, setApicall] = useState<any>(ORGANIZATION_COUNT);
    const [show, setShow] = useState<boolean>(false);
    const [search, setSearch] = useState<String>('')
    useEffect(() => {
        const call = async () => {
            props.case ==="org" ? setApicall(ORGANIZATION_COUNT) : setApicall(PEOPLE_COUNT)
            await axios
                .get(HOST1 + apicall, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                })
                .then((res) => {
                     console.log(res);
                     setCount(res.data.res[2].total_count)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [])

      return (
          <>
              <CardTemplate name="Clients" count={count}/>
               <SearchBar setSearch={setSearch} search={search} value={value} setValue={setValue} api={api} setApi={setApi} show={show} setShow={setShow} name="Client"/>
               {show && props.case ==="org" && <AddNewOrganisation api={api} setApi={setApi} show={show} setShow={setShow} />}
               {show && props.case !=="org" && <AddNewPerson api={api} setApi={setApi} show={show} setShow={setShow} />}
               {props.case==="org" ?  <OrgTable api={api} setApi={setApi} search={search} case="Client" setnav={props.setnav} setOrganizationData={props.setOrganizationData}/> : <PeopleTable  api={api}  setApi={setApi} search={search} case="Client" setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}

          </>
      )

}

export default Clients;