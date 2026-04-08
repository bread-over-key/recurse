"use client"

import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function MuiTheme({ children }
	: { children: React.ReactNode }) {

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>

}
