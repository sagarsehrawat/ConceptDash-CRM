import React from "react";
import Estimation from "../department-projects/Estimation";
import Bidders from "../department-projects/Bidders";
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead'

const IndependentProject = ({ form, handleForm, departments, cities, projectCategories, managers, employees ,clients}) => {
  

  return (
    <>
      {/* Project Details */}
      <div className="d-flex flex-column justify-contents-center w-100">
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
        <Estimation form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} departments={departments} projectCategories={projectCategories} clients ={clients}/>
        <Bidders form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} departments={departments} projectCategories={projectCategories} clients ={clients}/>
        
      </div>
    </>
  );
};

export default IndependentProject;
