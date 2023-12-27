import React, { useEffect, useState } from 'react'
import FormUtils from '../../../utils/FormUtils';
import { useDispatch } from 'react-redux';
import { showErrorModal, showSuccessModal } from '../../../redux/slices/alertSlice';
import TFModal from '../../../components/modals/TFModal/TFModal';
import LoadingSpinner from '../../../Main/Loader/Loader';
import TFInput from '../../../components/form/TFInput/TFInput';
import SERVICES from '../../../services/Services';
import Utils from '../../../utils/Utils';
import TFTypeahead from '../../../components/form/TFTypeahead/TFTypeahead';
import TFSelect from '../../../components/form/TFSelect/TFSelect';
import { updateBudget } from '../../../redux/slices/budgetSlice';
import moment from 'moment';

type Props = {
  show: boolean;
  onHide: Function;
  budget?: Budget | null;
  setApi?: Function;
  cityId?: number;
}

type Form = {
  projectName: string;
  budgetAmount: string;
  budgetCategory: string;
  department: string;
  departmentId: string;
  projectCategory: string;
  projectCategoryId: string;
  serialNumber: string;
  year: string;
}

const FORM: Form = {
  projectName: "",
  budgetAmount: "",
  budgetCategory: "",
  department: "",
  departmentId: "",
  projectCategory: "",
  projectCategoryId: "",
  serialNumber: "",
  year: moment().year().toString()
}

const AddBudget = ({ show, onHide, budget = null, setApi = () => { }, cityId=0 }: Props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<Form>(budget === null ? FORM : {
    projectName: budget.project_name,
    budgetAmount: budget.budget_amount ? budget.budget_amount.toString() : "",
    budgetCategory: budget.budget_category,
    department: budget.department ?? "",
    departmentId: budget.department_id ? budget.department_id.toString() : "",
    projectCategory: budget.project_category ?? "",
    projectCategoryId: budget.project_cat_id ? budget.project_cat_id.toString() : "",
    serialNumber: budget.serial_no ?? "",
    year: budget.budget_year
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<TypeaheadOptions>([]);
  const [projectCategories, setProjectCategories] = useState<TypeaheadOptions>([]);
  const formUtils = FormUtils(setForm);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departmentsResponse = await SERVICES.getDepartments();
        setDepartments(Utils.convertToTypeaheadOptions(departmentsResponse.res, 'Department', 'Department_ID'));

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const getProjectCategories = async () => {
      try {
        const projectCatoriesResponse = await SERVICES.getProjectCategories(form.departmentId);
        setProjectCategories(Utils.convertToTypeaheadOptions(projectCatoriesResponse.res, 'Project_Category', 'Project_Cat_ID'));
      } catch (error) {
        console.log(error);
      }
    }
    getProjectCategories();
  }, [form.departmentId])

  const handleForm = (name: keyof Form, value: string) => {
    if (name === 'department' || name === 'projectCategory') {
      formUtils.typeaheadForm(name, value);
    } else {
      formUtils.typeInputForm(name, value);
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (budget === null) {
        await SERVICES.addBudget(
          cityId,
          form.departmentId,
          form.projectCategoryId,
          form.projectName,
          form.budgetCategory,
          form.budgetAmount,
          form.year,
          form.serialNumber
        );

        setApi((prev: number) => prev + 1);
        dispatch(showSuccessModal('Budget Added Successfully!'))
      } else {
        await SERVICES.updateBudget(
          budget.city_id,
          form.departmentId,
          form.projectCategoryId,
          form.projectName,
          form.budgetCategory,
          form.budgetAmount,
          form.year,
          form.serialNumber,
          budget.budget_id
        );

        dispatch(updateBudget({budgetId: budget.budget_id, data: {
          department: form.department,
          department_id: form.departmentId!==null && form.departmentId!=="" ? parseInt(form.departmentId) : null,
          project_cat_id: form.projectCategoryId!==null && form.projectCategoryId!=="" ? parseInt(form.projectCategoryId) : null,
          project_category: form.projectCategory,
          project_name: form.projectName,
          budget_category: form.budgetCategory,
          budget_amount: form.budgetAmount!==null && form.budgetAmount!=="" ? parseInt(form.budgetAmount) : null,
          serial_no: form.serialNumber
        }}))
        dispatch(showSuccessModal('Budget Updated Successfully!'))
      }
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
      heading={`${budget ? "Update" : "Add"} Budget${budget ? ` of ${budget.project_name}` : ''}`}
      onHandleSubmit={handleSubmit}
      style={{ "width": "36.25em" }}
    >
      {
        isLoading
          ? <div className='d-flex justify-content-center align-items-center' style={{ height: "300px" }}>
            <LoadingSpinner />
          </div>
          : <div className='d-flex flex-column align-items-start gap-20'>
            <div className='d-flex flex-column w-100'>
              <p className='project-label'>Project Name</p>
              <TFInput
                name='projectName'
                placeholder='Project Name'
                width='100%'
                value={form.projectName}
                onChange={handleForm}
              />
            </div>

            <div className='d-flex flex-row justify-content-around gap-12 w-100'>
              <div className='d-flex flex-column w-100'>
                <p className='project-label'>Budget Amount</p>
                <TFInput
                  name='budgetAmount'
                  placeholder='Budget Amount'
                  width='100%'
                  value={form.budgetAmount}
                  onChange={handleForm}
                />
              </div>

              <div className='d-flex flex-column w-100'>
                <p className='project-label'>Budget Category</p>
                <TFSelect
                  name='budgetCategory'
                  placeholder='Budget Category'
                  value={form.budgetCategory}
                  onChange={handleForm}
                  options={[
                    { label: 'Design', value: 'Design' },
                    { label: 'Construction', value: 'Construction' },
                  ]}
                />
              </div>
            </div>

            <div className='d-flex flex-row justify-content-around gap-12 w-100'>
              <div className='d-flex flex-column w-100'>
                <p className='project-label'>Department</p>
                <TFTypeahead
                  name='department'
                  placeholder='Choose Department'
                  width='100%'
                  defaultValue={form.department}
                  onChange={handleForm}
                  options={departments}
                />
              </div>

              {projectCategories.length !== 0 && form.departmentId !== "" && <div className='d-flex flex-column w-100'>
                <p className='project-label'>Project Category</p>
                <TFTypeahead
                  name='projectCategory'
                  placeholder='Choose Project Category'
                  width='100%'
                  defaultValue={form.projectCategory}
                  onChange={handleForm}
                  options={projectCategories}
                />
              </div>}
            </div>

            <div className='d-flex flex-row justify-content-around gap-12 w-100'>
              <div className='d-flex flex-column w-100'>
                <p className='project-label'>Serial Number</p>
                <TFInput
                  name='serialNumber'
                  placeholder='Serial Number'
                  width='100%'
                  value={form.serialNumber}
                  onChange={handleForm}
                />
              </div>

              <div className='d-flex flex-column w-100'>
                <p className='project-label'>Budget Year</p>
                <TFSelect
                  name='year'
                  placeholder='Choose Year'
                  value={form.year}
                  readOnly={budget !== null}
                  onChange={handleForm}
                  options={[
                    { label: '2021', value: '2021' },
                    { label: '2022', value: '2022' },
                    { label: '2023', value: '2023' },
                    { label: '2024', value: '2024' },
                  ]}
                />
              </div>
            </div>
          </div>
      }
    </TFModal>
  )
}

export default AddBudget