import React from "react";
import TFChip from "../../../../components/form/TFChip/TFChip";
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";

const Products = ({ form, handleForm, cities }) => {
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
          <TFDateChip
            value={form.dueDate}
            name='dueDate'
            onChange={handleForm}
          />
        </div>

        {/* Follow Up Date */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Follow-up Date</p>
          <TFDateChip
            value={form.followUpDate}
            name='followUpDate'
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

        {/* Priority */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Priority</p>
          <TFChip
          name='priority'
            value={form.priority}
            options={["Low", "Medium", "High", "Critical"]}
            onChange={handleForm}
          />
        </div>

        {/* Design Checklist */}
        <div className="d-flex flex-row align-items-start gap-8 w-100">
          <p className="project-label">Design Checklist</p>
          <div
            className="d-flex flex-column gap-8 w-100"
            style={{ padding: "6px 8px" }}
          >
            <div className="d-flex flex-row align-items-center gap-8">
              <input
                type="checkbox"
                className="project-input-checkbox"
                name="designChecklist"
                checked={form.designChecklist.includes("Site Plan")}
                onChange={(e) => handleForm(e.target.name, "Site Plan")}
              />
              <p className="project-checkbox-label">Site Plan</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-8">
              <input
                type="checkbox"
                className="project-input-checkbox"
                name="designChecklist"
                checked={form.designChecklist.includes("Calculation Sheet")}
                onChange={(e) =>
                  handleForm(e.target.name, "Calculation Sheet")
                }
              />
              <p className="project-checkbox-label">Calculation Sheet</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-8">
              <input
                type="checkbox"
                className="project-input-checkbox"
                name="designChecklist"
                checked={form.designChecklist.includes("Number of Chamber")}
                onChange={(e) =>
                  handleForm(e.target.name, "Number of Chamber")
                }
              />
              <p className="project-checkbox-label">Number of Chamber</p>
            </div>
          </div>
        </div>

        {/* Design Info */}
        <div className="d-flex flex-row align-items-start gap-8 w-100">
          <p className="project-label">Design Info</p>
          <div
            className="d-flex flex-column gap-8 w-100"
            style={{ padding: "6px 8px" }}
          >
            <div className="d-flex flex-row align-items-center gap-8">
              <input
                type="checkbox"
                className="project-input-checkbox"
                name="designInfo"
                checked={form.designInfo.includes("Number of Layers")}
                onChange={(e) =>
                  handleForm(e.target.name, "Number of Layers")
                }
              />
              <p className="project-checkbox-label">Number of Layers</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-8">
              <input
                type="checkbox"
                className="project-input-checkbox"
                name="designInfo"
                checked={form.designInfo.includes("Linear")}
                onChange={(e) => handleForm(e.target.name, "Linear")}
              />
              <p className="project-checkbox-label">Linear</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-8">
              <input
                type="checkbox"
                className="project-input-checkbox"
                name="designInfo"
                checked={form.designInfo.includes("Stone")}
                onChange={(e) => handleForm(e.target.name, "Stone")}
              />
              <p className="project-checkbox-label">Stone</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-8">
              <input
                type="checkbox"
                className="project-input-checkbox"
                name="designInfo"
                checked={form.designInfo.includes("Treatment Row")}
                onChange={(e) =>
                  handleForm(e.target.name, "Treatment Row")
                }
              />
              <p className="project-checkbox-label">Treatment Row</p>
            </div>
          </div>
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

export default Products;
