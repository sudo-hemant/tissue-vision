"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";

const FilesList = ({ params: { clientId, projectId, datasetId } }) => {
  // const [filesListResponse, setFilesListResponse] = useState({});
  const [nextPageToken, setNextPageToken] = useState("");
  const [filesList, setFilesList] = useState([]);
  const [downscaledFolderList, setDownscaledFolderList] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  const getFilesList = async (pageToken = "") => {
    const response = await getFoldersOrFilesList({
      prefix: `${clientId}/${projectId}/${datasetId}`,
      pageToken: pageToken,
    });

    // setFilesListResponse(response);
    setNextPageToken(response.data?.nextContinuationToken);
    setFilesList((files) => [...files, ...response.data?.keys]);
    setDownscaledFolderList((downscaledFolders) => [
      ...response.data?.subFolders,
    ]);

    if (response.data?.nextContinuationToken) {
      getFilesList(response.data?.nextContinuationToken);
    }
  };

  useEffect(() => {
    getFilesList();
  }, []);

  const handleFileClick = (e, fileId) => {
    e.preventDefault();

    // router.push(`${pathname}/${datasetId}/files`);
  };

  const handleFolderClick = (e) => {
    e.preventDefault();

    router.push(`${pathname}/downsampled`);
  };

  const getProjectId = (filesFolderName = "") => {
    const splittedFolderName = filesFolderName.split("/");
    return splittedFolderName[3];
  };

  // const getDownScaledFolderId = (downscaledFolderName = "") => {
  //   const splittedFolderName = downscaledFolderName.split("/");
  //   return splittedFolderName[3];
  // };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white">
        {downscaledFolderList?.map((downscaledFolderName) => {
          // const folderName = getDownScaledFolderId(downscaledFolderName);

          return (
            <button onClick={(e) => handleFolderClick(e)}>downsampled</button>
          );
        })}
      </div>

      <div>
        {filesList.map((filesFolderName) => {
          const fileId = getProjectId(filesFolderName);

          return (
            <div key={fileId}>
              <button key={fileId} onClick={(e) => handleFileClick(e, fileId)}>
                {fileId}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilesList;
