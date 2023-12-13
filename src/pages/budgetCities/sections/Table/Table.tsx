import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initCities, selectCities } from '../../../../redux/slices/budgetSlice';
import SERVICES from '../../../../services/Services';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

type Props = {
    search: string;
    isCollapsed: boolean;
    setCityId: Function;
}

const Table = ({
    search,
    setCityId
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const tableRef = useRef(null);
    const dispatch = useDispatch();
    const cities = useSelector(selectCities);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await SERVICES.getBudgetCities();

                dispatch(initCities(response.res));

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return isLoading
        ? <div className='w-100' style={{ height: '492px' }}>
            <LoadingSpinner />
        </div>
        : <div className='table-wrapper' ref={tableRef}>
            <table className='w-100' style={{ borderCollapse: "separate" }} ref={tableRef}>
                <TableHeader />
                {cities.map(city => {
                    if (city.city?.toLowerCase().startsWith(search.toLowerCase())) {
                        return <TableRow
                            city={city}
                            tableRef={tableRef}
                            setCityId={setCityId}
                        />
                    }
                    return <></>
                })}
            </table>
        </div>
}

export default Table