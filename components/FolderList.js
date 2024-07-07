import Folder from "./Folder";

const FolderList = ({ dataList, handleFolderClick }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {dataList.map(([relativePath, completePath]) => (
        <Folder
          key={relativePath}
          text={relativePath}
          completePath={completePath}
          onClick={handleFolderClick}
        />
      ))}
    </div>
  );
};

export default FolderList;
