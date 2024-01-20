import React from "react";
import TFChip from "../../../../../components/form/TFChip/TFChip";
import {Form} from 'react-bootstrap'
import SERVICES from "../../../../../services/Services";
import Styles from './CompanyTable.module.css'
import notesicon from '../../icons/Layer_1.svg'
type Props = {
//   setInvoiceId: Function;
//   invoiceProject: InvoiceProject;
 selectedPeople : Array<number>;
 setselectedPeople : Function;
 each : Person;
 setnav : Function;
 setContactPersonData? : Function;
 setApi : Function;
 api : number;
 tableRef: React.RefObject<HTMLDivElement>;

};

const CompanyTableRow = ({ tableRef,setApi, api, setnav, setContactPersonData, setselectedPeople, each, selectedPeople }: Props) => {

  const handleLabelUpdate = async (id : number, value : string) => {
    try {
        console.log(id+" and "+value)
      const response = await SERVICES.peopleLableUpdate(id,value);
        console.log('API Response:', response);
        setApi(api+1);          
      } 
     catch (error) {
      console.error('API Error:', error);
    }
  };


  return (

    <tr style={{ width: "100%", backgroundColor: selectedPeople.includes(each.company_id) ? "#F5F3FE" : "white", verticalAlign: "top" }} id={each.company_id.toString()} key={each.company_id}>
    <td className='table-cell' style={{ fontWeight: "500", backgroundColor: selectedPeople.includes(each.company_id) ? "#F5F3FE" : "white" }}>
      <div className='d-flex flex-row align-items-center'>
        <Form.Check
          inline
          type="checkbox"
          checked={selectedPeople.includes(each.id)}
          readOnly={true}
          onClick={() => {
            if (!selectedPeople.includes(each.id)) {
              setselectedPeople((prev: any) => [...prev, each.id]);
            } else {
              setselectedPeople((prev: any[]) => prev.filter((ele: number) => ele !== each.id));
            }
          }}
        />
        <div style={{ display: 'flex',width: "180px",height: "36px",padding: "12px var(--8-pad, 8px)",alignItems: "center",flexShrink: "0"}}>
          <div style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px",cursor:"pointer" }}  onClick={(e) => {e.preventDefault();(setContactPersonData && setContactPersonData(each));setnav(22);}}> {each.name}</div>
        </div>
      </div>
    </td>
    <td className={`table-cell ${Styles.tabletext}`}>
      <TFChip value={each.company_type ?? ""} 
              tableRef={tableRef}
              name={each.id}
              onChange={handleLabelUpdate}
              options={["Client","Consultant","Partner","Subconsultant"]}/></td>
    <td className={`table-cell ${Styles.tabletext}`}>{each.remarks}</td>
    <td className={`table-cell ${Styles.tabletext}`}>{each.phone}</td>
    <td className={`table-cell ${Styles.tabletext}`}>{each.email}</td>
    <td className='table-cell'   onClick={(e) => {e.preventDefault();(setContactPersonData &&  setContactPersonData(each));setnav(22);}}>
          <div style={{display: "flex",justifyContent: "center",alignItems: "center",marginRight:"24px",padding:"4px 0px", gap:"2px"}}>
           <img src={notesicon} alt=""/>
           <div style={{color: "var(--Black-text, #3D424F)",fontFamily: "Roboto",fontSize: "14px",fontStyle: "normal", fontWeight: "400", lineHeight: "22px"}}>NOTES</div>
           </div>
           </td>
  </tr>
  );
};

export default CompanyTableRow;
