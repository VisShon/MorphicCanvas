import type { Config } from "tailwindcss";

const config: Config = {
	content: [
			"./pages/**/*.{js,ts,jsx,tsx,mdx}",
			"./components/**/*.{js,ts,jsx,tsx,mdx}",
			"./app/**/*.{js,ts,jsx,tsx,mdx}",
		],
	theme: {
		extend: {
			animation: {
				modal: "modalAnimation 0.1s ease-in-out",
			},
			keyframes: {
				modalAnimation: {
					"0%": { transform: "scale(0.99)", opacity:"0.5" },
					"100%": { transform: "scale(1)", opacity:"1" },
				},
			},
			fontFamily:{
				"nunito": "var(--font-nunito-sans)",
				"space": "var(--font-space-mono)"
			},
			colors: {
				"blue-main": "#036cdb",
				"blue-dark": "#143bE2",
				"blue-light": "#3770FF",

				"grey-dark": "#273339",
				"grey-light": "#38474E",
				"grey-super-light": "#8e989c",

				"chalk": "#f5f7f7",
				"chalk-dark": "#D1DADB",

				"concrete": "#E4EAEB",
				"charcoal":"#20282D",

				"green-light":"#43E0BF",
				"green-dark":"#0D8B78",
				"sea-green":"#0FA38D",
			},
			screens: {
				"2xl":{
					"max": "1535px"
				},
				"xl": {
					"max": "1279px"
				},
				"lg": {
					"max": "1023px"
				},
				"md": {
					"max": "767px"
				},
				"sm": {
					"max": "639px"
				},
			},
			extend: {
				animation: {
					"spin-slow": "spin 3s linear infinite",
				}
			},
		},
	},
	plugins: [],
};
export default config;
