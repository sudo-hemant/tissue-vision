"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import { getFilesWithRelativePath } from "@/helpers/general.helpers";

import Body from "@/components/Body";

const Clients = () => {
  // const [response, setResponse] = useState({});
  const [clientsList, setClientsList] = useState([]);

  const router = useRouter();

  const getClientsList = async () => {
    const response = await getFoldersOrFilesList();
    const subFolders = getFilesWithRelativePath(response.data?.subFolders, 0);

    // setResponse(response);
    setClientsList(subFolders);

    // FIXME: TEMPORARY
    setClientsList((a) => [
      ...a,
      ["ACT-002/", "ACT-002/"],
      ["ACT-003/", "ACT-003/"],
      ["ACT-004/", "ACT-004/"],
      ["ACT-005/", "ACT-005/"],
      ["ACT-006/", "ACT-006/"],
      ["ACT-007/", "ACT-007/"],
      ["ACT-008/", "ACT-008/"],
      ["ACT-009/", "ACT-009/"],
      ["ACT-010/", "ACT-010/"],
      ["ACT-011/", "ACT-011/"],
    ]);
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
      subHeaderText="Clients"
      dataList={clientsList}
      handleFolderClick={handleClientClick}
    />
  );
};

export default Clients;
