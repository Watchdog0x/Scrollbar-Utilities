plugins: [
  plugin(function ({ addUtilities, matchUtilities, theme }) {
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
