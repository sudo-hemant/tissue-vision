"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Checkbox } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import {
  callPollingApi,
  getFoldersOrFilesList,
  initiateDownloadFile,
} from "@/helpers/api.helpers";
import { getFilesWithRelativePath } from "@/helpers/general.helpers";

import Body from "@/components/Body";
import FilesList from "@/components/FilesList";
import SubHeader from "@/components/SubHeader";

const Images = ({ params: { clientId, projectId, datasetId } }) => {
  // const [filesListResponse, setFilesListResponse] = useState({});
  // const [nextPageToken, setNextPageToken] = useState("");
  const [downloadApiResponse, setDownloadApiResponse] = useState([]);
  const [pollingStatusAndResponse, setPollingStatusAndResponse] = useState({});
  const [intervalIds, setIntervalIds] = useState({});
  const [filesList, setFilesList] = useState([]);
  const [downscaledFolderList, setDownscaledFolderList] = useState([]);
  const [isSelectAll, toggleSelectAll] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});

  const router = useRouter();
  const pathname = usePathname();

  const getFilesList = async (pageToken = "") => {
    const response = await getFoldersOrFilesList({
      prefix: `${clientId}/${projectId}/${datasetId}`,
      pageToken: pageToken,
    });

    // setFilesListResponse(response);
    // setNextPageToken(response.data?.nextContinuationToken);

    const nextContinuationToken = response.data?.nextContinuationToken;
    const downscaledFolderList = response.data?.subFolders;
    const filesWithRelativePath = getFilesWithRelativePath(
      response.data?.keys,
      3
    );

    setFilesList((files) => [...files, ...filesWithRelativePath]);
    setDownscaledFolderList(() => [...downscaledFolderList]);

    /**
     * @note - If nextpageToken is available, get the remaining files/downsclaed-folders.
     */
    if (nextContinuationToken) {
      getFilesList(nextContinuationToken);
    }
  };

  useEffect(() => {
    getFilesList();
  }, []);

  const removeApiFromPollingList = (refId) => {
    /**
     * @note - VERY IMPORTANT - Using functional update to ensure access to the latest state
     */
    setIntervalIds((prev) => {
      const copiedIntervalIds = { ...prev };
      clearInterval(copiedIntervalIds[refId]);
      delete copiedIntervalIds[refId];
      return copiedIntervalIds;
    });

    // setDownloadApiResponse((prev) => {
    //   const filteredResponse = prev.filter(
    //     ({ data: { ref } }) => ref === refId
    //   );
    //   return filteredResponse;
    // });
  };

  const initiatePolling = async (ref) => {
    const intervalId = setInterval(async () => {
      const response = await callPollingApi({ refId: ref });
      const status = response.data.status;

      if (status === "NOT_FOUND" || status === "NO_SUCH_UPLOAD") {
        removeApiFromPollingList(ref);
      } else if (status === "PENDING") {
      } else if (status === "COMPLETED") {
        removeApiFromPollingList(ref);
      }

      /**
       * @note - This will be used to show the status of download to the user.
       */
      setPollingStatusAndResponse((prev) => ({
        ...prev,
        [ref]: response.data,
      }));
    }, 1000);

    /**
     * @note - Having interval-id based on unique refid of the download request by the user.
     */
    setIntervalIds((prev) => ({ ...prev, [ref]: intervalId }));
  };

  const handleFileClick = (e, fileId) => {
    e.preventDefault();

    // TODO:
    // router.push(`${pathname}/${datasetId}/files`);
  };

  const handleFolderClick = (e) => {
    e.preventDefault();

    router.push(`${pathname}/downsampled`);
  };

  const handleToggleSelectAll = () => {
    /**
     * @note - Toggle select-all and update the selected-files list.
     */
    toggleSelectAll((prev) => {
      if (prev) {
        /**
         * @note - deselect all case
         */
        setSelectedFiles({});
      } else if (!prev) {
        /**
         * @note - select all case
         */
        setSelectedFiles(
          filesList.reduce((acc, fileId) => {
            acc[fileId] = true;
            return acc;
          }, {})
        );
      }

      return !prev;
    });
  };

  const updateSelectedFiles = ({ fileId, select }) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fileId]: select,
    }));

    /**
     * @note - In case if select all is enabled and user manually deselects any file,
     *         we need to deselect select-all checkbox.
     */
    if (!select) {
      toggleSelectAll(false);
    }
  };

  const handleSelectedFilesDownload = async () => {
    // FIXME: EFFICIENT METHOD
    const selectedFilesList = Object.entries(selectedFiles)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    /**
     * @note - Download and save the response in array, as might need to poll for multiple downloads.
     */
    const response = await initiateDownloadFile({ files: selectedFilesList });
    setDownloadApiResponse((prev) => [...prev, response]);

    initiatePolling(response.data?.ref);
  };

  return (
    <div className="flex flex-col gap-8 items-start w-full">
      <Body
        subHeaderText="DownScaled Images"
        dataList={downscaledFolderList}
        handleFolderClick={handleFolderClick}
      />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between pr-4">
          <SubHeader text="Images" />

          <div className="flex items-center gap-4">
            <DownloadRoundedIcon onClick={handleSelectedFilesDownload} />
            <Checkbox onClick={handleToggleSelectAll} checked={isSelectAll} />
          </div>
        </div>

        <FilesList
          filesList={filesList}
          handleFileClick={handleFileClick}
          updateSelectedFiles={updateSelectedFiles}
          selectedFiles={selectedFiles}
        />
      </div>
    </div>
  );
};

export default Images;
