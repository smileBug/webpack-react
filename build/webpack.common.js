const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: resolve(''),  // 配置基础目录(项目根目录)
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve('public')
  },
  resolve: { 
    extensions: [ '.tsx', '.ts', '.js', '.jsx'],
    alias: { 
      '@': resolve('src'),
      '_': 'lodash'
    } 
  },
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          presets: ['react', 'stage-0', ['env', { modules: false }]],
          // modules关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};