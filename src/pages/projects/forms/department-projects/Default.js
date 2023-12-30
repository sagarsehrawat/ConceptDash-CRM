import React from "react";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFMultiSelect from "../../../../components/form/TFMultiSelect/TFMultiSelect";

const Default = ({ form, handleForm, cities, managers, employees, clients }) => {
  return (
    <>
      {/* City */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">City</p>
        <TFTypeahead
          name="city"
          placeholder="Choose City"
          width="100%"
          defaultValue={form.city}
          onChange={handleForm}
          options={cities}
        />
      </div>

      {/* Client */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">Client</p>
        <TFTypeahead
          name="client"
          placeholder="Choose Client"
          width="100%"
          defaultValue={form.client}
          onChange={handleForm}
          options={clients}
        />
      </div>

      {/* Status */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">Status</p>
        <TFChip
          value={form.status}
          options={["Not Started", "In Progress", "Completed"]}
          name="status"
          onChange={handleForm}
        />
      </div>

      {/* Project Value */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">Project Value</p>
        <div className="d-flex flex-row">
          <p
            className="d-flex align-items-center project-name-input"
            style={{ fontSize: "14px", marginLeft: "8px" }}
          >
            $
          </p>
          <input
            type="text"
            name="projectValue"
            className="project-input"
            placeholder="0"
            value={form.projectValue}
            onChange={(e) => handleForm(e.target.name, e.target.value)}
          />
        </div>
      </div>

      {/* Due Date */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">Due Date</p>
        <TFDateChip value={form.dueDate} name="dueDate" onChange={handleForm} />
      </div>

      {/* Follow Up Date */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">Follow-up Date</p>
        <TFDateChip
          value={form.followUpDate}
          name="followUpDate"
          onChange={handleForm}
        />
      </div>

      {/* Project Manager */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">Project Manager</p>
        <TFTypeahead
          name="projectManager"
          placeholder="Choose Project Manager"
          width="100%"
          defaultValue={form.projectManager}
          onChange={handleForm}
          options={managers}
        />
      </div>

      {/* Team Members */}
      <div className="d-flex flex-row gap-8 w-100">
        <p className="project-label">Team Members</p>
        <TFMultiSelect
          name="teamMembers"
          placeholder="Select Team Memebers"
          selectedOptions={form.teamMembers}
          onChange={handleForm}
          options={employees}
          width="100%"
        />
      </div>

      {/* Project Description */}
      <div className="d-flex flex-column gap-12 w-100">
        <p className="project-label">Project Description</p>
        <textarea
          name="projectDescription"
          className="project-textarea"
          value={form.projectDescription}
          onChange={(e) => handleForm(e.target.name, e.target.value)}
        />
      </div>
    </>
  );
};

export default Default;
