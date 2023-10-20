import React, { useState } from 'react'
import RFP from './tables/RFP'
import Header from './sections/Header/Header'
import HeaderCards from './sections/HeaderCards/HeaderCards'
import SearchFilter from './sections/SearchFilter/SearchFilter'

type Props = {
  isCollapsed: boolean
}

const Index = (props: Props) => {
  const [api, setApi] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [filter, setfilter] = useState<{dept: string[], cat: string[], city: string[], manager: string[], source: string[]}>({ dept: [], cat: [], city: [], manager: [], source: [] });
  return (
    <>
      <Header api={api} setApi={setApi} />
      <HeaderCards />
      <SearchFilter api={api} setApi={setApi} value={value} setValue={setValue} filter={filter} setFilter={setfilter} isCollapsed={props.isCollapsed} />
      <RFP isCollapsed={props.isCollapsed} />
    </>
  )
}

export default Index