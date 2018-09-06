const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=babel',  //使用happypack进行多核打包，加快打包速度
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HappyPack({
      // 表示处理哪类文件
      id: 'babel',
      // 就是Loader的配置
      loaders: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['react', "es2015", 'stage-0'],
          plugins: ['transform-decorators-legacy', "transform-class-properties"]
        },
        // 共享进程池
        threadPool: happyThreadPool,
        // 输出日志
        verbose: true,
      }]
    })
  ]
};