const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");

// require("esbuild").buildSync({
//   entryPoints: ["src/index.tsx"],
//   bundle: true,
//   minify: true,
//   format: "cjs",
//   sourcemap: true,
//   outfile: "dist/output.js",
// });

async function watch() {
  const ctx = await esbuild.context({
    entryPoints: ["src/index.tsx"],
    minify: false,
    outfile: "dist/bundle.js",
    bundle: true,
    loader: { ".ts": "ts", ".woff": "dataurl", ".woff2": "dataurl" },
    plugins: [
      alias({
        src: "./src",
      }),
    ],
  });

  await ctx.watch();
  console.log("Watching...");
}

watch();
