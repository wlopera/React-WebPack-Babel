Proyecto React -WebPack y Babel

# Pasos:

# Iniciar un proyecto con npm:

1. Crear directorio react-webpack-babel
2. En ../react-webpack-babel > npm init -y => package.json
3. Crear
   ../src
   ../src/index.html
   ../src/index.js

```
react-webpack-babel
├── package.json
└── src
├── index.html
└── index.js
```

4. Agregar a index.html

```
{
"name": "react-webpack-babel",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "Geordano Polanco (gpolanco.com)",
"license": "MIT"
}
```

5. Dependencias:
   5.1) npm install --save-dev webpack webpack-cli webpack-dev-server
   (npm i -D webpack webpack-cli webpack-dev-server)

# webpack:

Paquete principal que utilizaremos más adelante para el transpilado del código scss, jsx de la aplicación.

# webpack-dev-server - npm:

Este nos da la opción de ejecutar un servidor local en nuestro directorio. Además nos da la ventaja de ver los cambios realizados en tiempo real en el navegador.

# webpack-cli - npm:

Esta herramienta nos permite utilizar webpack en la linea de comando

# Package.json:

```
{
"name": "react-webpack-babel",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [],
"author": "wlopera",
"license": "MIT",
"devDependencies": {
"webpack": "^5.24.2",
"webpack-cli": "^4.5.0",
"webpack-dev-server": "^3.11.2"
}
}
```

Nota:
Fijar las versiones a las últimas actuales quitando el símbolo ^ de está forma estás dependencias siempre estarán en la versión indicada.

- Cambie las versiones a una mas actigua para fines educativos

```
"devDependencies": {
"webpack": "4.20.2",
"webpack-cli": "3.1.2",
"webpack-dev-server": "3.1.9"
}
```

Tenemos el directorio node_modules donde se guardan todas las dependencias del proyecto y el archivo package-lock.json utilizado por npm.

```
react-webpack-babel
├── node_modules
├── package-lock.json
├── package.json
└── src
├── index.html
└── index.js
```

# Configuración de webpack:

Nota: Desde webpack v4no es necesario crear un archivo de configuración para su funcionamiento

1. Agregar comandos al package.json

```
"scripts": {
"start": "webpack-dev-server",
"build": "webpack --mode production"
},
```

2. Comprimir código: Todas estás acciones se pueden personalizar desde el archivo de configuración webpack-config.js.

   > npm run build ==> omprimiendolo en la carpeta dist/main.js
   > npm start ==> nos muestra un listado de los archivos que existen en la carpeta principal del proyecto

3. Creamos el archivo webpack.config.js

3.1 Para trabajar con rutas en el archivo de configuración, utilizaremos path que es una copia exacta del módulo de rutas

> npm install --save-dev path

3.2 Copiar al webpack.config.js

const path = require('path');

```
module.exports = {
// APP ENTRY POINT
entry: path.join(\_\_dirname,'src','index.js'),

// OUTPUT DIRECTORY
output: {
path: path.join(\_\_dirname,'public'),
filename: 'main.bundle.js'
},

// EVIROMENT MODE
mode: process.env.NODE_ENV || 'development',

// PATH RESOLVE
resolve: {
modules: [path.resolve(__dirname, 'src'), 'node_modules']
},

// DEV SERVER ENTRY POINT
devServer: {
contentBase: path.join(\_\_dirname,'src')
}
};
```

# Entry:

    Punto de entrada de referencia para webpack, en nuestro caso el archivo src/index.js

# Output:

    Punto de salida para el código procesado por webpack, en nuestro caso public/main.bundle.js

# mode:

    Indica el modo en que se está ejecutando nuestra aplicación, con esto webpack sabe como compilar nuestro archivos basándose en en el modo development o production esto se puede configurar utilizando las variables de entorno de nodejs, en nuestro caso lo dejamos en modo developer si no existe una variable de entorno.

# resolve:

    Esto nos da la facilidad de poder utilizar importaciones con rutas relativas en vez de rutas absolutas, indicando los directorios donde buscar dichas importaciones a webpack.

# devServer:

    Indica al servidor de desarrollo, los archivos que deben ser mostrados en el navegador, en nuestro caso, los ubicador dentro del directorio /src

3.3 Agregar cóigo al index.js

    console.log('Estamos en construcción...');

Probar correr.

> npm run build
> npm start

# Configuración babel:

En react trabajaremos utilizando la sintaxis de ECMAScript® 2018 además de jsx, pero no todos los navegadores soportan esta versión de javascript, para esto utilizaremos babeljs, para transpilar el código de react a ES5 soportado por todos los navegadores.

1. Agregar depndencia

   > npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react

2. Podemos agregar opciones de babel-loader en el archivo webpack.config.js o en un archivo .bablerc para tenr la configuración babel separada.

```
{
"presets": [
"@babel/preset-env"
]
}
```

## Nota

    Ahora ya tenemos nuestro proyecto preparado para trabajar con ES6, puedes agregar algún código de ES6 en el archivo src/index.js y ejecutar npm run build. si revisas el archivo generado en /dist notarás como babel ha transpilado el código de ES6 a su equivalente en ES5. (gracias a @babel/preset-env podemos utilizar las últimas funcionalidades de JavaScript)

# Configuración react js:

1. instalar dependencias

   > npm install --save react react-dom
   > (npm i -S react react-dom)

   > npm install --save-dev @babel/preset-react --> Instalar @babel/preset-react

   [Realiza varias funciones, ya que tiene integrado otros plugin de babel. Se encarga de entender el código JSX y transformarlo en código con la sintaxis de react, entre otras cosas]

2. Configurar @babel/preset-react en el archivo .babelrc

```
{
"presets": [
"@babel/preset-env",
"@babel/preset-react"
]
}
```

3. Modificamos el archivo webpack.config.js para agregar la extensión jsx en el babel loader. de esta forma podemos usar .js o .jsx en nuestro archivos.

```
// ...
module.exports = {
// ...
module: {
rules: [
{
test: /\.(js|jsx)$/,
exclude: /node_modules/,
use: {
loader: "babel-loader"
}
}
],
},
// ...
};
```

# Crear nuestro primer componente

1. Crear Aplicacion

// App.jsx
import React from "react";

const App = () => {
return (

<div>
<h2>App component!</h2>
</div>
);
};

export default App;

2. Renombramos el archivo index.js a index.jsx

3. Webpack por defecto no reconoce la extensión .jsx, debemos decirle desde su archivo de configuración, que extensiones puede resolver. Por defecto resuelve .js (webpack.config.js)

resolve: {
extensions: ['.js', '.json', '.jsx'],
}

4. Cambiar el puerto del servidor (webpack.config.js)

```
   devServer: {
   contentBase: path.resolve(\_\_dirname, "./src"),
   port: 3500,
   watchContentBase: true,
   open: true
   }
```

5. Agregar código al index.jsx para llamar al aplicativo

```
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById("root")
);
```

# ...............................................
