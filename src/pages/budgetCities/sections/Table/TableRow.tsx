import { faArrowRight, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MutableRefObject, useState,useEffect } from 'react'
import TFChip from '../../../../components/form/TFChip/TFChip';
import UpdateBudgetCity from '../../forms/UpdateBudgetCity';

type Props = {
    city: City;
    tableRef: MutableRefObject<HTMLDivElement | null>
    setCityId: Function;
}

const TableRow = ({ city, tableRef, setCityId }: Props) => {
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        const savedScrollPosition = localStorage.getItem('tableScrollPosition');
        if (savedScrollPosition) {
          setScrollPosition(parseInt(savedScrollPosition, 10));
        }
      }, []);

    // useEffect(() => {
    //     const savedScrollPosition = scrollPosition;
    //     if (savedScrollPosition) {
    //       setScrollPosition(scrollPosition);
    //     }
    //   }, []);

    // Set the scroll position when tableRef changes
    useEffect(() => {
        if (tableRef.current instanceof HTMLDivElement) {
            tableRef.current.scrollTop = scrollPosition;
        }
    }, [scrollPosition, tableRef]);

console.log(scrollPosition)
    const addComma = (num: string | number | null) => {
        if (num === null || num === "" || num === undefined) return ""
        const n = num
        return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    const handleArrowRightClick = () => {
        if (tableRef.current instanceof HTMLDivElement) {
             const newScrollPosition = tableRef.current.scrollTop;
             localStorage.setItem('tableScrollPosition', newScrollPosition.toString());
            console.log("Setting scroll position to:", newScrollPosition);

            console.log("Current scroll position:", tableRef.current.scrollTop);
        }
        setCityId(city.city_id);
    };

    // const handleArrowRightClick = () => {
    //     if (tableRef.current instanceof HTMLDivElement) {
    //         const newScrollPosition = tableRef.current.scrollTop;

    //         console.log(newScrollPosition)
    //         setScrollPosition(newScrollPosition);
    //     }
    //     if(scrollPosition){
    //         console.log(scrollPosition)
    //         setCityId(city.city_id);
    //     }
    // };




    return (
        <>
            <tr style={{ width: "100%", backgroundColor: "white", verticalAlign: "top" }} key={city.city_budget_id}>
                <td className='table-cell'>
                    <div className='d-flex flex-column justify-content-start'>
                        <p style={{ WebkitLineClamp: "1", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px", fontWeight: "500" }}>
                            {city.city}
                        </p>
                        <p style={{ fontWeight: "400", color: "#70757A" }}>
                            {city.municipality_type}
                        </p>
                    </div>
                </td>
                <td className='table-cell'>{city.geographic_area}</td>
                <td className='table-cell'>{city.population_2021}</td>
                <td style={{ fontWeight: "600" }}>
                    {addComma(city.capital_budget_23)}
                </td>
                <td className='table-cell'>
                    <TFChip
                        value={city.year_23}
                        name={city.city_budget_id}
                        tableRef={tableRef}
                        options={["Not Found", "Draft Budget", "Done"]}
                    />
                </td>
                <td className='table-cell'>
                    <TFChip
                        value={city.year_24}
                        name={city.city_budget_id}
                        tableRef={tableRef}
                        options={["Not Found", "Draft Budget", "Done"]}
                    />
                </td>
                <td className='table-cell'>
                    <TFChip
                        value={city.year_25}
                        name={city.city_budget_id}
                        tableRef={tableRef}
                        options={["Not Found", "Draft Budget", "Done"]}
                    />
                </td>
                <td className='table-cell' style={{ color: "#70757A" }}>
                    <p style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>
                        {city.remarks}
                    </p>
                </td>
                <td className='table-cell' style={{ position: "sticky", right: 0, zIndex: 1, backgroundColor: "white" }}>
                    <div className='d-flex flex-row'>
                        <FontAwesomeIcon
                            icon={faPencil}
                            style={{ cursor: "pointer", marginRight: "23px" }}
                            color="#70757A"
                            height="18px"
                            onClick={() => {
                                setUpdateModal(true);
                            }}
                        />
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ cursor: "pointer" }}
                            color="#70757A"
                            height="18px"
                            onClick={handleArrowRightClick}
                            
                        />
                    </div>
                </td>
            </tr>

            {updateModal && <UpdateBudgetCity show={updateModal} onHide={() => setUpdateModal(false)} city={city} />}
        </>
    )
    
}


export default TableRow