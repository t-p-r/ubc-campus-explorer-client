import { defineConfig } from "cypress";
export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:4173",
		experimentalStudio: true,
		specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}'
	},
});
