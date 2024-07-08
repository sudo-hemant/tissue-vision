import { useContext, useEffect, useState } from "react";

import {
  // Button,
  Card,
  // CardContent,
  // CircularProgress,
  // IconButton,
  Snackbar,
} from "@mui/material";
import FolderZipRoundedIcon from "@mui/icons-material/FolderZipRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { PollingContext } from "@/contexts/pollingContext";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import {
  COMPLETED,
  NOT_FOUND,
  NO_SUCH_UPLOAD,
  PENDING,
} from "@/constants/general.constants";
// import { Close } from "@mui/icons-material";

const DownloadProgressBar = () => {
  const [isProgressBarOpen, toggleProgressBar] = useState(true);

  const { zippingApiResponse, pollingStatusAndResponse } =
    useContext(PollingContext);

  useEffect(() => {
    if (zippingApiResponse.length === 0) {
      toggleProgressBar(false);
    } else if (zippingApiResponse.length > 0) {
      toggleProgressBar(true);
    }
  }, [zippingApiResponse]);

  const getProgressStatus = ({ status = "", uploadProgress = 1 }) => {
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
            onClick={() => {
              // FIXME:
              console.log("cancelled");
            }}
          />
        </div>
      );
    } else if (status === NOT_FOUND || status === NO_SUCH_UPLOAD) {
      return <ErrorOutlineRoundedIcon fontSize="small" color="error" />;
    } else if (status === COMPLETED) {
      return <CheckCircleOutlineRoundedIcon fontSize="small" color="success" />;
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
            const status = pollingStatusAndResponse?.[refId];
            const uploadProgress = status?.uploadProgress;
            const zipFileName = status?.key;

            return (
              <div className="h-12 flex justify-between items-center px-4">
                <div className="flex gap-2 items-center truncate">
                  <FolderZipRoundedIcon fontSize="small" />
                  <div className="">{zipFileName}</div>
                </div>

                {getProgressStatus({ status, uploadProgress })}
              </div>
            );
          })}

          {/* <CardContent> */}
          {/* <Typography variant="body2" color="textSecondary" component="p">
                  Your download is ready: fileName
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => (window.location.href = downloadLink)}
                  // style={{ marginRight: 8 }}
                >
                  Download
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <Close fontSize="small" />
                </IconButton> */}
          {/* </CardContent> */}
        </Card>
      }
    />
  );
};

export default DownloadProgressBar;
