# http模块
在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供网络资源的电脑，叫做服务器。
http模块是Node.js官方提供的、用来创建web服务器的模块。通过http模块提供的http.createServer()方法，就能方便的把一台普通的电脑，变成一台Web服务器，从而对外提供Web资源服务。

如果要希望使用http模块创建Web服务器，则需要先导入它
```js
const http = require('http');
```
## http模块的作用

服务器和普通电脑的区别在于，服务器上安装了 web 服务器软件，例如：IIS、Apache 等。通过安装这些服务器软件，就能把一台普通的电脑变成一台 web 服务器。

在 Node.js 中，我们不需要使用 IIS、Apache 等这些第三方 web 服务器软件。因为我们可以基于 Node.js 提供的http 模块，通过几行简单的代码，就能轻松的手写一个服务器软件，从而对外提供web 服务。

## 创建web服务器的基本步骤

### 创建web服务器实例
调用http.createServer()方法，即可快速创建一个web服务器实例：
```js
const server = http.createServer()
```

### 为服务器实例绑定request事件
为服务器实例绑定request事件，即可监听客户端发送过来的网络请求
```js
// 使用服务器实例的.on()方法，为服务器绑定一个request事件
server.on('request',(req,res)=>{
	// 只要有客户端来请求我们自己的服务器，就会触发request事件，从而调用这个事件处理函数
	console.log('Someone visit our web server')
})
```
**req参数**
作用：req是请求对象，它包含了与客户端相关的数据和属性。
- req.url：是客户端请求的URL地址，这里指的是端口号后面的地址
- req.method：是客户端的method请求类型

**res参数**
在服务器的request事件处理函数中，如果想访问与服务器相关的==**数据**==或**==属性==**，可以使用如下的方式：
- res.end()：向客户端发送指定的内容，并结束这次请求的处理过程

>为了防止中文显示乱码的问题，需要设置响应头Content-Type 的值text/html；charset=utf-8
`res.setHeader('Content-Type','text/html; charset=utf-8')`
### 启动服务器
调用服务器实例的`.listen()`方法，即可启动当前的web服务器实例
```js
// 调用server.listen(端口号，回调函数)方法,即可启动web服务器。
server.listen(80,()=>{
	console.log('http server running at http://127.0.0.1')
})
```

## 根据不同的url响应不同的内容
1. 获取==**请求的url地址**==
2. 设置==**默认的响应内容**==为404NOtfound
3. 判断用户请求的是否为`/`或`/index.html`
4. 判断用户请求的是否为其他页面
5. 设置`Content-Type响应头`，防止中文乱码
6. 使用`res.end()`把内容响应给客户端

```js
//导入http模块
const http = require('http');
// 创建web服务器实例
const server = http.createServer();
// 为服务器实例绑定request事件，监听客户端的请求
server.on('request', function (req, res) {
    const url = req.url;
    const method = req.method;
    let content = '<h1>404 Not found!</h1>';
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        content = '<h1>关乎页面</h1>'
    }
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.end(content);
})
// 启动服务器
server.listen(8080, function () {
    console.log('server running at http://127.0.0.1:8080')
})
```