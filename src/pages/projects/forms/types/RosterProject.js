import React from "react";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
import TFMultiSelect from "../../../../components/form/TFMultiSelect/TFMultiSelect";

const RosterProject = ({ form, handleForm, cities, managers, employees }) => {
  return (
    <>
      {/* Project Details */}
      <div className="d-flex flex-column justify-contents-center w-100">
        <p className="project-header">Add Roster Details</p>
        <p className="project-subheader">
          Add Roster Details and its Sub Projects
        </p>
      </div>

      <div className="d-flex flex-column gap-8 w-100">
        {/* Project Name */}
        <input
          type="text"
          name="projectName"
          className="project-input project-name-input"
          placeholder="Project Name"
          value={form.projectName}
          onChange={(e) => handleForm(e.target.name, e.target.value)}
        />

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
            name='status'
            value={form.status}
            options={["Not Started", "In Progress", "Completed"]}
            onChange={handleForm}
          />
        </div>

        {/* Contract Accepted Date */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Contract Accepted Date</p>
          <TFDateChip
            value={form.contractAcceptedDate}
            name='contractAcceptedDate'
            onChange={handleForm}
          />
        </div>

        {/* Contract Expiry Date */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Contract Expiry Date</p>
          <TFDateChip
            value={form.contractExpiryDate}
            name='contractExpiryDate'
            onChange={handleForm}
          />
        </div>

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
          <p className="project-label">Roster Description</p>
          <textarea
            name="projectDescription"
            className="project-textarea"
            value={form.projectDescription}
            onChange={(e) => handleForm(e.target.name, e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default RosterProject;
