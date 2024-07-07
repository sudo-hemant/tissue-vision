import File from "@/components/File";

const FilesList = ({
  filesList,
  handleFileClick,
  updateSelectedFiles,
  selectedFiles,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {filesList.map((relativePath) => (
        <File
          key={relativePath}
          text={relativePath}
          onClick={handleFileClick}
          updateSelectedFiles={updateSelectedFiles}
          isSelected={selectedFiles[relativePath]}
        />
      ))}
    </div>
  );
};

export default FilesList;
