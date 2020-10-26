'use strict';

let alibbImg = document.getElementById('alibbImg');

alibbImg.onclick = function () {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    if (tabs && tabs.length > 0) {
       chrome.tabs.executeScript(tabs[0].id, {file: 'assets/js/archive.js'});
    }
  })
};

let meicai = document.getElementById('meicai');

meicai.onclick = function () {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    if (tabs && tabs.length > 0) {
       chrome.tabs.executeScript(tabs[0].id, {file: 'assets/js/meicai.js'});
    }
  })
};