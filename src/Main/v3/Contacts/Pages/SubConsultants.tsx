import React,{useEffect, useState} from 'react';
import CardTemplate from '../HeaderCards/CardTemplate';
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrganizationTable/OrgTable';
import PeopleTable from '../Tables/PeopleTable/PeopleTable';
import AddNewOrganisation from '../Forms/addNewOrganisation';
import AddNewPerson from '../Forms/AddnewPerson';
import Pagination from '../Pagination/Pagination';
import SERVICES from '../../../../services/Services';
type Props= {
    case: string
    setnav: Function,
    setOrganizationData?: Function 
    setContactPersonData?: Function
}
const SubConsultants = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [count,setCount] = useState<string>('0');;
    const [show, setShow] = useState<boolean>(false)
    const [pages, setpages] = useState<number>(1);
    const [currPage, setcurrPage] = useState<number>(1);

    useEffect(() => {
        const call = async () => {
            await SERVICES.getOrgPeopleCount(props.case)
                .then((res) => {
                     console.log(res);
                     setCount('0');
                     let clientData = res.res.filter((each: { company_type: string; }) => each.company_type === 'Subconsultant');
                     if (clientData.length > 0)  setCount(clientData[0].count_per_type);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [props.case,api])

      return (
          <>
              <CardTemplate name="Sub Consultants" count={count}/>
              <SearchBar search={value} setSearch={setValue} api={api} setApi={setApi} show={show} setShow={setShow} name="Consultant" filter={{ companyType: [] }}setFilter={() => {}} />
               {show && props.case ==="org" && <AddNewOrganisation show={show} setShow={setShow} api={api} setApi={setApi} />}
               {show && props.case !=="org" && <AddNewPerson show={show} setShow={setShow} id={null} api={api} setApi={setApi} />}
               {props.case==="org" ?  <OrgTable api={api} setApi={setApi} case="Subconsultant"  currPage={currPage} setPages={setpages} setnav={props.setnav} setOrganizationData={props.setOrganizationData}  search={value} /> : <PeopleTable api={api} setApi={setApi} case="Subconsultant"  search={value}  currPage={currPage} setPages={setpages}  setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
               <Pagination pages={pages} currPage={currPage} setcurrPage={setcurrPage} />
          </>
      )

}

export default SubConsultants;