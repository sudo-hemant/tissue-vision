import File from "./File";
import Loading from "./Loading";

const FilesList = ({
  loading,
  filesList = [],
  handleFileClick = () => {},
  updateSelectedFiles = () => {},
  selectedFiles = [],
}) => {
  /**
   * @note - Conditions:-
   *          - not loading and not data = 'no data found'
   *          - loading and no data = loader
   *          - not loading and data = data
   *          - loading and data = data + loader
   */
  return (
    <div className="flex flex-wrap gap-4">
      {!loading && !filesList.length ? <div> No data found </div> : null}

      {filesList.length
        ? filesList.map(([relativePath]) => (
            <File
              key={relativePath}
              text={relativePath}
              onClick={handleFileClick}
              updateSelectedFiles={updateSelectedFiles}
              isSelected={selectedFiles[relativePath]}
            />
          ))
        : null}

      {loading ? <Loading /> : null}
    </div>
  );
};

export default FilesList;
