import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#84B9BE',
            contrastText: '#fff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;