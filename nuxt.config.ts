// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/devtools', '@nuxt/ui', 'nuxt-icon', '@nuxt/image'],
    runtimeConfig: { public: { baseURL: process.env.API_URL }, MONGO_URI_DEV: process.env.MONGO_URI_DEV, MONGO_URI_PROD: process.env.MONGO_URI_PROD },
    experimental: {
        viewTransition: true,
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        vue: {
            customElement: true,
        },
        vueJsx: {
            mergeProps: true,
        },
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => {
                return tag.includes('-');
            },
        },
    },
    build: { transpile: ['vue-toastification'] },

    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Oxygen&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@1,500&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Reggae+One&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Newsreader:wght@600&display=swap',
                },
            ],
        },

        pageTransition: {
            name: 'fadeSlideY',
            mode: 'out-in',

            // onBeforeEnter: (el) => {
            //     console.log('Before enter apge...');
            // },
            // onEnter: (el, done) => {},
            // onAfterEnter: (el) => {},
        },
        layoutTransition: { name: 'fadeSlideX', mode: 'out-in' },
    },
    ui: {
        global: true,
        icons: ['mdi', 'simple-icons'],
    },

    devtools: {
        enabled: false,
    },
});
