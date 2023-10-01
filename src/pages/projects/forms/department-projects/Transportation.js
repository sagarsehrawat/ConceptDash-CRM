import React from "react";
import Chip from "../../../../components/ui/Chip/Chip";

const Transportation = ({ form, handleForm }) => {
  return (
    <>
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

        {/* Project Value */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Project Value</p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px" }}
            >
              $
            </p>
            <input
              type="text"
              name="projectValue"
              className="project-input"
              placeholder="0"
              value={form.projectValue}
              onChange={(e) => handleForm(e, e.target.name, e.target.value)}
            />
          </div>
        </div>

        {/* Client Response */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Client Response</p>
          <Chip
            label={form.clientResponse}
            options={["Not Started", "In Progress", "Completed"]}
            onUpdate={async (id, option) => {
              handleForm(null, "clientResponse", option);
              return { success: true };
            }}
          />
        </div>

        {/* Due Date */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Due Date</p>
          <input
            type="date"
            name="dueDate"
            className="project-input"
            value={form.dueDate}
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
          />
        </div>

        {/* Follow Up Date*/}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Follow-up Date</p>
          <input
            type="date"
            name="followUpDate"
            className="project-input"
            value={form.followUpDate}
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

      <div>
        <p className="heading-2">Project Milestone and Tasks</p>
      </div>
    </>
  );
};

export default Transportation;
