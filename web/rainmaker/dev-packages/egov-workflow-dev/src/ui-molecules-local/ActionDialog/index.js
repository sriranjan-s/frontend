import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";
import { Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { UploadMultipleFiles } from "egov-ui-framework/ui-molecules";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";


const styles = theme => ({
  root: {
    marginTop: 24,
    width: "100%"
  }
});

const fieldConfig = {
  approverName: {
    label: {
      labelName: "Assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_LABEL"
    },
    placeholder: {
      labelName: "Select assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_PLACEHOLDER"
    }
  },
  comments: {
    label: {
      labelName: "Comments",
      labelKey: "WF_COMMON_COMMENTS"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "WF_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    }
  },
  reworkReason: {
    label: {
      labelName: "Rework reason",
      labelKey: "WF_REWORK_REASON_LABEL"
    },
    placeholder: {
      labelName: "Select rework reason",
      labelKey: "WF_REWORK_REASON_PLACEHOLDER"
    }
  },
};

class ActionDialog extends React.Component {
  state = {
    employeeList: [],
    roles: "",
    isSelectedOtherOption: false,
    reworkReasonValue: ""
  };

  // onEmployeeClick = e => {
  //   const { handleFieldChange, toggleSnackbar } = this.props;
  //   const selectedValue = e.target.value;
  //   const currentUser = JSON.parse(getUserInfo()).uuid;
  //   if (selectedValue === currentUser) {
  //     toggleSnackbar(
  //       true,
  //       "Please mark to different Employee !",
  //       "error"
  //     );
  //   } else {
  //     handleFieldChange("Licenses[0].assignee", e.target.value);
  //   }
  // };

  getButtonLabelName = label => {
    switch (label) {
      case "FORWARD":
        return "Verify and Forward";
      case "MARK":
        return "Mark";
      case "REJECT":
        return "Reject";
      case "CANCEL":
      case "APPROVE":
        return "APPROVE";
      case "PAY":
        return "Pay";
      case "SENDBACK":
        return "Send Back";
      default:
        return label;
    }
  };

  setBPAReworkReason = (value) => {
    let {
      
      handleFieldChange,
      
      dataPath
    } = this.props;
    console.log(value, "Nero Event");
    if(value === "Write other reason"){
      this.setState({isSelectedOtherOption: true})
    }else{
      this.setState({isSelectedOtherOption: false})
    }
      
    handleFieldChange(
      `${dataPath}.workflow.comment`,
      value
    )
    this.setState({reworkReasonValue: value})

  }
  render() {

    let {
      open,
      onClose,
      dropDownData,
      handleFieldChange,
      onButtonClick,
      dialogData,
      dataPath
    } = this.props;
    const {
      buttonLabel,
      showEmployeeList,
      dialogHeader,
      moduleName,
      isDocRequired
    } = dialogData;
    const { getButtonLabelName } = this;
    let fullscreen = false;
    let showAssignee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
    if (window.innerWidth <= 768) {
      fullscreen = true;
    }
    if (dataPath === "FireNOCs") {
      dataPath = `${dataPath}[0].fireNOCDetails.additionalDetail`
    } else if (dataPath === "Assessment"||dataPath === "Property" || dataPath === "BPA" || dataPath === "Noc") {
      dataPath = `${dataPath}.workflow`;
    } else {
      dataPath = `${dataPath}[0]`;
    }
    let assigneePath= '';
    /* The path for Assignee in Property and Assessment has latest workflow contract and it is Array of user object  */
    if (dataPath.includes("Assessment")||dataPath.includes("Property")){
      assigneePath=`${dataPath}.assignes[0].uuid`;
    }else{
      assigneePath=`${dataPath}.assignee[0]`;
    }

    let wfDocumentsPath;
    if(dataPath === "BPA.workflow") {
      wfDocumentsPath = `${dataPath}.varificationDocuments`
    } else if (dataPath === "Noc.workflow") {
      wfDocumentsPath = `${dataPath}.documents`
    } else {
      wfDocumentsPath = `${dataPath}.wfDocuments`
    }
    
    var isBPARework = false;
    
    if(dataPath === "BPA.workflow" && buttonLabel == "SENDBACK_TO_ARCHITECT_FOR_REWORK"){
      isBPARework = true;
      showAssignee = false;
    }
    return (

      
      <Dialog
        fullScreen={fullscreen}
        open={open}
        onClose={onClose}
        maxWidth={false}
        style={{zIndex:2000}}
      >
        <DialogContent
          children={
            <Container
              children={
                <Grid
                  container="true"
                  spacing={12}
                  marginTop={16}
                  className="action-container"
                >
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer {...dialogHeader} />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    style={{
                      textAlign: "right",
                      cursor: "pointer",
                      position: "absolute",
                      right: "16px",
                      top: "16px"
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </Grid>
                  {(()=>{
                    if(isBPARework){
                     return <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                     <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px" }}
                        label={fieldConfig.reworkReason.label}
                        placeholder={fieldConfig.reworkReason.placeholder}
                        data={[{label: "Plot is being affected by CDP road/drain", value:"Plot is being affected by CDP road/drain"},
                         {label: "Plot and road details are not matching with site inspection", value:"Plot and road details are not matching with site inspection"},
                        {label: "Plot is being affected by road widening", value:"Plot is being affected by road widening"},
                         
                          {label: "Write other reason", value:"Write other reason"}]}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        
                        onChange={e =>
                          this.setBPAReworkReason(e.target.value)
                        }
                        
                       value={this.state.reworkReasonValue}
                      />
                    </Grid>
                    }
                  })()}
                  {showEmployeeList && showAssignee && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={dropDownData}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>
                          handleFieldChange(
                            assigneePath,
                            e.target.value
                          )
                        }
                        jsonPath={assigneePath}
                      />
                    </Grid>
                  )}
                  <Grid item sm="12">
                    {(()=>{
                      if(!this.state.isSelectedOtherOption){

                      }else {
                      return  <TextFieldContainer
                          InputLabelProps={{ shrink: true }}
                          label={fieldConfig.comments.label}
                          onChange={e =>
                            handleFieldChange(`${dataPath}.comment`, e.target.value)
                          }
                          multiline={true}
                          rows='5'
                          jsonPath={`${dataPath}.comment`}
                          placeholder={fieldConfig.comments.placeholder}
                        />
                      }
                    })()}
                    
                  </Grid>
                  <Grid item sm="12">
                    <Typography
                      component="h3"
                      variant="subheading"
                      style={{
                        color: "rgba(0, 0, 0, 0.8700000047683716)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        marginBottom: "8px"
                      }}
                    >
                      <div className="rainmaker-displayInline">
                      {(()=>{
                        if(moduleName === "MR"){

                        }else if(isBPARework){

                        }else{
                        return  <LabelContainer
                          labelName="Supporting Documents"
                          labelKey="WF_APPROVAL_UPLOAD_HEAD"
                        />
                        }
                      })()}  
                      {/* {moduleName != "MR"?
                        <LabelContainer
                          labelName="Supporting Documents"
                          labelKey="WF_APPROVAL_UPLOAD_HEAD"
                        />: ''} */}
                        {isDocRequired && (
                          <span style={{ marginLeft: 5, color: "red" }}>*</span>
                        )}
                      </div>
                    </Typography>
                    <div
                      style={{
                        color: "rgba(0, 0, 0, 0.60)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px"
                      }}
                    >
                      {(()=>{
                        if(moduleName === "MR"){

                        }else if(isBPARework){

                        }else{
                        return  <LabelContainer
                        labelName="Only .jpg and .pdf files. 5MB max file size."
                        labelKey="WF_APPROVAL_UPLOAD_SUBHEAD"
                      />
                        }
                      })()}
                      {/* {moduleName != "MR" ?
                      <LabelContainer
                        labelName="Only .jpg and .pdf files. 5MB max file size."
                        labelKey="WF_APPROVAL_UPLOAD_SUBHEAD"
                      />: ""} */}
                    </div>
                    {(()=>{
                        if(moduleName === "MR"){

                        }else if(isBPARework){

                        }else{
                        return  <UploadMultipleFiles
                          maxFiles={4}
                          inputProps={{
                            accept: "image/*, .pdf, .png, .jpeg"
                          }}
                          buttonLabel={{ labelName: "UPLOAD FILES",labelKey : "TL_UPLOAD_FILES_BUTTON" }}
                          jsonPath={wfDocumentsPath}
                          maxFileSize={5000}
                        />
                        }
                      })()}
                    {/* {moduleName != "MR" ?
                    <UploadMultipleFiles
                      maxFiles={4}
                      inputProps={{
                        accept: "image/*, .pdf, .png, .jpeg"
                      }}
                      buttonLabel={{ labelName: "UPLOAD FILES",labelKey : "TL_UPLOAD_FILES_BUTTON" }}
                      jsonPath={wfDocumentsPath}
                      maxFileSize={5000}
                    />:""} */}
                    <Grid sm={12} style={{ textAlign: "right" }} className="bottom-button-container">
                      <Button
                        variant={"contained"}
                        color={"primary"}
                        style={{
                          minWidth: "200px",
                          height: "48px"
                        }}
                        className="bottom-button"
                        onClick={() =>
                          onButtonClick(buttonLabel, isDocRequired)
                        }
                      >
                        <LabelContainer
                          labelName={getButtonLabelName(buttonLabel)}
                          labelKey={
                            moduleName
                              ? `WF_${moduleName.toUpperCase()}_${buttonLabel}`
                              : ""
                          }
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }
            />
          }
        />
      </Dialog>
        
    );
  }
}
export default withStyles(styles)(ActionDialog);
