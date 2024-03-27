const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const svgPlugin = require("esbuild-svg");

const define = {};

for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  esbuild
    .build({
      entryPoints: ["src/index.tsx"],
      bundle: true,
      minify: true,
      sourcemap: false,
      outfile: "dist/bundle.js",
      loader: { ".ts": "ts", ".woff": "dataurl", ".woff2": "dataurl" },
      plugins: [
        alias({
          src: "./src",
        }),
        svgPlugin({ exportType: "named" }),
      ],
    })
    .catch(() => process.exit(1));
} else {
  const ctx = await esbuild.context({
    entryPoints: ["src/index.jsx"],
    bundle: true,
    outfile: "dist/bundle.js",
    loader: { ".ts": "ts", ".woff": "dataurl", ".woff2": "dataurl" },
    plugins: [
      alias({
        src: "./src",
      }),
      svgPlugin({ exportType: "named" }),
    ],
  });

  console.log("start watch...");
  await ctx.watch();
}
