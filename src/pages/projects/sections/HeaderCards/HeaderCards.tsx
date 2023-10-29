import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initData, selectCompletedProjects, selectNewProjects, selectOngoingProjects, selectPercentage, selectTotalProjects } from '../../../../redux/slices/projectSlice'
import SERVICES from '../../../../services/Services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Utils from '../../../../utils/Utils'

type Props = {}

const HeaderCards = (props: Props) => {
    const dispatch = useDispatch();
    const newProjects = useSelector(selectNewProjects)
    const ongoingProjects = useSelector(selectOngoingProjects)
    const completedProjects = useSelector(selectCompletedProjects)
    const percentage = useSelector(selectPercentage)
    const totalProjects = useSelector(selectTotalProjects)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SERVICES.projectCount();
                const projectCounts = { newProjects: 0, ongoingProjects : 0, completedProjects: 0, percentage : 0, totalProjects: 0};
  
                response.res.map(e => {
                    projectCounts.totalProjects += e.Count;
                    if(e.Status==='Not Started') projectCounts.newProjects = e.Count;
                    if(e.Status==='In Progress') projectCounts.ongoingProjects = e.Count;
                    if(e.Status==='Completed') projectCounts.completedProjects = e.Count;
                })
                projectCounts.percentage = Utils.calculatePercentage(projectCounts.newProjects, projectCounts.totalProjects);
                console.log(projectCounts)

                dispatch(initData(projectCounts));
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
                <div className='header-card'>
                    <p className='header-card-heading'>New Projects</p>
                    <div className=''>
                        <p className='header-card-subheading'>{newProjects}</p>
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
                    <p className='header-card-heading'>Ongoing Projects</p>
                    <p className='header-card-subheading'>{ongoingProjects}</p>
                </div>
                <div className='header-card'>
                    <p className='header-card-heading'>Completed Projects</p>
                    <p className='header-card-subheading'>{completedProjects}</p>
                </div>
                <div className='header-card'>
                    <p className='header-card-heading'>Total Projects</p>
                    <p className='header-card-subheading'>{totalProjects}</p>
                </div>
            </div>
            <div className='header-line'></div>
            <p className='heading-2' style={{ marginLeft: "32px" }}>Projects</p>
        </>
    )
}

export default HeaderCards