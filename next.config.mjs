/** @type {import("next").NextConfig} */

import withImages from "next-images"


const nextConfig = withImages({
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "devfolio.co",
			},
		],
	},
	webpack(config, options) {
		return config;
	}
})

export default nextConfig;