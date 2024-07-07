"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";

const Datasets = ({ params: { clientId, projectId } }) => {
  const [datasetsList, setDatasetsList] = useState({});

  const router = useRouter();
  const pathname = usePathname();

  const getDatasetsList = async () => {
    const response = await getFoldersOrFilesList({
      prefix: `${clientId}/${projectId}`,
    });

    setDatasetsList(response);
  };

  useEffect(() => {
    getDatasetsList();
  }, []);

  const handleDatasetClick = (e, datasetId) => {
    e.preventDefault();

    router.push(`${pathname}/${datasetId}/files`);
  };

  const getProjectId = (datasetFolder = "") => {
    const splittedFolderName = datasetFolder.split("/");
    return splittedFolderName[2];
  };

  return (
    <div>
      {datasetsList.data?.subFolders?.map((datasetFolder) => {
        const datasetId = getProjectId(datasetFolder);

        return (
          <div>
            <button
              key={datasetId}
              onClick={(e) => handleDatasetClick(e, datasetId)}
            >
              {datasetId}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Datasets;
