import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const SubHeader = ({
  text,
  onBackBtnClick = () => {},
  showBackBtn = false,
}) => {
  return (
    <div className="flex items-center">
      {showBackBtn ? (
        <ArrowBackRoundedIcon
          onClick={onBackBtnClick}
          fontSize="large"
          className="cursor-pointer"
        />
      ) : null}

      <p className="text-2xl md:text-4xl font-semibold"> {text} </p>
    </div>
  );
};

export default SubHeader;
