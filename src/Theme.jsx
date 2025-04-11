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
	},
});


export default defaultTheme;
