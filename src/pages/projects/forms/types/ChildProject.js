import React from "react";
import Chip from "../../../../components/ui/Chip/Chip";
import Products from "../department-projects/Products";
import Transportation from "../department-projects/Transportation";
import Estimation from "../department-projects/Estimation";
import Default from "../department-projects/Default";

const ChildProject = ({ form, handleForm }) => {
      // Handle Changing of Departments in Form
      const handleDepartmentProject = (department) => {
        switch (department) {
            case 'Products':
                return <Products form={form} handleForm={handleForm} />
            case 'Transportation':
                return <Transportation form={form} handleForm={handleForm} />
            case 'Estimation':
                return <Estimation form={form} handleForm={handleForm} />
            default:
                return <Default form={form} handleForm={handleForm} />
        }
    }
    
  return (
    <>
      <div className="d-flex flex-column flex-start gap-8">
        {/* Roster Name */}
        <div className="d-flex flex-start gap-8">
          <p className="project-label">
            Roster Name <sup style={{ color: "#E13D19" }}>*</sup>
          </p>
          <select
            name="roster"
            value={form.roster}
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
            className="project-select"
          >
            <option className="project-option-select" value={""}>
              Choose Roster
            </option>
          </select>
        </div>

        {/* Department */}
        <div className="d-flex flex-start gap-8">
          <p className="project-label">
            Department <sup style={{ color: "#E13D19" }}>*</sup>
          </p>
          <select
            name="department"
            value={form.department}
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
            className="project-select"
          >
            <option className="project-option-select" value={""}>
              Choose Department
            </option>
            <option className="project-option-select" value={"Products"}>
              Products
            </option>
            <option className="project-option-select" value={"Transportation"}>
              Transportation
            </option>
            <option className="project-option-select" value={"Estimation"}>
              Estimation
            </option>
          </select>
        </div>

        {/* Project Category */}
        <div className="d-flex flex-start gap-8">
          <p className="project-label">Project Category</p>
          <select
            name="projectCategory"
            value={form.projectCategory}
            onChange={(e) => handleForm(e, e.target.name, e.target.value)}
            className="project-select"
          >
            <option className="project-option-select" value={""}>
              Choose Project Category
            </option>
          </select>
        </div>
      </div>

      {/* Project Details */}
      <div className="d-flex flex-column justify-contents-center w-100">
        <p className="project-header">Add Child Project Details</p>
        <p className="project-subheader">
          Add Project Details to finish adding the project
        </p>
      </div>

      {handleDepartmentProject(form.department)}
    </>
  );
};

export default ChildProject;
