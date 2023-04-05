export default {
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("box-icon"),
    },
  },
}
