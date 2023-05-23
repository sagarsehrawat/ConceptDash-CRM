import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import {
  CREATE_PROPOSAL,
  GET_PROJECT_CATEGORY_DEPARTMENT,
  GET_PROPOSAL,
  HOST,
  PRIMARY_COLOR,
} from "../Constants/Constants";
import axios from "axios";
import Designations from "../../utils/Designations";

const animatedComponents = makeAnimated();

const ColorButton = styled(Button)({
  boxShadow: "none",
  backgroundColor: PRIMARY_COLOR,
  marginTop: "2rem",
  fontSize: "14px",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.8,
  },
});

const styles = {
  pmSelectorText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "28px",
    color: "#0A0A0A",
  },
  fadedText(marginTop, marginBottom) {
    return {
      marginTop: `${marginTop}`,
      marginBottom: `${marginBottom}`,
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#70757A",
    };
  },
  rateInputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "0.6px solid #BEBEC0",
    borderRadius: "6px",
    padding: "0.5rem",
  },
  rateInput: {
    border: "0px solid",
    outline: "none",
  },
  keywordsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  keywordContainer: {
    display: "flex",
    alignItems: "center",
  },
  keywordInput: {
    marginLeft: "10px",
  },
  keyword: {},
};

const keywordsData = [
  "Aborist",
  "Planner",
  "Environmental Expert",
  "Survey",
  "Geotechnical",
  "Landscaping",
];

const options = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];

const PMSelector = (props) => {
  const { isCollapsed } = props;
  const [isLoading, setIsLoading] = useState(false);

  const [rate, setRate] = useState(0);
  const [value, setValue] = useState([]);
  const [keywords, setKeywords] = useState({
    Aborist: false,
    Planner: false,
    "Environmental Expert": false,
    Survey: false,
    Geotechnical: false,
    Landscaping: false,
  });
  const [generatedProposals, setGeneratedProposals] = useState([]);
  const [recProposals, setRecProposals] = useState([]);
  const [allProposals, setAllProposals] = useState([]);
  const [allProjectCategoriesDepartments, setAllProjectCategoriesDepartments] =
    useState([]);
  const [employeesFrequency, setEmployeesFrequency] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const responses = await Promise.all([
          axios.get(HOST + GET_PROPOSAL("*")),
          axios.get(HOST + GET_PROJECT_CATEGORY_DEPARTMENT),
        ]);
        setAllProposals(responses[0].data);
        setAllProjectCategoriesDepartments(responses[1].data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  function handleSelectChange(data) {
    setValue(data);
    let employeesFrequencyObj = {};
    data.forEach((d) => {
      let projectCategoryDepartment = { ...d };
      delete projectCategoryDepartment.employee;
      d.employee.forEach((emp) => {
        if (employeesFrequencyObj[emp.employeeId]) {
          employeesFrequencyObj[emp.employeeId].departments.push(
            projectCategoryDepartment
          );
        } else {
          employeesFrequencyObj[emp.employeeId] = {
            departments: [projectCategoryDepartment],
            employeeName: emp.employeeName,
            employeeRate: emp.employeeRate,
          };
        }
      });
    });
    let employeesFrequencyArray = [];
    for (let key in employeesFrequencyObj) {
      employeesFrequencyArray.push({
        employeeId: key,
        ...employeesFrequencyObj[key],
      });
    }
    employeesFrequencyArray.sort((a, b) => {
      if (a.departments?.length !== b.departments?.length) {
        return b.departments.length - a.departments.length;
      } else {
        if (a.employeeRate <= rate && b.employeeRate <= rate) {
          return b.employeeRate - a.employeeRate;
        }
        return a.employeeRate - b.employeeRate;
      }
    });
    employeesFrequencyArray = employeesFrequencyArray.map((e, index) => ({
      ...e,
      designation: Designations.getDesignation(index).designation,
    }));
    setEmployeesFrequency(employeesFrequencyArray);

    const selectedDepartmentIds = data.reduce(
      (acc, curr) => Object.assign({ [curr.departmentId]: true }, acc),
      {}
    );
    // match rec proposals
    let recProposals = [];
    allProposals.forEach((p) => {
      if (Object.keys(selectedDepartmentIds).length <= p.departments.length) {
        let matches = p.departments.reduce(
          (acc, curr) =>
            selectedDepartmentIds[curr.departmentId] ? (acc = acc + 1) : acc,
          0
        );
        if (matches) {
          let percentageMatch = Math.floor(
            (matches / p.departments.length) * 100
          );
          recProposals.push({ ...p, percentageMatch });
        }
      }
    });
    setRecProposals(recProposals);
  }

  async function generateProposal() {
    setIsLoading(true);
    try {
      const { data } = await axios.post(HOST + CREATE_PROPOSAL, {
        payload: employeesFrequency,
        keywords,
      });
      setGeneratedProposals([{ ...data }]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-5">
      <p style={styles.pmSelectorText}>Project Manager Selector</p>
      <p style={styles.fadedText("1.5rem", "0.5rem")}>Project Category</p>
      <Select
        options={allProjectCategoriesDepartments}
        getOptionLabel={(option) => option.projectCategory}
        getOptionValue={(option) => option.projectCategory}
        isDisabled={isLoading}
        onChange={handleSelectChange}
        components={animatedComponents}
        className="react-select-container"
        classNamePrefix="react-select"
        isMulti={true}
        autoFocus
      />
      <p style={styles.fadedText("1rem", "0.5rem")}>Rate of the Project</p>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            aria-labelledby="input-slider"
            value={Number(rate)}
            onChange={(e) => setRate(Number(e.target.value))}
            min={0}
            max={200}
            valueLabelDisplay="auto"
            sx={{
              color: PRIMARY_COLOR,
            }}
          />
        </Grid>
        <Grid item>
          <div style={styles.rateInputContainer}>
            <input
              value={rate}
              onChange={(e) => {
                let num = Number(e.target.value);
                if (num < 0) setRate(0);
                else if (num > 200) setRate(200);
                else setRate(num);
              }}
              type="number"
              style={styles.rateInput}
            />
            <p>$</p>
          </div>
        </Grid>
      </Grid>
      <p style={styles.fadedText("1.5rem", "0.5rem")}>Choose key words</p>
      <div style={styles.keywordsContainer}>
        {keywordsData.map((keyword, index) => (
          <div key={`${keyword}-${index}`} style={styles.keywordContainer}>
            <input
              type="checkbox"
              style={styles.keywordInput}
              checked={keywords[keyword]}
              onChange={(e) =>
                setKeywords((prev) => ({
                  ...prev,
                  [keyword]: keywords[keyword] ? false : true,
                }))
              }
            />
            <p style={styles.fadedText("0px", "0px")}>{keyword}</p>
          </div>
        ))}
      </div>
      <ColorButton
        variant="contained"
        size="large"
        onClick={generateProposal}
        disabled={isLoading}
      >
        Generate Proposal
      </ColorButton>
      <ShowProposals title="Generated Proposal" details={generatedProposals} />
      <ShowProposals
        title="Recommended Proposal"
        details={recProposals}
        isShowPercentage
      />
    </div>
  );
};

export default PMSelector;

const proposalStyles = {
  title: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#0A0A0A",
  },
  container: {
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: "1rem",
  },
};

function ShowProposals({ title, details, isShowPercentage }) {
  if (details && details.length) {
    return (
      <div style={proposalStyles.container}>
        <p style={proposalStyles.title}>{title}</p>
        <div style={proposalStyles.cardContainer}>
          {details.map((proposal, index) => (
            <Card
              key={index.toString()}
              proposal={proposal}
              isShowPercentage={isShowPercentage}
            />
          ))}
        </div>
      </div>
    );
  } else return null;
}

const cardStyles = {
  container: {
    display: "flex",
    backgroundColor: "white",
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    flexDirection: "column",
    padding: "1rem",
  },
};

const Card = ({ proposal, isShowPercentage }) => {
  return (
    <div style={cardStyles.container}>
      <p>Proposal Link</p>
      <a href={proposal.proposalLink} target="_blank">
        {proposal.proposalLink}
      </a>
      {isShowPercentage && (
        <p>Percentage Match - {proposal.percentageMatch} %</p>
      )}
    </div>
  );
};
