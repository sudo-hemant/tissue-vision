import FolderList from "./FolderList";
import Loading from "./Loading";
import SubHeader from "./SubHeader";

const Body = ({
  children,
  loading,
  subHeaderText,
  dataList,
  handleFolderClick,
  onBackBtnClick,
  showBackBtn,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <SubHeader
        text={subHeaderText}
        onBackBtnClick={onBackBtnClick}
        showBackBtn={showBackBtn}
      />

      {loading ? (
        <Loading />
      ) : (
        <FolderList dataList={dataList} handleFolderClick={handleFolderClick} />
      )}

      {children}
    </div>
  );
};

export default Body;
