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
import Styles from './ProfileClient.module.css'


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

  const  handleSave = async () => {
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
          <div className={Styles.header}>
            <div className={Styles.header2}>
            <div className={Styles.name}>{personData?.name} <TFChip value={personData?.contact_type ?? ''}/></div>
            <div className={Styles.position}>{personData?.job_title}</div>
            </div>
            <div style={{display:"flex", gap:"12px"}}>  
             <button className={Styles.resume}>Resume</button>
            <TFButton label="Schedule Meet" /></div>
          </div>
          <div className={Styles.details}>
            <div className={Styles.details2}>
              <div className={Styles.subheading}>Label<TFChip value={personData?.company_type ?? ''}/></div>
              </div>
              <div className={Styles.projectHeading}>
          <div className={Styles.subheading}>Project <div className={Styles.headingdata}></div></div>
          </div>
          <div className={Styles.emailHeading}><div className={Styles.subheading}>Email <div className={Styles.headingdata}>{personData?.email}</div></div></div>
          <div className={Styles.phoneHeading}><div className={Styles.subheading}>Phone <div className={Styles.headingdata}>{personData?.phone}</div></div></div>
          </div>
          <div style={{display:"flex"}}>
            <div className={Styles.note}>
              <div style={{display: "flex",padding: "4px 0px",justifyContent:"center",alignItems: "center",gap:"6px"}}>
                 <img src={notesIcon} alt=""/><div className={Styles.name}>Notes</div>
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
        { (showProjectBox ) ?  (<div className={Styles.textarea} onClick={()=>setShowProjectBox(false)}>
            <div className={Styles.subcontent2} style={{ lineHeight: "24px", fontSize:"14px"}}>Take a note</div>
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
       <div className={Styles.takeNoteCard}>
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button className={Styles.resume} onClick={()=>setShowProjectBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave2}  disabled={(!projectText || projectText.trim() === '') ||  projectId ==null} /> 
        </div>
        </div>
        </div> )}
       </div>
          <div className={Styles.name}>{projectId ? `Notes Taken for ${projectId.label}`:`Notes Taken`}</div>
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
    <div className={Styles.emptychat}>
        <img src={nochat} alt="No Chat Available"/>
    </div>
}
    </div>}
           {selectedTab == "General" && 
            <div style={{ width: '100%', float: 'left', display:'flex', flexDirection:'column', gap:"16px" }}>
            { showGeneralBox ?  (<div className={Styles.textarea} onClick={()=>setShowGeneralBox(false)}>
            <div className={Styles.subcontent2} style={{ lineHeight: "24px", fontSize:"14px"}}>Take a note</div>
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
       <div className={Styles.takeNoteCard}>
        
        <div style={{display: "flex",alignItems: "flex-start",gap: "var(--12-pad, 12px)"}}>
        <button className={Styles.resume} onClick={()=>setShowGeneralBox(true)}>Cancel</button>
        <TFButton label="Save" handleClick={handleSave}  disabled={!generalText || generalText.trim() === ''} />
        </div>
        </div>
        </div> )}
            <div className={Styles.name}>Notes Taken</div>
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
        <div className={Styles.emptychat}>
            <img src={nochat} alt="No General Chat Available"/>
        </div>
}
              </div>}
      </div>
          <div className={Styles.reminders}>
              <div className={Styles.remindersHeading}>Reminders</div>
              {reminders && reminders.length > 0  ? (<div className={Styles.reminderContents}>
              {
reminders?.map((each: { reminderDate: MomentInput; note: string; name: string; }) => {
        return (
            <div className={Styles.reminderBox}>
                <div className={Styles.headingdata} style={{padding:"0px 16px"}} dangerouslySetInnerHTML={{ __html: each.note }} />
                <div className={Styles.reminderDate}>
                    {moment(each.reminderDate).format("DD MMM, YYYY")}
                </div>
            </div>
        );
    })
}

                   </div> ) : (<div className={Styles.remindersHeading}>No reminders</div>)}
              </div>
          </div>
          </div>
          
                
  )
}

export default ProfileClient