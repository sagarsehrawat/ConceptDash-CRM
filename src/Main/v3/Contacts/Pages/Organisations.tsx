import React,{useState,useEffect} from 'react';
import axios from 'axios';
import OrganisationCards from '../HeaderCards/AllCards'
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrgTable';
import AddNewPeople from '../Forms/addNewPeople';
import Pagination from '../Pagination/Pagination';
import PeopleTable from '../Tables/PeopleTable';
import AddNewOrganisation from '../Forms/addNewOrganisation';


type Props= {
    name: string
    setValue1: Function,
    setnav: Function
    setData: Function
    setOrganizationData: Function
}
const AllOrganisations = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [pages, setpages] = useState<number>(1);
    const [currPage, setcurrPage] = useState<number>(1);
    const [search, setsearch] = useState<string>('');
    const [filter, setfilter] = useState<{ companyType:any }>({ companyType: [] });
      
      return (
          <>
               <OrganisationCards name={props.name} count={0} setValue1={props.setValue1}/>
               <SearchBar search={search} setSearch={setsearch} api={api} setApi={setApi} name={props.name} show={show} setShow={setShow} filter={filter} setFilter={setfilter}/>
               {show && <AddNewOrganisation api={api} setApi={setApi} show={show} setShow={setShow} />}
               <OrgTable  api={api} setApi={setApi} currPage={currPage} setPages={setpages} search={search} setnav={props.setnav} setOrganizationData={props.setOrganizationData}/>
               <Pagination pages={pages} currPage={currPage} setcurrPage={setcurrPage} />
          </>
      )

}

export default AllOrganisations;