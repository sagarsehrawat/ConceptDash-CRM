import React, { useState } from 'react'
import Header from './sections/Header/Header';
import HeaderCards from './sections/HeaderCards/HeaderCards';
import SearchFilter from './sections/SearchFilter/SearchFilter';
import Pages from './sections/Pages/Pages';
import Table from './sections/Table/Table';
import ProposalDetail from './sections/ProposalDetail/ProposalDetail';
import TTMMain from '../proposals/ttm/TTMMain';

type Props = {
  isCollapsed: boolean
}

const Index = (props: Props) => {
  const [api, setApi] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [filter, setfilter] = useState<{ dept: string[], cat: string[], city: string[], manager: string[], bookmark: boolean }>({ dept: [], cat: [], city: [], manager: [], bookmark: false });
  const [pages, setpages] = useState<number>(1);
  const [currPage, setcurrPage] = useState<number>(1);
  const [proposalId, setProposalId] = useState<number>(0);
  const [showTTM, setshowTTM] = useState<boolean>(false);
  const [propName, setpropName] = useState<string>("");
  const [propID, setpropID] = useState<number>();
  const handleTTM=(a:number, b:string)=>{
      setpropName(b);
      setpropID(a);
      setshowTTM(true);
  }
  return !showTTM?<>{proposalId === 0 ? (
    <>
      <Header api={api} setApi={setApi} />
      <HeaderCards api={api} />
      <SearchFilter api={api} setApi={setApi} value={value} setValue={setValue} filter={filter} setFilter={setfilter} isCollapsed={props.isCollapsed} />
      <Table api={api} setApi={setApi} currPage={currPage} setPages={setpages} filter={filter} search={value} isCollapsed={props.isCollapsed} setProposalId={setProposalId} handleTTM={handleTTM} />
      <Pages pages={pages} currPage={currPage} setcurrPage={setcurrPage} />
    </>
  )
    : <ProposalDetail proposalId={proposalId} setProposalId={setProposalId} />}</>:<TTMMain setshowTTM={setshowTTM} Name={propName} Id={propID}/>
}

export default Index