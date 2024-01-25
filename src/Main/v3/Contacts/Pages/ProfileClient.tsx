import React,{useState,useEffect} from 'react'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import notesIcon from '../icons/Layer_1notes.svg'
import NotesCard from './NotesCard'
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import nochat from '../icons/Frame 1000005109emptychat.svg'
import moment, { MomentInput } from 'moment';
import SERVICES from '../../../../services/Services';
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead.js';
import Utils from '../../../../utils/Utils';
import NoteTabs from '../Tabs/NoteTabs.tsx';



type Props={
  contactPersonData: any,
  id: number
  api:number
  setApi:Function
}
const    ProfileClient = (props:Props) => {
    const [personData, setPersonData] = useState<Person>();
        const[isLoading, setisLoading] = useState(false);
    const [generalText, setGeneralText] = useState('');
    const [generalChat, setGeneralChat] = useState<any>([]);
    const [reminders, setReminders] = useState<any>([]);
    const [projectChat, setProjectChat] = useState<any>([]);
    const [showGeneralBox, setShowGeneralBox] = useState<Boolean>(true);
    const [showProjectBox, setShowProjectBox] = useState<Boolean>(true);
    const [projectList, setProjectList] = useState<any>()
    const [projectText, setProjectText] =useState('');
    const [projectId, setProjectId] = useState<any>(null);
    const [selectedTab, setselectedTab] = useState<string>("Project");

useEffect(()=>{
  setisLoading(true);
  const call = async()=>{
    await SERVICES.getProjectList()
    .then((res)=>{
        console.log("we here!!")
        console.log(res);
        if(res.success)
        setProjectList(Utils.convertToTypeaheadOptions(res.res, 'project_name', 'project_id'));
      })
    .catch((err)=>{
      console.log(err)
    });
  }
  setisLoading(false);
  console.log(projectList);

  call();
},[])

const handleproject = (key: any,val: any) => {
  // setProjectId(null);
   console.log(key)
   setProjectId(val);
   if(val.label == '' && val.value == '')
    setProjectId(null);
    props.setApi(props.api+1);
   console.log(projectId);


}

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
        
          await SERVICES.getProjectNote( props.id, projectId?.value ?? 1)
              .then((res) => {
                  console.log(res);
                   res.res[0] ? setProjectChat( res.res[0].chat ) : setProjectChat([]);
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
      const response = await SERVICES.addGeneralNotes( localStorage.getItem("employeeName"),
            moment().format('D MMM, YYYY'),
             generalText,
             'false',
             props.id, 
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
      
      const response = await SERVICES.addProjectNotes
      (
           localStorage.getItem("employeeName"),
          moment().format('D MMM, YYYY'),
          projectText,
          'false',
           props.id, 
           projectId.value
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
            <NoteTabs
            selectedTab={selectedTab}
            setselectedTab={setselectedTab}
      />
            {selectedTab == "Project" &&
            <div style={{ width: '100%', float: 'left', display:'flex', flexDirection:'column', gap:"16px",}}>
         <TFTypeahead
            name='project_name'
            placeholder='Search Project'
            width='100%'
            onChange={handleproject}
            options={projectList}
          />    
          <div style={{display: "flex",width: "437px",flexDirection: "column",alignItems: "flex-start",gap: "5px"}}>
        { (showProjectBox ) ?  (<div style={styles.textarea} onClick={()=>setShowProjectBox(false)}>
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
        <TFButton label="Save" handleClick={handleSave2}  disabled={(!projectText || projectText.trim() === '') ||  projectId ==null} /> 
        </div>
        </div>
        </div> )}
       </div>
          <div style={styles.name}>{projectId ? `Notes Taken for ${projectId.label}`:`Notes Taken`}</div>
          {
    projectChat && projectId && projectChat.length > 0 ?
    projectChat.map((each: { note: string; name: string; date: string; reminder: boolean; reminderDate: string; }, index: number) => 
        <NotesCard 
            id={props?.id} 
            data={each} 
            index={index} 
            setApi={props.setApi} 
            api={props.api}
            projectId = {projectId.value}
            value="Project"
        />
    ) :
    <div style={styles.emptychat}>
        <img src={nochat} alt="No Chat Available"/>
    </div>
}
    </div>}
           {selectedTab == "General" && 
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
                projectId = {1}
                value="General"
            />
        ) :
        <div style={styles.emptychat}>
            <img src={nochat} alt="No General Chat Available"/>
        </div>
}
              </div>}
      </div>
          <div style={styles.reminders}>
              <div style={styles.remindersHeading}>Reminders</div>
              {reminders && reminders.length > 0  ? (<div style={styles.reminderContents}>
              {
reminders?.map((each: { reminderDate: MomentInput; note: string; name: string; }) => {
        return (
            <div style={styles.reminderBox}>
                <div style={{...styles.headingdata, padding:"0px 16px"}} dangerouslySetInnerHTML={{ __html: each.note }} />
                <div style={styles.reminderDate}>
                    {moment(each.reminderDate).format("DD MMM, YYYY")}
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