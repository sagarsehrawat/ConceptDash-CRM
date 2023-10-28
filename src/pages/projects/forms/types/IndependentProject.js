import React from "react";
import Default from "../department-projects/Default";
import Products from "../department-projects/Products";
import Transportation from "../department-projects/Transportation";
import Estimation from "../department-projects/Estimation";
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead'

const IndependentProject = ({ form, handleForm, departments, cities,projectCategories }) => {
  // Handle Changing of Departments in Form
  const handleDepartmentProject = (department) => {
    switch (department) {
      case 'Products':
        return <Products form={form} handleForm={handleForm} cities={cities} />
      case 'Traffic and transportation Engineering':
        return <Transportation form={form} handleForm={handleForm} cities={cities} />
      case 'Estimation':
        return <Estimation form={form} handleForm={handleForm} cities={cities} />
      default:
        return <Default form={form} handleForm={handleForm} cities={cities} />
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
          projectCategories.length !==0
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

      {handleDepartmentProject(form.department)}
    </>
  );
};

export default IndependentProject;
