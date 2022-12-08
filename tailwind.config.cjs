const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
  	],

	theme: {
		extend: {
			colors: {
				"neutral": {
				 50: "#fdfdfd",
				 100: "#f8f8f7",
				 200: "#e5e3e0",
				 300: "#c7c1bb",
				 400: "#a1988e",
				 500: "#73695f",
				 600: "#4f4842",
				 700: "#2f2b27",
				 800: "#211f1c",
				900: "#060505"
				},
				"primary": {
				 50: "#edf0f0",
				 100: "#dde1e1",
				 200: "#bcc4c4",
				 300: "#9ca8a8",
				 400: "#7d8d8d",
				 500: "#5f7373",
				 600: "#485b5b",
				 700: "#334545",
				 800: "#1e3030",
				 900: "#0b1d1d"
				},
				"secondary": {
				 50: "#ebede8",
				 100: "#d7dcd3",
				 200: "#b0baa9",
				 300: "#8b9980",
				 400: "#677a5a",
				 500: "#455c36",
				 600: "#344a25",
				 700: "#233a16",
				 800: "#142a04",
				 900: "#051b00"
				},
				"success": {
				 50: "#f1f7f4",
				 100: "#e4efe9",
				 200: "#c5ded2",
				 300: "#a1ccb7",
				 400: "#72b998",
				 500: "#0fa371",
				 600: "#0d9165",
				 700: "#0b7e57",
				 800: "#096747",
				 900: "#064832"
				},
				"warning": {
				 50: "#f9f7f2",
				 100: "#f3efe5",
				 200: "#e7dec9",
				 300: "#dacba7",
				 400: "#cdb77d",
				 500: "#bfa13b",
				 600: "#aa9034",
				 700: "#937c2d",
				 800: "#786525",
				 900: "#55481a"
				},
				"destructive": {
				 50: "#fdf2f2",
				 100: "#fce6e6",
				 200: "#f9caca",
				 300: "#f6a9a9",
				 400: "#f38080",
				 500: "#f04343",
				 600: "#d63b3b",
				 700: "#b93333",
				 800: "#972a2a",
				 900: "#6b1d1d"
				}
			   },
			fontFamily: {
				heading: ['Frank Ruhl Libre'],
				body: ['Montserrat'],
			   },
			screens: {
				sm: '500px'
			}
		}
	},

	plugins: [
		require('flowbite/plugin'), 
		require('@tailwindcss/typography'), 
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	],
};

module.exports = config;