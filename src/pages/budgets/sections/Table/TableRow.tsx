import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {  useState } from 'react'
import TFDeleteModal from '../../../../components/modals/TFDeleteModal/TFDeleteModal';
import { useDispatch } from 'react-redux';
import { showErrorModal, showSuccessModal } from '../../../../redux/slices/alertSlice';
import SERVICES from '../../../../services/Services';
import { deleteBudget } from '../../../../redux/slices/budgetSlice';
import AddBudget from '../../forms/AddBudget';

type Props = {
    city: City;
    budget: Budget;
}

const TableRow = ({ city, budget }: Props) => {
    const dispatch = useDispatch();
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const addComma = (num: string | number | null) => {
        if (num === null || num === "" || num === undefined) return ""
        const n = num
        return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    const handleDeleteBudget = async () => {
        try{
            await SERVICES.deleteBudget(budget.budget_id);
            dispatch(deleteBudget(budget.budget_id))
            dispatch(showSuccessModal('Budget Deleted Successfully!'))
        } catch (error) {
            console.log(error);
            dispatch(showErrorModal('Something Went Wrong!'))
        }
    }

    return (
        <>
            <tr style={{ width: "100%", backgroundColor: "white", verticalAlign: "top" }} key={budget.budget_id}>
                <td className='table-cell fixed-column'>
                    <div className='d-flex flex-column justify-content-start'>
                        <p style={{ WebkitLineClamp: "1", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px", fontWeight: "500" }}>
                            {budget.project_name}
                        </p>
                        <p style={{ fontWeight: "400", color: "#70757A" }}>
                            Population: {city.population_2021}
                        </p>
                    </div>
                </td>
                <td className='table-cell' style={{ fontWeight: "600" }}>
                    {addComma(budget.budget_amount)}
                </td>
                <td className='table-cell'>{budget.budget_category}</td>
                <td className='table-cell'>{budget.department}</td>
                <td className='table-cell'>{budget.project_category}</td>
                <td className='table-cell' style={{ color: "#70757A" }}>{budget.serial_no}</td>
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
                            icon={faTrash}
                            style={{ cursor: "pointer" }}
                            color="#70757A"
                            height="18px"
                            onClick={() => {
                                setShowDelete(true);
                            }}
                        />
                    </div>
                </td>
            </tr>

             {updateModal && <AddBudget show={updateModal} onHide={() => setUpdateModal(false)} budget={budget} />}

            <TFDeleteModal
                show={showDelete}
                onHide={() => setShowDelete(false)}
                onDelete={handleDeleteBudget}
                label='Budget'
            />
        </>
    )
}

export default TableRow