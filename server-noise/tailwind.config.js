module.exports = {
	content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				lshade: "#E4EAE7",
				laccent: "#356FB8",
				main: "#3CACF4",
				daccent: "#7147B7",
				dshade: "#173151",
			},
		},
	},
	plugins: [
		function ({ addBase, theme }) {
			function extractColorVars(colorObj, colorGroup = "") {
				return Object.keys(colorObj).reduce((vars, colorKey) => {
					const value = colorObj[colorKey];

					const newVars =
						typeof value === "string"
							? { [`--color${colorGroup}-${colorKey}`]: value }
							: extractColorVars(value, `-${colorKey}`);

					return { ...vars, ...newVars };
				}, {});
			}

			addBase({
				":root": extractColorVars(theme("colors")),
			});
		},
	],
};
