import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/containers/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/hooks/**/*.{jsx,tsx}',
        './src/layouts/**/*.{jsx,tsx}',
        './src/configs/**/*.{jsx,tsx}',
        './src/utils/constants/ui.ts',
    ],
    theme: {
        extend: {
            colors: () => ({
                current: 'currentColor',
                primary: {
                    DEFAULT: '#fe3564',
                    // DEFAULT: '#0CCBE0',
                },
                secondary: {
                    DEFAULT: '#f6f9fc',
                    'variant-1': '#D9D9D9',
                    'variant-2': '#0364ee',
                    'variant-3': '#f3f3f3',
                },
                common: {
                    white: '#fff',
                    description: '#999999',

                    border: '#D9D9D9',
                    info: '#1890FF',
                    warning: '#F3BB00',
                    success: 'bg-green-600',
                    error: 'bg-red-600',

                    disabled: '#999797',
                    subtitle: '#414141',
                    icon: {
                        DEFAULT: '#fff',
                        social: '#717378',
                        light: '#5E6166',
                    },
                },
            }),

            fontSize: {
                DEFAULT: ['0.875rem', '150%'],
                base: ['0.875rem', '150%'],
                md: ['1rem', '150%'],
                lg: ['1.125rem', '150%'],
                xl: ['1.25rem', '150%'],
                '2xl': ['1.5rem', '150%'],
            },

            backgroundImage: {
                fade: 'linear-gradient(to bottom,rgba(255 255 255/0),rgba(255 255 255/62.5),rgba(255 255 255/1))',
                mask: 'linear-gradient(1turn,#fff 25.58%,hsla(0,0%,100%,0) 181.4%);',
            },

            gridColumn: {
                'span-1.5': 'span 1.5 / span 1.5',
                'span-3.5': 'span 3.5 / span 3.5',
            },

            boxShadow: {
                'sub-header': '0px 0px 30px 0px rgba(0, 0, 0, 0.05)',
                'box-login':
                    '0px 2px 4px rgba(151, 151, 151, 0.3), 0px 32px 32px rgba(217, 217, 217, 0.2)',
                'basic-tab':
                    '0px 2px 4px rgba(151, 151, 151, 0.3), 0px 32px 32px rgba(217, 217, 217, 0.2)',
                card: '0px 0px 40px 0px rgba(0, 0, 0, 0.1)',
                'card-flight': '0px 4px 18px 0px rgba(0, 0, 0, 0.10)',
                'popover-search-flight': '0px 4px 40px 0px rgba(0, 0, 0, 0.10)',
                'selection-flight-search':
                    '0px 0px 30px 0px rgba(0, 0, 0, 0.05)',
                'product-card':
                    '0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15)',
                toast: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            },
        },
        screens: {
            xs: '490px',
            sm: '640px',
            md: '960px',
            lg: '1280px',
            xl: '1440px',
            '2xl': '1920px',
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '1.25rem',
                md: '1.25rem',
                lg: '1.5625rem',
                xl: '7.5rem',
            },

            screens: {
                lg: '1280px',
                xl: '1440px',
                '2xl': '1920px',
            },
            center: true,
        },
        aspectRatio: {
            auto: 'auto',
            square: '1 / 1',
            video: '16 / 9',
            banner: '380 / 201',
            bannerDesktop: '1088 / 400',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            14: '14',
            15: '15',
            16: '16',
        },
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        // require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    ],
};
export default config;
