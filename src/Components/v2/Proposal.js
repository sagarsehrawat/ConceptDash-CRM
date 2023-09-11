import { faArrowDown, faArrowsUpDown, faArrowUp, faCheck, faChevronDown, faChevronLeft, faChevronRight, faEdit, faFilter, faMagnifyingGlass, faPlus, faSort, faTrash, faX, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons'
import axios from 'axios'
import moment from 'moment'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import AuthenticationContext from '../../Context/AuthContext'
import {PRIMARY_COLOR, DELETE_PROPOSAL, GET_CITIES, GET_DEPARTMENTS, GET_EMPLOYEENAMES, GET_PAGES_PROPOSALS, GET_PAGE_PROPOSALS, GET_PROJECT_CATEGORIES, GET_PROPOSAL_COUNT, HOST, UPDATE_STATUS_PROPOSAL, GET_GOOGLE_DRIVE_URL } from '../Constants/Constants'
import GreenAlert from '../Loader/GreenAlert'
import LoadingSpinner from '../Loader/Loader'
import RedAlert from '../Loader/RedAlert'
import ProposalForm from '../Form/ProposalForm'
import UpdateProposal from '../Form/UpdateProposal'
import filterIcon from '../../Images/Filter.svg'
import cross from '../../Images/cross.svg'
import tIcon from '../../Images/taskIcon.svg'
import open from '../../Images/openinDrive.svg'
import Timeline from './TTM/Timeline'
import { useNavigate } from "react-router-dom";
import TTMMain from './TTM/TTMMain'

const Proposal = (props) => {
    const navigate = useNavigate();
    const { isCollapsed } = props
    const { privileges, setPrivileges } = useContext(AuthenticationContext)
    const [apiCall, setCall] = useState(0);
    const [green, setgreen] = useState(false);
    const [red, setred] = useState(false);

    const [proposals, setproposals] = useState([])
    const [proposalDetails, setproposalDetails] = useState([])
    const [selectedProposals, setselectedProposals] = useState([])
    const [proposalCount, setproposalCount] = useState({ Total: 0, Month: 0, Percent: 0, Won: 0, Lost: 0 })
    const [cities, setcities] = useState([]);
    const [depts, setdepts] = useState([]);
    const [projectCats, setprojectCats] = useState([]);
    const [employees, setemployees] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState([true, true, true, true, true, false]);

    let limit = 50;
    const [pages, setpages] = useState(1);
    const [currPage, setcurrPage] = useState(1);
    const [sort, setsort] = useState("Proposal_ID DESC");
    const [value, setValue] = useState("");
    const [searchCity, setsearchCity] = useState("");
    const [filter, setfilter] = useState({ dept: [], cat: [], city: [], manager: [] });
    const [prevFilter, setprevFilter] = useState({ dept: [], cat: [], city: [], manager: [] });
    const [filter2, setfilter2] = useState('Basic')
    const [status, setstatus] = useState(null)
    const [advancedFilter, setadvancedFilter] = useState([['', 'IS', '']])

    //Add Form Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Filter Modal
    const [filterModal, setfilterModal] = useState(false);
    const closeFilterModal = () => setfilterModal(false);
    const openFilterModal = () => setfilterModal(true);

    //Status Modal
    const [statusModal, setstatusModal] = useState(false);
    const closeStatusModal = () => { setstatusModal(false); setstatus(null); }
    const openStatusModal = () => setstatusModal(true);

    //Sort Modal
    const [sortModal, setsortModal] = useState(null);
    const handleCloseSort = () => setsortModal(null);
    const handleShowSort = (idx) => setsortModal(idx);
    const tableRef = useRef(null);
    const [scrolled, setscrolled] = useState(0)

    //Delete Modal
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    //Update Modal
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [IsLoading3, setIsLoading3] = useState(false);

    const styles = {
        openInDrive: {
            width: "92px",
            height: "16px",
            left: "0px",
            top: "20px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#3692EF",
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer'
        },
        headerContainer: {
            marginTop: "30px",
            marginLeft: "32px",
            marginRight: "24px"
        },
        heading: {
            width: "244px",
            height: "28px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#0A0A0A",
            display: "inline-block",
            marginBottom: "18px"
        },
        addButton: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 16px",
            gap: "8px",
            width: "177px",
            height: "40px",
            background: PRIMARY_COLOR,
            border: "1px solid #6519E1",
            boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
            borderRadius: "5px",
        },
        addButtonText: {
            height: "24px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#FBFBFB",
            flex: "none",
            margin: 0,
            flexGrow: 0
        },
        topContainer: {
            width: "208px",
            height: "68px",
            left: "32px",
            top: "76px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "12px",
            marginRight: "20px"
        },
        topContainerHeading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0A0A0A",
            marginLeft: "12px",
            marginTop: "8px",
            marginBottom: "4px"
        },
        topContainerSubheading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#0A0A0A",
            marginLeft: "12px",
            display: "inline-block"
        },
        percent: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#34A853",
            display: "inline-block",
            marginLeft: "8px"
        },
        headerLine: {
            height: "0px",
            left: "32px",
            top: "164px",
            border: "1px solid #EBE9F1",
            marginLeft: "32px",
            marginRight: "32px",
            marginBottom: "20px"
        },
        heading2: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#0A0A0A",
            marginLeft: "32px",
            marginBottom: "8px",
        },
        searchInputContainer: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "8px 8px 8px 12px",
            gap: "4px",
            width: "194px",
            height: "36px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px 0px 0px 6px",
        },
        searchButton: {
            width: "30px",
            height: "36px",
            background: "#D9D9D9",
            borderRadius: "0px 6px 6px 0px",
            marginRight: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            boxShadow: "none"
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
        sortButton: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 12px",
            gap: "8px",
            width: "96px",
            height: "36px",
            left: "395px",
            top: "220px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px"
        },
        filterModal: {
            position: "absolute",
            width: "640px",
            height: "fit-content",
            left: isCollapsed ? "336px" : "496px",
            top: "324px",
            background: "#FFFFFF",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "6px"
        },
        statusModal: {
            position: "absolute",
            width: "296px",
            height: "fit-content",
            left: isCollapsed ? "463px" : "623px",
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
        citySearchInputContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "2px 50px 2px 4px",
            gap: "4px",
            width: "120px",
            height: "20px",
            left: "20px",
            top: "84px",
            background: "#F3F3F4",
            borderRadius: "6px",
            border: "none",
            marginBottom: "8px",
        },
        table: {
            width: "100%",
            overflowX: "hidden",
        },
        tableHeader: {
            height: "44px",
            background: "#F7F7F9",
            textAlign: "center",
            borderBottom: "0px"
        },
        tableHeading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            color: "#70757A",
            textAlign: "left",
            borderBottom: "1px solid #EBE9F1",
            borderTop: "1px solid #EBE9F1",
            verticalAlign: "middle",
            paddingLeft: "22px",
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
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingLeft: '32px',
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
        dateContainer: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "2px 12px",
            gap: "10px",
            width: "110px",
            height: "24px",
            background: "#FFFFFF",
            border: "0.5px solid #FE3766",
            borderRadius: "24px"
        },
        date: {
            height: "20px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FE3766"
        },
        statusContainer: {
            width: "75px",
            height: "24px",
            background: "#FFF4EF",
            borderRadius: "24px"
        },
        status: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
        },
        tableRow2Heading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#70757A"
        },
        tableRow2Subheading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0A0A0A"
        },
        pageContainer: {
            width: "32px",
            height: "32px",
            left: "1009px",
            top: "792px",
            border: "1px solid #EBE9F1",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "8px",
            backgroundColor: "white"
        },
        curPageContainer: {
            width: "32px",
            height: "32px",
            left: "1009px",
            top: "792px",
            border: "1px solid #6519E1",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "8px",
            backgroundColor: "white"
        },
        curPage: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "center",
            color: PRIMARY_COLOR,
            margin: "0px"
        },
        page: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "center",
            color: "#70757A",
            margin: "0px"
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
        floatingContainerIconText: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0A0A0A"
        },
        sortModal: {
            position: "absolute",
            width: "163px",
            height: "81px",
            top: "388px",
            background: "#FFFFFF",
            boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.12)",
            borderRadius: "6px",
        },
        sortContainer: {
            width: "163px",
            height: "81px",
            background: "#FFFFFF",
            boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.12)",
            borderRadius: "6px",
            padding: "15px"
        },
        sortText: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#0A0A0A",
            margin: "0px"
        },
        addModal: {
            position: "absolute",
            width: "780px",
            height: '730px',
            left: "26vw",
            marginTop: "10vh",
            background: "#FFFFFF",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "12px",
        },
        addHeading: {
            width: "auto",
            height: "28px",
            marginLeft: "8px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#0A0A0A",
            // marginTop:'12px'
        },
        type: {
            height: "20px",
            left: "60px",
            top: "20px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#70757A"
        }
    }

    useEffect(() => {
        setIsLoading2([true, true, true, true, true, false])
        const call = async () => {
            await axios
                .get(HOST + GET_PROPOSAL_COUNT, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                })
                .then((res) => {
                    let obj = proposalCount
                    obj.Total = res.data.res[0].Total
                    obj.Month = res.data.res[0].Month
                    obj.Percent = res.data.res[0].Percent ?? 0
                    obj.Won = res.data.res[0].Won
                    obj.Lost = res.data.res[0].Lost
                    setproposalCount(obj)
                    setIsLoading2(prev => [false, ...prev.slice(1, 6)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_CITIES, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    setcities(res.data.res);
                    setIsLoading2(prev => [prev[0], false, ...prev.slice(2, 6)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_DEPARTMENTS, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    setdepts(res.data.res);
                    setIsLoading2(prev => [...prev.slice(0, 2), false, ...prev.slice(3, 6)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_PROJECT_CATEGORIES, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    setprojectCats(res.data.res);
                    setIsLoading2(prev => [...prev.slice(0, 3), false, ...prev.slice(4, 6)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_EMPLOYEENAMES, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    setemployees(res.data.res);
                    setIsLoading2(prev => [...prev.slice(0, 4), false, ...prev.slice(5, 6)])
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [apiCall])

    useEffect(() => {
        setIsLoading(true);
        setcurrPage(1)
        const call = async () => {
            await axios
                .get(HOST + GET_PAGE_PROPOSALS, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        limit: limit,
                        offset: (currPage - 1) * limit,
                        filter: JSON.stringify(filter),
                        search: value,
                        sort: sort,
                    },
                })
                .then((res) => {
                    setproposals(res.data.res);
                    setpages(res.data.totalPages)
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [apiCall])

    const openDriveLink = (e, projectFolderId) => {
        e.preventDefault();
        setIsLoading3(true)
        axios
            .get(
                HOST + GET_GOOGLE_DRIVE_URL,
                { headers: { auth: "Rose " + localStorage.getItem("auth"), id: projectFolderId, } }
            )
            .then((res) => {
                const url = res.data.res
                if (url && url !== "") window.open(url, '_blank');
                setIsLoading3(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handlePage = async (page) => {
        setIsLoading(true);
        setcurrPage(page);
        await axios
            .get(HOST + GET_PAGE_PROPOSALS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    limit: limit,
                    offset: (page - 1) * limit,
                    filter: JSON.stringify(filter),
                    search: value,
                    sort: sort,
                },
            })
            .then((res) => {
                setproposals(res.data.res);
                setpages(res.data.totalPages)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleFilter = (key, value) => {
        if (filter[key].includes(value)) {
            setfilter(prevFilter => ({
                ...prevFilter,
                [key]: prevFilter[key].filter(element => element !== value)
            }));
        } else {
            setfilter(prevFilter => ({
                ...prevFilter,
                [key]: [...prevFilter[key], value]
            }));
        }
    }

    const handleDeleteProposal = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        await axios
            .post(
                HOST + DELETE_PROPOSAL,
                {
                    ids: JSON.stringify(selectedProposals),
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                handleCloseDelete();
                if (res.data.success) {
                    setselectedProposals([])
                    setgreen(true)
                    setCall(apiCall + 1);
                } else {
                    setred(true)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                setred(true)
                console.log(err);
            });
    };

    const [rowData, setrowData] = useState([]);
    const handleUpdate = (e) => {
        const foundObject = proposals.find(obj => obj.Proposal_ID === selectedProposals[0]);
        setrowData(foundObject);
        handleShowUpdate();
    };

    const handleStatusUpdate = async (e) => {
        e.preventDefault();

        await axios
            .post(
                HOST + UPDATE_STATUS_PROPOSAL,
                {
                    ids: JSON.stringify(selectedProposals),
                    status: status
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                if (res.data.success) {
                    for (let i = 0; i < proposals.length; i++) {
                        if (selectedProposals.includes(proposals[i].Proposal_ID)) {
                            const st1 = proposals[i].Status
                            proposals[i].Status = (status === '' ? null : status)
                            if (st1 !== proposals[i].Status) {
                                if (st1 === null) {
                                    if (proposals[i].Status !== null) proposalCount[proposals[i].Status]++;
                                } else {
                                    proposalCount[st1]--;
                                    if (proposals[i].Status !== null) proposalCount[proposals[i].Status]++;
                                }
                            }
                        }
                    }
                    closeStatusModal()
                    setCall(apiCall+1)
                    setselectedProposals([])
                    setgreen(true)
                } else {
                    setred(true)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const formatDate = (date) => {
        if (date === "" || date === null || date === undefined) return "";
        const formattedDate = moment(date)
        return formattedDate.format('D MMM, YYYY')
    }

    const filterSize = () => {
        return filter.city.length + filter.cat.length + filter.dept.length + filter.manager.length;
    }

    const addComma = (num) => {
        if (num === null || num === "" || num === undefined) return ""
        const n = num
        return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    useEffect(() => {
        const table = tableRef.current;
        table.addEventListener('scroll', handleTableScroll);
        return () => {
            table.removeEventListener('scroll', handleTableScroll);
        };
    }, []);


    const handleTableScroll = () => {
        setscrolled(tableRef.current.scrollLeft)
    }

    const sortModalLeft = (idx) => {
        if (isCollapsed) {
            if (idx === 0) return `${90}px`
            if (idx === 1) return `${234 - scrolled}px`
            if (idx === 2) return `${449 - scrolled}px`
            if (idx === 3) return `${630 - scrolled}px`
            if (idx === 4) return `${798 - scrolled}px`
            if (idx === 5) return `${964 - scrolled}px`
            if (idx === 6) return `${1091 - scrolled}px`
            if (idx === 7) return `${1300 - scrolled}px`
        } else {
            if (idx === 0) return `${250}px`
            if (idx === 1) return `${377 - scrolled}px`
            if (idx === 2) return `${569 - scrolled}px`
            if (idx === 3) return `${729 - scrolled}px`
            if (idx === 4) return `${901 - scrolled}px`
            if (idx === 5) return `${1060 - scrolled}px`
            if (idx === 6) return `${1158 - scrolled}px`
            if (idx === 7) return `${1310 - scrolled}px`
        }
    }

    const statusComponent = (status) => {
        if (status === null) {
            return (
                <div style={{ ...styles.statusContainer, border: "1px solid #FD9568" }} className='d-flex justify-content-center'>
                    <p style={{ ...styles.status, color: "#FD9568" }}>Pending</p>
                </div>
            )
        } else if (status === "Lost") {
            return (
                <div style={{ ...styles.statusContainer, border: "1px solid #FE3766" }} className='d-flex justify-content-center'>
                    <p style={{ ...styles.status, color: "#FE3766" }}>Lost</p>
                </div>
            )
        } else if (status === "Won") {
            return (
                <div style={{ ...styles.statusContainer, background: "#E4FEF1", border: "1px solid #34A853" }} className='d-flex justify-content-center'>
                    <p style={{ ...styles.status, color: "#34A853" }}>Won</p>
                </div>
            )
        }
    }

    const totalBidCalculator = (a, b, c, d)=>{
        return (a+b+c+d);
    }
    const [showTTM, setshowTTM] = useState(false);
    const [propName, setpropName] = useState("");
    const [propID, setpropID] = useState();
    const handleTTM=(a, b)=>{
        setpropName(b);
        setpropID(a);
        setshowTTM(true);
    }

    return (
        !showTTM?<>
            {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
            {red === true ? <RedAlert setRed={setred} /> : <></>}
            <div className='d-flex flex-row justify-content-between' style={styles.headerContainer}>
                <p style={styles.heading}>Proposals</p>
                <button style={styles.addButton} disabled={!privileges.includes('Add Proposal')} onClick={handleShow}><p style={styles.addButtonText} >+ Add New proposal</p></button>
            </div>

            {/* Header Cards */}
            <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
                <div style={styles.topContainer}>
                    <p style={styles.topContainerHeading}>New Proposals</p>
                    <div className=''>
                        <p style={styles.topContainerSubheading}>{proposalCount.Month}</p>
                        {proposalCount.Percent >= 0
                            ? <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                                <FontAwesomeIcon icon={faArrowUp} color="#34A853" />
                                <p style={styles.percent}>{proposalCount.Percent}% increase</p>
                            </div>
                            : <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                                <FontAwesomeIcon icon={faArrowDown} color="#FE3766" />
                                <p style={{ ...styles.percent, color: "#FE3766" }}>{proposalCount.Percent}% decrease</p>
                            </div>
                        }
                    </div>
                </div>
                <div style={styles.topContainer}>
                    <p style={styles.topContainerHeading}>Total Proposals</p>
                    <p style={styles.topContainerSubheading}>{proposalCount.Total}</p>
                </div>
                <div style={{ ...styles.topContainer, width: "335px", padding: "12px 8px" }} className='d-flex flex-row'>
                    <div className='d-flex flex-row justify-content-center align-items-center' style={{ gap: "12px" }}>
                        <div style={{ width: "28px", height: "28px", background: "#E4FEF1", borderRadius: "4px" }} className='d-flex justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faCheck} color="#559776" />
                        </div>
                        <div className='d-flex flex-column'>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#0A0A0A", marginBottom: "4px" }}>Proposals Won</p>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "18px", lineHeight: "28px", color: "#0A0A0A", marginBottom: "0px" }}>{proposalCount.Won}</p>
                        </div>
                    </div>
                    <div style={{ width: "0px", height: "48px", border: "1px solid #EBE9F1", marginLeft: "20px", marginRight: "20px" }}></div>
                    <div className='d-flex flex-row justify-content-center align-items-center' style={{ gap: "12px" }}>
                        <div style={{ width: "28px", height: "28px", background: "#FFF1F1", borderRadius: "4px" }} className='d-flex justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faX} color="#D93838" />
                        </div>
                        <div className='d-flex flex-column'>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#0A0A0A", marginBottom: "4px" }}>Proposals Lost</p>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "18px", lineHeight: "28px", color: "#0A0A0A", marginBottom: "0px" }}>{proposalCount.Lost}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.headerLine}></div>
            <p style={styles.heading2}>Proposals</p>
            
            {/* Filters and Other Dropdowns */}
            <div className='d-flex flex-row' style={{ marginTop: "8px", marginBottom: "24px", marginLeft: "32px" }}>
                <input
                    style={styles.searchInputContainer}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                />
                <button style={styles.searchButton} onClick={(e) => setCall(apiCall + 1)}><FontAwesomeIcon icon={faMagnifyingGlass} color="#000000" /></button>
                <button style={{ ...styles.filterButton, backgroundColor: filterSize() > 0 ? "#DBDBF4" : "white" }} onClick={openFilterModal}><img src={filterIcon} alt="Filter Icon" /><p style={{ fontStyle: "normal", fontWeight: 400, fontSize: "14px", color: "#0A0A0A", margin: "0" }}>Filters{filterSize() > 0 ? `/ ${filterSize()}` : ""}</p>{filterSize() > 0 ? <></> : <FontAwesomeIcon icon={faChevronDown} color="#70757A" />}</button>
                <Modal
                    show={filterModal}
                    onHide={closeFilterModal}
                    style={styles.filterModal}
                    dialogClassName="filter-dialog"
                    backdropClassName="filter-backdrop"
                    animation={false}
                >
                    {filter2 === 'Basic' ? <div style={{ width: "640px", height: "356px", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)", borderRadius: "6px" }}>
                        <div className='d-flex flex-row justify-content-between align-items-center' style={{ "marginTop": "16px", marginLeft: "20px", marginRight: "30px", marginBottom: "20px" }}>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#0A0A0A", margin: "0px" }}>Filters</p>
                            <div className='d-flex align-items-center'>
                                <Button style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", backgroundColor: "white", border: "none", color: PRIMARY_COLOR, marginRight: "32px" }} disabled={filterSize() === 0} onClick={(e) => {setfilter({ dept: [], cat: [], city: [], manager: [] }); setprevFilter({ dept: [], cat: [], city: [], manager: [] }); setCall(apiCall+1); setfilterModal(false);}}>Clear All</Button>
                                <FontAwesomeIcon icon={faX} style={{ height: "9px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={closeFilterModal} />
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "20px", marginRight: "20px" }}>
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>City {filter.city.length === 0 ? "" : `/${filter.city.length}`}</p>
                                <input
                                    style={styles.citySearchInputContainer}
                                    type="text"
                                    className='searchInput'
                                    value={searchCity}
                                    onChange={(e) => setsearchCity(e.target.value)}
                                    placeholder="Search"
                                    id="city-search"
                                />
                                {isLoading2[1] ? <LoadingSpinner /> : cities.map(e => {
                                    if (e.City.toLowerCase().startsWith(searchCity.toLowerCase())) {
                                        return (
                                            <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.city.includes(e.City_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('city', e.City_ID)} id={e.City_ID}><p style={styles.filterBodyText}>{e.City}</p></div>
                                        )
                                    } else {
                                        return <></>
                                    }

                                })}
                            </div>
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>Department {filter.dept.length === 0 ? "" : `/${filter.dept.length}`}</p>
                                {isLoading2[2] ? <LoadingSpinner /> : depts.map(e => {
                                    return (
                                        <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.dept.includes(e.Department_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('dept', e.Department_ID)}><p style={styles.filterBodyText}>{e.Department}</p></div>
                                    )
                                })}
                            </div>
                            {/* <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>Project Category {filter.cat.length === 0 ? "" : `/${filter.cat.length}`}</p>
                                {isLoading2[3] ? <LoadingSpinner /> : projectCats.map(e => {
                                    return (
                                        <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.cat.includes(e.Project_Cat_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('cat', e.Project_Cat_ID)}><p style={styles.filterBodyText}>{e.Project_Category}</p></div>
                                    )
                                })}
                            </div> */}
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>Project Managers {filter.manager.length === 0 ? "" : `/${filter.manager.length}`}</p>
                                {isLoading2[4] ? <LoadingSpinner /> : employees.map(e => {
                                    return (
                                        <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.manager.includes(e.Employee_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('manager', e.Employee_ID)}><p style={styles.filterBodyText}>{e.Full_Name}</p></div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-end' style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
                            {/* <Button style={styles.filterButton2} onClick={(e) => setfilter2('Advanced')}>Go to Advanced Filters</Button> */}
                            <Button style={styles.filterButton3} onClick={(e) => { setprevFilter(filter); setCall(apiCall + 1); setfilterModal(false) }}>Filter</Button>
                        </div>
                    </div> :
                        <div className='d-flex flex-column' style={{ width: "786px", height: "auto", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)", borderRadius: "6px", padding: "20px", gap: "20px" }}>
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#0A0A0A", margin: "0px" }}>Filters</p>
                                <div className='d-flex align-items-center'>
                                    <Button style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", backgroundColor: "white", border: "none", color: PRIMARY_COLOR, marginRight: "32px" }} disabled={filter.cat.length === 0 && filter.dept.length === 0 && filter.source.length === 0 && filter.city.length === 0 && filter.manager.length === 0} onClick={(e) => setfilter({ dept: [], cat: [], city: [], manager: [] })}>Clear All</Button>
                                    <FontAwesomeIcon icon={faX} style={{ height: "9px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={closeFilterModal} />
                                </div>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p style={styles.whereText}>WHERE</p>
                            </div>
                            <div className='d-flex flex-row justify-content-start'>
                                <FontAwesomeIcon icon={faPlus} color={PRIMARY_COLOR} />
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <Button style={styles.filterButton2} onClick={(e) => setfilter2('Basic')}>Go to Basic Filters</Button>
                                <Button style={styles.filterButton3} onClick={(e) => { setCall(apiCall + 1); closeFilterModal(); }}>Filter</Button>
                            </div>
                        </div>}
                </Modal>
                <button style={{ ...styles.filterButton, width: "136px", display: selectedProposals.length > 0 ? "flex" : "none", visibility: selectedProposals.length > 0 ? "visible" : "hidden" }} onClick={openStatusModal}><p style={{ fontStyle: "normal", fontWeight: 400, fontSize: "14px", color: "#0A0A0A", margin: "0" }}>Update Result</p><FontAwesomeIcon icon={faChevronDown} color="#70757A" /></button>
                <Modal
                    show={statusModal}
                    onHide={closeStatusModal}
                    style={styles.statusModal}
                    dialogClassName="filter-dialog"
                    backdropClassName="filter-backdrop"
                    animation={false}
                >
                    <div style={{ width: "296px", height: "fit-content", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)", borderRadius: "6px" }}>
                        <div className='d-flex flex-row justify-content-between align-items-center' style={{ "marginTop": "16px", marginLeft: "20px", marginRight: "30px", marginBottom: "20px" }}>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#0A0A0A", margin: "0px" }}>Update</p>
                            <FontAwesomeIcon icon={faX} style={{ height: "9px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={closeStatusModal} />
                        </div>
                        <div className='d-flex flex-column' style={{ marginLeft: "20px", gap: "8px" }}>
                            <RadioButtonComponent
                                label="Lost"
                                cssClass="sort-radio"
                                checked={status === 'Lost'}
                                name="Status"
                                value={`Lost`}
                                onChange={(e) => setstatus(e.target.value)} />
                            <RadioButtonComponent
                                label="Pending"
                                checked={status === ""}
                                cssClass="sort-radio"
                                name="Status"
                                value={``}
                                onChange={(e) => setstatus(e.target.value)} />
                            <RadioButtonComponent
                                label="Won"
                                checked={status === "Won"}
                                cssClass="sort-radio"
                                name="Status"
                                value={`Won`}
                                onChange={(e) => setstatus(e.target.value)} />
                        </div>
                        <div className='d-flex justify-content-end' style={{ marginRight: "20px", marginTop: "10px", marginBottom: "20px" }}>
                            <Button style={{ ...styles.filterButton3, width: "unset" }} onClick={handleStatusUpdate}>Update</Button>
                        </div>
                    </div>
                </Modal>
            </div>

            {/* Table */}
            <div style={{ borderBottom: "1px solid #EBE9F1", height: "492px", overflow: "auto", position: "relative" }} ref={tableRef}>
                <table style={styles.table} className='rfp-table'>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th scope="col" style={{ ...styles.tableHeading, width: "150px", borderBottom: "1px solid #EBE9F1", marginLeft: '50px', textAlign:'center' }} className='fixed-header'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(0)}>
                                    City&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 0}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(0) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("City"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("City DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "200px",marginLeft: '50px' }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(1)}>
                                    Project Name&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 1}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(1) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Project_Name"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Project_Name DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover'>
                                    TTM
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "140px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(2)}>
                                    Department&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 2}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(2) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Department"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Department DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "169px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(3)}>
                                    Question Deadline&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 3}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(3) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Question_Deadline"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Question_Deadline DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "160px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(4)}>
                                    Closing Deadline&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 4}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(4) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Closing_Deadline"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Closing_Deadline DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "160px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(5)}>
                                    Project Manager&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 5}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(5) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Manager_Name"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Manager_Name DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "130px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(6)}>
                                    Total Bid Price{/* &nbsp;&nbsp;<FontAwesomeIcon icon={faSort} /> */}
                                </div>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "130px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(7)}>
                                    Result&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 7}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(7) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Result"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Result DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                        </tr>
                    </thead>
                    <tbody style={styles.tableBody}>
                        {isLoading
                            ? <tr style={{ height: "408px", width: "100%", background: "white" }}>
                                <td colSpan={8}>
                                    <LoadingSpinner />
                                </td>
                            </tr>
                            : proposals && proposals.map(e => (
                                <>
                                    <tr style={{ ...styles.tableRow, backgroundColor: selectedProposals.includes(e.Proposal_ID) ? "#F5F3FE" : "white" }} className='fixed-col' id={e.Proposal_ID}>
                                        <td className='fixed-col' style={{ ...styles.tableCell, padding: "12px 24px", fontWeight: "500", backgroundColor: selectedProposals.includes(e.Proposal_ID) ? "#F5F3FE" : "white", borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}>
                                            <div className='d-flex flex-row align-items-center' style={{ gap: "12px" }}>
                                                {proposalDetails.includes(e.Proposal_ID) ? <FontAwesomeIcon icon={faChevronDown} onClick={(eve) => setproposalDetails(prev => prev.filter(ele => ele !== e.Proposal_ID))} style={{ cursor: "pointer" }} /> : <FontAwesomeIcon icon={faChevronRight} onClick={(eve) => setproposalDetails(prev => [...prev, e.Proposal_ID])} style={{ cursor: "pointer" }} />}
                                                <Form.Check
                                                    inline
                                                    type="checkbox"
                                                    checked={selectedProposals.includes(e.Proposal_ID)}
                                                    readOnly={true}
                                                    onClick={(eve) => { if (eve.target.checked) { setselectedProposals(prev => [...prev, e.Proposal_ID]) } else { setselectedProposals(prev => prev.filter(ele => ele !== e.Proposal_ID)) } }}
                                                />
                                                <div style={{flexDirection:'column'}}>
                                                <p style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{e.City}</p>
                                                <p style={styles.type}>{e.Municipality_Type?e.Municipality_Type:'-'}</p></div>
                                            </div>
                                        </td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}>
                                            <p style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{e.Project_Name}</p>
                                            <div className='d-flex flex-row justify-content-start align-items-center'>
                                            <p style={styles.type}>Status: <span style={{color:'#FD9568'}}>{e.Status}</span></p>&nbsp;&nbsp;
                                            {e.Folder_ID!==null ? <div style={styles.openInDrive} onClick={(f) => openDriveLink(f, e.Folder_ID)}>Open in Drive&nbsp;<img src={open} /></div> : <></>}
                                            {/* <div style={styles.openInDrive} onClick={()=>handleTTM(e.Proposal_ID, e.Project_Name)}>View TTM </div> */}
                                            </div>
                                        </td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}><div style={{color:"#3692EF", fontSize:'13px', cursor:'pointer'}} onClick={()=>handleTTM(e.Proposal_ID, e.Project_Name)}>TTM&nbsp;<img src={open}/></div></td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}>{e.Department}</td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}>{formatDate(e.Question_Deadline) === ""
                                                ? <></>
                                                : <div style={{...styles.dateContainer, border:'0.5px solid #5079E1'}}>
                                                    <p style={{...styles.date, color:'#5079E1'}}>{formatDate(e.Question_Deadline)}</p>
                                                </div>}</td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}>
                                            {formatDate(e.Closing_Deadline) === ""
                                                ? <></>
                                                : <div style={styles.dateContainer}>
                                                    <p style={styles.date}>{formatDate(e.Closing_Deadline)}</p>
                                                </div>}
                                        </td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}>{e.Manager_Name}</td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}><b>{addComma(totalBidCalculator(e.Design_Price, e.Contract_Admin_Price, e.Provisional_Items, e.Sub_Consultant_Price))}</b></td>
                                        <td style={{ ...styles.tableCell, borderBottom: proposalDetails.includes(e.Proposal_ID) ? "none" : "1px solid #EBE9F1" }}>{statusComponent(e.Result)}</td>
                                    </tr>
                                    <tr id={e.Proposal_ID} style={{ ...styles.tableRow, display: proposalDetails.includes(e.Proposal_ID) ? "table-row" : "none", visibility: proposalDetails.includes(e.Proposal_ID) ? "visible" : "hidden" }}>
                                        <td colSpan={8} style={{ borderBottom: "1px solid #EBE9F1" }}>
                                            <div className='d-flex flex-row justify-content-between align-items-start' style={{ marginLeft: "64px", marginRight: "72px", padding: "12px 24px", gap: "62px", height: "95px", background: "#F7F7F9", borderRadius: "12px", marginTop: "12px", borderBottomLeftRadius:'0px', borderBottomRightRadius:'0px' }}>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Team</p>
                                                    <p style={styles.tableRow2Subheading}>{e.Team}</p>
                                                </div>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Winning Price ($)</p>
                                                    <p style={styles.tableRow2Subheading}>{addComma(e.Winning_Price)}</p>
                                                </div>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Winning Bidders</p>
                                                    <p style={styles.tableRow2Subheading}>{e.Winning_Bidder ?? "-"}</p>
                                                </div>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Debriefing</p>
                                                    <p style={styles.tableRow2Subheading}>{e.Debriefing}</p>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-row justify-content-between align-items-start' style={{ marginLeft: "64px", marginRight: "72px", marginBottom: "12px", padding: "12px 24px", gap: "62px", height: "95px", background: "#F7F7F9", borderRadius: "12px", borderTopLeftRadius:'0px', borderTopRightRadius:'0px' }}>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Design Price ($)</p>
                                                    <p style={styles.tableRow2Subheading}>{addComma(e.Design_Price)}</p>
                                                </div>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Provisional Item Price ($)</p>
                                                    <p style={styles.tableRow2Subheading}>{addComma(e.Provisional_Items)}</p>
                                                </div>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Contract Admin Price ($)</p>
                                                    <p style={styles.tableRow2Subheading}>{addComma(e.Contract_Admin_Price)}</p>
                                                </div>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Sub Consultant Price ($)</p>
                                                    <p style={styles.tableRow2Subheading}>{addComma(e.Sub_Consultant_Price)}</p>
                                                </div>
                                                <div className='d-flex flex-column '>
                                                    <p style={styles.tableRow2Heading}>Total Bid Price ($)</p>
                                                    <p style={styles.tableRow2Subheading}>{addComma(totalBidCalculator(e.Design_Price, e.Contract_Admin_Price, e.Provisional_Items, e.Sub_Consultant_Price))}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Page Buttons */}
            <div className='d-flex flex-row justify-content-end' style={{ marginTop: "20px", marginRight: "24px", marginBottom: "20px" }}>
                <Button style={styles.pageContainer} disabled={currPage === 1} onClick={(e) => handlePage(currPage - 1)}><FontAwesomeIcon icon={faChevronLeft} color="#70757A" /></Button>
                <Button style={currPage === 1 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 1} onClick={(e) => handlePage(1)}><p style={currPage === 1 ? styles.curPage : styles.page}>1</p></Button>
                {pages >= 2 ? <Button style={currPage === 2 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 2} onClick={(e) => handlePage(2)}><p style={currPage === 2 ? styles.curPage : styles.page}>2</p></Button> : <></>}
                {pages >= 3 ? <Button style={currPage === 3 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 3} onClick={(e) => handlePage(3)}><p style={currPage === 3 ? styles.curPage : styles.page}>3</p></Button> : <></>}
                {pages >= 4 ? <Button style={currPage === 4 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 4} onClick={(e) => handlePage(4)}><p style={currPage === 4 ? styles.curPage : styles.page}>4</p></Button> : <></>}
                {pages >= 5 ? <Button style={currPage === 5 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 5} onClick={(e) => handlePage(5)}><p style={currPage === 5 ? styles.curPage : styles.page}>5</p></Button> : <></>}
                {pages >= 7 ? <p style={{ marginLeft: "8px" }}>.....</p> : <></>}
                {pages >= 6 ? <Button style={currPage === pages ? styles.curPageContainer : styles.pageContainer}><p style={currPage === pages ? styles.curPage : styles.page}>{pages}</p></Button> : <></>}
                <Button style={styles.pageContainer} disabled={currPage === pages} onClick={(e) => handlePage(currPage + 1)}><FontAwesomeIcon icon={faChevronRight} color="#70757A" /></Button>
            </div>

            {/* Floating COntainer */}
            <div style={{ ...styles.floatingContainer, display: selectedProposals.length === 0 ? "none" : "", visibility: selectedProposals.length === 0 ? "hidden" : "visible" }}>
                <p style={styles.floatinContainerText}>{selectedProposals.length}</p>
                <p style={styles.floatingContainerText2}>Items Selected</p>
                <div style={{ ...styles.floatingContainerLine, marginLeft: "-23px" }}></div>
                {privileges.includes("Delete Proposal") ? <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginLeft: "90px", cursor: "pointer" }} onClick={(e) => handleShowDelete()}>
                    <FontAwesomeIcon icon={faTrash} style={{ height: "20px" }} />
                    <p style={styles.floatingContainerIconText}>Delete</p>
                </div> : <></>}
                {privileges.includes('Update Proposal') ? <Button style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginLeft: "35px", cursor: "pointer", backgroundColor: "transparent", border: "none" }} disabled={selectedProposals.length !== 1} onClick={handleUpdate}>
                    <FontAwesomeIcon icon={faEdit} style={{ height: "20px" }} color="black" />
                    <p style={styles.floatingContainerIconText}>Edit</p>
                </Button> : <></>}
                <div style={{ ...styles.floatingContainerLine, marginLeft: "10px" }}></div>
                <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginBottom: "11px", marginLeft: "10px" }}>
                    <FontAwesomeIcon icon={faXmark} style={{ height: "20px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={(e) => setselectedProposals([])} />
                </div>
            </div>

            {/* Modals */}
            {/* Add Form Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                style={styles.addModal}
                dialogClassName="filter-dialog"
                animation={false}
            >
                <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row', position:'sticky'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={styles.addHeading}>Add Proposal</div>
                    </div>
                    <div><img onClick={handleClose} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
                <div style={{height:'685px', overflowY:'auto', overflowX:'hidden'}}>
                    {
                        <ProposalForm
                            setRed={setred}
                            setGreen={setgreen}
                            closeModal={handleClose}
                            api={apiCall}
                            apiCall={setCall}
                        />
                    }</div>
            </Modal>

            {/* Update Modal */}
            <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                backdrop="static"
                style={{...styles.addModal, height:'fit-content'}}
                dialogClassName="filter-dialog"
                animation={false}
            >
                <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={styles.addHeading}>Update Proposal</div>
                    </div>
                    <div><img onClick={handleCloseUpdate} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
                {/* <div style={{height:'685px', overflowY:'auto', overflowX:'hidden'}}> */}
                    {
                        <UpdateProposal
                            row={rowData}
                            setRed={setred}
                            setGreen={setgreen}
                            closeModal={handleCloseUpdate}
                            api={apiCall}
                            apiCall={setCall}
                        />
                    }
                    {/* </div> */}
            </Modal>

            {/* Delete Modal */}
            <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                backdrop="static"
                size="sm"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ textAlign: "center", marginBottom:'20px' }}>
                        <b>Delete the selected Proposal!!</b>
                    </p>
                    <div className="d-flex flex-row justify-content-between">

                        <div style={{ display: "inline-block" }}>
                            <Button variant="danger" onClick={handleCloseDelete}>
                                Cancel
                            </Button>
                        </div>
                        <div style={{ display: "inline-block", float: "right" }}>
                            <Button variant="success" onClick={handleDeleteProposal}>
                                Proceed
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </>:
        <TTMMain setshowTTM={setshowTTM} Name={propName} Id={propID}/>
    )
}

export default Proposal