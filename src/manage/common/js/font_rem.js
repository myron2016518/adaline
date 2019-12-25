import {os, isIe} from 'manage/common/js/util.js'

(function(doc, win) {
    const _os = os()
    const docEl = doc.documentElement
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    let recalc = function() {
        var clientWidth = docEl.clientWidth;
        // if (!clientWidth) return;
        // if(clientWidth>=640&&clientWidth<1080)clientWidth=640;
        // if(clientWidth>=1080)clientWidth=560;
        // docEl.style.fontSize = 60 * (clientWidth / 320) + 'px';

        if (_os === 'tablet') {
            docEl.style.fontSize = 90 + 'px';
        } else if (_os === 'mobile') {
            var curFontSize = parseInt(docEl.style.fontSize);
            docEl.style.fontSize = curFontSize * 2 + 'px';
        } else if (_os === 'pc') {
            docEl.style.fontSize = 75 + 'px';
        }
    };
    //if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    if (isIe()) {
        window.onload = recalc()
    } else {
        doc.addEventListener('DOMContentLoaded', recalc, false);
    }
})(document, window);
