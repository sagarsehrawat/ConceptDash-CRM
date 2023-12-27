import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {selectTotalProposals, selectLostProposals, selectWonProposals,selectNewProposals, selecteNewPercentage} from '../../../../redux/slices/proposalSlice'
import SERVICES from '../../../../services/Services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import { showErrorModal, showSuccessModal } from '../../../../redux/slices/alertSlice';
import IndependentRow from './IndependentRow';
import './Table.css';
import { initproposals, selectProposals,updateProposal } from '../../../../redux/slices/proposalSlice';
import DeleteModal from '../Footer/DeleteModal';


interface FilterType {
  dept: (string | number)[],
  cat: (string | number)[],
  city: (string | number)[],
  manager: (string | number)[],
}

type Props = {
  api: number;
  setApi: Function;
  currPage: number;
  setPages: Function;
  filter: FilterType;
  search: string;
  isCollapsed: boolean;
  setProposalId: Function;
}

const Table = ({ api, setApi, currPage, filter, search, setPages, setProposalId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProposals, setSelectedProposals] = useState<number[]>([]);
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposals);

  const sortRef = useRef<HTMLDivElement>(null);
  const [showSortModal, setShowSortModal] = useState<string>("");
  const [sort, setSort] = useState<string>('created_at DESC');
  let totalProposals  = useSelector(selectTotalProposals)
  let wonProposals = useSelector(selectWonProposals)
  let lostProposals = useSelector(selectLostProposals)
  let newProposals = useSelector(selectNewProposals)
  let percentage = useSelector(selecteNewPercentage)
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setShowSortModal('');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setSelectedProposals([]);

        const response = await SERVICES.getProposals(50, currPage, filter, search, sort, localStorage.getItem("employeeId") ?? '');
        console.log(response.res)
        dispatch(initproposals(response.res));
        setPages(response.totalPages);
        console.log(proposals.length)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [api, currPage]);

  const sortModal = (column: string) =>
    showSortModal === column
      ? <div className='d-flex flex-column justify-content-between sort-container' ref={sortRef}>
        <div
          className='d-flex flex-row justify-content-around sort-hover'
          onClick={() => {
            setSort(column);
            setApi(api + 1);
            setShowSortModal("");
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
          <p className='sort-text'>Sort Ascending</p>
        </div>
        <div
          className='d-flex flex-row justify-content-around sort-hover'
          onClick={() => {
            setSort(`${column} DESC`);
            setApi(api + 1);
            setShowSortModal("");
          }}
        >
          <FontAwesomeIcon icon={faArrowDown} />
          <p className='sort-text'>Sort Descending</p>
        </div>
      </div>
      : <></>;

  const handleResultUpdate = async (id: number, option: string) => {
    const prev = proposals.filter(proposals => proposals.proposal_id === id);
    try {
      const proposalCounts = { totalProposals: 0, wonProposals : 0, lostProposals: 0, newProposals: 0, percentage: 0};
      dispatch(updateProposal({ proposalId: id, data: { 'result': option }}))
      await SERVICES.updateProposalResult(id, option);
      const prevOption = prev[0].result;
      if(option==="Lost"){
        
      }
      else if(option==="Won"){

      }
    } catch (error) {
      console.log(error);
      dispatch(updateProposal({ proposalId: id, data: { 'result': prev[0].result }}));
      dispatch(showErrorModal('Something went wrong!'));
    }
  }

  const handlePriorityUpdate = async (id: number, option: string) => {
    const prev = proposals.filter(proposals => proposals.proposal_id === id);
    try {
      dispatch(updateProposal({ proposalId: id, data: { 'priority': option }}))
      await SERVICES.updateProposalPriority(id, option);
    } catch (error) {
      console.log(error);
      dispatch(updateProposal({ proposalId: id, data: { 'priority': prev[0].priority }}));
      dispatch(showErrorModal('Something went wrong!'));
    }
  }

  const handleBookmarkUpdate = async (id: number, contains: boolean, bookmark: number[]) => {
    const prev = proposals.filter(proposals => proposals.proposal_id === id);
    const employeeId: number = parseInt(localStorage.getItem("employeeId") ?? '0');
    try {
      let em_bookmark: number[] = [];

    if (contains) {
      em_bookmark = bookmark?.filter((bookmarkId) => bookmarkId !== employeeId) ?? [];
    } else {
      em_bookmark = [...(bookmark ?? []), employeeId];
    }
    console.log(em_bookmark);
    dispatch(updateProposal({ proposalId: id, data: { 'bookmark': em_bookmark }}))
    await SERVICES.updateProposalBookmark(id, em_bookmark);

    } catch (error) {
      dispatch(updateProposal({ proposalId: id, data: { 'bookmark': prev[0].bookmark }}));
      dispatch(showErrorModal('Something went wrong'));
    }
  };
  

  const handleDeleteProposal = async () => {
    try {
      await SERVICES.deleteProposal(selectedProposals);
      setApi(api+1);
      dispatch(showSuccessModal('Proposals Deleted Successfully!'))
    } catch (error) {
      console.log(error);
      dispatch(showErrorModal('Something went wrong!'));
    }
  }

  const openDriveLink = async (id: string) => {
    try {
      const response = await SERVICES.getGoogleDriveUrl(id);
      if (response.res && response.res !== "") window.open(response.res, '_blank');
    } catch (error) {
      console.log(error);
    }
  }

  return isLoading
    ? (<div className='w-100' style={{ height: '492px' }}>
      <LoadingSpinner />
    </div>)
    : <>
      <div className='table-wrapper' ref={tableRef}>
        <table className='w-100' style={{ borderCollapse: "separate" }} ref={tableRef}>
          <thead className='table-header fixed-table-header'>
            <tr>
            <th className='table-heading fixed-header-column' style={{ width: "272px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('project_name')}>Proposal Name</p>
                {sortModal('project_name')}
              </th>
              <th className='table-heading' style={{ width: "180px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('city')}>City</p>
                {sortModal('city')}
              </th>
              <th className='table-heading' style={{ width: "202px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('result')}>Status</p>
                {sortModal('result')}
              </th>
              <th className='table-heading' style={{ width: "172px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('question_deadline')}>Question Deadline</p>
                {sortModal('question_deadline')}
              </th>
              <th className='table-heading' style={{ width: "180px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('closing_deadline')}>Closing Deadline</p>
                {sortModal('closing_deadline')}
              </th>
              <th className='table-heading' style={{ width: "180px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('priority')}>Priority</p>
                {sortModal('priority')}
              </th>
              <th className='table-heading' style={{ width: "180px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('total_bid_price')}>Total Bid Price</p>
                {sortModal('total_bid_price')}
              </th>
              {/* <th className='table-heading' style={{ width: "186px" }}>Proposal Generator Link
              </th> */}
              <th className='table-heading' style={{ width: "186px" }}>TTM Link
              </th>
              <th className='table-heading' style={{ width: "186px" }}>Source
              </th>
              <th className='table-heading' style={{ width: "186px" }}>Partners
              </th>
            </tr>
          </thead>
          <tbody style={{ background: "#FFFFFF" }}>
            {
              proposals && proposals.map((proposal: Proposal) => {
                  return (
                    <IndependentRow
                      proposal={proposal}
                      tableRef={tableRef}
                      selectedProposals={selectedProposals}
                      setselectedProposals={setSelectedProposals}
                      openDriveLink={openDriveLink}
                      handleResultUpdate={handleResultUpdate}
                      setProposalId={setProposalId}
                      handleBookmarkUpdate={handleBookmarkUpdate}
                      handlePriorityUpdate={handlePriorityUpdate}
                    />
                  )
              })
            }
          </tbody>
        </table>
      </div>
      <DeleteModal selectedProjects={selectedProposals} setSelectedProjects={setSelectedProposals} handleDelete={handleDeleteProposal} />

    </>
}

export default Table