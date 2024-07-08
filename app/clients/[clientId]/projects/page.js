"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { getFoldersOrFilesList } from "@/helpers/api.helpers";
import { getFilesWithRelativePath } from "@/helpers/general.helpers";

import Body from "@/components/Body";

const Projects = ({ params: { clientId } }) => {
  const [loading, setLoading] = useState(true);
  const [projectsList, setProjectsList] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  const getProjectsList = async () => {
    setLoading(true);
    const response = await getFoldersOrFilesList({ prefix: clientId });
    const subFolders = getFilesWithRelativePath(response.data?.subFolders, 1);

    setProjectsList(subFolders);
    setLoading(false);
  };

  useEffect(() => {
    getProjectsList();
  }, []);

  const handleProjectClick = (e, projectId) => {
    e.preventDefault();
    router.push(`${pathname}/${projectId}/datasets`);
  };

  return (
    <Body
      subHeaderText="Projects"
      loading={loading}
      onBackBtnClick={router.back}
      showBackBtn
      dataList={projectsList}
      handleFolderClick={handleProjectClick}
    />
  );
};

export default Projects;
