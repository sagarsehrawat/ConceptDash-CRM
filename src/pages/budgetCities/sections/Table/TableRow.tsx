import { faArrowRight, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MutableRefObject, useState } from 'react'
import TFChip from '../../../../components/form/TFChip/TFChip';
import UpdateBudgetCity from '../../forms/UpdateBudgetCity';

type Props = {
    city: City;
    tableRef: MutableRefObject<null>;
    setCityId: Function;
}

const TableRow = ({ city, tableRef, setCityId }: Props) => {
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const addComma = (num: string | number | null) => {
        if (num === null || num === "" || num === undefined) return ""
        const n = num
        return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

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
                <td className='table-cell'>
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
                            onClick={() => {
                                setCityId(city.city_id);
                            }}
                        />
                    </div>
                </td>
            </tr>

            {updateModal && <UpdateBudgetCity show={updateModal} onHide={() => setUpdateModal(false)} city={city} />}
        </>
    )
}

export default TableRow