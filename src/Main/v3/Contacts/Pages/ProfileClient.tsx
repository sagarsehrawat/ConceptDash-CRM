import React,{useState,useEffect} from 'react'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import notesIcon from '../icons/Layer_1notes.svg'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import  { PRIMARY_COLOR,HOST,PROJECT_NOTES, ADD_GENERAL_NOTES,ADD_PROJECT_NOTES} from "../../../Constants/Constants";
import NotesCard from './NotesCard'
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import axios from 'axios';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import nochat from '../icons/Frame 1000005109emptychat.svg'
import moment from 'moment';
import SERVICES from '../../../../services/Services';



type Props={
  contactPersonData: any,
  id: number
  api:number
  setApi:Function
}
const    ProfileClient = (props:Props) => {
   const [value1, setValue1] = useState(1);
    const [personData, setPersonData] = useState<Person>();
        const[isLoading, setisLoading] = useState(false);
    const [generalText, setGeneralText] = useState('');
    const [generalChat, setGeneralChat] = useState<any>([]);
    const [reminders, setReminders] = useState<any>([]);
    const [projectChat, setProjectChat] = useState([]);
    const [showGeneralBox, setShowGeneralBox] = useState<Boolean>(true);
    const [showProjectBox, setShowProjectBox] = useState<Boolean>(true);

    const [projectText, setProjectText] =useState('');


const handleChange = (event: React.SyntheticEvent, newValue: any) => {
  console.log(event);
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
          } as React.CSSProperties,
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
          } as React.CSSProperties,
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
          }as React.CSSProperties,
          reminderBox:{
            display: "flex",
          width: "275px",
  padding: "var(--8-pad, 8px) 0px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
  borderBottom :"1px solid var(--New-Outline, #EBEDF8)",
          } as React.CSSProperties,
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
       } as React.CSSProperties,
       emptychat:{
        display: "flex",
        padding: "var(--12-pad, 12px) 16px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "5px",
        flex:" 1 0 0",
        alignSelf: "stretch",
        borderRadius: "var(--12-pad, 12px)",
        border: "1px solid var(--New-Outline, #EBEDF8)",
        background: "#F8F7FF",
       } as React.CSSProperties,
        }
        useEffect(() => {
          setisLoading(true);
          const call = async () => {
              await SERVICES.getPersonDetails(props.id)
                  .then((res) => {
                    
                       setPersonData(res);
                       props.setApi(props.api+1)
                       console.log(res);
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          }
          setisLoading(false);
          call()
      }, [props.id]);  
      useEffect(() => {
        const call1 = async () => {
            await SERVICES.getGeneralNote(props.id)
                .then((res) => {
                    console.log(res);
                     res.res[0] ? setGeneralChat(res.res[0].general) : setGeneralChat([]);
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
              .get(HOST + PROJECT_NOTES, {
                  headers: {
                      auth: "Rose " + localStorage.getItem("auth"),
                      peopleid: JSON.stringify(props.id),
                      projectid: 1 
                  },
              })
              .then((res) => {
                  console.log(res);
                   res.data.res[0] ? setProjectChat( res.data.res[0].chat ) : setProjectChat([]);
                   console.log(projectChat);
                   
              })
              .catch((err) => {
                  console.log(err);
              });
      }
      call1()
  }, [props.id,personData,props.api]) 
  const updateReminders = () => {

    const generalReminders = (generalChat.length > 0 && generalChat?.filter((each: { reminder: string; }) => each.reminder === 'true')) || [];
    const projectReminders = (projectChat.length > 0 && projectChat?.filter((each: { reminder: string; })  => each.reminder === 'true')) || [];
    setReminders([...generalReminders, ...projectReminders]);

}

useEffect(() => {
    updateReminders();

}, [generalChat, projectChat,props.api]); 

  const handleSave = async () => {
    try {
      const response = await axios.post(HOST + ADD_GENERAL_NOTES,
        {
          name: localStorage.getItem("employeeName"),
          date: moment().format('YYYY-MM-DD'),
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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave2 = async () => {
    try {
      
      const response = await axios.post(HOST + ADD_PROJECT_NOTES,
        {
          name: localStorage.getItem("employeeName"),
          date:moment().format('YYYY-MM-DD'),
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
 console.log(isLoading)
  return (
    isLoading ?
          <div className='w-100' style={{ height: '492px'}}>
            <LoadingSpinner />
          </div> : 
     <div style={{marginLeft:"20px", background: "#F8FAFB", flexGrow:"1"}}>
          <div style={styles.header}>
            <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "flex-start",}}>
            <div style={styles.name}>{personData?.name} <TFChip value={personData?.contact_type ?? ''}/></div>
            <div style={styles.position}>{personData?.job_title}</div>
            </div>
            <div style={{display:"flex", gap:"12px"}}>  
             <button style={styles.resume}>Resume</button>
            <TFButton label="Schedule Meet" /></div>
          </div>
          <div style={styles.details}>
            <div style={{ display: "flex", width: "120px", padding: "0px var(--8-pad, 8px)", flexDirection: "column", alignItems: "flex-start", gap: "var(--8-pad, 8px)" }}>
              <div style={styles.subheading}>Label<TFChip value={personData?.company_type ?? ''}/></div>
              </div>
              <div style={{display: "flex", width: "210px", padding: "0px var(--8-pad, 8px) 0px 24px", flexDirection: "column", alignItems: "flex-start", gap: "var(--8-pad, 8px)", borderRight: "1px solid var(--New-Outline, #EBEDF8)"}}>
          <div style={styles.subheading}>Project <div style={styles.headingdata}></div></div>
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
                <TabContext value={value1.toString()}>
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
              {/* <TFSearchBar
          placeholder={'Project Name'}
          searchFunc={[value, setValue]}
          style={{ 'margin-right': '12px', }}
        /> */}
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
                  console.log(event);
                  setProjectText(data);
                }} /> </div>
       <div style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "flex-end",alignItems: "center",alignSelf: "stretch",
        width:"437px",borderRadius: "0px 0px var(--12-pad, 12px) var(--12-pad, 12px)",border: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
       
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button style={styles.resume} onClick={()=>setShowProjectBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave2}  disabled={!projectText || projectText.trim() === ''} />
        </div>
        </div>
        </div> )}
       </div>
          <div style={styles.name}>Notes Taken</div>
          {
    projectChat && projectChat.length > 0 ?
    projectChat.map((each, index) => 
        <NotesCard 
            id={props?.id} 
            data={each} 
            index={index} 
            setApi={props.setApi} 
            api={props.api} 
            value="Project"
        />
    ) :
    <div style={styles.emptychat}>
        <img src={nochat} alt="No Chat Available"/>
    </div>
}
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
                  console.log(event);
                  setGeneralText(data);
                }} />
       <div style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "flex-end",alignItems: "center",alignSelf: "stretch",
        borderRadius: "0px 0px var(--12-pad, 12px) var(--12-pad, 12px)",border: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
        
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button style={styles.resume} onClick={()=>setShowGeneralBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave}  disabled={!generalText || generalText.trim() === ''} />
        </div>
        </div>
        </div> )}
            <div style={styles.name}>Notes Taken</div>
            {
    generalChat && generalChat.length > 0 ?
        generalChat.map((each: { note: string; name: string; date: string; reminder: boolean; reminderDate: string; }, index: number) => 
            <NotesCard 
                id={props?.id} 
                setApi={props.setApi} 
                api={props.api} 
                data={each} 
                index={index} 
                value="General"
            />
        ) :
        <div style={styles.emptychat}>
            <img src={nochat} alt="No General Chat Available"/>
        </div>
}
              </div>
            </TabPanel>
          </TabContext>
          </Box></div>
          <div style={styles.reminders}>
              <div style={styles.remindersHeading}>Reminders</div>
              {reminders && reminders.length > 0  ? (<div style={styles.reminderContents}>
              {
reminders?.map((each: { note: string; name: string }) => {
        return (
            <div style={styles.reminderBox}>
                <div style={{...styles.headingdata, padding:"0px 16px"}} dangerouslySetInnerHTML={{ __html: each.note }} />
                <div style={styles.reminderDate}>
                    {each.name}
                </div>
            </div>
        );
    })
}

                   </div> ) : (<div style={styles.remindersHeading}>No reminders</div>)}
              </div>
          </div>
          </div>
          
                
  )
}

export default ProfileClient