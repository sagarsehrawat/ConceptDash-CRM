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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


type Props={
  contactPersonData: any,
  id: Number
  api:number
  setApi:Function
}
const    ProfileClient = (props:Props) => {
   const [value1, setValue1] = useState("1");
    const [value, setValue] = useState("");
    const [personData, setPersonData] = useState(null);
    const[isLoading, setisLoading] = useState(false);
    const [generalText, setGeneralText] = useState('');
    const [generalChat, setGeneralChat] = useState(null);
    const [reminders, setReminders] = useState<Array>([]);
    const [projectChat, setProjectChat] = useState(null);
    const [showGeneralBox, setShowGeneralBox] = useState<Boolean>(true);
    const [showProjectBox, setShowProjectBox] = useState<Boolean>(true);

    const [projectText, setProjectText] =useState('');


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
            marginTop: "24px",
            marginRight:"20px",
            height:"fit-content"
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
            lineHeight: "24px",
            borderBottom: "1px solid var(--New-Outline, #EBEDF8)"
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
                       setPersonData(res.data.res[0]);
                       props.setApi(props.api+1)
                       console.log(personData);
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          }
          call()
          setisLoading(false)
      }, [props.id]);  
      useEffect(() => {
        const call1 = async () => {
            await axios
                .get(HOST1 + GENERAL_NOTES, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        peopleid: JSON.stringify(props.id)
                    },
                })
                .then((res) => {
                     res.data.res[0] ? setGeneralChat(res.data.res[0].general) : setGeneralChat(null);
                     const rem = generalChat?.filter((each) => each.reminder == 'true');
                      setReminders(rem);
                      console.log("reminders")
                      console.log(reminders);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call1()
    }, [props.id,personData,props.api]) 
    useEffect(() => {
      const call1 = async () => {
          await axios
              .get(HOST1 + PROJECT_NOTES, {
                  headers: {
                      auth: "Rose " + localStorage.getItem("auth"),
                      peopleid: JSON.stringify(props.id),
                      projectid: 1 
                  },
              })
              .then((res) => {
                   res.data.res[0] ? setProjectChat( res.data.res[0].chat ) : setProjectChat(null);
                   console.log(projectChat);
                   const rem = projectChat?.filter( each => each.reminder == 'true');
                   setReminders( [...reminders,...rem]);
                   console.log("reminders")
                   console.log([...reminders,...rem]);
                   
              })
              .catch((err) => {
                  console.log(err);
              });
      }
      call1()
  }, [props.id,personData,props.api]) 

  const handleSave = async () => {
    try {
      
      const response = await axios.post(HOST1 + ADD_GENERAL_NOTES,
        {
          name: 'Akarsh Tripathi',
          date: JSON.stringify(new Date().getDate()),
          notes: generalText,
          reminder: 'false',
          peopleId: JSON.stringify(props.id), 
        },
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        }
      );

      setGeneralText('');
      setShowProjectBox(false); 
      props.setApi(props.api+1)
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
          peopleId: props.id, 
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
      props.setApi(props.api+1)
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
                  marginBottom:"16px"
                }}
              >
                <Tab
                  style={{
                    color: value1 == 1 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0
                  }}
                  sx={{ fontSize: 12,  textTransform :"none" }}
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
                  sx={{ fontSize: 12,  textTransform :"none" }}
                  label="General"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1" style={{padding:'0px'}}>
            <div style={{ width: '100%', float: 'left', display:'flex', flexDirection:'column', gap:"16px",}}>
              <TFSearchBar
          placeholder={'Project Name'}
          searchFunc={[value, setValue]}
          style={{ 'margin-right': '12px', }}
        />
          <div style={{display: "flex",width: "437px",flexDirection: "column",alignItems: "flex-start",gap: "5px"}}>
        { showProjectBox ?  (<div style={styles.textarea} onClick={()=>setShowProjectBox(false)}>
            <div style={{...styles.subcontent2, lineHeight: "24px", fontSize:"14px"}}>Take a note</div>
           </div>) : 
           ( <div>
            <div>
            <CKEditor
                editor={ClassicEditor}
              config={{         
             toolbar: ['bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo']
        }}                
                data={projectText}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log(data);
                  setProjectText(data);
                }} /> </div>
       <div style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "space-between",alignItems: "center",alignSelf: "stretch",
        width:"437px",borderRadius: "0px 0px var(--12-pad, 12px) var(--12-pad, 12px)",border: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <img src={bold} alt='bold' style={{ cursor: 'pointer' }} />
          <img src={bulletlist} alt='bulletlist'style={{ cursor: 'pointer' }} />
        <img src={numberlist} alt='numberedist' style={{ cursor: 'pointer' }} />
      
        </div>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button style={styles.resume} onClick={()=>setShowProjectBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave2}/>
        </div>
        </div>
        </div> )}
       </div>
          <div style={styles.name}>Notes Taken</div>
            { projectChat ? projectChat.map((each,index)=> <NotesCard id={props?.id} data={each} index={index} setApi={props.setApi} api={props.api} value="Project"/>)
            :
             <>No chats</>}
    </div>
            </TabPanel>
            <TabPanel value="2" style={{padding:'0px'}}>
            <div style={{ width: '100%', float: 'left', display:'flex', flexDirection:'column', gap:"16px" }}>
            { showGeneralBox ?  (<div style={styles.textarea} onClick={()=>setShowGeneralBox(false)}>
            <div style={{...styles.subcontent2, lineHeight: "24px", fontSize:"14px"}}>Take a note</div>
           </div>) : 
           ( <div>
     <CKEditor
                editor={ClassicEditor}
              config={{         
             toolbar: ['bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo']
        }}                
                data={generalText}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log(data);
                  setGeneralText(data);
                }} />
       <div style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "space-between",alignItems: "center",alignSelf: "stretch",
        borderRadius: "0px 0px var(--12-pad, 12px) var(--12-pad, 12px)",border: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <img src={bold} alt='bold' style={{ cursor: 'pointer' }} />
          <img src={bulletlist} alt='bulletlist' style={{ cursor: 'pointer' }} />
        <img src={numberlist} alt='numberedist'/>
      
        </div>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button style={styles.resume} onClick={()=>setShowGeneralBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave}/>
        </div>
        </div>
        </div> )}
            <div style={styles.name}>Notes Taken</div>
            { generalChat && generalChat.map((each,index) => <NotesCard id={props?.id} setApi={props.setApi} api={props.api} data={each} index={index} value="General"/>)}
              </div>
            </TabPanel>
          </TabContext>
          </Box></div>
          <div style={styles.reminders}>
              <div style={styles.remindersHeading}>Reminders</div>
              <div style={styles.reminderContents}>
                  <div style={styles.reminderBox}>
                   <div style={{...styles.headingdata, padding:"0px 16px"}}>Follow up on Primary discusssion</div>
                   <div style={styles.reminderDate}>30 oct</div>
                   </div>
                   <div style={styles.reminderBox}>
                   <div style={{...styles.headingdata, padding:"0px 16px"}}>Follow up on Primary discusssion</div>
                   <div style={styles.reminderDate}>30 oct</div>
                   </div>
                   <div style={styles.reminderBox}>
                   <div style={{...styles.headingdata, padding:"0px 16px"}}>Follow up on Primary discusssion</div>
                   <div style={styles.reminderDate}>30 oct</div>
                   </div>
                   </div> 
              </div>
          </div>
          </div>
          
                
  )
}

export default ProfileClient