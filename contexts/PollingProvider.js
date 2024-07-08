"use client";

import usePolling from "@/hooks/usePolling";
import {
  callPollingApi,
  initiateDownloadZipping,
  cancelDownload as cancelDownloadApi,
} from "@/helpers/api.helpers";

import { PollingContext } from "./pollingContext";

const PollingProvider = ({ children }) => {
  const {
    cancelDownload,
    zippingApiResponse,
    initiateZipping,
    // initiatePolling,
    pollingStatusAndResponse,
  } = usePolling({
    zippingApiFn: initiateDownloadZipping,
    pollingApiFn: callPollingApi,
    cancelApiFn: cancelDownloadApi,
  });

  return (
    <PollingContext.Provider
      value={{
        cancelDownload,
        zippingApiResponse,
        initiateZipping,
        // initiatePolling,
        pollingStatusAndResponse,
      }}
    >
      {children}
    </PollingContext.Provider>
  );
};

export default PollingProvider;
