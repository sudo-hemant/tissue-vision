import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRef, useState } from "react";
import { Typography } from "@mui/material";

const Folder = ({ text, onClick }) => {
  const [isPopoverOpen, togglePopover] = useState(false);
  const anchorRef = useRef(null);

  const handleMoreVertIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    togglePopover((prev) => !prev);
  };

  const handleDownloadFolder = (e) => {
    e.preventDefault();

    // FIXME: API CALL
  };

  return (
    <>
      <button
        onClick={(e) => onClick(e, text)}
        className="flex justify-between p-4 w-80 h-24 bg-gray-300 rounded-3xl"
      >
        <div className="truncate flex flex-col justify-center items-start gap-2 h-full">
          <div className="text-2xl w-11/12 text-left truncate">{text}</div>
          <div className="text-base">Created on: April 6, 2024</div>
        </div>

        <MoreVertIcon
          onClick={(e) => handleMoreVertIconClick(e)}
          ref={anchorRef}
          className="cursor-cell"
        />
      </button>

      <Popover
        id={text}
        open={isPopoverOpen}
        anchorEl={anchorRef.current}
        onClose={handleMoreVertIconClick}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            className: "w-40",
          },
        }}
      >
        <button
          onClick={handleDownloadFolder}
          className="text-base text-start px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Download
        </button>
      </Popover>
    </>
  );
};

export default Folder;
