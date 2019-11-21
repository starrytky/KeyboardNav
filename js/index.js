//1.初始化数据
let hash = init();
let keys = hash.keys;
let sites = hash.sites;
let siteImages = hash.siteImages;



//2，生成键盘
generateKeyboard(keys,sites,siteImages);


function init(){
    //初始化
    let keys = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
    let sites = {
        'w': 'wangdoc.com',
        "t": "translate.google.cn",
        "b": "bootcdn.cn/",
        "c": "tympanus.net/codrops",
        "d": "dribbble.com",
        "m": "developer.mozilla.org/zh-CN/docs/Web/JavaScript",
        "g": "github.com",
        "j": "jquery.com",
        "n": "nodejs.org/zh-cn",
        "v": "cn.vuejs.org",
        "r": "zh-hans.reactjs.org",
        "s": "www.mongodb.com/cn",
        "z": "www.colorzilla.com",
        "p": "compressjpeg.com",
        "h": "wallhaven.cc/",
        "x": "www.cssmatic.com/box-shadow",
        "i": "www.iconfont.cn"
    };
    let siteImages = {
        "w": "http://wangdoc.com/assets/icons/favicon-32x32.png",
        "t": "http://translate.google.cn/favicon.ico",
        "b": "https://www.bootcdn.cn/assets/ico/favicon.ico?1573935549448",
        "c": "http://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/themes/codropstheme03/favicons/favicon.ico",
        "d": "http://cdn.dribbble.com/assets/favicon-63b2904a073c89b52b19aa08cebc16a154bcf83fee8ecc6439968b1e6db569c7.ico",
        "m": "http://developer.mozilla.org/static/img/favicon32.7f3da72dcea1.png",
        "g": "http://github.com/favicon.ico",
        "j": "http://jquery.com/favicon.ico",
        "n": "http://nodejs.org/static/images/favicons/favicon.ico",
        "v": "http://cn.vuejs.org/images/icons/favicon-32x32.png",
        "r": "https://zh-hans.reactjs.org/favicon.ico",
        "s": "http://www.mongodb.com/assets/images/global/favicon.ico",
        "z": "https://www.colorzilla.com/favicon.ico",
        "p": "https://compressjpeg.com/images/compressjpeg/icon.png",
        "h": "https://wallhaven.cc/favicon.ico",
        "x": "https://www.cssmatic.com/img/favicon.png",
        "i": "https://gtms04.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico"
    };

    //取出localStorage中的websites对应的sites
    let hashInLocalStorage = getFromLocalStorage("websites");
    if (hashInLocalStorage) {
        sites = hashInLocalStorage;
    }

    return {
        "keys":keys,
        "sites":sites,
        "siteImages":siteImages
    };
}

//2.创建键盘
function generateKeyboard(keys, sites, siteImages){
    let kbn = document.getElementById("keyBoardNav");

    for (let i = 0; i < keys.length; i++) {
        let div = c("div");
        kbn.appendChild(div);
        for (let j = 0; j < keys[i].length; j++) {
            let kbd = c("kbd");
            kbd.id = keys[i][j];

            let span = c("span");
            span.textContent = keys[i][j];
            //添加文字，图片
            let img = c("img");
            if (siteImages[keys[i][j]]) {
                img.src = siteImages[keys[i][j]];
                kbd.appendChild(img);
            } else if (!siteImages[keys[i][j]] && sites[keys[i][j]]) {
                img.src = "images/undefined.png";
                img.alt = "icon";
                kbd.appendChild(img);
            }
            img.onerror = function (e) {
                e.target.src = "images/undefined.png";
            };

            let btn = c("button");
            btn.textContent = "编辑";
            btn.addEventListener("click", function(){
                let key = this.parentNode.id;
                let temp = prompt("输入一个新网址或者clear所有缓存地址,原本的地址为:" + sites[keys[i][j]]);
                let img = null;
                if (this.parentElement.firstChild.tagName!=="IMG") {
                    img = c("img");
                    img.src = "images/undefined.png";
                    kbd.appendChild(img);
                }
                if (temp === "clear") {
                    localStorage.clear();
                    window.location.reload();
                } else if (temp) {
                    sites[key] = temp;
                    localStorage.setItem("websites", JSON.stringify(sites));

                }
                stopBubble();
            });


            kbd.appendChild(btn);
            kbd.appendChild(span);
            div.appendChild(kbd);
        }
    }
}
//3.监听用户动作
listerToUser();
//监听用户动作
function listerToUser(){
    //3.监听键盘
    document.onkeypress = function (e) {
        let key = e.key;
        let website = sites[key];
        if (sites[key]) {
            window.open("https://" + website, "_blank");
        }
    };

//4.监听点击
    let kbds = document.getElementById("keyBoardNav");
    kbds.addEventListener("click", function (e) {
        let key = e.target.id;
        if (sites[key]) {
            window.open("https://" + sites[key], "_blank");
        }
    });
    //
// let kbds = document.getElementById("keyBoardNav");
// kbds.onclick = function (e) {
//     let key = e.target.id;
//     let website = sites[key];
//     if (sites[key]){
//         window.open("http://" + website, "_blank");
//     }
// };

}



//工具函数
function getFromLocalStorage(e){
    return JSON.parse(localStorage.getItem(e) || "null");
}

function c(tagName){
    return document.createElement(tagName);
}

//阻止事件冒泡
function stopBubble(e) {
    if (e && e.stopPropagation)
        e.stopPropagation();
    else
        window.event.cancelBubble = true;
}
