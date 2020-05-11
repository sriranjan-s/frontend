import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
let tenant = getQueryArg(window.location.href, "tenantId");

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};
export const citizenSubmitFooter = getCommonApplyFooter({
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Apply",
       // labelKey: "NOC_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
      })
    },
    onClickDefination: {
      action: "page_change",
 //     path:`/fire-noc/citizen-pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=FIRENOC`,
        path: process.env.REACT_APP_SELF_RUNNING === "true"
        ? `/egov-ui-framework/fire-noc/acknowledgement?purpose=apply&status=success&applicationNumber=${applicationNumber}&tenantId=${tenant}`
        : `/fire-noc/acknowledgement?purpose=apply&status=success&applicationNumber=${applicationNumber}&tenantId=${tenant}`, 
    },

    roleDefination: {
      rolePath: "user-info.roles",
      action: "APPLY",
      moduleName:"FIRENOC"
    },  

  //  visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }
});
