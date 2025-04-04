import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Header() {
	return (
		<AppBar position="static" sx={{ backgroundColor: "#002145" }}>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Box display="flex" alignItems="center" gap={1}>
					<img
						src="https://cdn-icons-png.flaticon.com/512/3082/3082383.png"
						alt="Map Icon"
						style={{ width: "24px", height: "24px", filter: "invert(100%)" }}
					/>
					<Typography variant="h5" component="div">
						<strong>UBC CAMPUS EXPLORER</strong>
					</Typography>
				</Box>
				<Box>
					<IconButton
						color="inherit"
						component="a"
						href="https://github.students.cs.ubc.ca/CPSC310-2024W-T2/project_team309"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon />
					</IconButton>
					<IconButton
						color="inherit"
						component="a"
						href="https://www.linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkedInIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
