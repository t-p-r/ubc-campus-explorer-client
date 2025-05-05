import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Header() {
	return (
		<AppBar position="static" sx={{ backgroundColor: "primary" }}>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Box display="flex" alignItems="center" gap={1}>
					<img
						data-testid="header-icon"
						src="https://cdn-icons-png.flaticon.com/512/3082/3082383.png"
						alt="Map Icon"
						style={{ width: "24px", height: "24px", filter: "invert(100%)" }}
					/>
					<Typography variant="h5" component="div" data-testid="header-title">
						<strong>UBC CAMPUS EXPLORER</strong>
					</Typography>
				</Box>
				<Box>
					<IconButton
						data-testid="header-github-link"
						color="inherit"
						component="a"
						href="https://github.com/t-p-r/ubc-campus-explorer-client"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
