const path = require("path");

module.exports = {
  // Punto principal de entrada (Aplicacion)
  entry: path.join(__dirname, "src", "index.jsx"),

  // Directorio de slaida
  output: {
    path: path.join(__dirname, "public"),
    filename: "main.bundle.js",
  },

  // Ambiente de trabajo
  mode: process.env.NODE_ENV || "development",

  // Rutas relativas
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  // Punto de entrada del  servidor - DEV
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    port: 3500,
    watchContentBase: true,
    open: true,
  },

  // Usar .js o .jsx en nuestro archivos
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  // Para que rconozca la extensión .jsx,
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
};
