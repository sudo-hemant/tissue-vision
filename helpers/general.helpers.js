const getFileOrFolderPath = (filesFolderName = "", indexToPick = 0) => {
  const splittedFolderName = filesFolderName.split("/");
  return splittedFolderName[indexToPick];
};

export const getFilesWithRelativePath = (filesList = [], indexToPick = 0) =>
  filesList.map((completePath) => {
    return [getFileOrFolderPath(completePath, indexToPick), completePath];
  });

export const getDummyFileName = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `file_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.zip`;
};

export const downloadFileInNewTab = async (url = "") => {
  try {
    const newTab = window.open(url, "_blank");

    /**
     * @note - Ensure the tab was opened successfully.
     *         Set a timeout to close the new tab after the download starts.
     */
    if (newTab) {
      setTimeout(() => {
        newTab.close();
      }, 5000);
    } else {
      // TODO: NOTIFICATION
      console.error("Failed to open new tab");
    }
  } catch (error) {
    // TODO: NOTIFICATION
    console.error("Error downloading file:", error);
  }
};
