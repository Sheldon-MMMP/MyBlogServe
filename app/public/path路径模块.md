# path路径模块

path模块是Node.js官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求

**导入方式**
```js
const path = require('path')
```

## path.join()
**作用**：将多个路径片段拼接成一个完整的路径字符串
```js
const pathStr = path.join('/a', '/b/c', '../', './d', 'e')

console.log(pathStr); // 输出 \a\b\d\e
```

>注意：今后凡是涉及到路径拼接的操作，都要使用path.join()方法进行处理。不要直接使用+进行字符串的拼接。
## path.basename()
作用：用来从路径字符串中，将文件名解析出来。

使用path.basename()方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名

**语法**
```js
path.basename(path[,ext])
```
参数：
- path\<string\>必选参数，表示一个路径的字符串。

- ext\<string\>可选参数，表示文件扩展名

- 返回：\<string\>表示路径中的最后一部分

实例
```js
const fpath ='/a/b/c/index.html' // 文件的存放路径

var fullName = path.basename(fpath)
console.log(fullName) //输出index.html

var namewithoutExt = path.basename(fpath, '.html')
console.log(namewithoutExt)// 输出 index
```


## path.extname()
使用path.extname()方法，可以获取路径中的扩展名部分。

**语法**
```js
path.extname(path)
```
**参数**
- path\<string\>必选参数，表示一个路径的字符串

- 返回：\<string\>返回得到的扩展名字符串

**实例**
```js
const fext = path.extname(fpath);  //路径字符串
console.log(fext);//输出： .html
```

## path.resolve()
`path.resolve()` 方法用于将一系列路径段解析为绝对路径。它通过处理从右到左的路径序列来工作，在每个路径之前添加，直到创建绝对路径。生成的路径被规范化，并根据需要删除尾部斜杠。  
如果没有给出路径段作为参数，则使用当前工作目录的绝对路径。  
**句法：** 

path.resolve( [...paths] )

**参数：** 此函数接受一个如上所述和如下所述的参数： 

-   **路径：** 它是一系列文件路径，它们将一起解析形成绝对路径。如果此参数不是字符串值，则会引发 TypeError。

**返回值：** 返回一个带有绝对路径的字符串。

```js
// Node.js program to demonstrate the
// path.resolve() Method

// Import the path module
const path = require('path');

console.log("Current directory:", __dirname);

// Resolving 2 path-segments
// with the current directory
path1 = path.resolve("users/admin", "readme.md");
console.log(path1)

// Resolving 3 path-segments
// with the current directory
path2 = path.resolve("users", "admin", "readme.md");
console.log(path2)

// Treating of the first segment
// as root, ignoring the current directory
path3 = path.resolve("/users/admin", "readme.md");
console.log(path3)
```

**输出：** 
```
当前目录：G:\tutorials\nodejs-path-resolve
G:\tutorials\nodejs-path-resolve\users\admin\readme.md
G:\tutorials\nodejs-path-resolve\users\admin\readme.md
G:\users\admin\readme.md
```
