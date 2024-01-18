import React, { useState } from "react";
import Header from "./sections/Header/Header";
import HeaderCards from "./sections/HeaderCards/HeaderCards";
import SearchFilter from "./sections/SearchFilter/SearchFilter";
import Pages from "./sections/Pages/Pages";
import Table from "./sections/Table/Table";
import ProposalDetail from "./sections/ProposalDetail/ProposalDetail";
import TTMMain from "../proposals/ttm/TTMMain";
import ProposalsMap from "./mapView/ProposalsMap";
import TFButton from "../../components/ui/TFButton/TFButton";
import { useSelector } from "react-redux";
import { selectPrivileges } from "../../redux/slices/privilegeSlice";
import ICONS from "../../constants/Icons";

type Props = {
  isCollapsed: boolean;
};

const Index = (props: Props) => {
  const [api, setApi] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [filter, setfilter] = useState<{
    dept: string[];
    cat: string[];
    city: string[];
    manager: string[];
    bookmark: boolean;
  }>({ dept: [], cat: [], city: [], manager: [], bookmark: false });
  const [pages, setpages] = useState<number>(1);
  const [currPage, setcurrPage] = useState<number>(1);
  const [proposalId, setProposalId] = useState<number>(0);
  const [showTTM, setshowTTM] = useState<boolean>(false);
  const [propName, setpropName] = useState<string>("");
  const [propID, setpropID] = useState<number>();
  const handleTTM = (a: number, b: string) => {
    setpropName(b);
    setpropID(a);
    setshowTTM(true);
  };
  const [expand, setExpand] = useState<boolean>(false);
  const privileges: string[] = useSelector(selectPrivileges);
  const [show, setShow] = useState<boolean>(false);

  return !showTTM ? (
    <>
      {proposalId === 0 ? (
        expand ? (
          <ProposalsMap
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
                <Header
                  setShow={setShow}
                  show={show}
                  api={api}
                  setApi={setApi}
                />
                <HeaderCards api={api} />
              </div>
              <div style={{ marginRight: "32px", marginTop: "12px" }}>
                <ProposalsMap
                  expand={expand}
                  setExpand={setExpand}
                  api={api}
                  setApi={setApi}
                  filter={filter}
                  setFilter={setfilter}
                />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                marginTop: "12px",
                padding: "12px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div style={{ gap: "8px" }}>
                <p className="heading-2">Proposals</p>
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
              <TFButton
                icon={ICONS.PLUS_WHITE}
                label="Add New Proposal"
                disabled={!privileges.includes("Add Proposal")}
                handleClick={() => setShow(true)}
              />
            </div>
            <Table
              api={api}
              setApi={setApi}
              currPage={currPage}
              setPages={setpages}
              filter={filter}
              search={value}
              isCollapsed={props.isCollapsed}
              setProposalId={setProposalId}
              handleTTM={handleTTM}
            />
            <Pages
              pages={pages}
              currPage={currPage}
              setcurrPage={setcurrPage}
            />
          </>
        )
      ) : (
        <ProposalDetail proposalId={proposalId} setProposalId={setProposalId} />
      )}
    </>
  ) : (
    <TTMMain setshowTTM={setshowTTM} Name={propName} Id={propID} />
  );
};

export default Index;
