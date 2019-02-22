// ==UserScript==
// @name         虎牙免登陆切换清晰度
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  虎牙免登陆切换清晰度
// @author       Hugo16
// @match        www.huya.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.7.2.min.js
// @namespace    https://greasyfork.org/users/238424
// ==/UserScript==

(function () {
    'use strict';

    let nowIbitrate;
    takeNowIbitrate(false);
    setTimeout(() => {
        autoChange();
    }, 301e3);

})();

function takeNowIbitrate(notRecord) {
    if (document.querySelector("li[ibitrate='500']") !== null) {
        nowIbitrate = $('ul.player-videotype-list > li.on');
        changeEventRate(notRecord);
        return;
    }
    else {
        setTimeout(function () {
            takeNowIbitrate();
        }, 500);
    }
}

function autoChange() {
    setTimeout(() => {
        if (document.querySelector('#player-login-tip-wrap') != null) {
            $('#player-login-tip-wrap').remove();
            changeRate();
            takeNowIbitrate(true);
            changeEventLine();
            return;
        }
        else {
            autoChange();
        }
    }, 500);
}

function changeEventRate(notRecord) {
    $(".player-videotype-list li").click(function (e) {
        nowIbitrate = $(this);
        if (notRecord) {
            changeRate();
        }
    });
}

function changeEventLine() {
    $('.player-videoline-list li').on('click', () => {
        vplayer.vcore.reqBitRate(nowIbitrate.attr("iBitRate"), true);
        changeEventRate(true);
    })
}

function changeRate() {
    vplayer.vcore.reqBitRate(nowIbitrate.attr("iBitRate"), true);
    $('ul.player-videotype-list > li.on').removeClass('on');
    nowIbitrate.addClass('on');
    $('span.player-videotype-cur').text(nowIbitrate.text());
}
