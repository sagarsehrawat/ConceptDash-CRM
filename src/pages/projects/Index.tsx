import React, { useState } from 'react'
import Header from './sections/Header/Header';
import HeaderCards from './sections/HeaderCards/HeaderCards';
import SearchFilter from './sections/SearchFilter/SearchFilter';
import Pages from './sections/Pages/Pages';
import Table from './sections/Table/Table';
import ProjectDetail from './sections/ProjectDetail/ProjectDetail';
import ProjectMap from "./mapView/ProjectMap.tsx";
type Props = {
  isCollapsed: boolean;
}

const Index = (props: Props) => {
  const [api, setApi] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [filter, setfilter] = useState<{
    dept: string[];
    cat: string[];
    city: string[];
    manager: string[];
    bookmark: boolean;
  }>({ dept: [], cat: [], city: [], manager: [], bookmark: false });
  const [pages, setpages] = useState<number>(1);
  const [currPage, setcurrPage] = useState<number>(1);
  const [projectId, setProjectId] = useState<number>(0);

  const [expand, setExpand] = useState<boolean>(false);
  return projectId === 0 ? (
    expand ? (
      <ProjectMap
        expand={expand}
        setExpand={setExpand}
        api={api}
        setApi={setApi}
        filter={filter}
        setFilter={setfilter}
      />
    ) : (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Header api={api} setApi={setApi} />
            <HeaderCards />
            <SearchFilter
              api={api}
              setApi={setApi}
              value={value}
              setValue={setValue}
              filter={filter}
              setFilter={setfilter}
              isCollapsed={props.isCollapsed}
            />
          </div>
          <div style={{ marginRight: "32px" }}>
            <ProjectMap
              expand={expand}
              setExpand={setExpand}
              api={api}
              setApi={setApi}
              filter={filter}
              setFilter={setfilter}
            />
          </div>
        </div>

        <Table
          api={api}
          setApi={setApi}
          currPage={currPage}
          setPages={setpages}
          filter={filter}
          search={value}
          isCollapsed={props.isCollapsed}
          setProjectId={setProjectId}
        />
        <Pages
          pages={pages}
          currPage={currPage}
          setcurrPage={setcurrPage}
        />
      </>
    )
  )
    : <ProjectDetail projectId={projectId} setProjectId={setProjectId} />
}

export default Index