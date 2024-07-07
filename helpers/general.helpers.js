const getFileOrFolderPath = (filesFolderName = "", indexToPick = 0) => {
  const splittedFolderName = filesFolderName.split("/");
  return splittedFolderName[indexToPick];
};

export const getFilesWithRelativePath = (filesList, indexToPick) =>
  filesList.map((completePath) => {
    return getFileOrFolderPath(completePath, indexToPick);
  });
