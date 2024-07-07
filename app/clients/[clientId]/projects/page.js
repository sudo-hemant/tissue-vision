"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import Body from "@/components/Body";
import Folder from "@/components/Folder";

const Projects = ({ params: { clientId } }) => {
  const [response, setResponse] = useState({});
  const [projectsList, setProjectsList] = useState([]);
  console.log("🚀 ~ Projects ~ projectsList:", projectsList);

  const router = useRouter();
  const pathname = usePathname();

  const getProjectsList = async () => {
    const response = await getFoldersOrFilesList({ prefix: clientId });

    setResponse(response);
    setProjectsList(response.data?.subFolders);
  };

  useEffect(() => {
    getProjectsList();
  }, []);

  const handleProjectClick = (e, projectId) => {
    e.preventDefault();

    router.push(`${pathname}/${projectId}/datasets`);
  };

  const getProjectId = (folderName = "") => {
    const splittedFolderName = folderName.split("/");
    return splittedFolderName[1];
  };

  return (
    <Body subHeaderText="Projects">
      <div className="flex gap-4">
        {projectsList.map((projectFolder) => {
          const temp = getProjectId(projectFolder);
          const projectId = temp.replace("/", "");

          return (
            <Folder
              key={projectId}
              text={projectId}
              onClick={handleProjectClick}
            />
          );
        })}
      </div>
    </Body>

    // <div>
    //   {projectsList.map((projectFolder) => {

    //     return (
    //       <div>
    //         <button
    //           key={projectId}
    //           onClick={(e) => handleProjectClick(e, projectId)}
    //         >
    //           {projectId}
    //         </button>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default Projects;
