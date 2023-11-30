import React, { useEffect, useState } from 'react'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faX } from '@fortawesome/free-solid-svg-icons';
import { PRIMARY_COLOR } from '../../../Constants/Constants';
import { selectPrivileges } from '../../../../redux/slices/privilegeSlice'
import PlusIcon from '../../../../Images/addPlus.svg'
import TFSearchBar from '../../../../components/ui/TFSearchBar/TFSearchBar';
import filterIcon from '../../../../Images/Filter.svg'

type Props ={
    search: string,
  setSearch: Function,
  api: String,
  setApi: Function
  show: boolean,
  setShow:Function,
  name: String,
  filter:  FilterType,
  setFilter: Function
}

interface FilterType {
  companyType: (string | number)[],
}
const SearchBar = ({search,setSearch,api,setApi,name,show,setShow, filter, setFilter} : Props) => {
    const privileges: string[] = useSelector(selectPrivileges);
    // const [show1, setShow1] = useState<boolean>(false);
    // const [prevFilter, setPrevFilter] = useState<FilterType>({ companyType: []});
  
  return (
    <>
<>
  <div className='d-flex flex-row justify-content-between' style={{ marginTop: "8px", marginBottom: "24px", marginLeft: "32px" }}>
    {/* Searchbar */}
    <TFSearchBar
      placeholder={'name,label'}
      searchFunc={[search, setSearch]}
      style={{ 'margin-right': '12px' }}
      apiFunc={[api, setApi]}
    />
    <TFButton icon={PlusIcon} label={`Add new ${name}`} handleClick={() => setShow(true)} />
  </div>
</>

    </>
  )
}

export default SearchBar