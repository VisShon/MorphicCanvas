/** @type {import("next").NextConfig} */

import withImages from "next-images"


const nextConfig = withImages({
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static.vecteezy.com",
			},
		],
	},
	webpack(config, options) {
		config.externals.push({
			"utf-8-validate": "commonjs utf-8-validate",
			bufferutil: "commonjs bufferutil",
			canvas: "commonjs canvas",
		})
		return config;
	}
})

export default nextConfig;