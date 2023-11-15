import React from "react";
import Products from "../department-projects/Products";
import Transportation from "../department-projects/Transportation";
import Estimation from "../department-projects/Estimation";
import Default from "../department-projects/Default";
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead";

const ChildProject = ({ form, handleForm, departments, cities, projectCategories, rosters, managers, employees }) => {
  // Handle Changing of Departments in Form
  const handleDepartmentProject = (department, projectCategory = null) => {
    switch (department) {
      case 'Traffic and transportation Engineering':
        return <Transportation form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
      case 'Estimation':
        return <Estimation form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
        case 'Products':
          if (projectCategory === 'EzStorm') return <Products form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
      default:
        return <Default form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
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
          <TFTypeahead
            name='roster'
            placeholder='Choose Roster'
            defaultValue={form.roster}
            width='100%'
            onChange={handleForm}
            options={rosters}
          />
        </div>

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
          form.departmentId!=="" && projectCategories.length !== 0
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
        <p className="project-header">Add Child Project Details</p>
        <p className="project-subheader">
          Add Project Details to finish adding the project
        </p>
      </div>

      {handleDepartmentProject(form.department, form.projectCategory)}
    </>
  );
};

export default ChildProject;
