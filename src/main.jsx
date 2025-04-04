import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import defaultTheme from "./Theme.jsx";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider theme={defaultTheme}>
			<App />
		</ThemeProvider>
	</StrictMode>
);
