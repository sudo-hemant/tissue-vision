import { useEffect, useState } from "react";

import { downloadFile } from "@/helpers/api.helpers";

const usePolling = (pollingApiFn, pollingInterval = 1000) => {
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
      const status = response.data.status;

      if (status === "NOT_FOUND" || status === "NO_SUCH_UPLOAD") {
        removeInterval(refId);
      } else if (status === "COMPLETED") {
        downloadFile({ fileKey: refId });
        removeInterval(refId);
      } else if (status === "PENDING") {
        // CONTINUE - keep polling
      }

      setPollingStatusAndResponse((prev) => ({
        ...prev,
        [refId]: response.data,
      }));
    }, pollingInterval);

    setIntervalIds((prev) => ({ ...prev, [refId]: intervalId }));
  };

  return { initiatePolling, pollingStatusAndResponse };
};

export default usePolling;
