import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabelWithValueForModifiedLabel,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { convertEpochToDateAndHandleNA, handleNA, handleLaborCharge, handleInstallementorFullPayment, handleVolumetricWaterCharge, handleRoadType, convertEpochToDateAndHandleBlank, handleIsVolumetric, handleIsDailyConsumption } from "../../utils";
import { serviceConst } from "../../../../../ui-utils/commons";
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

const connectionDetailsHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_DETAILS"
});

const connectionChargeDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PLUMBER_DETAILS"
});

const roadCuttingChargesHeader = getHeader({
  labelKey: "WS_ROAD_CUTTING_CHARGE_DETAILS"
});

const activationDetailsHeader = getHeader({
  labelKey: "WS_ACTIVATION_DETAILS"
});

const paymentDetailsHeader = getHeader({
  labelKey:"WS_PAYMENT_DETAILS"
})

const ScrutinyFeeDetailsHeader = getHeader({
  labelKey:"Scrutiny Fee Payment Details"
})


const volumetricDetailsHeader = getHeader({
  labelKey : "WS_VOLUMETRIC_DETAILS"
})

export const getReviewOwner = (isEditable = true) => {
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
            labelName: "Additional Details ( To be filled by Municipal Employee)",
            labelKey: "WS_COMMON_ADDN_DETAILS_HEADER"
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
              changeStep(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails
    viewFive: connectionDetailsHeader,
    viewSixWS: renderServiceForWater(),
    viewSixVS: renderServiceForSW(),
    viewSixBoth: renderServiceForBoth(),
    // viewSix: connectionDetails,
    viewSeven: connectionChargeDetailsHeader,
    viewEight: connectionChargeDetails,
    // viewNine: roadCuttingChargesHeader,
    // viewTen: roadCuttingCharges,
    viewEleven: activationDetailsHeader,
    viewTwelve: activationDetails,
    viewFifteen : volumetricDetailsHeader,
    viewSixteen : volumetricDetails,
    viewThirdTeen : paymentDetailsHeader,
    viewFourTeen : paymentDetails,
   // view16th : ScrutinyFeeDetailsHeader,
   // view17th : ScrutinyFeeDetails

  })
};



export const plumberDetails={
  reviewPlumberProvidedBy : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber provided by",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.detailsProvidedBy",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.detailsProvidedBy",
      // callBack: handleNA
    }
  ),
  reviewPlumberLicenseNo : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber licence No",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].plumberInfo[0].licenseNo",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].plumberInfo[0].licenseNo",
      // callBack: handleNA
    }
  ),
  reviewPlumberName : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber Name",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
    },
    { jsonPath: "WaterConnection[0].plumberInfo[0].name",
      // callBack: handleNA 
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
      },
      { jsonPath: "WaterConnectionOld[0].plumberInfo[0].name",
      // callBack: handleNA 
    }
  ),
  reviewPlumberMobileNo : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber mobile No.",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
    },
    { jsonPath: "WaterConnection[0].plumberInfo[0].mobileNumber",
      // callBack: handleNA 
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
      },
      { jsonPath: "WaterConnectionOld[0].plumberInfo[0].mobileNumber",
      // callBack: handleNA 
    }
  )


}
const connectionChargeDetails = getCommonContainer(plumberDetails);

export const roadDetails = {
  reviewRoadType: getLabelWithValue(
    {
      labelName: "Road Type",
      labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].roadCuttingInfo[0].roadType",
      callBack: handleRoadType
    }
  ),
  reviewArea: getLabelWithValue(
    {
      labelName: "Area (in sq ft)",
      labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].roadCuttingInfo[0].roadCuttingArea",
      callBack: handleNA
    }
  )
}
export const roadCuttingCharges = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "applicant-summary",
    scheama: getCommonContainer(roadDetails),
    items: [],
    hasAddItem: false,
    moduleName : 'WNS',
    isReviewPage: true,
    sourceJsonPath: "WaterConnection[0].roadCuttingInfo",
    prefixSourceJsonPath: "children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

export const activateDetailsMeter={
  reviewConnectionExecutionDate : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Execution Date",
      labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
    },
    {
      jsonPath: "WaterConnection[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleBlank
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleBlank
    }
  ),
  reviewDiameter : getLabelWithValueForModifiedLabel(
    {
      labelName: "Diameter",
      labelKey: "WS_CONN_DETAIL_DIAMETER"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.diameter",
      // callBack: handleNA
    }, {
      labelKey: "WS_CONN_DETAIL_DIAMETER"
    },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.diameter",
      // callBack: handleNA
    }
  ),
  reviewMeterId : getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter ID",
      labelKey: "WS_SERV_DETAIL_METER_ID"
    },
    { jsonPath: "WaterConnection[0].meterId",
      // callBack: handleNA 
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
      },
      { jsonPath: "WaterConnectionOld[0].meterId",
      // callBack: handleNA 
    }
  ),
  reviewMeterInstallationDate : getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter Installation Date",
      labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE"
    },
    {
      jsonPath: "WaterConnection[0].meterInstallationDate",
      callBack: convertEpochToDateAndHandleBlank
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].meterInstallationDate",
      callBack: convertEpochToDateAndHandleBlank
    }
  ),
  reviewInitialMeterReading : getLabelWithValueForModifiedLabel(
    {
      labelName: "Initial Meter Reading",
      labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.initialMeterReading",
      // callBack: handleNA 
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.initialMeterReading",
      // callBack: handleNA 
    }
  ),
  reviewMeterMake : getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter Make",
      labelKey: "WS_ADDN_DETAILS_METER_MAKE"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.meterMake",
      // callBack: handleNA 
    }, {
        labelKey: "Meter Make"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.meterMake",
      // callBack: handleNA 
    }
  ),
  reviewMeterRatio : getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter Ratio",
      labelKey: "WS_ADDN_DETAILS_METER_RATIO"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.meterReadingRatio",
      // callBack: handleNA
     }, {
        labelKey: "WS_ADDN_DETAILS_METER_RATIO"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.meterReadingRatio",
      // callBack: handleNA
     }
  ),
  reviewMaxMeterDigits : getLabelWithValueForModifiedLabel(
    {
      labelName: "WS_ADDN_DETAILS_MAX_METER_DIGITS_REVIEW_LABEL",
      labelKey: "WS_ADDN_DETAILS_MAX_METER_DIGITS_REVIEW_LABEL"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.maxMeterDigits",
      // callBack: handleNA 
    }, {
        labelKey: "WS_ADDN_DETAILS_MAX_METER_DIGITS_REVIEW_LABEL"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.maxMeterDigits",
      // callBack: handleNA 
    }
  )
}

// export const scrutinyDetails = {
//   reviewScrutinyFeeInstallmentApplicable: getLabelWithValue(
//     {
//       labelName: "WS_SCRUTINY_INSTALLMENT_APPLICABLE_LABEL",
//       labelKey: "Scrutiny Fee Installment Applicable"
//     },
//     {
//       jsonPath: "WaterConnection[0].additionalDetails.isInstallmentApplicableForScrutinyFee",
//       callBack: handleNA
//     }
//   ),
//   reviewScrutinyFeeTotalAmount: getLabelWithValue(
//     {
//       labelName: "WS_SCRUTINY_FEE_TOTAL_AMOUNT_LABEL",
//       labelKey: "Scrutiny Fee Total Amount in Rs."
//     },
//     {
//       jsonPath: "WaterConnection[0].additionalDetails.scrutinyFeeTotalAmount",
//       callBack: handleNA
//     }
//   ),
//   reviewScrutinyFeeNoOfInstallments: getLabelWithValue(
//     {
//       labelName: "WS_SCRUTINY_NO_OF_INSTALLMENTS_LABEL",
//       labelKey: "Scrutiny Fee No of Installments"
//     },
//     {
//       jsonPath: "WaterConnection[0].additionalDetails.noOfScrutinyFeeInstallments",
//       callBack: handleNA
//     }
//   ),
//   reviewScrutinyFeeInstallmentAmount: getLabelWithValue(
//     {
//       labelName: "Area (in sq ft)",
//       labelKey: "Scrutiny Fee Installment Amount in Rs."
//     },
//     {
//       jsonPath: "WaterConnection[0].additionalDetails.scrutinyFeeInstallmentAmount",
//       callBack: handleNA
//     }
//   ),
// }

export const paymentDetailsMeter = {
  reviewLaborCharge : getLabelWithValueForModifiedLabel(
    {
      labelName: "WS_LABOUR_FEE",
      labelKey: "WS_LABOUR_FEE"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.isLabourFeeApplicable",
      callBack: handleLaborCharge
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.isLabourFeeApplicable",
      callBack: handleLaborCharge 
    }
  ),
  reviewLabourFeeTotalAmount: getLabelWithValue(
    {
      labelName: "Labour Fee Total Amount in Rs.",
      labelKey: "WS_LABOUR_FEE_TOTAL_AMOUNT_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.totalAmount",
      callBack: handleNA
    }
  ),
  reviewInstallment : getLabelWithValueForModifiedLabel(
    {
      labelName: "WS_FULL_PAYMENT_OR_INSTALLMENT",
      labelKey: "WS_FULL_PAYMENT_OR_INSTALLMENT"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.isInstallmentApplicable",
      callBack: handleInstallementorFullPayment 
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.isInstallmentApplicable",
      callBack: handleInstallementorFullPayment 
    }
  ),

  reviewNoOfInstallment: getLabelWithValue(
    {
      labelName: "Labour Fee No Of Installments",
      labelKey: "WS_LABOUR_FEE_NO_OF_INSTALLMENT_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.noOfLabourFeeInstallments",
      callBack: handleNA
    }
  ),
  reviewLabourFeeInstallmentAmount: getLabelWithValue(
    {
      labelName: "Labour Fee Installment Amount in Rs.",
      labelKey: "WS_LABOUR_FEE_INSTALLMENT_AMOUNT_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.labourFeeInstallmentAmount",
      callBack: handleNA
    }
  ),
  reviewScrutinyFeeInstallmentApplicable: getLabelWithValue(
    {
      labelName: "Scrutiny Fee Installment Applicable",
      labelKey: "WS_SCRUTINY_INSTALLMENT_APPLICABLE_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.isInstallmentApplicableForScrutinyFee",
      callBack: handleNA
    }
  ),
  reviewScrutinyFeeTotalAmount: getLabelWithValue(
    {
      labelName: "Scrutiny Fee Total Amount in Rs.",
      labelKey: "WS_SCRUTINY_FEE_TOTAL_AMOUNT_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.scrutinyFeeTotalAmount",
      callBack: handleNA
    }
  ),
  reviewScrutinyFeeNoOfInstallments: getLabelWithValue(
    {
      labelName: "Scrutiny Fee No of Installments",
      labelKey: "WS_SCRUTINY_NO_OF_INSTALLMENTS_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.noOfScrutinyFeeInstallments",
      callBack: handleNA
    }
  ),
  reviewScrutinyFeeInstallmentAmount: getLabelWithValue(
    {
      labelName: "Scrutiny Fee Installment Amount in Rs.",
      labelKey: "WS_SCRUTINY_FEE_INSTALLMENT_AMOUNT_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.scrutinyFeeInstallmentAmount",
      callBack: handleNA
    }
  )
  

}

export const volumetricDetailsWater = {
  reviewVolumetricConnection : getLabelWithValueForModifiedLabel(
    {
      labelName: "WS_IS_VOLUMETRIC_CONNECTION",
      labelKey: "WS_IS_VOLUMETRIC_CONNECTION"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.isVolumetricConnection",
      callBack: handleIsVolumetric
    }, {
        labelKey: "WS_IS_VOLUMETRIC_CONNECTION"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.isVolumetricConnection",
      callBack: handleIsVolumetric 
    }
  ),
  reviewVolumetricWaterCharge : getLabelWithValueForModifiedLabel(
    {
      labelName: "WS_VOLUMETRIC_CHARGE",
      labelKey: "WS_VOLUMETRIC_CHARGE"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.volumetricWaterCharge",
      callBack: handleVolumetricWaterCharge 
    }, {
        labelKey: "WS_VOLUMETRIC_CHARGE"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.volumetricWaterCharge",
      callBack: handleVolumetricWaterCharge 
    }
  ),
  reviewIsDailyConsumption : getLabelWithValueForModifiedLabel(
    {
      labelName: "WS_IS_DAILY_OR_MONTHLY_COMSUMPTION",
      labelKey: "WS_IS_DAILY_OR_MONTHLY_COMSUMPTION"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.isDailyConsumption",
      callBack: handleIsDailyConsumption
    }, {
        labelKey: "WS_IS_DAILY_OR_MONTHLY_COMSUMPTION"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.isDailyConsumption",
      callBack: handleIsDailyConsumption 
    }
  ),
  reviewVolumetricConsumtion : getLabelWithValueForModifiedLabel(
    {
      labelName: "WS_VOLUMETRIC_CONSUMPTION_IN_KL",
      labelKey: "WS_VOLUMETRIC_CONSUMPTION_IN_KL"
    },
    { jsonPath: "WaterConnection[0].additionalDetails.volumetricConsumtion",
    }, {
        labelKey: "WS_VOLUMETRIC_CONSUMPTION_IN_KL"
      },
      { jsonPath: "WaterConnectionOld[0].additionalDetails.volumetricConsumtion",
    }
  ),

}

export const activateDetailsNonMeter={
  reviewConnectionExecutionDate : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Execution Date",
      labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
    },
    {
      jsonPath: "WaterConnection[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }
  ),
  reviewDiameter : getLabelWithValueForModifiedLabel(
    {
      labelName: "Diameter",
      labelKey: "WS_CONN_DETAIL_DIAMETER"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.diameter",
      callBack: handleNA
    }, {
      labelKey: "WS_CONN_DETAIL_DIAMETER"
    },
    {
      jsonPath: "WaterConnectionOld[0].additionalDetails.diameter",
      callBack: handleNA
    }
  ),
}
const activationDetails = getCommonContainer(activateDetailsMeter);

const paymentDetails = getCommonContainer(paymentDetailsMeter)

const volumetricDetails = getCommonContainer(volumetricDetailsWater);
 
//const ScrutinyFeeDetails = getCommonContainer(scrutinyDetails)

export const connectionWater={
  reviewConnectionType : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Type",
      labelKey: "WS_SERV_DETAIL_CONN_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].connectionType",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].connectionType",
      callBack: handleNA
    }
  ),
  reviewNumberOfTaps : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Taps",
      labelKey: "WS_SERV_DETAIL_NO_OF_TAPS"
    },
    {
      jsonPath: "WaterConnection[0].noOfTaps",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].noOfTaps",
      // callBack: handleNA
    }
  ),
  reviewWaterSource : getLabelWithValueForModifiedLabel(
    {
      labelName: "Water Source",
      labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
    },
    {
      jsonPath: "WaterConnection[0].waterSource",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].waterSource",
      // callBack: handleNA
    }
  ),
  reviewWaterSubSource : getLabelWithValueForModifiedLabel(
    {
      labelName: "Water Sub Source",
      labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
    },
    {
      jsonPath: "WaterConnection[0].waterSubSource",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].waterSubSource",
      // callBack: handleNA
    }
  ),
  //  reviewPipeSize : getLabelWithValueForModifiedLabel(
  //   {
  //     labelName: "Pipe Size (in inches)",
  //     labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
  //   },
  //   {
  //     jsonPath: "SewerageConnection[0].pipeSize",
  //     callBack: handleNA
  //   }, {
  //     labelKey: "WS_OLD_LABEL_NAME"
  //   },
  //   {
  //     jsonPath: "SewerageConnectionOld[0].pipeSize",
  //     callBack: handleNA
  //   }
  // )


}

export const connectionSewerage={
  reviewConnectionType : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Type",
      labelKey: "WS_SERV_DETAIL_CONN_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].connectionType",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].connectionType",
      callBack: handleNA
    }
  ),
   reviewWaterClosets : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Water Closets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfWaterClosets",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].noOfWaterClosets",
      // callBack: handleNA
    }
  ),
   reviewNoOfToilets : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Toilets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfToilets",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].noOfToilets",
      // callBack: handleNA
    }
  ),
  reviewPipeSize : getLabelWithValueForModifiedLabel(
    {
      labelName: "Pipe Size (in inches)",
      labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
    },
    {
      jsonPath: "WaterConnection[0].pipeSize",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].pipeSize",
      // callBack: handleNA
    }
  )
}

export const connectionBoth = {
  reviewConnectionType : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Type",
      labelKey: "WS_SERV_DETAIL_CONN_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].connectionType",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].connectionType",
      callBack: handleNA
    }
  ),
   reviewWaterClosets : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Water Closets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfWaterClosets",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].noOfWaterClosets",
      // callBack: handleNA
    }
  ),
   reviewNoOfToilets : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Toilets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfToilets",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].noOfToilets",
      // callBack: handleNA
    }
  ),
  reviewPipeSize : getLabelWithValueForModifiedLabel(
    {
      labelName: "Pipe Size (in inches)",
      labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
    },
    {
      jsonPath: "WaterConnection[0].pipeSize",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].pipeSize",
      // callBack: handleNA
    }
  ),
  reviewNumberOfTaps : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Taps",
      labelKey: "WS_SERV_DETAIL_NO_OF_TAPS"
    },
    {
      jsonPath: "WaterConnection[0].noOfTaps",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].noOfTaps",
      // callBack: handleNA
    }
  ),
  reviewWaterSource : getLabelWithValueForModifiedLabel(
    {
      labelName: "Water Source",
      labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
    },
    {
      jsonPath: "WaterConnection[0].waterSource",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].waterSource",
      // callBack: handleNA
    }
  ),
  reviewWaterSubSource : getLabelWithValueForModifiedLabel(
    {
      labelName: "Water Sub Source",
      labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
    },
    {
      jsonPath: "WaterConnection[0].waterSubSource",
      // callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].waterSubSource",
      // callBack: handleNA
    }
  )
}

export const additionDetailsWater=connectionWater;

export const additionDetailsSewerage=connectionSewerage;

export const renderService = () => {
  let isService = getQueryArg(window.location.href, "service");
  if (isService === serviceConst.WATER) {
    return getCommonContainer(connectionWater);
  } else if (isService === serviceConst.SEWERAGE) {
    return getCommonContainer(connectionSewerage)
  }
}

export const renderServiceForWater = () => {
  return getCommonContainer(connectionWater);
}

export const renderServiceForSW = () => {
  return getCommonContainer(connectionSewerage)
}

export const renderServiceForBoth = () => {
  return getCommonContainer(connectionBoth)
}