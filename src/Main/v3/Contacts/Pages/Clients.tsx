import React,{useState,useEffect} from 'react';
import OrganisationCards from '../HeaderCards/OrganisationCards'
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrgTable';
import CardTemplate from '../HeaderCards/CardTemplate';
import { HOST1,PEOPLE_COUNT,ORGANIZATION_COUNT } from '../../../Constants/Constants';
import axios from 'axios';
import PeopleTable from '../Tables/PeopleTable';
type Props= {
    case : String
}
const Clients = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [count, setCount] =useState<number>(0);
    const [apicall, setApicall] = useState<any>(ORGANIZATION_COUNT);
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
               <SearchBar value={value} setValue={setValue} api={api} setApi={setApi} name="Client"/>
               {props.case==="org" ?  <OrgTable/> : <PeopleTable/>}
          </>
      )

}

export default Clients;