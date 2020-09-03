'use strict';

let downloadImg = document.getElementById('downloadImg');

downloadImg.onclick = function () {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    if (tabs && tabs.length > 0) {
       chrome.tabs.executeScript(tabs[0].id, {file: 'assets/js/archive.js'});
    }
  })
};