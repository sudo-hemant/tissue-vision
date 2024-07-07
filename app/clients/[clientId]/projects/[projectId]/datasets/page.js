"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import { getFilesWithRelativePath } from "@/helpers/general.helpers";

import Body from "@/components/Body";

const Datasets = ({ params: { clientId, projectId } }) => {
  // const [response, setResponse] = useState({});
  const [datasetsList, setDatasetsList] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  const getDatasetsList = async () => {
    const response = await getFoldersOrFilesList({
      prefix: `${clientId}/${projectId}`,
    });
    const subFolders = getFilesWithRelativePath(response.data?.subFolders, 2);

    // setResponse(response);
    setDatasetsList(subFolders);
  };

  useEffect(() => {
    getDatasetsList();
  }, []);

  const handleDatasetClick = (e, datasetId) => {
    e.preventDefault();

    router.push(`${pathname}/${datasetId}/files`);
  };

  return (
    <Body
      subHeaderText="Datasets"
      dataList={datasetsList}
      handleFolderClick={handleDatasetClick}
    />
  );
};

export default Datasets;
