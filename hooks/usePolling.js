import { useEffect, useState } from "react";

import { downloadFile } from "@/helpers/api.helpers";
import { downloadFileInNewTab } from "@/helpers/general.helpers";
import {
  ABORTED,
  COMPLETED,
  NOT_FOUND,
  NO_SUCH_UPLOAD,
  PENDING,
} from "@/constants/general.constants";

const usePolling = ({
  zippingApiFn,
  pollingApiFn,
  pollingInterval = 1000,
  cancelApiFn,
}) => {
  const [zippingApiResponse, setZippingApiResponse] = useState([]);
  // const [zippingApiResponse, setZippingApiResponse] = useState([
  //   {
  //     data: {
  //       zipFilename: "File 1",
  //       ref: "ref1",
  //     },
  //     status: "PENDING",
  //   },
  // ]);

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

  const removeZippingResponseHistory = (refId) => {
    /**
     * @note - Remove the Download History from the response, after a particular interval.
     */
    setTimeout(() => {
      setZippingApiResponse((prev) => {
        const newArray = [...prev];
        newArray.splice(
          newArray.findIndex((item) => item?.data?.refId === refId),
          1
        );
        return newArray;
      });
    }, 10000);
  };

  const initiatePolling = async (refId) => {
    const intervalId = setInterval(async () => {
      const response = await pollingApiFn({ refId: refId });
      const status = response.data?.status;

      if (status === NOT_FOUND || status === NO_SUCH_UPLOAD) {
        removeInterval(refId);
        removeZippingResponseHistory(refId);
      } else if (status === COMPLETED) {
        removeInterval(refId);

        // FIXME: API FN FROM PROPS
        const downloadFileResponse = await downloadFile({ fileKey: refId });
        const downloadUrl = downloadFileResponse.data?.url;
        await downloadFileInNewTab(downloadUrl);

        removeZippingResponseHistory(refId);
      } else if (status === PENDING) {
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

  const initiateZipping = async ({ files = [], folderName = "" }) => {
    const response = await zippingApiFn({ files, folderName });

    const uniqueRefId = response.data?.ref;

    initiatePolling(uniqueRefId);
    setZippingApiResponse((prev) => [...prev, response]);
  };

  const cancelDownload = async ({ refId, zipKey }) => {
    const response = await cancelApiFn({ refId, zipKey });
    console.log("🚀 ~ cancelDownload ~ response:", response);

    if (response.status === 200) {
      setPollingStatusAndResponse((prev) => ({
        ...prev,
        [refId]: { status: ABORTED },
      }));

      removeInterval(refId);
      removeZippingResponseHistory(refId);
    }
  };

  return {
    cancelDownload,
    zippingApiResponse,
    initiateZipping,
    pollingStatusAndResponse,
  };
};

export default usePolling;
