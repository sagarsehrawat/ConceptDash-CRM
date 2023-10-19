import React, { useState } from 'react'
import RFP from './tables/RFP'
import Header from './sections/Header/Header'
import HeaderCards from './sections/HeaderCards/HeaderCards'

type Props = {
  isCollapsed: boolean
}

const Index = (props: Props) => {
  const [api, setApi] = useState<number>(0)
  return (
    <>
      <Header api={api} setApi={setApi} />
      <HeaderCards />
      <RFP isCollapsed={props.isCollapsed} />
    </>
  )
}

export default Index