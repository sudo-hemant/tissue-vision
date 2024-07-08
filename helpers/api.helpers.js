import axios from "axios";

import { AWS_BASE_URL } from "@/constants/api.constants";
import { getDummyFileName } from "./general.helpers";

export const getFoldersOrFilesList = async ({
  prefix = "",
  pageToken = "",
} = {}) => {
  try {
    const response = await axios.get(`${AWS_BASE_URL}/files`, {
      params: { prefix, pageToken },
    });

    return { status: 200, data: response.data.data };
  } catch (err) {
    return { status: 404, message: err.message };
  }
};

export const initiateDownloadZipping = async ({
  files = [],
  folderName = "",
  zipFileName = getDummyFileName(),
} = {}) => {
  try {
    const response = await axios.post(`${AWS_BASE_URL}/download`, {
      files,
      folderPrefix: folderName,
      zipFileName,
    });

    return { status: 200, data: response.data };
  } catch (err) {
    return { status: 404, message: err.message };
  }
};

export const callPollingApi = async ({ refId = "" } = {}) => {
  try {
    const response = await axios.get(
      `${AWS_BASE_URL}/download/progress/${refId}`
    );

    return { status: 200, data: response.data };
  } catch (err) {
    return { status: 404, message: err.message };
  }
};

export const downloadFile = async ({ fileKey = "" } = {}) => {
  try {
    const response = await axios.get(`${AWS_BASE_URL}/download/url`, {
      params: {
        key: fileKey,
        isZip: true,
      },
    });

    return { status: 200, data: response.data.data };
  } catch (err) {
    return { status: 404, message: err.message };
  }
};
