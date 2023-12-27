import React,{useState,useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrgTable';
import CardTemplate from '../HeaderCards/CardTemplate';
import { HOST,PEOPLE_COUNT,ORGANIZATION_COUNT } from '../../../Constants/Constants';
import axios from 'axios';
import PeopleTable from '../Tables/PeopleTable';
import AddNewOrganisation from '../Forms/addNewOrganisation';
import AddNewPerson from '../Forms/AddnewPerson';
import Pagination from '../Pagination/Pagination';
type Props= {
    case : String
    setnav: Function,
    setOrganizationData: Function | null,
    setContactPersonData: Function | null,
}
const Clients = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [count, setCount] =useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
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
                     let clientData = res.data.res.filter((each: { company_type: string; }) => each.company_type === 'Client');
                     if (clientData.length > 0)  setCount(clientData[0].count_per_type);
                    })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [props.case])

      return (
          <>
              <CardTemplate name="Clients" count={count}/>
              <SearchBar search={value} setSearch={setValue} api={api} setApi={setApi} show={show} setShow={setShow} name="Clients" filter={{ companyType: [] }}setFilter={() => {}} />
               {show && props.case ==="org" && <AddNewOrganisation api={api} setApi={setApi} show={show} setShow={setShow} />}
               {show && props.case !=="org" && <AddNewPerson api={api} setApi={setApi} show={show} setShow={setShow} id={null} />}
               {props.case==="org" ?  <OrgTable api={api} setApi={setApi}  currPage={currPage} setPages={setpages} search={value} case="Client" setnav={props.setnav} setOrganizationData={props.setOrganizationData}/> : <PeopleTable  api={api}  setApi={setApi} currPage={currPage} setPages={setpages}  search={value} case="Client" setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
               <Pagination pages={pages} currPage={currPage} setcurrPage={setcurrPage} />

          </>
      )

}

export default Clients;