import React from "react";
import Default from "../department-projects/Default";
import Products from "../department-projects/Products";
import Transportation from "../department-projects/Transportation";
import Estimation from "../department-projects/Estimation";
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead'

const   IndependentProject = ({ form, handleForm, departments, cities, projectCategories, managers, employees, clients }) => {
  // Handle Changing of Departments in Form
  const handleDepartmentProject = (department, projectCategory = null) => {
    switch (department) {
      case 'Traffic and transportation Engineering':
        return <Transportation form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} clients={clients} />
      case 'Estimation':
        return <Estimation form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} clients={clients} />
      case 'Products':
        if (projectCategory === 'EzStorm') return <Products form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} clients={clients} />
      default:
        return <Default form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} clients={clients} />
    }
  }

  return (
    <>
      <div className="d-flex flex-column flex-start gap-8">
        {/* Department */}
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
      </div>

      {/* Project Details */}
      <div className="d-flex flex-column justify-contents-center w-100">
        <p className="project-header">Add Project Details</p>
        <p className="project-subheader">
          Add Project Details to finish adding the project
        </p>
      </div>

      <div className="d-flex flex-column gap-8 w-100">
        {/* Project Name */}
        <input
          type="text"
          name="projectName"
          className="project-input project-name-input"
          placeholder="Project Name"
          required={true}
          value={form.projectName}
          onChange={(e) => handleForm(e.target.name, e.target.value)}
        />
        {handleDepartmentProject(form.department, form.projectCategory)}
      </div>
    </>
  );
};

export default IndependentProject;
