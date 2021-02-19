import { red, blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A195C6"
    },
    secondary: {
      main: "#595959"
    },
    error: {
      main: "#FF230A"
    },
    background: {
      default: "#F1F1F1"
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    navFont: ["'Lobster', cursive"].join(",")
  }
});

export default theme;