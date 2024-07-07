import axios from "axios";

import { AWS_BASE_URL } from "@/constants/api.constants";

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
