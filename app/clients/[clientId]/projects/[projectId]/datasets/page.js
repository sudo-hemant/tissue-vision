"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import { getFilesWithRelativePath } from "@/helpers/general.helpers";

import Body from "@/components/Body";

const Datasets = ({ params: { clientId, projectId } }) => {
  const [loading, setLoading] = useState(true);
  const [datasetsList, setDatasetsList] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  const getDatasetsList = async () => {
    setLoading(true);
    const response = await getFoldersOrFilesList({
      prefix: `${clientId}/${projectId}`,
    });
    const subFolders = getFilesWithRelativePath(response.data?.subFolders, 2);

    setDatasetsList(subFolders);
    setLoading(false);
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
      loading={loading}
      onBackBtnClick={router.back}
      showBackBtn
      dataList={datasetsList}
      handleFolderClick={handleDatasetClick}
    />
  );
};

export default Datasets;
