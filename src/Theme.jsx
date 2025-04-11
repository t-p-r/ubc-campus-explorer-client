import { createTheme } from "@mui/material/styles";
import '@fontsource/inter';
import '@fontsource/open-sans';

const defaultTheme = createTheme({
	palette: {
		primary: {
			main: "#002145",
		},
		secondary: {
			main: "#dc004e",
		},
		mode: "light",
	},
	typography: {
		fontFamily: "Open Sans, sans-serif",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					textTransform: "none",
				},
			},
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiBox: {
			styleOverrides: {
				root: {
					border: 100,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					borderRadius: 30
				},
			},
		},
	},
});


export default defaultTheme;
