import React from 'react'
import TFChip from '../../../../components/form/TFChip/TFChip';
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import TFInput from '../../../../components/form/TFInput/TFInput';
import TFMultiSelect from '../../../../components/form/TFMultiSelect/TFMultiSelect';

const Estimation = ({ form, handleForm,cities, managers, employees, departments, projectCategories ,clients}) => {
  return (
    <>
        {/* City */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">City</p>
          <TFTypeahead
            name='city'
            placeholder='Choose City'
            width='100%'
            defaultValue={form.city}
            onChange={handleForm}
            options={cities}
          />
        </div>

        {/* Status */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Status</p>
          <TFChip
            value={form.result}
            name='result'
            options={["Lost", "Won", "Submitted","Pending"]}
            onChange={handleForm}
          />
        </div>

        {/* Client */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Client</p>
          <TFTypeahead
            name='client'
            placeholder='Choose Client'
            width='100%'
            defaultValue={form.client}
            onChange={handleForm}
            options={clients}
          />
        </div>


        {/* Rating */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Client Rating</p>
          <TFChip
            value={form.rating}
            name='rating'
            options={["1", "2", "3"]}
            onChange={handleForm}
          />
        </div>

        {/* Question Deadline */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Question Deadline</p>
          <TFDateChip
            value={form.questionDeadline}
            name='questionDeadline'
            onChange={handleForm}
          />
        </div>

        {/* Closing Deadline */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Closing Deadline</p>
          <TFDateChip
            value={form.closingDeadline}
            name='closingDeadline'
            onChange={handleForm}
          />
        </div>


        {/* Priority */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Priority</p>
          <TFChip
            value={form.priority}
            name='priority'
            options={["Low", "Medium", "High"]}
            onChange={handleForm}
          />
        </div>


        {/* Total Bid Price */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Total Bid Price</p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px", marginLeft: "8px" }}
            >
              $
            </p>
            {/* <input
              type="text"
              name="totalBidPrice"
              className="project-input"
              placeholder="0"
              value={form.designPrice+form.provisionalItems+form.contractAdminPrice+form.subConsultantPrice}
              // onChange={(e) => handleForm(e.target.name, e.target.value)}
            /> */}
            <p className="project-input d-flex flex-row align-items-center">{(form.designPrice === '' ? 0 : parseInt(form.designPrice ))+(form.provisionalItems === '' ? 0 : parseInt(form.provisionalItems ))+ (form.contractAdminPrice === '' ? 0 : parseInt(form.contractAdminPrice ))+ (form.subConsultantPrice === '' ? 0 : parseInt(form.subConsultantPrice ))}</p>
          </div>
        </div>

        {/* Source */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Source</p>
          <TFInput
            name="source"
            placeholder='Source'
            value={form.source}
            onChange={handleForm}
            width="100%"
            />
        </div>

        {/* Partners */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Partners</p>
          <TFMultiSelect
            name="partners"
            placeholder="Partners"
            selectedOptions={form.partners}
            onChange={handleForm}
            options={clients}
            width="100%"
          />
        </div>
        
        

        {/* Details */}
        <p className="project-header">Team and Department</p>

        <div className="d-flex flex-start gap-8">
          <p className="project-label">
            Department <sup style={{ color: "#E13D19" }}>*</sup>
          </p>
          <TFTypeahead
            name='department'
            placeholder='Choose Department'
            width='100%'
            defaultValue={form.department}
            onChange={handleForm}
            options={departments}
          />
        </div>

        {/* Project Category */}
        {
          projectCategories.length !== 0 && form.departmentId !== ""
            ? <div className="d-flex flex-start gap-8">
              <p className="project-label">Project Category</p>
              <TFTypeahead
                name='projectCategory'
                placeholder='Choose Project Category'
                width='100%'
                defaultValue={form.projectCategory}
                onChange={handleForm}
                options={projectCategories}
              />
            </div>
            : <></>
        }


        {/* Project Manager */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Project Manager</p>
          <TFTypeahead
            name='projectManager'
            placeholder='Choose Project Manager'
            width='100%'
            defaultValue={form.projectManager}
            onChange={handleForm}
            options={managers}
          />
        </div>

        {/* Team Members */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Team Members</p>
          <TFMultiSelect
            name="team"
            placeholder="Select Team Memebers"
            selectedOptions={form.team}
            onChange={handleForm}
            options={employees}
            width="100%"
          />
        </div>
    </>
  )
}

export default Estimation