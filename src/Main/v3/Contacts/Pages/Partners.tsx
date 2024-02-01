import React,{useEffect, useState} from 'react';
import CardTemplate from '../HeaderCards/CardTemplate'
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrganizationTable/OrgTable';
import PeopleTable from '../Tables/PeopleTable/PeopleTable';
import AddNewOrganisation from '../Forms/addNewOrganisation';
import AddNewPerson from '../Forms/AddnewPerson';
import Pagination from '../Pagination/Pagination';
import SERVICES from '../../../../services/Services';
type Props= {
    case: string;
    setnav: Function
    setOrganizationData? : Function
    setContactPersonData? : Function 
}
const Partners = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [count,setCount] = useState<string>('0');
    const [show, setShow] = useState<boolean>(false)
    const [pages, setpages] = useState<number>(1);
    const [currPage, setcurrPage] = useState<number>(1);
    useEffect(() => {
        const call = async () => {
     await SERVICES.getOrgPeopleCount(props.case)
                .then((res) => {
                     console.log(res);
                     setCount('0');
                     let clientData = res.res.filter((each: { company_type: string; }) => each.company_type === 'Partner');
                     if (clientData && clientData.length > 0) setCount(clientData[0].count_per_type);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [props.case, api])

      return (
          <>
              <CardTemplate name="Partners" count={count}/>
              <SearchBar search={value} setSearch={setValue} api={api} setApi={setApi} show={show} setShow={setShow} name="Partners" filter={{ companyType: [] }}setFilter={() => {}} />
               {show && props.case==="org" && <AddNewOrganisation api={api} setApi={setApi} show={show} setShow={setShow} />}
               {show && props.case !=="org" && <AddNewPerson api={api} setApi={setApi} show={show} setShow={setShow} id={null} />}
               {props.case==="org" ?  <OrgTable api={api} search={value} currPage={currPage} setPages={setpages}  setApi={setApi} case="Partner" setnav={props.setnav} setOrganizationData={props.setOrganizationData}/> : <PeopleTable case="Partner"  currPage={currPage} setPages={setpages} search={value}  api={api} setApi={setApi} setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
               <Pagination pages={pages} currPage={currPage} setcurrPage={setcurrPage} />
          </>
      )

}

export default Partners;