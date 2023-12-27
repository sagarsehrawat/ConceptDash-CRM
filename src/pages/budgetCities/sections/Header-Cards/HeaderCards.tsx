import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initHeaderCards, selectDoneBudgets, selectDraftBudgets, selectNotFoundBudgets } from '../../../../redux/slices/budgetSlice'
import SERVICES from '../../../../services/Services';

const HeaderCards = () => {
    const dispatch = useDispatch();
    const done = useSelector(selectDoneBudgets);
    const draft = useSelector(selectDraftBudgets);
    const notFound = useSelector(selectNotFoundBudgets);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SERVICES.budgetCount();
                const budgetResponse = { 'Not Found': 0, 'Draft Budget': 0, 'Done': 0 }

                response.res.map(e => { budgetResponse[e.year_23] = e.count });

                dispatch(initHeaderCards({
                    done: budgetResponse.Done,
                    notFound: budgetResponse['Not Found'],
                    draft: budgetResponse['Draft Budget']
                }));
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
                <div className='header-card'>
                    <p className='header-card-heading'>Budget Done</p>
                    <p className='header-card-subheading' style={{ color: "#559776" }}>{done}</p>
                </div>
                <div className='header-card'>
                    <p className='header-card-heading'>Draft Budget</p>
                    <p className='header-card-subheading' style={{ color: "#FD9568" }}>{draft}</p>
                </div>
                <div className='header-card'>
                    <p className='header-card-heading'>Not Found</p>
                    <p className='header-card-subheading' style={{ color: "#D93838" }}>{notFound}</p>
                </div>
            </div>
            <div className='header-line'></div>
            <p className='heading-2' style={{ marginLeft: "32px" }}>Cities</p>
        </>
    )
}

export default HeaderCards