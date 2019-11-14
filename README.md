# KeyboardNav
## 键盘导航栏
>主要用于回顾js，顺便写点东西

## 知识点

### 1.background使用

大背景图使用格式：
````css
    body{
    background: rgb(186,47,89) url("..") no-repeat center center;    
    }
````
### 2.bottom中的文字

字体最小会有限制

### 3.居中

>左右居中

将元素自身转换为内联元素，父元素给text-align:center;

>上下左右居中

父元素添加
```css
div {
    display: inline-flex;
    align-items: center; /*左右对齐*/
    justify-content: center;/*上下对齐*/
    height: 100vh;
}
```

### 4.overflow:hidden;//顺手找的
>overflow:hidden的作用（溢出隐藏、清除浮动、解决外边距)

[详解博客](https://blog.csdn.net/qq_41638795/article/details/83304388)

1.溢出隐藏

通常是针对文本的常用命令：overflow:hidden，超过部分会直接切掉
```css
/*只适用于单行文本*/
div{ 
    width: 150px;
    background: skyblue;
    overflow: hidden;      /*溢出隐藏*/
    white-space: nowrap;	/*规定文本不进行换行*/
    text-overflow: ellipsis;	/*当对象内文本溢出时显示省略标记（...）*/
}
```

2.清除浮动

子元素浮动，父元素没有给高度，高度变0，给父元素清除浮动即可撑起盒子
使用overflow：hidden；是不能达到这样的效果，因此需要加上 zoom:1;

3.外边距塌陷

父级元素内部有子元素，如果给子元素添加margin-top样式，那么父级元素也会跟着下来，造成外边距塌陷，给父元素添加overflow：hidden即可

### 5.favicon
```html
    <link rel="icon" type="image/png" sizes="32x32" href="./images/apple-icon.png">
```
对着修改即可

### 6.冒泡与捕抓事件

[详细博客](https://www.cnblogs.com/msdn1433/p/5666844.html)

1事件传播——冒泡与捕获
　　默认情况下，事件使用冒泡事件流，不使用捕获事件流。然而，在Firefox和Safari里，你可以显式的指定使用捕获事件流，方法是在注册事件时传入useCapture参数，将这个参数设为true。

2冒泡事件流
　　当事件在某一DOM元素被触发时，例如用户在客户名字节点上点击鼠标，事件将跟随着该节点继承自的各个父节点冒泡穿过整个的DOM节点层次，直到它遇到依附有该事件类型处理器的节点，此时，该事件是onclick事件。在冒泡过程中的任何时候都可以终止事件的冒泡，在遵从W3C标准的浏览器里可以通过调用事件对象上的stopPropagation()方法，在Internet Explorer里可以通过设置事件对象的cancelBubble属性为true。如果不停止事件的传播，事件将一直通过DOM冒泡直至到达文档根。

3捕获事件流
　　事件的处理将从DOM层次的根开始，而不是从触发事件的目标元素开始，事件被从目标元素的所有祖先元素依次往下传递。在这个过程中，事件会被从文档根到事件目标元素之间各个继承派生的元素所捕获，如果事件监听器在被注册时设置了useCapture属性为true,那么它们可以被分派给这期间的任何元素以对事件做出处理；否则，事件会被接着传递给派生元素路径上的下一元素，直至目标元素。事件到达目标元素后，它会接着通过DOM节点再进行冒泡。


## 主要问题

### 1.prompt的问题

由于对浏览器自带的提示框不熟悉，在昨晚搞定localStorage缓存功能后，点击提示框的取消按钮，系统会自动清除所有的缓存。

早上再试没有出现该bug

### 2.favicon,ico的问题

原本的思路是在网址中添加"/favicon.ico",即可获取到需要的资源
由于许多网站为了避免被随意获取favicon.ico，将文件改名或者是移动到其他文件夹下，或者直接使用png格式图片作为图标。所以，更改了实现思路，创建一个siteImgs的hash表用于存储favicon的地址。

### 3.img的问题
由于src是在hash表里拿，新的网址，没有存进去就直接用一张本地图片代替。有空就自己更新，加进去。没办法菜啊~其实还可以看看网址下"/favicon.ico"是否可以获取到图片，可以的话存进hash。不行再使用本地图片。

### 4.浏览器缩放问题
浏览器缩放时导致编辑按钮的字体挤压变形，暂未找到较好的解决办法。只能给css样式加background-size:cover;

### 5.点击事件冒泡
添加阻止冒泡的函数
```javascript
//使用时，在需要阻止的冒泡的函数中调用stopBubble()
function stopBubble(e){
    if (e && e.stopPropagation){
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}
```

### 6.监听点击事件
获取id，用e.target.offsetParent.id。直接在dom中找出来。

## 用到的网站

[渐变](https://www.colorzilla.com/) 
https://www.colorzilla.com/

[图片压缩](https://compressjpeg.com/) 
https://compressjpeg.com/

[背景图片](https://wallhaven.cc/)
https://wallhaven.cc/

[阴影](https://www.cssmatic.com/box-shadow)
https://www.cssmatic.com/box-shadow

[键盘设计](http://dribbble.com/)
http://dribbble.com/