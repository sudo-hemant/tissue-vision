import { useContext, useRef, useState } from "react";

import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { PollingContext } from "@/contexts/pollingContext";

const Folder = ({ text, onClick, completePath }) => {
  const [isPopoverOpen, togglePopover] = useState(false);
  const anchorRef = useRef(null);

  const { initiateZipping } = useContext(PollingContext);

  const handleMoreVertIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    togglePopover((prev) => !prev);
  };

  const handleDownloadFolder = async (e) => {
    togglePopover((prev) => !prev);

    initiateZipping({ folderName: completePath });
  };

  return (
    <>
      <button
        onClick={(e) => onClick(e, text)}
        className="flex justify-between p-2 md:p-4 w-full md:w-80 h-16 md:h-24 bg-gray-200 border-[1px] border-gray-300 rounded-2xl md:rounded-3xl"
      >
        <div className="truncate flex flex-col justify-center items-start gap-2 h-full">
          <div className="text-s md:text-2xl w-11/12 text-left truncate">
            {text}
          </div>
          <div className="text-xs md:text-base">Created on: April 6, 2024</div>
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
          className="text-base text-start px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
        >
          Download
        </button>
      </Popover>
    </>
  );
};

export default Folder;
