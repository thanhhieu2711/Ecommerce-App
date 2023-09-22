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
                    DEFAULT: '#FB7021',
                },
                secondary: {
                    DEFAULT: '#f8f8f8',
                    'variant-1': '#f3f3f3',
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

            backgroundImage: {},
        },
        screens: {
            sm: '640px',
            md: '960px',
            lg: '1280px',
            xl: '1440px',
            '2xl': '1920px',
        },
        container: {
            padding: {
                DEFAULT: '1.5625rem',
                // md: '4.96875rem',
                // sm: '1.25rem',
                lg: '7.5rem',
                // xl: '1.5625rem',
            },

            screens: {
                md: '960px',
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
