"use client";

import { useContext, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Checkbox } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import { PollingContext } from "@/contexts/pollingContext";
import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import { getFilesWithRelativePath } from "@/helpers/general.helpers";

import Body from "@/components/Body";
import FilesList from "@/components/FilesList";
import SubHeader from "@/components/SubHeader";

const Images = ({ params: { clientId, projectId, datasetId } }) => {
  const [loading, setLoading] = useState(true);
  const [filesList, setFilesList] = useState([]);
  const [downscaledFolderList, setDownscaledFolderList] = useState([]);
  const [isSelectAll, toggleSelectAll] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});

  const { initiateZipping } = useContext(PollingContext);

  const router = useRouter();
  const pathname = usePathname();

  const getFilesList = async (pageToken = "") => {
    setLoading(true);

    const response = await getFoldersOrFilesList({
      prefix: `${clientId}/${projectId}/${datasetId}`,
      pageToken: pageToken,
    });

    const nextContinuationToken = response.data?.nextContinuationToken;
    const downscaledFolderList = getFilesWithRelativePath(
      response.data?.subFolders,
      3
    );
    const filesWithRelativePath = getFilesWithRelativePath(
      response.data?.keys,
      3
    );

    setFilesList((files) => {
      // FIXME: DUPLICATE ISSUES
      const updatedFilesList = [...files, ...filesWithRelativePath];
      return [...new Set(updatedFilesList)];
    });
    setDownscaledFolderList(() => downscaledFolderList);
    setLoading(false);

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
          filesList.reduce((acc, [fileId]) => {
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

    if (!selectedFilesList.length) {
      // TODO: Display a message to select files
      return;
    }

    initiateZipping({ files: selectedFilesList });
  };

  return (
    <div className="flex flex-col gap-8 items-start w-full">
      {/* @note - DownScaled Images folder */}
      <Body
        subHeaderText="DownScaled Images"
        loading={loading}
        onBackBtnClick={router.back}
        showBackBtn
        dataList={downscaledFolderList}
        handleFolderClick={handleFolderClick}
      />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between pr-2 md:pr-4">
          <SubHeader text="Images" />

          {/* @note - In case of no data - hide checkbox and download icon */}
          <div className="flex items-center gap-4">
            {filesList.length > 0 ? (
              <>
                <DownloadRoundedIcon onClick={handleSelectedFilesDownload} />
                <Checkbox
                  onClick={handleToggleSelectAll}
                  checked={isSelectAll}
                />
              </>
            ) : null}
          </div>
        </div>

        <FilesList
          loading={loading}
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
