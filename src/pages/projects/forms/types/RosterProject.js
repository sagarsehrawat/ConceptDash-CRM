import React from "react";
import Chip from "../../../../components/ui/Chip/Chip";

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
          onChange={(e) => handleForm(e, e.target.name, e.target.value)}
        />

        {/* City */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">City</p>
          <select
            name="city"
            className="project-select"
            placeholder="Select City"
            value={form.city}
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
          >
            <option value="">Select City</option>
          </select>
        </div>

        {/* Status */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Status</p>
          <Chip
            label={form.status}
            options={["Not Started", "In Progress", "Completed"]}
            onUpdate={async (id, option) => {
              handleForm(null, "status", option);
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
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
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
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
          />
        </div>

        {/* Project Manager */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Project Manager</p>
          <select
            name="projectManager"
            className="project-select"
            placeholder="Select Project Manager"
            value={form.projectManager}
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
          >
            <option value="">Choose Project Manager</option>
          </select>
        </div>

        {/* Team Members */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Team Members</p>
          <select
            name="teamMembers"
            className="project-select"
            placeholder="Select Team Members"
            value={form.teamMembers}
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
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
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default RosterProject;
