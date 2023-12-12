import React,{useState,useEffect} from 'react'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import notesIcon from '../icons/Layer_1notes.svg'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import  {PERSON_DETAILS, PRIMARY_COLOR,HOST1,GENERAL_NOTES,PROJECT_NOTES, ADD_GENERAL_NOTES,ADD_PROJECT_NOTES} from "../../../Constants/Constants";
import TFSearchBar from '../../../../components/ui/TFSearchBar/TFSearchBar'
import NotesCard from './NotesCard'
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import axios from 'axios';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import bold from '../icons/format_bold_black_24dp 2.svg'
import bulletlist from '../icons/format_list_bulleted_black_24dp (1) 2.svg'
import numberlist from '../icons/format_list_numbered_black_24dp 2.svg'
import emoticons from '../icons/sentiment_satisfied_alt_black_24dp 3.svg'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

type Props={
  contactPersonData: any,
  id: Number
}
const ProfileClient = (props:Props) => {

    const [value1, setValue1] = useState("1");
    const [value, setValue] = useState("");
    const [api, setApi] = useState(0);
    const [personData, setPersonData] = useState(null);
    const[isLoading, setisLoading] = useState(false);
    const [generalText, setGeneralText] = useState('');
    const [projectText, setProjectText] = useState('');
    const [generalChat, setGeneralChat] = useState(null);
    const [reminders, setReminders] = useState(null);
    const [projectChat, setProjectChat] = useState(null);
    const [showGeneralBox, setShowGeneralBox] = useState<Boolean>(true);
    const [showProjectBox, setShowProjectBox] = useState<Boolean>(true);

    const [editorState, setEditorState] =useState(() => EditorState.createEmpty());
    const handleBoldClick = () => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };
    
  
    const handleBulletListClick = () => {
      // Prefix selected text with '*' to create a bullet point
    setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    };

const handleChange = (event: Event, newValue : any) => {
  setValue1(newValue);
};

    const styles={
        header:{
            display: 'inline-flex',
            padding: '16px 20px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderRadius: '16px 16px 0px 0px',
            border: '1px solid var(--New-Outline, #EBEDF8)',
            background: '#FFF',
            marginRight: '20px',
            marginTop: '20px',
            width:"-webkit-fill-available",

          },
          name:{
                color: 'var(--Black-text, #3D424F)',
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '24px', // 150%
                letterSpacing: '0.103px',
                display: "flex",
                gap: "var(--8-pad, 8px)",
          },
           position : {
            color: '#8B9FAF',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '16px', // 133.333%
            letterSpacing: '0.103px',
          },
          resume:{
         
                display: 'inline-flex',
                padding: 'var(--8-pad, 8px) 24px var(--8-pad, 8px) 16px',
                alignItems: 'center',
                gap: 'var(--8-pad, 8px)',
                borderRadius: '6px',
                border: '1px solid #8361FE',   
                color: "#8361FE",
          },
          details:{
            display: 'inline-flex',
            allignItems: 'flex_start',  
  padding: 'var(--12-pad, 12px) 20px', 
  borderRadius: '0px 0px 16px 16px',
  borderRight: '1px solid var(--New-Outline, #EBEDF8)',
  borderBottom: '1px solid var(--New-Outline, #EBEDF8)',
  borderLeft: '1px solid var(--New-Outline, #EBEDF8)',
  background: '#FFF',
  width:"-webkit-fill-available",
  marginRight: '20px'
  // margin:"0px 20px 20px 0px"

          },
          subheading:{
                color: '#8B9FAF',
                fontFamily: 'Roboto',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '22px', // 183.333%
          },
          headingdata:{
            display: "flex",
            // padding: "0px 16px",
            alignItems: "center",
            gap: "var(--8-pad, 8px)",
            alignSelf: "stretch",
            color: "var(--Black-text, #3D424F)",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "24px",
          },
          reminderDate:{
            display: "flex",
            padding: "0px 16px",
            alignItems: "center",
            gap: "381px",
            alignSelf: "stretch",
            color: "var(--New-grey, #728492)",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "16px",
          },
            note:{
                display: 'flex',
                padding: '20px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderRadius: '16px',
                border: '1px solid var(--New-Outline, #EBEDF8)',
                flex: 100,
                background: '#FFF',      
                marginRight:"20px",
                marginTop:"24px",       
          },
          reminders:{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width:"278px",
            padding:"var(--12-pad, 12px) 0px 16px 0px",
            gap:"var(--8-pad,8px)",
            borderRadius: "16px",
            border: "1px solid var(--New-Outline, #EBEDF8)",
            background: "#FFF",
            marginTop: "24px"
          },
          remindersHeading:{
            display: "flex",
            padding: "var(--8-pad, 8px) 16px",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            color: "var(--Black-text, #3D424F)",
           fontFamily: "Roboto",
            fontSize: "16px",
          fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "24px"
          },
          reminderContents:{
            display: "flex",
           flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch"
          },
          reminderBox:{
            display: "flex",
          width: "275px",
  padding: "var(--8-pad, 8px) 0px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
  borderBottom :"1px solid var(--New-Outline, #EBEDF8)",
          },
          subcontent1:{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--12-pad, 12px)',
            alignSelf:"Stretch",              
      },
       subcontent2:{
        color: 'var(--New-grey, #728492)',
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '16px',
       }, 
       textarea :{
        display: "flex",
        height: "64px",
        padding: "var(--12-pad, 12px) 16px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "5px",
        alignSelf: "stretch",
        borderRadius: "var(--12-pad, 12px)",
        border: "1px solid var(--New-Outline, #EBEDF8)",
        background: "#F8FAFC",
       }
        }
        useEffect(() => {
          const call = async () => {
            setisLoading(true);
              await axios
                  .get(HOST1 + PERSON_DETAILS, {
                      headers: {
                          auth: "Rose " + localStorage.getItem("auth"),
                          id: JSON.stringify(props.id) 
                      },
                  })
                  .then((res) => {
                      console.log(res.data.res[0]);
                       setPersonData(res.data.res[0]);
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          }
          call()
          setisLoading(false)
      }, [props.id])  
      useEffect(() => {
        const call1 = async () => {
            await axios
                .get(HOST1 + GENERAL_NOTES, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        peopleid: 1
                    },
                })
                .then((res) => {
                     console.log(res)
                     setGeneralChat(res.data.res[0].general);
                     const rem = res.data.res[0].general?.filter((each) => each.reminder === true);
                      setReminders(rem);
                      console.log(reminders);
                     console.log(generalChat);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call1()
    }, [props.id]) 
    useEffect(() => {
      const call1 = async () => {
          await axios
              .get(HOST1 + PROJECT_NOTES, {
                  headers: {
                      auth: "Rose " + localStorage.getItem("auth"),
                      peopleid: 1,
                      projectid: 1 
                  },
              })
              .then((res) => {
                   console.log(res);
                   setProjectChat(res.data.res[0].chat);
                   console.log(projectChat);
              })
              .catch((err) => {
                  console.log(err);
              });
      }
      call1()
  }, [props.id]) 

  const handleSave = async () => {
    try {
      
      const response = await axios.post(HOST1 + ADD_GENERAL_NOTES,
        {
          name: 'Akarsh Tripathi',
          date: JSON.stringify(new Date().getDate()),
          notes: generalText,
          reminder: 'false',
          peopleId: '1', 
        },
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        }
      );

      setGeneralText('');
      setShowGeneralBox(false); 
      // Do something with the updatedData if needed
      console.log(response);
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const handleSave2 = async () => {
    try {
      
      const response = await axios.post(HOST1 + ADD_PROJECT_NOTES,
        {
          name: 'Akarsh Tripathi',
          date: JSON.stringify(new Date().getDate()),
          notes: projectText,
          reminder: 'false',
          peopleId: 1, 
          projectId: 1
        },
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        }
      );

      setProjectText('');
      setShowProjectBox(true)
      // Do something with the updatedData if needed
      console.log(response);
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };


  return (
    isLoading ?
          <div className='w-100' style={{ height: '492px' }}>
            <LoadingSpinner />
          </div> : 
     <div style={{marginLeft:"20px", background: "#F8FAFB"}}>
          <div style={styles.header}>
            <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "flex-start",}}>
            <div style={styles.name}>{personData?.name} <TFChip value={personData?.contact_type}/></div>
            <div style={styles.position}>{personData?.job_title}</div>
            </div>
            <div style={{display:"flex", gap:"12px"}}>  
             <button style={styles.resume}>Resume</button>
            <TFButton label="Schedule Meet" type="submit"/></div>
          </div>
          <div style={styles.details}>
            <div style={{ display: "flex", width: "120px", padding: "0px var(--8-pad, 8px)", flexDirection: "column", alignItems: "flex-start", gap: "var(--8-pad, 8px)" }}>
              <div style={styles.subheading}>Label<TFChip value={personData?.company_type}/></div>
              </div>
              <div style={{display: "flex", width: "210px", padding: "0px var(--8-pad, 8px) 0px 24px", flexDirection: "column", alignItems: "flex-start", gap: "var(--8-pad, 8px)", borderRight: "1px solid var(--New-Outline, #EBEDF8)"}}>
          <div style={styles.subheading}>Project <div style={styles.headingdata}>Taskforce phase 2</div></div>
          </div>
          <div style={{ display: "flex", width: "218px", padding: "0px var(--8-pad, 8px) 0px 24px", flexDirection: "column", alignItems: "flex-start", gap: "var(--8-pad, 8px)" }}><div style={styles.subheading}>Email <div style={styles.headingdata}>{personData?.email}</div></div></div>
          <div style={{  display: "flex",flexDirection: "column",alignItems: "flex-start",padding: "0px var(--8-pad, 8px) 0px 24px", gap:"var(--8-pad, 8px)"}}><div style={styles.subheading}>Phone <div style={styles.headingdata}>{personData?.phone}</div></div></div>
          </div>
          <div style={{display:"flex"}}>
            <div style={styles.note}>
               
              <div style={{display: "flex",padding: "4px 0px",justifyContent:"center",alignItems: "center",gap:"6px"}}>
                 <img src={notesIcon} alt=""/><div style={styles.name}>Notes</div>
                </div>
                <Box
          sx={{
            width: "100%",
            typography: "body1",
            float: "left",
          }}
          style={{ margin: "0" }}>
                <TabContext value={value1}>
            <Box sx={{}}>
              <TabList
                centered
                onChange={handleChange}
                aria-label=""
                TabIndicatorProps={{
                  style: {
                    backgroundColor: PRIMARY_COLOR,
                  },
                }}
                sx={{
                  //   marginRight: "400px",
                
                  float: "left",
                  height: "57px",
                }}
              >
                <Tab
                  style={{
                    color: value1 == 1 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="Project"
                  value="1"
                />
                <Tab
                  style={{
                    color: value1 == 2 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="General"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1" style={{padding:'0px'}}>
            <div style={{ width: '100%', float: 'left', display:'flex', flexDirection:'column', gap:"16px", marginLeft:"20px" }}>
              <TFSearchBar
          placeholder={'Project Name'}
          searchFunc={[value, setValue]}
          style={{ 'margin-right': '12px', }}
          apiFunc={[api, setApi]}
        />
          <div style={{display: "flex",width: "437px",flexDirection: "column",alignItems: "flex-start",gap: "5px"}}>
        { showGeneralBox ?  (<div style={styles.textarea} onClick={()=>setShowGeneralBox(false)}>
            <div style={{...styles.subcontent2, lineHeight: "24px", fontSize:"14px"}}>Take a note</div>
           </div>) : 
           ( <div>
      {/* <textarea
        id="textInput"
        placeholder="Take a note..."
        rows="5"
        cols="50"
        value={projectText}
        onChange={(e) => setProjectText(e.target.value)}
      ></textarea> */}
        <Editor editorState={editorState} onChange={setEditorState} />;

       <div style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "space-between",alignItems: "center",alignSelf: "stretch",
        borderRadius: "0px 0px var(--12-pad, 12px) var(--12-pad, 12px)",border: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <img src={bold} alt='bold' onClick={handleBoldClick} style={{ cursor: 'pointer' }} />
          <img src={bulletlist} alt='bulletlist' onClick={handleBulletListClick} style={{ cursor: 'pointer' }} />
        <img src={numberlist} alt='numberedist'/>
      
        </div>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button style={styles.resume} onClick={()=>setShowGeneralBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave}/>
        </div>
        </div>
        </div> )}
       </div>
          <div style={styles.name}>Notes Taken</div>
            { projectChat && projectChat.map((each,index)=> <NotesCard data={each} index={index} value="Project"/>)}
    </div>
            </TabPanel>
            <TabPanel value="2" style={{padding:'0px'}}>
            <div style={{ width: '100%', float: 'left', display:'flex', flexDirection:'column', gap:"16px" }}>
            { showProjectBox ?  (<div style={styles.textarea} onClick={()=>setShowProjectBox(false)}>
            <div style={{...styles.subcontent2, lineHeight: "24px", fontSize:"14px"}}>Take a note</div>
           </div>) : 
           ( <div>
      <textarea
        id="textInput"
        placeholder="Take a note..."
        rows="5"
        cols="50"
        value={projectText}
        onChange={(e) => setProjectText(e.target.value)}
      ></textarea>
       <div style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "space-between",alignItems: "center",alignSelf: "stretch",
        borderRadius: "0px 0px var(--12-pad, 12px) var(--12-pad, 12px)",border: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <img src={bold} alt='bold' onClick={handleBoldClick} style={{ cursor: 'pointer' }} />
          <img src={bulletlist} alt='bulletlist' onClick={handleBulletListClick} style={{ cursor: 'pointer' }} />
        <img src={numberlist} alt='numberedist'/>
      
        </div>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button style={styles.resume} onClick={()=>setShowProjectBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave2}/>
        </div>
        </div>
        </div> )}
            <div style={styles.name}>Notes Taken</div>
            { generalChat && generalChat.map((each,index) => <NotesCard data={each} index={index} value="General"/>)}
              </div>
            </TabPanel>
          </TabContext>
          </Box></div>
          <div style={styles.reminders}>
              <div style={styles.remindersHeading}>Reminders</div>
              <div style={styles.reminderContents}>
                  <div style={styles.reminderBox}>
                   <div style={styles.headingdata}>Follow up on Primary discusssion</div>
                   <div style={styles.reminderDate}>30 oct</div>
                   </div>
                   </div> 
              </div>
          </div>
          </div>
          
                
  )
}

export default ProfileClient