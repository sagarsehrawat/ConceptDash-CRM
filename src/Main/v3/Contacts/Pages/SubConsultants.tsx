import React,{useEffect, useState} from 'react';
import CardTemplate from '../HeaderCards/CardTemplate';
import SearchBar from '../SearchBar/SearchBar';
import OrgTable from '../Tables/OrgTable';
import axios from 'axios';
import { ORGANIZATION_COUNT, PEOPLE_COUNT, HOST1 } from '../../../Constants/Constants';
import PeopleTable from '../Tables/PeopleTable';
import AddNewOrganisation from '../Forms/addNewOrganisation';
import AddNewPerson from '../Forms/AddnewPerson';
type Props= {
    case: String
    setnav: Function,
    setOrganizationData: Function
    setContactPersonData: Function
}
const SubConsultants = (props: Props) => {
    const [api, setApi] = useState<number>(0);
    const [value, setValue] = useState<string>('');
    const [count,setCount] = useState<number>(0);
    const [apicall, setApicall] = useState<any>(ORGANIZATION_COUNT);
    const [show, setShow] = useState<boolean>(false)

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
                     setCount(res.data.res[1].total_count)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [])

      return (
          <>
              <CardTemplate name="Sub Consultants" count={count}/>
              <SearchBar value={value} setValue={setValue} api={api} setApi={setApi} show={show} setShow={setShow} name="SubConsultant"/>
               {show && props.case ==="org" && <AddNewOrganisation show={show} setShow={setShow} />}
               {show && props.case !=="org" && <AddNewPerson show={show} setShow={setShow} />}
               {props.case==="org" ?  <OrgTable case="Consultants" setnav={props.setnav} setOrganizationData={props.setOrganizationData}/> : <PeopleTable case="Consultants" setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
          </>
      )

}

export default SubConsultants;