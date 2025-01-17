import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="font-thin text-xs">{`${Math.round(props.value)}`}</div>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
