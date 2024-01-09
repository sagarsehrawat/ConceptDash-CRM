import React from "react";
import "./send-campaign-form.css";
import ICONS from "../../constants/Icons";
import TFIcon from "../../components/ui/TFIcon/TFIcon";
import { cmpPages } from ".";
import FormFields from "./FormFields";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setToDefault,
  setSelectedLists,
  setSelectedListsCopy,
  setUnselectedLists,
  setUnselectedListsCopy,
  setIsLoading,
  setFiles,
  setIsFileAccedingMaxSize,
} from "../../redux/slices/campaignListSlice";
import axios from "axios";
import APIS from "../../constants/APIS";
import FileSizeExccedModal from "./FileSizeExccedModal";
import TFUpload from "../../components/form/TFUpload/TFUpload";
import TFFileList from "../../components/form/TFFileList/TFFileList";

export default function SendCampaignForm({ setPage, isCollapsed }) {
  const dispatch = useDispatch();
  const { data, lists, selectedLists, files, isLoading } = useSelector(
    (state) => state.campaignList
  );
  function handleInputChange(name, value) {
    dispatch(setData({ ...data, [name]: value }));
  }
  // function handleSelectChange(data1) {
  //   let selectedListsObj = {};
  //   data1?.forEach((d) => (selectedListsObj[d?.cmpt_id] = true));
  //   let unselectedListsArray = [];
  //   lists?.forEach(
  //     (d) => !selectedListsObj[d?.cmpt_id] && unselectedListsArray.push(d)
  //   );
  //   dispatch(setUnselectedLists([...unselectedListsArray]));
  //   dispatch(setUnselectedListsCopy([...unselectedListsArray]));
  //   dispatch(setSelectedLists([...data1]));
  //   dispatch(setSelectedListsCopy([...data1]));
  // }
  function handleSelectChange(key, option) {
    let newSelectedLists;
    if (
      selectedLists?.find((selectedList) => selectedList.value === option.value)
    ) {
      const selectedListsClone = [...selectedLists];
      newSelectedLists = selectedListsClone.filter(
        (selectedList) => selectedList.value !== option.value
      );
    } else {
      newSelectedLists = [...selectedLists, option];
    }
    let selectedListObj = {};
    newSelectedLists.forEach((e) => (selectedListObj[e.value] = true));
    let unselectedListsArray = [];
    lists?.forEach(
      (d) =>
        !selectedListObj[d?.cmpt_id] &&
        unselectedListsArray.push({ label: d?.cmpt_name, value: d?.cmpt_id })
    );
    dispatch(setUnselectedLists(unselectedListsArray));
    dispatch(setUnselectedListsCopy(unselectedListsArray));
    dispatch(setSelectedLists(newSelectedLists));
    dispatch(setSelectedListsCopy(newSelectedLists));
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let payload = {
      cmpName: data?.cmpName,
      senderEmail: data?.senderEmail,
      senderName: data?.senderName,
      subject: data?.subject,
      ...(data?.params && {
        params: Object.keys(data.params)
          .filter((key) => !key.startsWith("contact."))
          .reduce(
            (prev, curr) => ({ ...prev, [curr]: data?.params[curr] }),
            {}
          ),
      }),
      ...(data?.params && {
        contactParams: Object.keys(data.params)
          .filter((key) => key.startsWith("contact."))
          .reduce(
            (prev, curr) => ({
              ...prev,
              [curr.split("contact.")[1]]: data?.params[curr],
            }),
            {}
          ),
      }),
      configurationSetName: "ses-campaign",
      templateId: data?.template?.tmpid,
      recipient: selectedLists?.map((selectedList) => selectedList?.value),
      recipientCount: selectedLists?.reduce(
        (prev, curr) => prev + curr?.cmpt_count,
        0
      ),
    };
    console.log(payload);
    return;
    let formData = new FormData();
    files?.forEach((file) => formData.append("file", file));
    formData.append("data", JSON.stringify(payload));
    try {
      const { data: sendCampaignResponse } = await axios.post(
        APIS.CAMPAIGN_BASE_URL + APIS.SEND_CAMPAIGN,
        formData,
        {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        }
      );
      dispatch(setToDefault(lists));
      setPage(cmpPages.all_campaign);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  function handleFileUpload(fileList) {
    let acceptedFileList = fileList?.filter(
      (file) => file.size / (1024 * 1024) <= 2
    );
    let rejectedFileList = fileList?.filter(
      (file) => file.size / (1024 * 1024) > 2
    );
    if (rejectedFileList.length > 0) {
      dispatch(setIsFileAccedingMaxSize(true));
    }
    dispatch(setFiles([...files, ...acceptedFileList]));
  }

  return (
    <form style={{ background: "white" }} onSubmit={handleFormSubmit}>
      <div className="cmp-container">
        <div className="cmp-inner-container">
          <SendCampaignTopButton
            setPage={setPage}
            page={cmpPages.create_campaign}
          />
          <ComponentHeader
            first="Add sender and recipient details"
            second="Add senders and receivers details to send the campaign."
          />
          <div className="cmp-add-sender-details-fields-container">
            <FormFields
              leftPlaceholder="Sender's Email"
              rightPlaceholder="Sender's Email"
              name="senderEmail"
              type="email"
              onChange={handleInputChange}
              value={data?.senderEmail}
            />
            <FormFields
              leftPlaceholder="Sender's Name"
              rightPlaceholder="Sender's Name"
              name="senderName"
              onChange={handleInputChange}
              value={data?.senderName}
            />
            <FormFields
              leftPlaceholder="Recipient"
              rightPlaceholder="Select Receipients"
              isSelect
              options={lists?.map((list) => ({
                label: list.cmpt_name,
                value: list.cmpt_id,
              }))}
              value={selectedLists}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        <div className="cmp-inner-container">
          <ComponentHeader
            first="Add Campaign details"
            second="Add campaign details and templates to finish."
          />
          <div className="cmp-add-campaign-details-fields-container">
            <FormFields
              leftPlaceholder="Campaign Name"
              rightPlaceholder="Enter Campaign Name"
              name="cmpName"
              onChange={handleInputChange}
              value={data?.cmpName}
            />
            <FormFields
              leftPlaceholder="Subject"
              rightPlaceholder="Add a subject line for this email campaign"
              name="subject"
              onChange={handleInputChange}
              value={data?.subject}
            />
            <FormFields
              leftPlaceholder="Template"
              name="templateId"
              isTemplate
              setPage={setPage}
            />
          </div>
        </div>
        {data && data.template && (
          <div className="cmp-inner-container">
            <ComponentHeader
              first="Personalisation Settings"
              second="Personalise the template by setting default value of attributes"
            />
            <div>
              {data.params &&
                Object.keys(data.params).map((param, index) => (
                  <FormFields
                    key={`param-${index}`}
                    leftPlaceholder={param}
                    rightPlaceholder="Enter Default Value"
                    isRequired={false}
                    onChange={(name, value) =>
                      dispatch(
                        setData({
                          ...data,
                          params: { ...data.params, [param]: value },
                        })
                      )
                    }
                    value={data?.params?.[param]}
                  />
                ))}
            </div>
          </div>
        )}
        <div className="cmp-inner-container">
          <ComponentHeader
            first="Upload Attachments"
            second="Upload Attachments to send with the Campaign"
          />
          <TFUpload onChange={handleFileUpload} isMultiUpload />
          <FileSizeExccedModal />
          {files && files.length > 0 ? (
            <TFFileList
              files={files}
              handleFileCancel={(index) => {
                let filesArray = [...files];
                filesArray?.splice(index, 1);
                dispatch(setFiles(filesArray));
              }}
            />
          ) : null}
          <div style={{ height: "70px", width: "10px" }}></div>
        </div>
      </div>
      <CampaignFooter
        isCollapsed={isCollapsed}
        isLoading={isLoading}
        firstOnChange={(e) => setPage(cmpPages.create_campaign)}
        secondType="submit"
        first="Cancel"
        second="Send Campaign"
      />
    </form>
  );
}

export const CampaignFooter = ({
  isCollapsed,
  isLoading,
  firstOnChange,
  secondOnChange,
  firstType = "button",
  secondType = "button",
  first,
  second,
}) => {
  return (
    <div
      className="cmp-send-campaign-form-footer-container"
      style={{
        width: isCollapsed ? "calc(100vw - 68px)" : "calc(100vw - 228px)",
      }}
    >
      <button type={firstType} onClick={firstOnChange}>
        {first}
      </button>
      <button type={secondType} disabled={isLoading} onClick={secondOnChange}>
        {second}
      </button>
    </div>
  );
};

export const ComponentHeader = ({ first, second }) => {
  return (
    <div className="cmp-componet-header-container">
      <div>
        <p>{first}</p>
      </div>
      <div>
        <p>{second}</p>
      </div>
    </div>
  );
};

export const SendCampaignTopButton = ({ setPage, page }) => {
  return (
    <div className="cmp-send-campaign-top-btn-container">
      <TFIcon
        icon={ICONS.CAMPAIGN_CHEVRON_LEFT}
        alt="campaign-chevron-left"
        onClick={() => setPage(page)}
      />
      <p>Send Campaign</p>
    </div>
  );
};
