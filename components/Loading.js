import React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
      >
        <CircularProgress size={80} />
      </Box>
    </div>
  );
};

export default Loading;
