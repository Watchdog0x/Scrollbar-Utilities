# Scrollbar-Utilities
This repository contains custom scrollbar utilities for Tailwind CSS. These utilities allow you to easily customize the appearance of scrollbars in your web applications using Tailwind CSS.


## Features
- Hide Scrollbar: Easily hide the scrollbar across different browsers.
- Direction Utilities: Apply RTL (Right-to-Left) or LTR (Left-to-Right) direction to elements.
- Custom Scrollbar Styling: Customize scrollbar colors, width, and border-radius.
- Dynamic Color, Spacing, and Border-radius: Utilize Tailwind CSS theme colors, spacing, and border-radius values dynamically.

## Installation
Import the plugin function at the beginning of your Tailwind CSS configuration file:
```javascript
const plugin = require('tailwindcss/plugin');
```
Add the provided plugin to your Tailwind CSS configuration file.
```javascript
  plugins: [
		plugin(function({ addUtilities, matchUtilities, theme }) {
		  const colors = theme('colors');
		  const spacing = theme('spacing');
		  const borderRadius = theme('borderRadius');

		  const flattenedColors = Object.keys(colors).reduce((acc, color) => {
			const colorShades = colors[color];
			if (typeof colorShades === 'string') {
			  acc[color] = colorShades;
			} else {
			  Object.keys(colorShades).forEach((shade) => {
				acc[`${color}-${shade}`] = colorShades[shade];
			  });
			}
			return acc;
		  }, {});

		  addUtilities({
			'.hide-scrollbar': {
				'&::-webkit-scrollbar': {
				display: 'none',
				},
				'-ms-overflow-style': 'none',  /* IE and Edge */
				'scrollbar-width': 'none',  /* Firefox */
			},
			'.direction-right-to-left': {
				'direction': 'rtl',
			},
			'.direction-left-to-right': {
				'direction': 'ltr',
			},
			'.scrollbar': {
				'--scrollbar-thumb-color': 'transparent',
				'--scrollbar-color': 'transparent',
				'--scrollbar-width': '0.7rem',
				'--scrollbar-rounded': '0',

				/* Firefox specific styles using supports query hack */
				'@supports (-moz-appearance: none)': {
					'scrollbar-color': 'var(--scrollbar-thumb-color) var(--scrollbar-color)',
				},
		
				'&::-webkit-scrollbar': {
					'background-color': 'var(--scrollbar-color)',
					'width': 'var(--scrollbar-width)',
					'border-radius': 'var(--scrollbar-rounded)',
				},
				'&::-webkit-scrollbar-thumb': {
					'background-color': 'var(--scrollbar-thumb-color)',
					'border-radius': 'var(--scrollbar-rounded)',
				},
			},
		  });

		  // Dynamic colors  
		  matchUtilities(
			{
				'scrollbar-thumb-color': (value) => ({
					'--scrollbar-thumb-color': value,
				}),
				'scrollbar-color': (value) => ({
					'--scrollbar-color': value,
				}),
				
			},
			{
				values: flattenedColors,
				type: 'color'
			}
		  );
	
		  // Dynamic spacing 
		  matchUtilities(
			{
				'scrollbar-w': (value) => ({
					'--scrollbar-width': value,
				}),
			},
			{
				values: spacing,
			}
		  );

		  // Dynamic borderRadius
		  matchUtilities(
			{
				'scrollbar-rounded': (value) => ({
					'--scrollbar-rounded': value,
				}),
			},
			{
				values: borderRadius,
			}
		  );
		}),
	  ],
```

## Usage

After adding the plugin to your configuration, you can start using the provided utilities in your HTML.

```html
<div class="hide-scrollbar">
  <!-- Your content here -->
</div>

<div class="direction-right-to-left">
  <!-- Your content here -->
</div>

<div class="direction-left-to-right">
  <!-- Your content here -->
</div>

<div class="scrollbar scrollbar-thumb-color-violet-200 scrollbar-color-black scrollbar-w-2 scrollbar-rounded-full">
  <!-- Your content here -->
</div>
```

>[!IMPORTANT]
> Please be aware that the utilities `scrollbar-w-2` and `scrollbar-rounded-full` are specifically designed for WebKit-based browsers.

