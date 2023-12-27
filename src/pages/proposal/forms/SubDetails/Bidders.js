import React from 'react'
import TFChip from '../../../../components/form/TFChip/TFChip';
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import TFInput from '../../../../components/form/TFInput/TFInput';

const Bidders = ({ form, handleForm,cities, managers, employees, departments, projectCategories, clients}) => {
  // const Estimation = ({ form, handleForm,cities, managers, employees}) => {
  return (
    <>
        
        {/* Details */}
        <p className="project-header">Bidding Price Details</p>
        <p className="project-subheader">
          Add Bidding Price and Other Details for the proposal
        </p>

        {/* Design Price */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Design Price</p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px", marginLeft: "8px" }}
            >
              $
            </p>
            <input
              type="text"
              name="designPrice"
              className="project-input"
              placeholder="0"
              value={form.designPrice}
              onChange={(e) => handleForm(e.target.name, e.target.value)}
            />
          </div>
        </div>

        {/* Provisional Items Price */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Provisional Items Price</p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px", marginLeft: "8px" }}
            >
              $
            </p>
            <input
              type="text"
              name="provisionalItems"
              className="project-input"
              placeholder="0"
              value={form.provisionalItems}
              onChange={(e) => handleForm(e.target.name, e.target.value)}
            />
          </div>
        </div>

        {/* Contract Admin Price */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Contract Admin Price</p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px", marginLeft: "8px" }}
            >
              $
            </p>
            <input
              type="text"
              name="contractAdminPrice"
              className="project-input"
              placeholder="0"
              value={form.contractAdminPrice}
              onChange={(e) => handleForm(e.target.name, e.target.value)}
            />
          </div>
        </div>

        {/* SubConsultant Price */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">SubConsultant Price </p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px", marginLeft: "8px" }}
            >
              $
            </p>
            <input
              type="text"
              name="subConsultantPrice"
              className="project-input"
              placeholder="0"
              value={form.subConsultantPrice}
              onChange={(e) => handleForm(e.target.name, e.target.value)}
            />
          </div>
        </div>

        {/* Total Bid Price */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Total Bid Price</p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px", marginLeft: "8px" }}
            >
              $
            </p>
            <p className="project-input d-flex flex-row align-items-center">{(form.designPrice === '' ? 0 : parseInt(form.designPrice ))+(form.provisionalItems === '' ? 0 : parseInt(form.provisionalItems ))+ (form.contractAdminPrice === '' ? 0 : parseInt(form.contractAdminPrice ))+ (form.subConsultantPrice === '' ? 0 : parseInt(form.subConsultantPrice )) }</p>
          </div>
        </div>


        {/* Winning Bidder */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Winning Bidder</p>
          <TFInput
            name="winningBidder"
            placeholder='Type Name'
            value={form.winningBidder}
            onChange={handleForm}
            width="100%"
            />
        </div>

        {/* Winning Bid Price */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Winning Bid Price</p>
          <div className="d-flex flex-row">
            <p
              className="d-flex align-items-center project-name-input"
              style={{ fontSize: "14px", marginLeft: "8px" }}
            >
              $
            </p>
            <input
              type="text"
              name="winningPrice"
              className="project-input"
              placeholder="0"
              value={form.winningPrice}
              onChange={(e) => handleForm(e.target.name, e.target.value)}
            />
          </div>
        </div>


        {/* Debriefing */}
        <div className="d-flex flex-row gap-8 w-100">
          <p className="project-label">Debriefing Done</p>
          <TFChip
            value={form.debriefing}
            name='debriefing'
            options={["Yes","No"]}
            onChange={handleForm}
          />
        </div>

        {/* Debriefing Notes */}
        {form.debriefing==="Yes"?(
          <div className="d-flex flex-column gap-12 w-100">
          <p className="project-label">Debriefing Notes</p>
          <textarea
            name="debriefingNotes"
            className="project-textarea"
            value={form.debriefingNotes}
            onChange={(e) => handleForm(e.target.name, e.target.value)}
          />
        </div>):<></>}
        

        <p className="project-header">Bidder List</p>


        {form.bidderList && form.bidderList.map((bidder, index) => (
          <div key={index} className="d-flex flex-row gap-8 w-100">
            <p className="project-label">{`Bidder ${index + 1}`}</p>
            <input
              type="text"
              name={`bidderList[${index}]`}
              placeholder={`Enter Bidder ${index + 1}`}
              value={form.bidderList[index] ?? ''}
              onChange={(e) => handleForm('bidderList', e.target.value, index)}
              style={{ color: 'var(--Dark-grey, #70757A)',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '20px',
              bordeRadius: '6px',
              background: '#FFF',
              borderColor: 'transparent',
              width: '100%'
            }}
            />
            <div className="d-flex flex-row" type="button" onClick={() => handleForm('removeBidder',0, index)} style={{
            padding: '6px var(--8-pad, 8px)',
            borderRadius: '6px',
            background: 'var(--New-Outline, #EBEDF8)',
            alignItems: 'center',
          }}

            >
            Remove
            </div>

          </div>
        ))}

        {/* {form.bidderList && form.bidderList.map((bidder, index) => (
          <div key={index} className="d-flex flex-row gap-8 w-100">
            <p className="project-label">{`Bidder ${index + 1}`}</p>
            <TFInput
              name={`bidderList[${index}]`}
              placeholder={`Enter Bidder ${index + 1}`}
              value={form.bidderList[index] ?? ''}
              onChange={(e) => handleForm('bidderList', e.target.value, index)}
              width="100%"
            />
          </div>
        ))} */}

        <button type="button" onClick={() => handleForm('addBidder')} style={{padding: '6px var(--8-pad, 8px)',gap: 'var(--8-pad, 8px)',borderRadius:'6px', background: '#F6F7F7',borderColor: 'transparent'}}>
                Add More +
      </button>


      {/* {form.plantakerList && form.plantakerList.map((plantaker, index) => (
        <div key={index} className="d-flex flex-row gap-8 w-100">
          <p className="project-label">{`Plan Taker ${index + 1}`}</p>
          <TFInput
            name={`plantakerList[${index}]`}
            placeholder={`Enter Plan Taker ${index + 1}`}
            value={form.plantakerList[index] ?? ''}
            onChange={(e) => handleForm('plantakerList', e.target.value, index)}
            width="100%"
          />
        </div>
      ))} */}

  <p className="project-header">Plantaker List</p>

{     form.plantakerList && form.plantakerList.map((plantaker, index) => (
        <div key={index} className="d-flex flex-row gap-8 w-100">
          <p className="project-label">{`Plan Taker ${index + 1}`}</p>
          <input
          type="text"
          name={`plantakerList[${index}]`}
          placeholder={`Enter Plan Taker ${index + 1}`}
          value={form.plantakerList[index] ?? ''}
          onChange={(e) => handleForm('plantakerList', e.target.value, index)}
          style={{ color: 'var(--Dark-grey, #70757A)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '20px',
            bordeRadius: '6px',
            background: '#FFF',
            borderColor: 'transparent',
            width: '100%'
          }}
          
        />

          <div className="d-flex flex-row" type="button" onClick={() => handleForm('removePlantaker',0, index)} style={{
            padding: '6px var(--8-pad, 8px)',
            borderRadius: '6px',
            background: 'var(--New-Outline, #EBEDF8)',
            alignItems: 'center',
          }}

            >
            Remove
            </div>

        </div>
      ))}

        {/* Button to add more plan takers */}
      <button type="button" onClick={() => handleForm('addPlantaker')} style={{padding: '6px var(--8-pad, 8px)',gap: 'var(--8-pad, 8px)',borderRadius:'6px', background: '#F6F7F7',borderColor: 'transparent'}}>
        Add More +
      </button>
    </>
  )
}

export default Bidders