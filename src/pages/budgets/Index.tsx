import React, { useState } from 'react'
import Header from './sections/Header/Header'
import HeaderCards from './sections/Header-Cards/HeaderCards';
import { useSelector } from 'react-redux';
import { selectCities } from '../../redux/slices/budgetSlice';
import SearchFilter from './sections/SearchFilter/SearchFilter';
import Table from './sections/Table/Table';
import moment from 'moment';

type Props = {
  cityId: number;
  setCityId: Function;
  isCollapsed: boolean;
}

const Index = ({ cityId, setCityId, isCollapsed }: Props) => {
  const city = useSelector(selectCities).find(city => city.city_id === cityId) as City;
  const [api, setApi] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [year, setYear] = useState<string>(moment().year().toString());
  const [filter, setfilter] = useState<{ dept: string[], cat: string[], budgetCategory: [] }>({ dept: [], cat: [], budgetCategory: [] });
  return (
    <>
      <Header city={city} setCityId={setCityId} />
      <HeaderCards city={city} />
      <SearchFilter cityId={city.city_id} api={api} setApi={setApi} value={value} setValue={setValue} filter={filter} setFilter={setfilter} isCollapsed={isCollapsed} year={year} setYear={setYear} />
      <Table city={city} search={value} filter={filter} year={year} api={api}/>
    </>
  )
}

export default Index