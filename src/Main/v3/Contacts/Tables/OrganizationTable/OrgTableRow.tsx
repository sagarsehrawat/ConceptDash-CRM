import React from "react";
import TFChip from "../../../../../components/form/TFChip/TFChip";
import {Form} from 'react-bootstrap'
import SERVICES from "../../../../../services/Services";
import notesicon from '../../icons/Layer_1.svg'
type Props = {
//   setInvoiceId: Function;
//   invoiceProject: InvoiceProject;
 selectedOrganizations : Array<number>;
 setselectedOrganizations : Function;
 org : Organization;
 setnav : Function;
 setOrganizationData? : Function;
 setApi : Function;
 api : number;
 tableRef: React.RefObject<HTMLDivElement>;

};

const OrgTableRow = ({ tableRef,setApi, api, setnav, setOrganizationData, setselectedOrganizations, org, selectedOrganizations }: Props) => {

  const handleLabelUpdate = async (id : number, value : string) => {
    try {
        console.log(id+" and "+value)
      const response = await SERVICES.orgLableUpdate(id,value);
        console.log('API Response:', response);
        setApi(api+1);          
      } 
     catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleContactTypeUpdate = async (id : number, value : string) => {
    try {
        console.log(id+" and "+value)
      const response = await SERVICES.orgContacttypeUpdate(id,value);
        console.log('API Response:', response);
        setApi(api+1);          
      } 
     catch (error) {
      console.error('API Error:', error);
    }
  };

  return (

      <tr style={{ width: "100%", backgroundColor: selectedOrganizations.includes(org.company_id) ? "#F5F3FE" : "white", verticalAlign: "top" }} id={org.company_id.toString()} key={org.company_id}>
      <td className='table-cell' style={{ width: "292px", fontWeight: "500", backgroundColor: selectedOrganizations.includes(org.company_id) ? "#F5F3FE" : "white" }}>
        <div className='d-flex flex-row align-items-center'>
          <Form.Check
            inline
            type="checkbox"
            checked={selectedOrganizations.includes(org.company_id)}
            readOnly={true}
            onClick={() => {
              if (!selectedOrganizations.includes(org.company_id)) {
                setselectedOrganizations((prev : any[]) => [...prev, org.company_id]);
              } else {
                setselectedOrganizations((prev: any[]) => prev.filter(ele => ele !== org.company_id));
              }
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", cursor:"pointer" }} onClick={(e) => {e.preventDefault();(setOrganizationData &&setOrganizationData(org));setnav(23);}}>{org.company_name}</div>
          </div>
        </div>
      </td>
      <td  className='table-cell'style={{  width: '120px', height: '58px', padding: '6px var(--8-pad, 0px)', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 'var(--8-pad, 8px)', flexShrink: '0'}}>
      <TFChip
                          value={org.company_type ?? ""}
                          tableRef={tableRef}
                          name={org.company_id}
                          onChange={handleLabelUpdate}
                          options={["Client", "Partner", "Consultant", "Subconsultant"]}
                        />
                 </td>
      <td className='table-cell' style={{width: '180px', height: '36px', padding: '0px var(--8-pad, 8px)', alignItems: 'center', gap: 'var(--8-pad, 8px)'}}>{org.website}</td>
      <td className='table-cell' style={{  width: '120px', height: '58px', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding:"6px var(--8-pad, 0px)"}}>
      <TFChip
                          value={org.contact_type ?? ""}
                          tableRef={tableRef}
                          name={org.company_id}
                          onChange={handleContactTypeUpdate}
                          options={["Primary", "Secondary", "Tertiary"]}
                        />
      </td>
      <td className='table-cell' style={{padding:"0px var(--8-pad, 8px)"}}>{org.email}</td>
      <td className='table-cell' style={{padding:"0px var(--8-pad, 8px)"}}>{org.fax}</td>
      {/* cv feild */}
      <td className='table-cell' onClick={(e) => {e.preventDefault();(setOrganizationData && setOrganizationData(org));setnav(23);}}>
          <div style={{ cursor:"pointer", display: "flex",justifyContent: "center",alignItems: "center",marginRight:"24px",padding:"4px 0px", gap:"2px"}}>
           <img src={notesicon} alt=""/>
           <div style={{color: "var(--Black-text, #3D424F)",fontFamily: "Roboto",fontSize: "14px",fontStyle: "normal", fontWeight: "400", lineHeight: "22px"}}>Details</div>
           </div>
           </td>

    </tr>
  );
};

export default OrgTableRow;
