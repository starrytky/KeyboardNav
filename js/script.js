let keys = [
    ['1','2','3','4','5','6','7','8','9','0'],
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
];

let sites = {
    'w':'wangdoc.com',
    "t":"translate.google.cn",
    "b":"bitwiser.in/blurt",
    "c":"tympanus.net/codrops",
    "d":"dribbble.com",
    "m":"developer.mozilla.org/zh-CN/docs/Web/JavaScript",
    "g":"github.com",
    "j":"jquery.com",
    "n":"nodejs.org/zh-cn",
    "v":"cn.vuejs.org",
    "r":"zh-hans.reactjs.org",
    "s":"www.mongodb.com/cn",
    "z":"www.colorzilla.com",
    "p":"compressjpeg.com",
    "h":"https://wallhaven.cc/",
    "x":"https://www.cssmatic.com/box-shadow"
};
let siteImgs = {
    "w":"http://wangdoc.com/assets/icons/favicon-32x32.png",
    "t":"http://translate.google.cn/favicon.ico",
    "b":"http://bitwiser.in/favicon.ico",
    "c":"http://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/themes/codropstheme03/favicons/favicon.ico",
    "d":"http://cdn.dribbble.com/assets/favicon-63b2904a073c89b52b19aa08cebc16a154bcf83fee8ecc6439968b1e6db569c7.ico",
    "m":"http://developer.mozilla.org/static/img/favicon32.7f3da72dcea1.png",
    "g":"http://github.com/favicon.ico",
    "j":"http://jquery.com/favicon.ico",
    "n":"http://nodejs.org/static/images/favicons/favicon.ico",
    "v":"http://cn.vuejs.org/images/icons/favicon-32x32.png",
    "r":"https://zh-hans.reactjs.org/favicon.ico",
    "s":"http://www.mongodb.com/assets/images/global/favicon.ico",
    "z":"https://www.colorzilla.com/favicon.ico",
    "p":"https://compressjpeg.com/images/compressjpeg/icon.png",
    "h":"https://wallhaven.cc/favicon.ico",
    "x":"https://www.cssmatic.com/img/favicon.png"
};

//去出localStorage中的websites对应的sites
let hashInLocalStorage = JSON.parse(localStorage.getItem("websites") || "null");
if (hashInLocalStorage){
    sites = hashInLocalStorage;
}


let kbn = document.getElementById("keyBoardNav");

for (let i=0;i<keys.length;i++) {
    let div = document.createElement("div");
    kbn.appendChild(div);
    for (let j = 0;j<keys[i].length;j++){
        let kbd = document.createElement("kbd");
        let btn = document.createElement("button");
        let span = document.createElement("span");

        //添加文字，图片
        span.textContent = keys[i][j];
        kbd.id = keys[i][j];
        if (siteImgs[keys[i][j]]) {
            let img = document.createElement("img");
            img.src = siteImgs[keys[i][j]];
            kbd.appendChild(img);
        }else if(!siteImgs[keys[i][j]]&&sites[keys[i][j]]){
            let img = document.createElement("img");
            img.src = "images/undefined.png";
            img.alt = "icon";
            kbd.appendChild(img);
        }
        btn.textContent = "编辑";


        //点击按钮后添加 网址、图片
        btn.onclick = function(){
            let key = this.parentNode.id;
            let temp = prompt("输入一个新网址或者clear所有缓存地址,原本的地址为:"+sites[keys[i][j]]);
            let img = null;
            // console.log(temp);
            if(temp !== null) {
                // if()
                console.log(this.parentElement.lastChild);
                img = document.createElement("img");
                img.src = "images/undefined.png";
            }
            if (temp === "clear"){
                localStorage.clear();
                window.location.reload();
            }else if (temp){
                sites[key] = temp;
                localStorage.setItem("websites",JSON.stringify(sites));
                kbd.appendChild(img);
            }
        };
        div.appendChild(kbd);
        kbd.appendChild(btn);
        kbd.appendChild(span);
    }
}

document.onkeypress = function(e){
    let key = e.key;
    let website = sites[key];
    if (sites[key]){
        window.open("http://"+website, "_blank");
    }
};
