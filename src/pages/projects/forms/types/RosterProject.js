import React from "react";
import TFChip from "../../../../components/ui/TFChip/TFChip";
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead";

const RosterProject = ({ form, handleForm }) => {
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
            options={[{ value: 1, label: 'Products' }, { value: 2, label: 'Transportation' }, { value: 1, label: 'Estimation' }]}
          />
        </div>

        {/* Status */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Status</p>
          <TFChip
            label={form.status}
            options={["Not Started", "In Progress", "Completed"]}
            onUpdate={async (id, option) => {
              handleForm("status", option);
              return { success: true };
            }}
          />
        </div>

        {/* Contract Accepted Date */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Contract Accepted Date</p>
          <input
            type="date"
            name="contractAcceptedDate"
            className="project-input"
            value={form.contractAcceptedDate}
            onChange={(e) => handleForm(e.target.name, e.target.value)}
          />
        </div>

        {/* Contract Expiry Date */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Contract Expiry Date</p>
          <input
            type="date"
            name="contractExpiryDate"
            className="project-input"
            value={form.contractExpiryDate}
            onChange={(e) => handleForm(e.target.name, e.target.value)}
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
            options={[]}
          />
        </div>

        {/* Team Members */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Team Members</p>
          <select
            name="teamMembers"
            className="project-select"
            placeholder="Select Team Members"
            value={form.teamMembers}
            onChange={(e) => handleForm(e.target.name, e.target.value)}
          >
            <option value="">Choose Team Members</option>
          </select>
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
      </div>
    </>
  );
};

export default RosterProject;
