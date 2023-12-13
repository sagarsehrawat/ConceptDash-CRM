import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initBudgets, selectBudgets } from '../../../../redux/slices/budgetSlice';
import SERVICES from '../../../../services/Services';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface FilterType {
    dept: (string | number)[],
    cat: (string | number)[],
    budgetCategory: (string | number)[],
}

type Props = {
    search: string;
    filter: FilterType;
    year: string;
    city: City;
    api: number;
}

const Table = ({ search, filter, year, city, api }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const tableRef = useRef(null);
    const dispatch = useDispatch();
    const budgets = useSelector(selectBudgets);
    console.log(budgets);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await SERVICES.getCityBudgets(year, search, city.city_id, filter);
                dispatch(initBudgets(response.res));
                setTotalAmount(response.totalAmount)

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [api, search, year, filter]);

    const addComma = (num: number) => {
        if (num === null || num === undefined) return ""
        const n = num
        return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    return isLoading
        ? <div className='w-100' style={{ height: '492px' }}>
            <LoadingSpinner />
        </div>
        : <>
            <div className='table-wrapper' ref={tableRef}>
                <table className='w-100' style={{ borderCollapse: "separate" }} ref={tableRef}>
                    <TableHeader />
                    {budgets.map(budget => {
                        return <TableRow
                            city={city}
                            budget={budget}
                        />
                    })}
                </table>
            </div>
            <div style={{ height: "44px", padding: "12px 32px", background: "#F7F7F9", border: "1px solid #EBE9F1", marginBottom: "20px" }}>
                <p style={{ fontFamily: 'Roboto', fontStyle: "normal", width: "238px", height: "20px", fontWeight: 400, fontSize: "13px", display: "inline-block" }}>Total</p>
                <p style={{ fontFamily: 'Roboto', fontStyle: "normal", width: "238px", height: "20px", fontWeight: 500, fontSize: "13px", display: "inline-block" }}>{totalAmount ? addComma(totalAmount) : "$ 0"}</p>
            </div>
        </>
}

export default Table