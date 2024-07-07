"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import Folder from "@/components/Folder";
import SubHeader from "@/components/SubHeader";
import Body from "@/components/Body";

const Clients = () => {
  const [response, setResponse] = useState({});
  const [clientsList, setClientsList] = useState([]);

  const router = useRouter();

  const getClientsList = async () => {
    const response = await getFoldersOrFilesList();

    setResponse(response);
    setClientsList([...response.data?.subFolders]);
    setClientsList((a) => [...a, "ACT-002-898-890-897-987/", "ACT-003/"]);
  };

  useEffect(() => {
    getClientsList();
  }, []);

  const handleClientClick = (e, client) => {
    e.preventDefault();

    router.push(`/clients/${client}/projects`);
  };

  return (
    <Body subHeaderText="Clients">
      <div className="flex gap-4">
        {clientsList.map((client) => {
          const clientId = client.replace("/", "");

          return (
            <Folder
              key={clientId}
              text={clientId}
              onClick={handleClientClick}
            />
          );
        })}
      </div>
    </Body>
  );
};

export default Clients;
