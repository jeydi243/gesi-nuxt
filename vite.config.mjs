import vue from '@vitejs/plugin-vue';
import commonjs from 'vite-plugin-commonjs';
export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.includes('-');
          },
        },
      },
    }),
    commonjs(),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.cjs'],
  },
};
