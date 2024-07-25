// #region Imports
import "@/styles/globals.css";

import {  useEffect} from "react";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import Router from "next/router";

import { FilterProvider } from "@/context/FilterContext";

import type { AppProps } from "next/app";
import { Nunito_Sans } from "next/font/google";
import { Space_Mono } from "next/font/google";
// #endregion

const nunito = Nunito_Sans({
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-nunito-sans",
});

const space = Space_Mono({
	weight: ["400","700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-space-mono",
});

export default function App({ Component, pageProps }: AppProps) {


	useEffect(() => {
		Router.events.on(
			"routeChangeStart",()=> Nprogress.start()
		)
		Router.events.on(
			"routeChangeComplete", ()=> Nprogress.done(false)
		)
		Router.events.on(
			"routeChangeError", ()=> Nprogress.done(false)
		)
	},[Router])

	return(
		<FilterProvider>
			<main className={ nunito.variable + " " + space.variable}>
				<Component  {...pageProps} />
			</main>
		</FilterProvider>
	);
	
};
