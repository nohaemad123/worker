const path = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const generatePalette = require(path.resolve(__dirname, ('src/@fuse/tailwind/utils/generate-palette')));

/**
 * Custom palettes
 *
 * Uses the generatePalette helper method to generate
 * Tailwind-like color palettes automatically
 */
const customPalettes = {
    brand: generatePalette('#4F008D')
};

/**
 * Themes
 */
const themes = {
    // Default theme is required for theming system to work correctly!
    // ...colors.indigo,
    'default': {
        primary: {
            DEFAULT: "#4F008D",
            '50': '#f6f1ff',
            '100': '#f0e5ff',
            '200': '#e2ceff',
            '300': '#cea7ff',
            '400': '#b976ff',
            '500': '#a83fff',
            '600': '#a318ff',
            '700': '#9807fa',
            '800': '#8005d2',
            '900': '#6906ac',
            '950': '#4f008d'
        },
        secondary: {
            DEFAULT: "#FABD13",
            '50': '#fffdeb',
            '100': '#fffac6',
            '200': '#fff488',
            '300': '#ffe949',
            '400': '#ffd920',
            '500': '#fabd13',
            '600': '#dd8f02',
            '700': '#b76606',
            '800': '#954e0b',
            '900': '#7a400d',
            '950': '#462102'
        },
        danger: {
            DEFAULT: '#F54141',
            '50': '#fef2f2',
            '100': '#ffe1e1',
            '200': '#ffc8c8',
            '300': '#ffa2a2',
            '400': '#fd6c6c',
            '500': '#f54141',
            '600': '#e22020',
            '700': '#be1717',
            '800': '#9d1717',
            '900': '#821a1a',
            '950': '#470808'
        },
        accent: {
            ...colors.slate,
            DEFAULT: colors.slate[800]
        },
        warn: {
            DEFAULT: '#ED8A0A',
            '50': '#fffbed',
            '100': '#fff6d5',
            '200': '#ffeaa9',
            '300': '#fed973',
            '400': '#fdbd3a',
            '500': '#fba614',
            '600': '#ed8a0a',
            '700': '#c4690a',
            '800': '#9b5211',
            '900': '#7d4511',
            '950': '#442206'
        },
        success: {
            DEFAULT: '#2FD36F',
            '50': '#f1fcf4',
            '100': '#ddfbe8',
            '200': '#bdf5d2',
            '300': '#8aebaf',
            '400': '#50d885',
            '500': '#2fd36f',
            '600': '#1b9e4e',
            '700': '#197c40',
            '800': '#196237',
            '900': '#16512f',
            '950': '#072c17'
        },
        info: {
            DEFAULT: '#4393ea',
            '50': '#f0f7fe',
            '100': '#ddedfc',
            '200': '#c3e0fa',
            '300': '#9acef6',
            '400': '#6ab3f0',
            '500': '#4393ea',
            '600': '#3179df',
            '700': '#2964cc',
            '800': '#2752a6',
            '900': '#254683',
            '950': '#1b2c50',
        },
        natural: {
            'white': '#ffffff',
            'black': '#030311',
            'grey': '#5D5C75',
            '50': '#ffffff',
            '100': '#efefef',
            '200': '#dcdcdc',
            '300': '#bdbdbd',
            '400': '#989898',
            '500': '#7c7c7c',
            '600': '#656565',
            '700': '#525252',
            '800': '#464646',
            '900': '#3d3d3d',
            '950': '#292929',
        },
        'on-warn': {
            500: colors.red['50']
        }
    },
    // Rest of the themes will use the 'default' as the base
    // theme and will extend it with their given configuration.
    'brand': {
        primary: customPalettes.brand
    },
    'teal': {
        primary: {
            ...colors.teal,
            DEFAULT: colors.teal[600]
        }
    },
    'rose': {
        primary: colors.rose
    },
    'purple': {
        primary: {
            ...colors.purple,
            DEFAULT: colors.purple[600]
        }
    },
    'amber': {
        primary: colors.amber
    }
};

/**
 * Tailwind configuration
 */
const config = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}",
    ],
    important: true,
    theme: {
        fontSize: {
            'xs': '0.625rem',
            'sm': '0.75rem',
            'md': '0.8125rem',
            'base': '0.875rem',
            'lg': '1rem',
            'xl': '1.125rem',
            '2xl': '1.25rem',
            '3xl': '1.5rem',
            '4xl': '2rem',
            '5xl': '2.25rem',
            '6xl': '2.5rem',
            '7xl': '3rem',
            '8xl': '4rem',
            '9xl': '6rem',
            '10xl': '8rem'
        },
        screens: {
            sm: '600px',
            md: '960px',
            lg: '1280px',
            
            xl: '1440px'
        },
        extend: {
            animation: {
                'spin-slow': 'wiggle 3s linear infinite'
            },
            keyframes: {
                wiggle: {
                  '0%, 100%': { transform: 'rotate(-3deg)' },
                  '50%': { transform: 'rotate(3deg)' },
                }
              },
            colors: {
                gray: colors.slate
            },
            flex: {
                '0': '0 0 auto'
            },
            fontFamily: {
                sans: ["Cairo Regular",
                    {
                        fontFeatureSettings: '"cv11"',
                        fontVariationSettings: "normal",
                    },]
                // mono: `"IBM Plex Mono", ${defaultTheme.fontFamily.mono.join(',')}`
            },
            opacity: {
                12: '0.12',
                38: '0.38',
                87: '0.87'
            },
            rotate: {
                '-270': '270deg',
                '15': '15deg',
                '30': '30deg',
                '60': '60deg',
                '270': '270deg'
            },
            scale: {
                '-1': '-1'
            },
            zIndex: {
                '-1': -1,
                '49': 49,
                '60': 60,
                '70': 70,
                '80': 80,
                '90': 90,
                '99': 99,
                '999': 999,
                '9999': 9999,
                '99999': 99999
            },
            spacing: {
                '13': '3.25rem',
                '15': '3.75rem',
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '50': '12.5rem',
                '90': '22.5rem',

                // Bigger values
                '100': '25rem',
                '120': '30rem',
                '128': '32rem',
                '140': '35rem',
                '160': '40rem',
                '180': '45rem',
                '192': '48rem',
                '200': '50rem',
                '240': '60rem',
                '256': '64rem',
                '280': '70rem',
                '320': '80rem',
                '360': '90rem',
                '400': '100rem',
                '480': '120rem',

                // Fractional values
                '1/2': '50%',
                '1/3': '33.333333%',
                '2/3': '66.666667%',
                '1/4': '25%',
                '2/4': '50%',
                '3/4': '75%'
            },
            minHeight: ({ theme }) => ({
                ...theme('spacing')
            }),
            maxHeight: {
                none: 'none'
            },
            minWidth: ({ theme }) => ({
                ...theme('spacing'),
                screen: '100vw'
            }),
            maxWidth: ({ theme }) => ({
                ...theme('spacing'),
                screen: '100vw'
            }),
            transitionDuration: {
                '400': '400ms'
            },
            transitionTimingFunction: {
                'drawer': 'cubic-bezier(0.25, 0.8, 0.25, 1)'
            },
            boxShadow: {
                'light_inset': "0px 0px 6px 0px #0000001A inset"
            },

            // @tailwindcss/typography
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        color: 'var(--fuse-text-default)',
                        '[class~="lead"]': {
                            color: 'var(--fuse-text-secondary)'
                        },
                        a: {
                            color: 'var(--fuse-primary-500)'
                        },
                        strong: {
                            color: 'var(--fuse-text-default)'
                        },
                        'ol > li::before': {
                            color: 'var(--fuse-text-secondary)'
                        },
                        'ul > li::before': {
                            backgroundColor: 'var(--fuse-text-hint)'
                        },
                        hr: {
                            borderColor: 'var(--fuse-border)'
                        },
                        blockquote: {
                            color: 'var(--fuse-text-default)',
                            borderLeftColor: 'var(--fuse-border)'
                        },
                        h1: {
                            color: 'var(--fuse-text-default)'
                        },
                        h2: {
                            color: 'var(--fuse-text-default)'
                        },
                        h3: {
                            color: 'var(--fuse-text-default)'
                        },
                        h4: {
                            color: 'var(--fuse-text-default)'
                        },
                        'figure figcaption': {
                            color: 'var(--fuse-text-secondary)'
                        },
                        code: {
                            color: 'var(--fuse-text-default)',
                            fontWeight: '500'
                        },
                        'a code': {
                            color: 'var(--fuse-primary)'
                        },
                        pre: {
                            color: theme('colors.white'),
                            backgroundColor: theme('colors.gray.800')
                        },
                        thead: {
                            color: 'var(--fuse-text-default)',
                            borderBottomColor: 'var(--fuse-border)'
                        },
                        'tbody tr': {
                            borderBottomColor: 'var(--fuse-border)'
                        },
                        'ol[type="A" s]': false,
                        'ol[type="a" s]': false,
                        'ol[type="I" s]': false,
                        'ol[type="i" s]': false
                    }
                },
                sm: {
                    css: {
                        code: {
                            fontSize: '1em'
                        },
                        pre: {
                            fontSize: '1em'
                        },
                        table: {
                            fontSize: '1em'
                        }
                    }
                }
            })
        }
    },
    corePlugins: {
        appearance: false,
        container: false,
        float: false,
        clear: false,
        placeholderColor: false,
        placeholderOpacity: false,
        verticalAlign: false
    },
    plugins: [

        // Fuse - Tailwind plugins
        require(path.resolve(__dirname, ('src/@fuse/tailwind/plugins/utilities'))),
        require(path.resolve(__dirname, ('src/@fuse/tailwind/plugins/icon-size'))),
        require(path.resolve(__dirname, ('src/@fuse/tailwind/plugins/theming')))({ themes }),

        // Other third party and/or custom plugins
        require('@tailwindcss/typography')({ modifiers: ['sm', 'lg'] })
    ]
};

module.exports = config;
