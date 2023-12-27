import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initData, selectCompletedProjects, selectNewProjects, selectOngoingProjects, selectPercentage, selectTotalProjects } from '../../../../redux/slices/projectSlice'
import SERVICES from '../../../../services/Services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const HeaderCards = () => {
    const dispatch = useDispatch();
    const newProjects = useSelector(selectNewProjects)
    const ongoingProjects = useSelector(selectOngoingProjects)
    const completedProjects = useSelector(selectCompletedProjects)
    const percentage = useSelector(selectPercentage)
    const totalProjects = useSelector(selectTotalProjects)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('a')
                const response = await SERVICES.projectCount();
                const projectCounts = { newProjects: 0, ongoingProjects : 0, completedProjects: 0, percentage : 0, totalProjects: 0};

                projectCounts.newProjects = response.res.new_projects;
                projectCounts.ongoingProjects = response.res.ongoing_projects;
                projectCounts.completedProjects = response.res.completed_projects;
                projectCounts.percentage = response.res.percentage_change;
                projectCounts.totalProjects = response.res.total_projects;

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