import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GET_ALL_ORGANIZATION, HOST1, PRIMARY_COLOR} from '../../../Constants/Constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faChevronDown, faChevronLeft, faChevronRight, faEdit, faPlus, faSort, faTrash, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../Loader/Loader.js';
import {Form} from 'react-bootstrap'
import eyeicon from '../icons/visibility_FILL1_wght300_GRAD200_opsz24 1.svg'
import dots from '../icons/more_horiz_black_24dp (1) 3.svg'
import TFChip from '../../../../components/form/TFChip/TFChip.js';
const OrgTable = (props) => {
    const { isCollapsed, search } = props
    const [apiCall, setCall] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const tableRef = useRef(null);
    const [scrolled, setscrolled] = useState(0)
    const [rowData, setrowData] = useState([]);
    const [selectedOrganizations, setselectedOrganizations]= useState([]);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const styles = {
        table: {
            width: "100%",
            overflowX: "hidden",
            zIndex:"0"
        },
        tableHeader: {
            height: "34px",
            background: "#F7F7F9",
            textAlign: "center",
            borderBottom: "0px"
        },
        tableHeading: {
                width: '220px',
                padding: '6px var(--8-pad, 8px)',
                alignItems: 'center',
                gap: 'var(--8-pad, 8px)',
                flexShrink: 0,             
        },
        headingContent:{
            color: 'var(--New-grey, #728492)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '20px', // 142.857%
          },
        tableBody: {
            background: "#FFFFFF",

        },
        tableRow: {
            width: "100%",
            background: "#FFFFFF",
            verticalAlign: "top"
        },
        tableCell: {
            height: "58px",
            borderBottom: "1px solid #EBE9F1",
            padding: "12px 32px",
            gap: "10px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0A0A0A",
            marginLeft: "8px",
            textAlign: "left",
            verticalAlign: "middle",
        },
        filterButton: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 12px",
            gap: "8px",
            width: "115px",
            height: "36px",
            left: "268px",
            top: "220px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px",
            marginRight: "12px"
        },
        filterModal: {
            position: "absolute",
            width: "786px",
            height: "fit-content",
            left: isCollapsed ? "336px" : "496px",
            top: "324px",
            background: "#FFFFFF",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "6px"
        },
        filterSubcontainer: {
            width: "130px", height: "216px",
            overflowY: "scroll"
        },
        filterSubheading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#0A0A0A",
            marginBottom: "8px"
        },
        filterSubSubContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "4px",
            gap: "10px",
            width: "120px",
            height: "24px",
            background: "#F7F7F9",
            borderRadius: "6px",
            marginBottom: "8px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer"
        },
        filterBodyText: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#0A0A0A"
        },
        filterButton2: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "4px 12px",
            gap: "10px",
            height: "28px",
            background: "#FFFFFF",
            border: "1px solid #7367F0",
            borderRadius: "6px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "right",
            color: "#7367F0"
        },
        filterButton3: {
            padding: "4px 12px",
            gap: "10px",
            width: "56px",
            height: "28px",
            background: PRIMARY_COLOR,
            border: "1px solid #6519E1",
            boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
            borderRadius: "6px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px"
        },
        floatingContainer: {
            boxSizing: "border-box",
            position: "absolute",
            width: "522px",
            height: "76px",
            left: isCollapsed ? "34.236vw" : "45.347vw",
            top: "636px",
            background: "#FFFFFF",
            border: "1px solid #6519E1",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "6px",
            zIndex: "1000"
        },
        floatinContainerText: {
            width: "14px",
            height: "36px",
            marginLeft: "32px",
            marginTop: "26px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "36px",
            color: PRIMARY_COLOR,
            display: "inline-block"
        },
        floatingContainerText2: {
            width: "128px",
            height: "24px",
            left: "58px",
            top: "32px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#0A0A0A",
            display: "inline-block",
            marginLeft: "12px"
        },
        floatingContainerLine: {
            width: "46px",
            height: "0px",
            border: "1px solid #EBE9F1",
            transform: "rotate(90deg)",
            display: "inline-block",
            marginBottom: "12px"
        },
    }

    const handleTableScroll = () => {
        setscrolled(tableRef.current.scrollLeft)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(HOST1 + GET_ALL_ORGANIZATION, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        search:'',
                        filter: JSON.stringify({
                            companyType:[]
                        }),
                        offset: 0,
                        limit: 10
                    },
                });
                 console.log(response.data.res)
                if (response.data.success) {
                    setData(response.data.res);
                    setTotalPages(response.data.totalPages);
                    setIsLoading(false);
                } else {
                    console.error(response.data.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            console.log(search);
        };

        fetchData();
    }, []);
    return (
        <> 
         {isLoading ?
       
            <LoadingSpinner />
          :
            <div style={{  borderTop: '1px solid var(--New-Outline, #EBEDF8)', borderBottom: '1px solid var(--New-Outline, #EBEDF8)', background: '#F7F7F9'}} ref={tableRef}>
                <table style={styles.table} >
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th scope="col" style={{ ...styles.tableHeading, width: "220px"}} className='fixed-header2'>
                                <div style={styles.headingContent} className='hover' >
                                    Comany Name&nbsp;&nbsp;
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "120px" }} className='fixed-header2'>
                                <div style={styles.headingContent} className='hover'>
                                    Label&nbsp;&nbsp;
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "180px" }} className='fixed-header2'>
                                <div style={styles.headingContent} className='hover' >
                                    Website&nbsp;&nbsp;
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "120px" }} className='fixed-header2'>
                                <div style={{  display: "inline", cursor: "pointer" }} className='hover' >
                                   Contact Type&nbsp;&nbsp;
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "200px" }} className='fixed-header2'>
                                <div style={styles.headingContent} className='hover'>
                                    Email&nbsp;&nbsp;
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "140px" }} className='fixed-header2'>
                                <div style={styles.headingContent} className='hover'>
                                    Fax&nbsp;&nbsp;
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "64px" }} className='fixed-header2'>
                                <div style={styles.headingContent} className='hover' >
                                    &nbsp;&nbsp;
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "34px" }} className='fixed-header2'>
                                <div style={styles.headingContent} className='hover'>
                                    &nbsp;&nbsp;
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{ background: "#FFFFFF" }}>
  {data && data.map(org => (
    <tr style={{ width: "100%", backgroundColor: selectedOrganizations.includes(org.company_id) ? "#F5F3FE" : "white", verticalAlign: "top" }} id={org.company_id.toString()} key={org.company_id}>
      <td className='table-cell fixed-column' style={{ fontWeight: "500", backgroundColor: selectedOrganizations.includes(org.company_id) ? "#F5F3FE" : "white" }}>
        <div className='d-flex flex-row align-items-center'>
          <Form.Check
            inline
            type="checkbox"
            checked={selectedOrganizations.includes(org.company_id)}
            readOnly={true}
            onClick={(e) => {
              if (!selectedOrganizations.includes(org.company_id)) {
                setselectedOrganizations(prev => [...prev, org.company_id]);
              } else {
                setselectedOrganizations(prev => prev.filter(ele => ele !== org.company_id));
              }
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }} onClick={(e) => {e.preventDefault();props.setOrganizationData(org);props.setnav(23);}}>{org.company_name}</div>
            {/* Add other fields as needed */}
          </div>
        </div>
      </td>
      <td className='table-cell'><TFChip value={org.company_type} tableRef={tableRef}/></td>
      <td className='table-cell'>{org.website}</td>
      <td className='table-cell'> <TFChip value="Tertiary" tableRef={tableRef} /></td>
      <td className='table-cell'>{org.email}</td>
      <td className='table-cell'>{org.fax}</td>
      <td className='table-cell'>
        <div style={{display: "flex",height: "36px",flexDirection: "column",justifyContent: "space-between",alignItems: "center"}}>
         <div style={{display: "flex",width: "64px",padding: "2px 10px",justifyContent: "center",alignItems: "center",gap: "var(--8-pad, 8px)", borderRadius: "6px",border: "1px solid #E2E8F0"}}>
         <img src={eyeicon} alt=""/>
         <div>CV</div>
         </div>
         </div>
         </td>
      <td className='table-cell'><img src={dots} alt=""/></td>
      {/* Add other fields as needed */}
    </tr>
  ))}
</tbody>

                </table>
                </div>
}
        </>
    )
}

export default OrgTable;