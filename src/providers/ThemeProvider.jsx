import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import PropTypes from 'prop-types';
import theme from "../theme/theme";

export default function ThemeProvider({ children }) {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
