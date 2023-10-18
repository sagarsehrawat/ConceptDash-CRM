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
} from "../../../Main/Constants/Constants";
import axios from "axios";
import Designations from "../../../utils/Designations";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TFButton from '../../../components/ui/TFButton/TFButton'

const animatedComponents = makeAnimated();

const ColorButton = styled(Button)({
  boxShadow: "none",
  textTransform: "capitalize",
  backgroundColor: PRIMARY_COLOR,
  marginTop: "2rem",
  fontSize: "14px",
  marginTop: "32px",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.8,
  },
});

const keywordsData = [
  "Aborist",
  "Planner",
  "Environmental Expert",
  "Survey",
  "Geotechnical",
  "Landscaping",
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
        let { data: data1 } = await axios.get(
          HOST + GET_PROJECT_CATEGORY_DEPARTMENT,
          {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
            },
          }
        );
        setAllProjectCategoriesDepartments(data1.data);
        let { data: data2 } = await axios.get(HOST + GET_PROPOSAL("*"), {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        });
        setAllProposals(data2.data);
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
      const { data } = await axios.post(
        HOST + CREATE_PROPOSAL,
        {
          payload: employeesFrequency,
          keywords,
        },
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        }
      );
      setGeneratedProposals([{ ...data }]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const pmSelectorStyles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    container: {
      gridColumn: "1/3",
    },
    pmSelectorText: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
    },
    projectCatText: {
      marginTop: "1rem",
      marginBottom: "0.3rem",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#70757A",
    },
    rateText: {
      marginTop: "20px",
      marginBottom: "12px",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#70757A",
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
      background: "none",
    },
    chooseKeywordText: {
      marginTop: "32px",
      marginBottom: "12px",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#70757A",
    },
    innerGridContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    keywordText: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
      marginLeft: "0.5rem",
      marginTop: "0.3rem",
    },
  };

  return (
    <div style={{ padding: "1.5rem 2rem" }}>
      <div style={pmSelectorStyles.gridContainer}>
        <div style={pmSelectorStyles.container}>
          <p style={pmSelectorStyles.pmSelectorText}>
            Project Manager Selector
          </p>
          <p style={pmSelectorStyles.projectCatText}>Project Category</p>
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
          <CategoryDepartment
            value={value}
            text="Related Department"
            title1="Project Category"
            title2="Department"
            q1="projectCategory"
            q2="department"
          />
          <CategoryDepartment
            value={employeesFrequency}
            text="Related Employees"
            title1="Employees"
            title2="Role"
            q1="employeeName"
            q2="designation"
          />
          <div style={{ marginTop: "20px", border: "1px solid #EBE9F1" }} />
          <p style={pmSelectorStyles.rateText}>Rate of the Project</p>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                aria-labelledby="input-slider"
                value={Number(rate)}
                onChange={(e) => setRate(Number(e.target.value))}
                min={0}
                max={50000}
                valueLabelDisplay="auto"
                sx={{
                  color: PRIMARY_COLOR,
                }}
              />
            </Grid>
            <Grid item>
              <div style={pmSelectorStyles.rateInputContainer}>
                <input
                  value={rate}
                  onChange={(e) => {
                    let num = Number(e.target.value);
                    if (num < 0) setRate(0);
                    else if (num > 50000) setRate(50000);
                    else setRate(num);
                  }}
                  type="number"
                  style={pmSelectorStyles.rateInput}
                />
                <p>$</p>
              </div>
            </Grid>
          </Grid>
          <p style={pmSelectorStyles.chooseKeywordText}>Choose Keywords</p>
          <div>
            <div style={pmSelectorStyles.innerGridContainer}>
              {keywordsData.map((keyword, index) => (
                <div
                  key={`${keyword}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    // style={styles.keywordInput}
                    checked={keywords[keyword]}
                    onChange={(e) =>
                      setKeywords((prev) => ({
                        ...prev,
                        [keyword]: keywords[keyword] ? false : true,
                      }))
                    }
                  />
                  <p style={pmSelectorStyles.keywordText}>{keyword}</p>
                </div>
              ))}
            </div>
          </div>
          {/* <ColorButton
            variant="contained"
            size="large"
            onClick={generateProposal}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate Proposal"}
          </ColorButton> */}
          <TFButton label={isLoading? "Loading": "Generate Proposal"} handleClick={generateProposal} disabled={isLoading} />
        </div>
      </div>
      {generatedProposals && generatedProposals.length > 0 && (
        <div style={{ marginTop: "20px", border: "1px solid #EBE9F1" }} />
      )}
      <Proposals
        title="Generated Proposal"
        details={generatedProposals}
        isHighLighted={true}
      />
      <Proposals
        title="Recommended Proposal"
        details={recProposals}
        isHighLighted={false}
      />
    </div>
  );
};

export default PMSelector;

const catDepStyles = {
  relatedDepText: {
    marginTop: "12px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#70757A",
  },
  container: {
    marginTop: "4px",
  },
  gridContainer(props) {
    return {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      padding: "8px 16px",
      ...props,
    };
  },
};

function CategoryDepartment({ value, text, title1, title2, q1, q2 }) {
  if (value && value.length)
    return (
      <div style={{ marginTop: "12px" }}>
        <p style={catDepStyles.relatedDepText}>{text}</p>
        <div style={catDepStyles.container}>
          <div
            style={catDepStyles.gridContainer({
              border: "1px solid #EBE9F1",
              borderRadius: "6px 6px 0px 0px",
              background: "#FBFBFB",
            })}
          >
            <p>{title1}</p>
            <p>{title2}</p>
          </div>
          {value?.map((e, index) => (
            <div
              style={catDepStyles.gridContainer({
                background: "#FFFFFF",
                borderWidth: "0px 1px 1px 1px",
                borderStyle: "solid",
                borderColor: "#EBE9F1",
                ...(index === value.length - 1 && {
                  borderRadius: "0px 0px 6px 6px",
                }),
              })}
            >
              <p>{e?.[q1]}</p>
              <p>{e?.[q2]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  else return null;
}

const proposalsStyles = {
  container: {
    marginTop: "32px",
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "28px",
    color: "#0A0A0A",
  },
  proposalContainer: {
    marginTop: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
  },
};

function Proposals({ title, details, isHighLighted }) {
  if (details && details.length) {
    return (
      <div style={proposalsStyles.container}>
        <p style={proposalsStyles.title}>{title}</p>
        <div style={proposalsStyles.proposalContainer}>
          {details.map((proposal, index) => (
            <Card
              key={index.toString()}
              proposal={proposal}
              isHighLighted={isHighLighted}
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
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    padding: "1rem",
  },
  matchText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#70757A",
    marginTop: "0.5rem",
  },
  proposalLink: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#0A0A0A",
  },
};

const Card = ({ proposal, isHighLighted }) => {
  return (
    <div
      style={{
        ...cardStyles.container,
        ...(isHighLighted && { background: "rgba(193, 190, 229, 0.45)" }),
      }}
    >
      <div>
        <div style={{ height: "42px", width: "42px" }}>
          <CircularProgressbar
            value={proposal.percentageMatch ? proposal.percentageMatch : 100}
            text={
              proposal.percentageMatch ? `${proposal.percentageMatch}%` : "100%"
            }
            styles={buildStyles({
              // rotation: 0.25,
              pathTransitionDuration: 0.5,
              pathColor: PRIMARY_COLOR,
              textColor: PRIMARY_COLOR,
              backgroundColor: "#fff",
            })}
          />
        </div>
        <p style={cardStyles.matchText}>Match</p>
      </div>
      <div style={{ marginLeft: "1rem" }}>
        <p style={cardStyles.proposalLink}>Proposal Link</p>
        <a href={proposal.proposalLink} target="_blank">
          Click Here
        </a>
      </div>
    </div>
  );
};
