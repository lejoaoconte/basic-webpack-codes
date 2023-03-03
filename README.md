# Webpack

Webpack é um module bundler, ou seja, um empacotador, que recebe as entradas (entry/entries, arquivos dos projetos) e transforma nas saídas (output) que condensa as depedências, junta arquivos gerais como CSS, fontes, imagens, etc, além do HTML, CSS e Javascript, podendo ter muitas configurações.

Muito utilizado para o conceito de SPA (single page applications) ajudando a criar projetos deste tipo, basicamente tem as entradas e saídas (como dito), loaders, plugins, modes, etc.

### Loaders

É a forma que o webpack trata diversos tipos de arquivos além do Javascript, podemos configurar o mesmo dentro do `webpack.config.js` , onde temos duas propriedades básicas a test, que define o tipo de arquivo e a use que define o loader a ser usado, os mesmos tem que ser instalados com npm ou yarn.

Basicamente para os loaders temos os básicos de um projeto:

```jsx
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entrada
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  }, // Saída
  mode: "development", // Definindo o modo de trabalho
  module: { // Modulos de loaders
    rules: [ // Regras dos loaders
      { // Loader para CSS e SCSS
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { // Loader para arquivos (neste caso imagens, mas pode ser outros)
        test: /\.(png|jpg|jpeg)$/,
        use: ["file-loader"],
      },
      { // Loader para o babel "traduzir" o JS
        test: /\.m?js$/,
        exclude: "/(node_modules|bower_components)/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      { // Loader para arquivos HTML
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
};
```

### Plugins

Basicamente são funcionalidades que podem ser implementadas no webpack, configurado logo abaixo do loader, os mesmos tem as mais diversas funcionalidades, desde criar arquivos css separados dos javascript até evitar problemas de cache excluindo arquivos antigos e gerando novos. Assim como os loaders devemos instalar os mesmos antes de configurar no `webpack.config.js` .

```jsx
const path = require("path");
// Plugin que cria um arquivo .css separado do JS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Para definir o plugin com constantes
const webpack = require("webpack");
// Plugin que lê arquivos .env e suas constantes
const DotEnvPlugin = require("dotenv-webpack");
// Plugin para criar HTML automático, sem a necessidade de criá-los no /public
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Plugin que apaga arquivos antigos e cria novos, evitando assim cache no navegador
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
		// Saída .js definida por um hash para evitar problemas com cache
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
				// O loader style-css agora é um plugin que define um .css quando fazemos o build
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
		// Definido primeiro para poder apagar tudo antes de gerar novos arquivos
    new CleanWebpackPlugin(),
		// Saída .css definida também com hash para evitar cache
    new MiniCssExtractPlugin({
      filename: "[name][contenthash].css",
    }),
		// Definindo a constante de porta (exemplo)
    new webpack.DefinePlugin({
      PORT: JSON.stringify("8080"),
    }),
		// Definindo o plugin que pega informações do .env, para usar as informações basta fazer o process.env.
    new DotEnvPlugin(),
		// Gerando HTML Automático 
    new HtmlWebpackPlugin(),
  ],
};
```

### Modes

É a forma que o webpack está rodando, onde pode ser a de desenvolvimento e a de produção, sendo a segunda mais “limpa”, podemos separá-los de uma forma simples com um `webpack.config.prod.js` e `webpack.config.dev.js` , criando configurações isoladas, e ambas são configuradas e executadas de formas separadas. Podemos definir no `webpack.config.js` , mas não é usual.

As configurações não variam muito e podem ser vistas abaixo:

```jsx
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
// Define webpack prod
  mode: "production",
};
```

```jsx
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
// Define webpack dev
  mode: "development",
};
```

Por fim, podemos criar um servidor com o webpack, facilitando o desenvolvimento, ficando

```jsx
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "development",
// Para criar o servidor dev
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: false,
    },
    port: 8000,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new TerserPlugin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      title: "Development Mode",
    }),
  ],
};
```

### Integrações

Há várias integrações do webpack, inclusive com React, mas neste caso irá tratar somente de duas mais importantes que são a com typescript, que no geral é simples, basta instalar o typescript, após isso usar o comando `yarn tsc --init` deixando as seguintes linhas no `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "ES6",
    "allowJs": true,
    "outDir": "./dist" ,
    "esModuleInterop": true ,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true
  }
}
```

Após isso basta configurar o `webpack.config.js` com as informações do typescript

```jsx
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
```

Assim finalizando a configuração.
