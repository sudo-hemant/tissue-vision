import { useEffect, useState } from "react";

import { Checkbox } from "@mui/material";

const File = ({
  text = "",
  onClick = () => {},
  updateSelectedFiles = () => {},
  isSelected,
}) => {
  const [selected, toggleSelected] = useState(false);

  useEffect(() => {
    /**
     * @note - Writting inside if, to avoid unnecessary update call,
     *         although it won't re-render in case value remains unchanged.
     */
    if (selected !== isSelected) {
      isSelected ? toggleSelected(true) : toggleSelected(false);
    }
  }, [isSelected]);

  const handleToggleSelection = (e) => {
    e.stopPropagation();

    toggleSelected((prev) => {
      /**
       * @note - Update selection state in parent.
       */
      updateSelectedFiles({ fileId: text, select: !prev });

      return !prev;
    });
  };

  return (
    //FIXME: BUTTON FOR NOW - as Image is not available.
    <button
      onClick={(e) => onClick(e, text)}
      className="flex justify-between items-center gap-2 p-2 md:p-4 h-12 md:h-16 w-full bg-gray-300 rounded-2xl text-s md:text-lg "
    >
      <p className="text-left w-10/12 truncate"> {text} </p>
      <Checkbox onClick={handleToggleSelection} checked={selected} />
    </button>
  );
};

export default File;
