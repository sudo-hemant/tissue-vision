"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getFilesWithRelativePath } from "@/helpers/general.helpers";
import { getFoldersOrFilesList } from "@/helpers/api.helpers";

import Body from "@/components/Body";

const Clients = () => {
  const [loading, setLoading] = useState(true);
  const [clientsList, setClientsList] = useState([]);

  const router = useRouter();

  const getClientsList = async () => {
    setLoading(true);
    const response = await getFoldersOrFilesList();
    const subFolders = getFilesWithRelativePath(response.data?.subFolders, 0);

    setClientsList(subFolders);
    setLoading(false);
  };

  useEffect(() => {
    getClientsList();
  }, []);

  const handleClientClick = (e, client) => {
    e.preventDefault();
    router.push(`/clients/${client}/projects`);
  };

  return (
    <Body
      loading={loading}
      subHeaderText="Clients"
      dataList={clientsList}
      handleFolderClick={handleClientClick}
    />
  );
};

export default Clients;
