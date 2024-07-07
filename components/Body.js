import FolderList from "./FolderList";
import SubHeader from "./SubHeader";

const Body = ({ children, subHeaderText, dataList, handleFolderClick }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <SubHeader text={subHeaderText} />

      <FolderList dataList={dataList} handleFolderClick={handleFolderClick} />

      {children}
    </div>
  );
};

export default Body;
