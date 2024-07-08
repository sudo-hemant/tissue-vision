"use client";

import usePolling from "@/hooks/usePolling";
import { callPollingApi, initiateDownloadZipping } from "@/helpers/api.helpers";

import { PollingContext } from "./pollingContext";

const PollingProvider = ({ children }) => {
  const {
    zippingApiResponse,
    initiateZipping,
    // initiatePolling,
    pollingStatusAndResponse,
  } = usePolling({
    downloadApiFn: initiateDownloadZipping,
    pollingApiFn: callPollingApi,
  });

  return (
    <PollingContext.Provider
      value={{
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
