import React, { useState } from 'react'
import Header from './sections/Header/Header'
import HeaderCards from './sections/HeaderCards/HeaderCards'
import SearchFilter from './sections/SearchFilter/SearchFilter'
import Pages from './sections/Pages/Pages'
import Table from './sections/Table/Table'

type Props = {
  isCollapsed: boolean
}

const Index = (props: Props) => {
  const [api, setApi] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [filter, setfilter] = useState<{ dept: string[], cat: string[], city: string[], manager: string[], source: string[] }>({ dept: [], cat: [], city: [], manager: [], source: [] });
  const [pages, setpages] = useState<number>(1);
  const [currPage, setcurrPage] = useState<number>(1);

  return (
    <>
      <Header api={api} setApi={setApi} />
      <HeaderCards />
      <SearchFilter api={api} setApi={setApi} value={value} setValue={setValue} filter={filter} setFilter={setfilter} isCollapsed={props.isCollapsed} />
      <Table api={api} currPage={currPage} setPages={setpages} filter={filter} search={value} isCollapsed={props.isCollapsed} />
      <Pages pages={pages} currPage={currPage} setcurrPage={setcurrPage} />
    </>
  )
}

export default Index