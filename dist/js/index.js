"use strict";

//统计一个字符串中出现次数最多的字母
/*思路：将字符串转换成数组，遍历数组将字母和字母出现的次数存储到
一个对象中，再遍历对象输出次数最多的字母和次数*/
var mostTimesChar = function mostTimesChar(str) {
    if (typeof str != "string") {
        console.log(str + " is not a String");
    }
    var strArr = str.split('');
    var tempObj = {};
    strArr.forEach(function (value, index, array) {
        if (strArr.indexOf(value) == index) {
            tempObj[value] = 1;
        } else {
            tempObj[value]++;
        }
    });
    console.log("origin String is: " + str);
    console.log(tempObj);
    var maxTimes = 1;
    var maxChar = [];
    for (var key in tempObj) {
        if (tempObj[key] > maxTimes) {
            maxTimes = tempObj[key];
        }
    };
    for (var _key in tempObj) {
        if (tempObj[_key] == maxTimes) {
            maxChar.push(_key);
        }
    };
    maxChar.forEach(function (value) {
        console.log("most times char is " + value + ",times is " + maxTimes);
    });
};
// mostTimesChar("abbcddffjddddljjnvdkljdasjsvedd");
// mostTimesChar("我爱北京天安门，天安门非常宏伟");

var data = ["abc", "adb", "aaa", "abdd", "abcdds"];
var tipsBox = document.getElementById('tipsBox');
var searchBox = document.getElementById('searchBox');
var matchedList = [];
var lastKeyWord = void 0,
    tipsItemList = void 0,
    lastColoredItem = void 0,
    currentColoredItem = void 0;

var instantTips = function instantTips(keyWord) {
    var regExp1 = void 0,
        tipsHtml = void 0;
    if (!keyWord) {
        console.log("no keyWords");
        tipsBox.style.display = "none";
        return;
    }
    tipsBox.style.display = "none";
    regExp1 = new RegExp("" + keyWord);
    data.forEach(function (value) {
        if (value.match(regExp1) != null) {
            matchedList.push(value);
        }
    });
    console.log("matched item is : " + matchedList);
    if (matchedList.length) {
        tipsBox.style.display = "block";
        tipsHtml = "";
        matchedList.forEach(function (value, index) {
            tipsHtml += "<li class=\"tips-item\" index=\"" + index + "\">" + value + "</li>";
        });
        tipsBox.innerHTML = tipsHtml;
        if (tipsBox.style.display == "block") {
            tipsItemList = document.getElementsByClassName('tips-item');
            lastColoredItem = 0;
            currentColoredItem = 0;
            tipsItemList[0].className = "active tips-item";
        }
    }
};

document.addEventListener('keyup', function (event) {
    var keyNum = event.which,
        keyWord = void 0;
    if (keyNum == 38) {
        lastColoredItem <= 0 ? currentColoredItem = tipsItemList.length - 1 : currentColoredItem--;
        tipsItemList[lastColoredItem].className = "tips-item";
        tipsItemList[currentColoredItem].className = "active tips-item";
        lastColoredItem = currentColoredItem;
        searchBox.value = matchedList[currentColoredItem];
    } else if (keyNum == 40) {
        lastColoredItem >= tipsItemList.length - 1 ? currentColoredItem = 0 : currentColoredItem++;
        tipsItemList[lastColoredItem].className = "tips-item";
        tipsItemList[currentColoredItem].className = "active tips-item";
        lastColoredItem = currentColoredItem;
        searchBox.value = matchedList[currentColoredItem];
    } else if (keyNum == 13) {
        keyWord = document.getElementById('searchBox').value;
        window.open("http://www.baidu.com/s?wd=" + keyWord);
    } else {
        keyWord = document.getElementById('searchBox').value;
        console.log("input char is \uFF1A" + keyWord + ",keyCode is :" + keyNum);
        matchedList.length = 0;
        instantTips(keyWord);
    }
});