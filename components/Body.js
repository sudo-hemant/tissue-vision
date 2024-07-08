import FolderList from "./FolderList";
import LoadMore from "./LoadMore";
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
  nextPageToken,
  onLoadMoreClick,
}) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full">
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

      {nextPageToken && <LoadMore onClick={onLoadMoreClick} />}

      {children}
    </div>
  );
};

export default Body;
