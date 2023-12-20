import React,{useState} from 'react';
import OrganisationCards from '../HeaderCards/AllCards'
import SearchBar from '../SearchBar/SearchBar';
import AddNewPerson from '../Forms/AddnewPerson';
import Pagination from '../Pagination/Pagination';
import PeopleTable from '../Tables/PeopleTable';


type Props= {
    name: string
    setValue1: Function,
    setContactPersonData: Function
    setnav: Function
}
const People = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [pages, setpages] = useState<number>(1);
    const [currPage, setcurrPage] = useState<number>(1);
    const [filter, setfilter] = useState<{ companyType:any }>({ companyType: [] });
      
      return (
          <>
               <OrganisationCards name={props.name} count={0} setValue1={props.setValue1}/>
               <SearchBar search={value} setSearch={setValue} api={api} setApi={setApi} name={props.name} show={show} setShow={setShow}  filter={filter} setFilter={setfilter}/>
               {show && <AddNewPerson  api={api} setApi={setApi} show={show} setShow={setShow} id={null} />}
               <PeopleTable api={api} setApi={setApi} currPage={currPage} setPages={setpages} search={value} setContactPersonData={props.setContactPersonData} setnav={props.setnav}/>
               <Pagination pages={pages} currPage={currPage} setcurrPage={setcurrPage} />
          </>
      )

}

export default People;