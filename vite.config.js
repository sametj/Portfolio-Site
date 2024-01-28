export default {
  root: "./src",
  publicDir: "../assets/",
  base: "/",
  server: {
    host: true,
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env),
  },
  build: { outDir: "../dist", emptyOutDir: true, SourceMap: true },
};
