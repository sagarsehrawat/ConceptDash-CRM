import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initData, selectTotalProposals, selectLostProposals, selectWonProposals,selectNewProposals, selecteNewPercentage} from '../../../../redux/slices/proposalSlice'
import SERVICES from '../../../../services/Services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
type Props = {
    api: number,
}

const HeaderCards = ({ api }: Props) => {
    const dispatch = useDispatch();
    // const newProposals = useSelector(selectNewProposals)
    const totalProposals  = useSelector(selectTotalProposals)
    const wonProposals = useSelector(selectWonProposals)
    const lostProposals = useSelector(selectLostProposals)
    const newProposals = useSelector(selectNewProposals)
    const percentage = useSelector(selecteNewPercentage)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SERVICES.proposalCount();
                console.log(response.res[0]);
                const proposalCounts = { totalProposals: 0, wonProposals : 0, lostProposals: 0, newProposals: 0, percentage: 0};

                proposalCounts.totalProposals = response.res[0].total_proposals;
                proposalCounts.wonProposals = response.res[0].won_proposals;
                proposalCounts.lostProposals = response.res[0].lost_proposals;
                proposalCounts.percentage = response.res[0].percent;
                proposalCounts.newProposals = response.res[0].month;

                dispatch(initData(proposalCounts));
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [api])

    return (
        <>
            <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
                <div className='header-card'>
                    <p className='header-card-heading'>New Proposals</p>
                    <div className=''>
                        <p className='header-card-subheading'>{newProposals}</p>
                        {parseInt(percentage.toString()) >= 0
                            ? <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                                <FontAwesomeIcon icon={faArrowUp} color="#34A853" />
                                <p className='percentage percentage-green'>{percentage}% increase</p>
                            </div>
                            : <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                                <FontAwesomeIcon icon={faArrowDown} color="#FE3766" />
                                <p className='percentage percentage-red' style={{ color: "#FE3766" }}>{percentage}% decrease</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='header-card'>
                    <p className='header-card-heading'>Total Proposals</p>
                    <p className='header-card-subheading'>{totalProposals}</p>
                </div>
                <div className='header-card'>
                    <p className='header-card-heading'>Won Proposals</p>
                    <p className='header-card-subheading'>{wonProposals}</p>
                </div>
                <div className='header-card'>
                    <p className='header-card-heading'>Lost Proposals</p>
                    <p className='header-card-subheading'>{lostProposals}</p>
                </div>
            </div>
            {/* <div className='header-line'></div> */}
           
        </>
    )
}

export default HeaderCards