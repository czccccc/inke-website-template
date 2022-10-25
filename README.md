# inke-website-template

使用 vite 打包的通用官网模板

### 快速使用

```
npm install -g degit

degit https://github.com/czccccc/inke-website-template
```

在终端指向上述命令后，会生成一个文件名为 inke-website-template 的官网模板，安装依赖后，在根目录下的 scripts/config.js 里配置打包入口

```
//打包入口常规配置
const configs = [
  {
    input: 'demo1',//在开发文件夹下的目录（默认为src/website）
    output: 'demo1',//打包后在dist里的目录
  },
  //支持多页面
  {
    input: 'demo2',
    output: 'demo2',
  },
  //
];
```

然后就可以通过 npm run dev 和 npm run build 进行常规的开发和打包。

### 其他配置

##### 静态文件的配置

出于某些特殊的需求，需要在打包文件内添加静态文件，可以通过以下配置

```
const configs = [
  {
    input: 'demo1',
    output: 'demo1',
    static: 'app-ads.txt',//项目文件夹下的单个文件或文件夹名称，打包后名字不变
  },
    {
    input: 'demo1',
    output: 'demo1',
    //多个文件或文件夹可以使用数组形式
     static: [
      'app-ads.txt',//打包后名字不变
      {
        input: 'a',//打包前的名字
        output: 'b',//打包后的名字
      },
    ],
  },
];
```

##### 修改路径配置

dev 和 build 的文件路径在 config 中，dev 是 resolve(dirname, '../src')，build 是 resolve(dirname, '../src/website')

**需要注意的是虽然 build 和 dev 的定义的根路径，但是实际上是一样的。**dev 比 build 浅一层的原因是，在 dev 环境里，需要引入 src 的公共样式，如果 dev 加深一层，会丢失样式。

build 的路径可以随意修改，dev 的话修改路径之后需要在 srcipts/dev.js 中修改一下 log 的路径，把 website 替换掉。

##### 修改逻辑

dev 流程主要是在 vite 的 dev 流程上增加了 log 的功能，逻辑在 srcipts/dev.js 中，可以直接修改。

bulid 流程是用了 worker_threads 进行多线程打包，打包的主要配置在 srcipts/worker/woker.js 中。如果要增加打包的处理，建议以 plugin 的方式增加。
