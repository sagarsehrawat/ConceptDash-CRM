import React from "react";
import Estimation from "../SubDetails/Details";
import Bidders from "../SubDetails/Bidders";

const IndependentProject = ({ form, handleForm, departments, cities, projectCategories, managers, employees ,clients, sources}) => {
  

  return (
    <>
      {/* Project Details */}
      <div className="d-flex flex-column justify-contents-center w-100">
      </div>

      <div className="d-flex flex-column gap-8 w-100">
        <Estimation form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} departments={departments} projectCategories={projectCategories} clients ={clients} sources = {sources}/>
        <Bidders form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} departments={departments} projectCategories={projectCategories} clients ={clients}/>
      </div>
    </>
  );
};

export default IndependentProject;
