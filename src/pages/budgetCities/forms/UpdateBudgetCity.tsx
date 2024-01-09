import React, { useState } from 'react'
import TFModal from '../../../components/modals/TFModal/TFModal'
import TFInput from '../../../components/form/TFInput/TFInput';
import FormUtils from '../../../utils/FormUtils';
import TFSelect from '../../../components/form/TFSelect/TFSelect';
import SERVICES from '../../../services/Services';
import { useDispatch } from 'react-redux';
import { decrement, increment, updateCity } from '../../../redux/slices/budgetSlice';
import { showErrorModal, showSuccessModal } from '../../../redux/slices/alertSlice';
import LoadingSpinner from '../../../Main/Loader/Loader';

type Props = {
    show: boolean;
    onHide: Function;
    city: City;
}

type Form = {
    city: string;
    geographicArea: string;
    municipalityType: string;
    population: string;
    year_22: string;
    year_23: string;
    year_24: string;
    year_25: string;
    remarks: string;
    capitalBudget: string | null;
}

const UpdateBudgetCity = ({ show, onHide, city }: Props) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState<Form>({
        city: city.city,
        geographicArea: city.geographic_area,
        municipalityType: city.municipality_type,
        population: city.population_2021,
        year_22: city.year_22,
        year_23: city.year_23,
        year_24: city.year_24,
        year_25: city.year_25,
        remarks: city.remarks,
        capitalBudget: city.capital_budget_23 ? city.capital_budget_23.toString() : "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formUtils = FormUtils(setForm);

    const handleForm = (name: keyof Form, value: string) => {
        formUtils.typeInputForm(name, value);
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await SERVICES.updateBudgetCity1(
                form.year_22,
                form.year_23,
                form.year_24,
                form.year_25,
                form.remarks,
                city.city_budget_id,
                form.population,
                form.geographicArea,
                form.municipalityType,
                city.city_id
            );

            dispatch(updateCity({
                cityBudgetId: city.city_budget_id,
                data: {
                    year_22: form.year_22,
                    year_23: form.year_23,
                    year_24: form.year_24,
                    year_25: form.year_25,
                    remarks: form.remarks,
                    population_2021: form.population,
                    geographic_area: form.geographicArea,
                    municipality_type: form.municipalityType
                }
            }))
            if(city.year_23 !== form.year_23){
                if(city.year_23 === 'Done') dispatch(decrement('DONE'))
                else if(city.year_23 === 'Not Found') dispatch(decrement('NOT_FOUND'));
                else if(city.year_23 === 'Draft Budget') dispatch(decrement('DRAFT'))

                if(form.year_23 === 'Done') dispatch(increment('DONE'))
                else if(form.year_23 === 'Not Found') dispatch(increment('NOT_FOUND'));
                else if(form.year_23 === 'Draft Budget') dispatch(increment('DRAFT'))
            }
            dispatch(showSuccessModal('City Updated Successfully!'))
            onHide();
        } catch (error) {
            console.log(error);
            dispatch(showErrorModal('Something Went Wrong!'))
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <TFModal
            show={show}
            onHide={onHide}
            heading={`Update Budget of ${city.city}`}
            onHandleSubmit={handleSubmit}
            style={{ "width": "36.25em" }}
        >

            {
                isLoading ?
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "300px" }}>
                        <LoadingSpinner />
                    </div>
                    : <>
                        <div className='d-flex flex-column align-items-start gap-20'>
                            <div className='d-flex flex-column w-100'>
                                <p className='project-label'>City</p>
                                <TFInput
                                    name='city'
                                    placeholder='City'
                                    width='100%'
                                    value={form.city}
                                    readOnly={true}
                                    onChange={handleForm}
                                />
                            </div>

                            <div className='d-flex flex-row justify-content-around gap-12 w-100'>
                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Region</p>
                                    <TFInput
                                        name='geographicArea'
                                        placeholder='Region'
                                        width='100%'
                                        value={form.geographicArea}
                                        onChange={handleForm}
                                    />
                                </div>

                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Municipality Type</p>
                                    <TFInput
                                        name='municipalityType'
                                        placeholder='Municipality Type'
                                        width='100%'
                                        value={form.municipalityType}
                                        onChange={handleForm}
                                    />
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-around gap-12 w-100'>
                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Population</p>
                                    <TFInput
                                        name='population'
                                        placeholder='Population'
                                        width='100%'
                                        value={form.population}
                                        onChange={handleForm}
                                    />
                                </div>

                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Capital Budget</p>
                                    <TFInput
                                        name='capitalBudget'
                                        readOnly={true}
                                        placeholder='Capital Budget'
                                        width='100%'
                                        value={form.capitalBudget}
                                        onChange={handleForm}
                                    />
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-around gap-12 w-100'>
                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Update 2022 Budget Status</p>
                                    <TFSelect
                                        name='year_22'
                                        placeholder='Choose Budget'
                                        value={form.year_22}
                                        onChange={handleForm}
                                        options={[
                                            { label: 'Done', value: 'Done' },
                                            { label: 'Not Found', value: 'Not Found' },
                                            { label: 'Draft Budget', value: 'Draft Budget' },
                                        ]}
                                    />
                                </div>

                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Update 2023 Budget Status</p>
                                    <TFSelect
                                        name='year_23'
                                        placeholder='Choose Budget'
                                        value={form.year_23}
                                        onChange={handleForm}
                                        options={[
                                            { label: 'Done', value: 'Done' },
                                            { label: 'Not Found', value: 'Not Found' },
                                            { label: 'Draft Budget', value: 'Draft Budget' },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-around gap-12 w-100'>
                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Update 2024 Budget Status</p>
                                    <TFSelect
                                        name='year_24'
                                        placeholder='Choose Budget'
                                        value={form.year_24}
                                        onChange={handleForm}
                                        options={[
                                            { label: 'Done', value: 'Done' },
                                            { label: 'Not Found', value: 'Not Found' },
                                            { label: 'Draft Budget', value: 'Draft Budget' },
                                        ]}
                                    />
                                </div>

                                <div className='d-flex flex-column w-100'>
                                    <p className='project-label'>Update 2025 Budget Status</p>
                                    <TFSelect
                                        name='year_25'
                                        placeholder='Choose Budget'
                                        value={form.year_25}
                                        onChange={handleForm}
                                        options={[
                                            { label: 'Done', value: 'Done' },
                                            { label: 'Not Found', value: 'Not Found' },
                                            { label: 'Draft Budget', value: 'Draft Budget' },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className='d-flex flex-column w-100'>
                                <p className='project-label'>Add Remarks</p>
                                <textarea
                                    name='remarks'
                                    className='tf-textarea'
                                    placeholder='Remarks'
                                    value={form.remarks}
                                    onChange={(e) => handleForm('remarks', e.target.value)}
                                />
                            </div>
                        </div>
                    </>
            }
        </TFModal>
    )
}

export default UpdateBudgetCity