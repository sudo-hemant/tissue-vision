import { useContext, useEffect, useState } from "react";

import { Card, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FolderZipRoundedIcon from "@mui/icons-material/FolderZipRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { PollingContext } from "@/contexts/pollingContext";

import {
  ABORTED,
  COMPLETED,
  NOT_FOUND,
  NO_SUCH_UPLOAD,
  PENDING,
} from "@/constants/general.constants";

import CircularProgressWithLabel from "./CircularProgressWithLabel";
// import { cancelDownload } from "@/helpers/api.helpers";

const DownloadProgressBar = () => {
  const [isProgressBarOpen, toggleProgressBar] = useState(false);

  const { cancelDownload, zippingApiResponse, pollingStatusAndResponse } =
    useContext(PollingContext);

  useEffect(() => {
    if (zippingApiResponse.length === 0) {
      toggleProgressBar(false);
    } else if (zippingApiResponse.length > 0) {
      toggleProgressBar(true);
    }
  }, [zippingApiResponse]);

  const handleCancelDownload =
    ({ refId, zipName }) =>
    async () => {
      cancelDownload({ refId, zipKey: zipName });
    };

  const getProgressStatus = ({
    status = "",
    uploadProgress = 1,
    refId = "",
    zipName = "",
  }) => {
    if (status === PENDING) {
      return (
        <div className="flex items-center gap-4">
          <CircularProgressWithLabel
            value={uploadProgress}
            color="success"
            size={36}
            variant="determinate"
          />

          <CloseRoundedIcon
            fontSize="medium"
            color="error"
            className="cursor-pointer"
            onClick={handleCancelDownload({ refId, zipName })}
          />
        </div>
      );
    } else if (
      status === NOT_FOUND ||
      status === NO_SUCH_UPLOAD ||
      status === ABORTED
    ) {
      return <ErrorOutlineRoundedIcon fontSize="small" color="error" />;
    } else if (status === COMPLETED) {
      return <CheckCircleOutlineRoundedIcon fontSize="small" color="success" />;
    } else {
      return <CircularProgress />;
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isProgressBarOpen}
      // onClose={handleToggleProgressBar}
      message="Download status"
      ContentProps={{
        classes: {
          root: "flex flex-col p-0 w-96 bg-gray-300 text-gray-900 font-semibold",
          action: "w-full p-0 m-0 font-medium",
        },
      }}
      action={
        <Card className="w-full ">
          {zippingApiResponse.map(({ data } = {}) => {
            const refId = data?.ref;
            const zipName = data?.zipFilename;

            const pollingStatus = pollingStatusAndResponse?.[refId];
            const status = pollingStatus?.status;
            const uploadProgress = pollingStatus?.uploadProgress;
            const zipFileName = pollingStatus?.key;

            return (
              <div className="h-12 flex justify-between items-center px-4">
                <div className="flex gap-2 items-center truncate">
                  <FolderZipRoundedIcon fontSize="small" />
                  <div className="">{zipName || zipFileName}</div>
                </div>

                {getProgressStatus({ status, uploadProgress, refId, zipName })}
              </div>
            );
          })}
        </Card>
      }
    />
  );
};

export default DownloadProgressBar;
