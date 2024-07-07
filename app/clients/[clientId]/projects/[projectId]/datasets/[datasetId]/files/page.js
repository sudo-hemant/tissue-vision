"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import Body from "@/components/Body";
import FilesList from "@/components/FilesList";
import SubHeader from "@/components/SubHeader";
import { Checkbox } from "@mui/material";
import { getFilesWithRelativePath } from "@/helpers/general.helpers";

const Images = ({ params: { clientId, projectId, datasetId } }) => {
  // const [filesListResponse, setFilesListResponse] = useState({});
  // const [nextPageToken, setNextPageToken] = useState("");
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
          <Checkbox onClick={handleToggleSelectAll} checked={isSelectAll} />
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
