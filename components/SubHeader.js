import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const SubHeader = ({
  text,
  onBackBtnClick = () => {},
  showBackBtn = false,
}) => {
  return (
    <div className="flex items-center">
      {/* <h1 className="text-4xl font-semibold px-4"> {text} </h1> */}
      {showBackBtn ? (
        <ArrowBackRoundedIcon
          onClick={onBackBtnClick}
          fontSize="large"
          className="cursor-pointer"
        />
      ) : null}
      <h1 className="text-4xl font-semibold px-4"> {text} </h1>
    </div>
  );
};

export default SubHeader;
