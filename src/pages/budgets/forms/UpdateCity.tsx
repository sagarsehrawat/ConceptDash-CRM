import React, { useState } from 'react'
import { showErrorModal, showSuccessModal } from '../../../redux/slices/alertSlice';
import SERVICES from '../../../services/Services';
import FormUtils from '../../../utils/FormUtils';
import { useDispatch } from 'react-redux';
import { updateCity } from '../../../redux/slices/budgetSlice';
import { decrement, increment } from '../../../redux/slices/projectSlice';
import TFModal from '../../../components/modals/TFModal/TFModal';
import LoadingSpinner from '../../../Main/Loader/Loader';
import TFInput from '../../../components/form/TFInput/TFInput';
import TFSelect from '../../../components/form/TFSelect/TFSelect';

type Props = {
    show: boolean;
    onHide: Function;
    city: City;
}

type Form = {
    website: string;
    website_22: string;
    website_23: string;
    year_22: string;
    year_23: string;
    website_24: string;
    website_25: string;
    year_24: string;
    year_25: string;
    remarks: string;
}

const UpdateCity = ({ show, onHide, city }: Props) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState<Form>({
        website: city.website,
        website_22: city.website_22,
        website_23: city.website_23,
        year_22: city.year_22,
        year_23: city.year_23,
        website_24: city.website_24,
        website_25: city.website_25,
        year_24: city.year_24,
        year_25: city.year_25,
        remarks: city.remarks,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formUtils = FormUtils(setForm);

    const handleForm = (name: keyof Form, value: string) => {
        formUtils.typeInputForm(name, value);
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await SERVICES.updateBudgetCity2(
                form.year_22,
                form.year_23,
                form.year_24,
                form.year_25,
                form.remarks,
                city.city_budget_id,
                form.website,
                form.website_22,
                form.website_23,
                form.website_24,
                form.website_25,
            );

            dispatch(updateCity({
                cityBudgetId: city.city_budget_id,
                data: {
                    ...form
                }
            }))
            if (city.year_23 !== form.year_23) {
                if (city.year_23 === 'Done') dispatch(decrement('DONE'))
                else if (city.year_23 === 'Not Found') dispatch(decrement('NOT_FOUND'));
                else if (city.year_23 === 'Draft Budget') dispatch(decrement('DRAFT'))

                if (form.year_23 === 'Done') dispatch(increment('DONE'))
                else if (form.year_23 === 'Not Found') dispatch(increment('NOT_FOUND'));
                else if (form.year_23 === 'Draft Budget') dispatch(increment('DRAFT'))
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
            heading={`Update Details of ${city.city}`}
            onHandleSubmit={handleSubmit}
            style={{ "width": "36.25em" }}
        >
            {
                isLoading
                    ? <div className='d-flex justify-content-center align-items-center' style={{ height: "300px" }}>
                        <LoadingSpinner />
                    </div>
                    : <>
                        <div className='d-flex flex-column align-items-start gap-20'>
                            <div className='d-flex flex-column w-100'>
                                <p className='project-label'>City</p>
                                <TFInput
                                    name='website'
                                    placeholder='Website'
                                    width='100%'
                                    value={form.website}
                                    onChange={handleForm}
                                />
                            </div>

                            <div className='d-flex flex-column w-100'>
                                <p className='project-label'>Website 2022</p>
                                <TFInput
                                    name='website_22'
                                    placeholder='2022 Website'
                                    width='100%'
                                    value={form.website_22}
                                    onChange={handleForm}
                                />
                            </div>

                            <div className='d-flex flex-column w-100'>
                                <p className='project-label'>Website 2023</p>
                                <TFInput
                                    name='website_23'
                                    placeholder='2023 Website'
                                    width='100%'
                                    value={form.website_23}
                                    onChange={handleForm}
                                />
                            </div>

                            <div className='d-flex flex-column w-100'>
                                <p className='project-label'>Website 2024</p>
                                <TFInput
                                    name='website_24'
                                    placeholder='2024 Website'
                                    width='100%'
                                    value={form.website_24}
                                    onChange={handleForm}
                                />
                            </div>

                            <div className='d-flex flex-column w-100'>
                                <p className='project-label'>Website 2025</p>
                                <TFInput
                                    name='website_25'
                                    placeholder='2025 Website'
                                    width='100%'
                                    value={form.website_25}
                                    onChange={handleForm}
                                />
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

export default UpdateCity