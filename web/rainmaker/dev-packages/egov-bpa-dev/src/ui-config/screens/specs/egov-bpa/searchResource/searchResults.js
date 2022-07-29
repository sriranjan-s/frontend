import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import {
  sortByEpoch,
  getEpochForDate,
  getBpaTextToLocalMapping
} from "../../utils";
import {
  getLocalization,
  getTenantId
} from "egov-ui-kit/utils/localStorageUtils";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";
import store from "ui-redux/store";
import {
  toggleSnackbar,
  handleScreenConfigurationFieldChange as handleField,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
//import { getAppSearchResults } from "../../../../ui-utils/commons";
import { getAppSearchResults } from "../../../../../ui-utils/commons"
import { getFileUrlFromAPI, getFileUrl } from "egov-ui-framework/ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";


const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};

export const textToLocalMapping = {
  "Application No": getLocaleLabels(
    "Application No",
    "NOC_COMMON_TABLE_COL_APP_NO_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "NOC No": getLocaleLabels(
    "NOC No",
    "NOC_COMMON_TABLE_COL_NOC_NO_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "NOC Type": getLocaleLabels(
    "NOC Type",
    "NOC_TYPE_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Owner Name": getLocaleLabels(
    "Owner Name",
    "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  "Application Date": getLocaleLabels(
    "Application Date",
    "BPA_COMMON_TABLE_COL_APP_DATE_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  Status: getLocaleLabels(
    "Status",
    "BPA_COMMON_TABLE_COL_STATUS_LABEL",
    getTransformedLocalStorgaeLabels()
  ),
  INITIATED: getLocaleLabels(
    "Initiated,",
    "NOC_INITIATED",
    getTransformedLocalStorgaeLabels()
  ),
  APPLIED: getLocaleLabels(
    "Applied",
    "NOC_APPLIED",
    getTransformedLocalStorgaeLabels()
  ),
  DOCUMENTVERIFY: getLocaleLabels(
    "Pending for Document Verification",
    "WF_FIRENOC_DOCUMENTVERIFY",
    getTransformedLocalStorgaeLabels()
  ),
  APPROVED: getLocaleLabels(
    "Approved",
    "NOC_APPROVED",
    getTransformedLocalStorgaeLabels()
  ),
  REJECTED: getLocaleLabels(
    "Rejected",
    "NOC_REJECTED",
    getTransformedLocalStorgaeLabels()
  ),
  CANCELLED: getLocaleLabels(
    "Cancelled",
    "NOC_CANCELLED",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGAPPROVAL: getLocaleLabels(
    "Pending for Approval",
    "WF_FIRENOC_PENDINGAPPROVAL",
    getTransformedLocalStorgaeLabels()
  ),
  PENDINGPAYMENT: getLocaleLabels(
    "Pending payment",
    "WF_FIRENOC_PENDINGPAYMENT",
    getTransformedLocalStorgaeLabels()
  ),
  FIELDINSPECTION: getLocaleLabels(
    "Pending for Field Inspection",
    "WF_FIRENOC_FIELDINSPECTION",
    getTransformedLocalStorgaeLabels()
  ),
  "Search Results for BPA Applications": getLocaleLabels(
    "Search Results for BPA Applications",
    "BPA_HOME_SEARCH_RESULTS_TABLE_HEADING",
    getTransformedLocalStorgaeLabels()
  )
};

export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        name: "Application No", labelKey: "BPA_COMMON_TABLE_COL_APP_NO"
      },
      {
        name: "Owner Name", labelKey: "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL", options: {
          display: false
        }
      },
      {
        name: "Application Date", labelKey: "BPA_COMMON_TABLE_COL_APP_DATE_LABEL"
      },
      {
        name: "Status", labelKey: "BPA_COMMON_TABLE_COL_STATUS_LABEL",
        options: {
          filter: false,
          customBodyRender: value => (
            <span
              style={
                value === "Approved" ? { color: "green" } : { color: "red" }
              }
            >
              {value}
            </span>
          )
        }
      },
      {
        name: "Tenant Id",
        labelKey: "TENANT_ID",
        options: {
          display: false
        }
      },
      {
        name: "serviceType",
        labelKey: "SERVICE_TYPE",
        options: {
          display: false
        }
      }
    ],
    title: { labelKey: "BPA_HOME_SEARCH_RESULTS_TABLE_HEADING", labelName: "Search Results for BPA Applications"},
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      viewColumns: false,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClick(row);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

const onRowClick = rowData => {
  const state = rowData[3];
  const applicationNumber = rowData[0];
  const tenantId = rowData[4];
  const environment = process.env.NODE_ENV === "production" ? "employee" : "";
  const origin =  process.env.NODE_ENV === "production" ? window.location.origin + "/" : window.location.origin;
  if(rowData[5] == "BPA_OC" || rowData[5] == "BPA_OC1" || rowData[5] == "BPA_OC2" || rowData[5] == "BPA_OC3" || rowData[5] == "BPA_OC4") {    
    switch (state) {
      case "INITIATED":
        window.location.assign(`${origin}${environment}/oc-bpa/apply?applicationNumber=${applicationNumber}&tenantId=${tenantId}`);
        break;
      default:
        window.location.assign(`${origin}${environment}/oc-bpa/search-preview?applicationNumber=${applicationNumber}&tenantId=${tenantId}&bservice=${rowData[5]}`
        );
        break;
    }
  } else if(rowData[5] == "BPA6"){
    window.location.assign(`${origin}${environment}/pre-approved/search-preview?applicationNumber=${applicationNumber}&tenantId=${tenantId}&bservice=${rowData[5]}`);
  }else {
    let type = "HIGH";
    if(rowData[5] == "BPA_LOW") {
      type = "LOW"
    }
    if(rowData[5] == "BPA5") {
      type = "LOW"
    }
    switch (state) {
      case "INITIATED":
        window.location.href = `apply?applicationNumber=${applicationNumber}&tenantId=${tenantId}&type=${type}`;
        break;
      default:
        window.location.href = `search-preview?applicationNumber=${applicationNumber}&tenantId=${tenantId}&type=${type}`;
        break;
    }
  }
};

export const searchDigitalSignatureResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        labelName: "Application No",
        labelKey: "BPA_COMMON_TABLE_COL_APP_NO",
        options: {
          filter: false,
        }
      },
      {
        labelName: "Tenant Id",
        labelKey: "TENANT_ID",
      },
      {
        labelName: "BPA_COMMON_TABLE_COL_ACTION_LABEL",
        labelKey: "BPA_COMMON_TABLE_COL_ACTION_LABEL",
	      options: {
          filter: false,
          customBodyRender: (value, tableMeta) => (
            <a href="javascript:void(0)" onClick={() => onPdfSignClick(tableMeta.rowData)}><span style={{ color: '#fe7a51' }}>
            {value}
          </span></a>
          )
        }
      },
    ],
    title: {
      labelName: "Search Results for Pending Digitally Signed Applications",
      labelKey: "BPA_HOME_SEARCH_RESULTS_DIGITAL_SIGNATURE"
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
}


export const searchDigitalSignatureResultsForBPADoc = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      {
        labelName: "Application No",
        labelKey: "BPA_COMMON_TABLE_COL_APP_NO",
        options: {
          filter: false,
        }
      },
      {
        labelName: "Tenant Id",
        labelKey: "TENANT_ID",
      },
      {
        labelName: "BPA_TABLE_COL_BPL_DOC_DOWNLOAD_ACTION_LABEL",
        labelKey: "BPA_TABLE_COL_BPL_DOC_DOWNLOAD_ACTION_LABEL",
	      options: {
          filter: false,
          customBodyRender: (value, tableMeta) => (
            <a href="javascript:void(0)" onClick={() => onDownloadClick(tableMeta.rowData)}><span style={{ color: '#fe7a51' }}>
            {value}
          </span></a>
          )
        }
      },
      {
        labelName: "BPA_TABLE_COL_BPL_DOC_UPLOAD_ACTION_LABEL",
        labelKey: "BPA_TABLE_COL_BPL_DOC_UPLOAD_ACTION_LABEL",
	      options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
          return  <a href="javascript:void(0)" onClick={() => goToUploadDocPage(tableMeta.rowData)}><span style={{ color: '#fe7a51' }}>
            {value}
          </span></a>
        }
        }
      }
    ],
    title: {
      labelName: "Search Results for Pending Digitally Signed Applications",
      labelKey: "BPA_HOME_SEARCH_BPL_DOC_DIGITAL_SIGNATURE"
    },
    rows: "",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
}


const onDownloadClick = async (rowData) => {
  let applicationNumber = rowData && rowData[0]
  let tenantId = rowData && rowData[1]

  const response = await getAppSearchResults([
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "applicationNo", value: applicationNumber }
  ]);
  console.log(response, "Nero single App")
let filteredDoc = response && response.BPA && response.BPA.length > 0 && response.BPA[0].documents.filter( item => item.documentType === "BPD.BPL.BPL") 
if(filteredDoc && filteredDoc.length > 0){
  const fileUrls = await getFileUrlFromAPI(filteredDoc && filteredDoc[0].fileStoreId);
  window.location = fileUrls[filteredDoc[0].fileStoreId];
}else{
  store.dispatch(
    toggleSnackbar(
      true,
      {
        labelName: "Sorry, BPD document was not uploaded, Please upload first",
        labelKey: "BPA_BPD_DOC_WAS_NOT_UPLOADED"
      },
      "warning"
    )
  );
}
}

const goToUploadDocPage = async (rowData) => {
  let applicationNumber = rowData && rowData[0];
  let tenantId = rowData && rowData[1];
  let url = `upload-unsigned-doc?applicationNo=${applicationNumber}&tenantId=${tenantId}`
  store.dispatch(setRoute(url));
}


const onPdfSignClick = rowData => {
  let applicationNumber = rowData && rowData[0]
  let tenantId = rowData && rowData[1]
  
  store.dispatch(
    handleField(
      "search",
      "components.pdfSigningPopup.props",
      "openPdfSigningPopup",
      true
    )
  )
  store.dispatch(
    handleField(
      "search",
      "components.pdfSigningPopup.props",
      "applicationNumber",
      applicationNumber
    )
  )
  store.dispatch(
    handleField(
      "search",
      "components.pdfSigningPopup.props",
      "tenantId",
      tenantId
    )
  )
}
