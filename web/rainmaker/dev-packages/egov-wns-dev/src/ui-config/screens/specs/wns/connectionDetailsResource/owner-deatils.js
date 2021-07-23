import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel,
  getLabelWithValueForModifiedLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../viewBillResource/footer";
import { handleNA } from '../../utils';
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import set from "lodash/set";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { fetchBill } from "../../../../../ui-utils/commons"

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

export const ownerName = getLabelWithValue(
  {
    labelName: "Name",
    labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
  },
  { jsonPath: "WaterConnection[0].property.owners[0].name" }
)
export const ownerMobileNumber = getLabelWithValue(
  {
    labelName: "Mobile Number",
    labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
  },
  {
    jsonPath:
      "WaterConnection[0].property.owners[0].mobileNumber"
  }
)
export const gender = getLabelWithValue(
  {
    labelName: "Gender",
    labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
  },
  {
    jsonPath: "WaterConnection[0].property.owners[0].gender"
  }
)
export const guardian = getLabelWithValue(
  {
    labelName: "Guardian",
    labelKey: "WS_OWN_DETAIL_GUARDIAN_LABEL"
  },
  { jsonPath: "WaterConnection[0].property.owners[0].relationship" }
)
export const guardianName = getLabelWithValue(
  {
    labelName: "Guardian Name",
    labelKey: "WS_OWN_DETAIL_GUARDIAN_NAME_LABEL"
  },
  {
    jsonPath: "WaterConnection[0].property.owners[0].fatherOrHusbandName",
  }
)
export const ownerCategory = getLabelWithValue(
  {
    labelName: "Owner Category",
    labelKey: "WS_OWN_DETAIL_CATEGORY_LABEL"
  },
  {
    jsonPath: "WaterConnection[0].property.ownershipCategory",
    localePrefix: {
      moduleName: "WS",
      masterName: "OWNERSHIPCATEGORY"
    }
  }
)
export const email = getLabelWithValue(
  {
    labelName: "Email",
    labelKey: "WS_OWNER_DETAILS_EMAIL_LABEL"
  },
  {
    jsonPath: "WaterConnection[0].property.owners[0].emailId"
  }
)
export const correspondenceAddress = getLabelWithValue(
  {
    labelName: "Correspondence Address",
    labelKey: "WS_OWN_DETAIL_CROSADD"
  },
  { jsonPath: "WaterConnection[0].property.owners[0].correspondenceAddress" }
)

export const getOwnerDetails = (isEditable = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelKey: "WS_COMMON_OWN_DETAIL"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    multiOwner: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        scheama: getCommonGrayCard({
          viewFive: getCommonContainer({
            ownerMobileNumber,
            ownerName,
            gender,
            guardian,
            guardianName,
            ownerCategory,
            email,
            correspondenceAddress
          }),
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "WaterConnection[0].property.owners",
        prefixSourceJsonPath: "children.cardContent.children.viewFive.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
}

const holderHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_HOLDER_DETAILS_HEADER",
  labelName: "Connection Holder Details"
})

export const connectionHolderDetails={
  mobileNumber: getLabelWithValueForModifiedLabel(
    {
      labelKey: "WS_CONN_HOLDER_OWN_DETAIL_MOBILE_NO_LABEL"
    },
    { jsonPath: "WaterConnection[0].connectionHolders[0].mobileNumber", callBack: handleNA },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    { jsonPath: "applyScreenOld.connectionHolders[0].mobileNumber", callBack: handleNA }
    
  ),
  name: getLabelWithValueForModifiedLabel(
    {
      labelName: "Name",
      labelKey: "WS_CONN_HOLDER_OWN_DETAIL_OWN_NAME_LABEL"
    },
    { jsonPath: "WaterConnection[0].connectionHolders[0].name", callBack: handleNA },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    { jsonPath: "applyScreenOld.connectionHolders[0].name", callBack: handleNA }
    
  ),
  gender: getLabelWithValueForModifiedLabel(
    {
      labelKey: "WS_CONN_HOLDER_OWN_DETAIL_GENDER_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].connectionHolders[0].gender",
      callBack: handleNA,
      localePrefix: {
        moduleName: "COMMON",
        masterName: "GENDER"
      }
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "applyScreenOld.connectionHolders[0].gender",
      callBack: handleNA,
      localePrefix: {
        moduleName: "COMMON",
        masterName: "GENDER"
      }
    },
  ),
  fatherName: getLabelWithValueForModifiedLabel(
    {
      labelKey: "WS_CONN_HOLDER_COMMON_FATHER_OR_HUSBAND_NAME"
    },
    { jsonPath: "WaterConnection[0].connectionHolders[0].fatherOrHusbandName", callBack: handleNA },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    { jsonPath: "applyScreenOld.connectionHolders[0].fatherOrHusbandName", callBack: handleNA }
  ),
  relationship: getLabelWithValueForModifiedLabel(
    {
      labelKey: "WS_CONN_HOLDER_OWN_DETAIL_RELATION_LABEL"
    },
    { jsonPath: "WaterConnection[0].connectionHolders[0].relationship", callBack: handleNA },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    { jsonPath: "applyScreenOld.connectionHolders[0].relationship", callBack: handleNA }
  ),
  correspondenceAddress: getLabelWithValueForModifiedLabel(
    {
      labelKey: "WS_CONN_HOLDER_OWN_DETAIL_CROSADD"
    },
    {
      jsonPath: "WaterConnection[0].connectionHolders[0].correspondenceAddress",
      callBack: handleNA
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "applyScreenOld.connectionHolders[0].correspondenceAddress",
      callBack: handleNA
    }
  ),
  specialApplicantCategory: getLabelWithValueForModifiedLabel(
    {
      labelKey: "WS_CONN_HOLDER_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].connectionHolders[0].ownerType",
      callBack: handleNA
    },
    {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "applyScreenOld.connectionHolders[0].ownerType",
      callBack: handleNA
    }
  )
};

export const onClickOwnerShipTransfer = async (state, dispatch) => {
  let applicationNo = state.screenConfiguration.preparedFinalObject.WaterConnection[0].applicationNo
  let connectionNumber = getQueryArg(window.location.href, "connectionNumber");
  const service = getQueryArg(window.location.href, "service");
  const tenantId = getQueryArg(window.location.href, "tenantId");
 
    let due
    let fetchBillQueryObj = []
    if(applicationNo.includes('SW')){
      fetchBillQueryObj = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: connectionNumber }, { key: "businessService", value: "SW" }]
    }else{
      fetchBillQueryObj = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: connectionNumber }, { key: "businessService", value: "WS" }]
    }
    let billResults = await fetchBill(fetchBillQueryObj)
    billResults && billResults.Bill &&Array.isArray(billResults.Bill)&&billResults.Bill.length>0 && billResults.Bill.map(bill => {
      due = bill.totalAmount
    })
    let errLabel =
      applicationNo && applicationNo.includes("WS")
        ? "WS_PENDING_FEES_ERROR"
        : "WS_PENDING_FEES_ERROR";
    if (due && parseInt(due) > 0) {
      dispatch(toggleSnackbarAndSetText(
        true,
        {
          labelName: "Due Amount should be zero!",
          labelKey: errLabel,
        },
        "error"
      ));
      return false;
    }  

  set(
    "apply",
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.visible",
    false
  );

  dispatch(
    setRoute(
      `/wns/apply?applicationNumber=${applicationNo}&connectionNumber=${connectionNumber}&tenantId=${tenantId}&action=edit&mode=ownershipTransfer`
    )
  );
}

export const connHolderDetailsSummary = () => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 12
          },
          ...getCommonContainer({
            header:getCommonSubHeader({
              labelKey: "WS_COMMON_CONNECTION_HOLDER_DETAILS_HEADER",
              labelName: "Connection Holder Details",
              gridDefination: {
                xs: 2,
                sm: 2,
                align: "left"
              },
            }),
            // buttonContainer: getCommonContainer({
              searchButton: {
                componentPath: "Button",
                gridDefination: {
                  xs: 12,
                  sm: 12,
                  align: "right"
                },
                visible:false,
                props: {
                  variant: "contained",
                  style: {
                    color: "white",
                    margin: "8px",
                    backgroundColor: "rgb(254, 122, 81)",
                    borderRadius: "2px",
                    width: "220px",
                    height: "48px",
                    marginTop:'-27px'
                  },
                  
                },
                children: {
                  buttonLabel: getLabel({
                    labelKey: "WS_OWNERSHIP_TRANSFER"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: onClickOwnerShipTransfer
                }
              },
            })
          // })
        }
      }
    },
    connHoldDetail: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        scheama: getCommonGrayCard({
          viewFive: getCommonContainer(connectionHolderDetails),
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "WaterConnection[0].connectionHolders",
        prefixSourceJsonPath: "children.cardContent.children.connHoldDetail.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
}


export const connectionHolderSameAsOwnerDetails={
 sameAsOwnerDetails : getLabelWithValue(
    {
      labelKey: "WS_CONN_HOLDER_SAME_AS_OWNER_DETAILS"
    },
    { jsonPath: "WaterConnection[0].sameAsPropertyAddress" }
  )
} 

export const connHolderDetailsSameAsOwnerSummary = () => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelKey: "WS_COMMON_CONNECTION_HOLDER_DETAILS_HEADER",
            labelName: "Connection Holder Details"
          })
        }
      }
    },
    connHoldDetail: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        scheama: getCommonGrayCard({
          sameAsOwnerDetails:getCommonContainer(connectionHolderSameAsOwnerDetails),
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "WaterConnection[0].sameAsPropertyAddress",
        prefixSourceJsonPath: "children.cardContent.children.sameAsOwnerDetails.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
}

