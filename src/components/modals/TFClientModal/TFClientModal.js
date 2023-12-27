import React, { useEffect, useState } from 'react'
import { GET_ALL_ORGANIZATION, GET_ORGANIZATION_LIST, HOST } from '../../../Main/Constants/Constants';
import axios from 'axios';
import Utils from '../../../utils/Utils';
import './TFClientModal.css'
import TFMultiSelect from '../../form/TFMultiSelect/TFMultiSelect';
import FormUtils from '../../../utils/FormUtils';
import TFButton from '../../ui/TFButton/TFButton';

const TFClientModal = ({show, onHide, onSubmit}) => {
    const [IsLoading, setIsLoading] = useState(false)
    const [orgs, setorgs] = useState([])
    const [form, setForm] = useState({
      organizations: []
    });
    const formUtils = FormUtils(setForm);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(HOST + GET_ORGANIZATION_LIST, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                });
                console.log(response.data.res)
                setorgs(Utils.convertToTypeaheadOptions(response.data.res, 'company_name', 'company_id'));
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  return show && (
    <div className="tf-modal-backdrop d-flex justify-content-center align-items-center">
      <div className='tf-client-modal'>
        <div className=''>

        </div>

        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">External Organizations</p>
          <TFMultiSelect
            name="organizations"
            placeholder="Select Organizations"
            selectedOptions={form.organizations}
            options={orgs}
            width="100%" 
            onChange={(name, value) => {
              formUtils.multiSelectForm(name, value);
            }}
          />
        </div>

        <div className='d-flex flex-row justify-content-end gap-20'>
          <TFButton
            label='Cancel'
            variant='secondary'
            handleClick={onHide}
          />
          <TFButton
            label='Save Changes'
            variant='primary'
            handleClick={() => onSubmit(form.organizations)}
          />
        </div>
    </div>
    </div>
  )
}

export default TFClientModal;