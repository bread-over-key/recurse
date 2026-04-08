import type { Metadata } from "next";
import "./globals.css";
import { ItemProvider } from "@/providers/item-provider";
import MuiTheme from "@/providers/mui-theme";

export const metadata: Metadata = {
	title: "Recurse",
	description: "A power doc app.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`h-full antialiased`}
		>
			<body >
				<MuiTheme>
					<ItemProvider>
						{children}
					</ItemProvider>
				</MuiTheme>

			</body>

		</html>
	);
}
