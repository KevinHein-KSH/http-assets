// theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Inter", "ui-sans-serif", "system-ui"].join(","),
  },
  palette: {
    action: {
      hoverOpacity: 0.08,
    }
  },
  components: {
    MuiButton: {
      defaultProps: { color: "inherit" },
      styleOverrides: { root: { textTransform: "none" } },
    },
    MuiIconButton: { defaultProps: { color: "inherit" } },
    MuiLink:       { defaultProps: { color: "inherit" } },
    MuiSvgIcon:    { defaultProps: { color: "inherit" } },
  },
});
