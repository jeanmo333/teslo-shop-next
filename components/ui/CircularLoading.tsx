import { Box, CircularProgress } from "@mui/material";

export const CircularLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center">
      <CircularProgress thickness={2} size={25} color="inherit" />
    </Box>
  );
};
