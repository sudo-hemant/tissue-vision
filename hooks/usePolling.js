import { useEffect, useState } from "react";

import { downloadFile } from "@/helpers/api.helpers";
import { downloadFileInNewTab } from "@/helpers/general.helpers";

const usePolling = ({
  downloadApiFn,
  pollingApiFn,
  pollingInterval = 1000,
}) => {
  const [downloadApiResponse, setDownloadApiResponse] = useState([]);
  const [pollingStatusAndResponse, setPollingStatusAndResponse] = useState({});
  const [intervalIds, setIntervalIds] = useState({});

  useEffect(() => {
    return () => {
      // Clean up intervals when component unmounts
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, []);

  const removeInterval = (refId) => {
    setIntervalIds((prev) => {
      const copiedIntervalIds = { ...prev };
      clearInterval(copiedIntervalIds[refId]);
      delete copiedIntervalIds[refId];
      return copiedIntervalIds;
    });
  };

  const initiatePolling = async (refId) => {
    const intervalId = setInterval(async () => {
      const response = await pollingApiFn({ refId: refId });
      const status = response.data?.status;

      if (status === "NOT_FOUND" || status === "NO_SUCH_UPLOAD") {
        removeInterval(refId);
      } else if (status === "COMPLETED") {
        removeInterval(refId);

        const downloadFileResponse = await downloadFile({ fileKey: refId });
        const downloadUrl = downloadFileResponse.data?.url;

        await downloadFileInNewTab(downloadUrl);
      } else if (status === "PENDING") {
        /**
         * @note - CONTINUE - keep polling
         */
      }

      setPollingStatusAndResponse((prev) => ({
        ...prev,
        [refId]: response.data,
      }));
    }, pollingInterval);

    setIntervalIds((prev) => ({ ...prev, [refId]: intervalId }));
  };

  const initiateDownload = async ({ files = [], folderName = "" }) => {
    const response = await downloadApiFn({ files, folderName });

    const uniqueRefId = response.data?.ref;

    initiatePolling(uniqueRefId);
    setDownloadApiResponse((prev) => [...prev, response]);
  };

  return {
    downloadApiResponse,
    initiateDownload,
    // initiatePolling,
    pollingStatusAndResponse,
  };
};

export default usePolling;
