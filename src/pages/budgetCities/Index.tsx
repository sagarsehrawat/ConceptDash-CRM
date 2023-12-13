import React, { useState } from 'react'
import Header from './sections/Header/Header';
import HeaderCards from './sections/Header-Cards/HeaderCards';
import SearchFilter from './sections/SearchFilter/SearchFilter';
import Table from './sections/Table/Table';
import Budgets from '../budgets/Index';

type Props = {
  isCollapsed: boolean;
}
const Index = (props: Props) => {
  const [value, setValue] = useState<string>('')
  const [cityId, setCityId] = useState<number | null>(null);

  
  return cityId === null ? (
    <>
      <Header />
      <HeaderCards />
      <SearchFilter value={value} setValue={setValue}/>
      <Table search={value} isCollapsed={props.isCollapsed} setCityId={setCityId} />
    </>
  )
  : (
    <Budgets cityId={cityId} setCityId={setCityId} isCollapsed={props.isCollapsed}/>
  )
}

export default Index
