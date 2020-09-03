'use strict';

;;
(function () {
 
  var zip = new JSZip();
  var productId = $('meta[name="b2c_auction"]').attr('content');

  function saveAs(content, fileName) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }

  function getFileName(url) {
    if (url) {
      var arr = url.split('/')
      if (arr.length > 0) {
        return arr[arr.length - 1]
      }
    }
  }

  function getFileExtName(fileName) {
    if (fileName) {
      var arr = fileName.split('.');
      if (arr.length > 1) {
        return arr[arr.length - 1];
      }
    }
  }

  function getBase64(imgUrl) {
    window.URL = window.URL || window.webkitURL;
    var xhr = new XMLHttpRequest();
    xhr.open("get", imgUrl, true);
    // 至关重要
    return new Promise(function (resolve, reject) {
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          reject('error')
        }
      }
      xhr.send();
    });
  }

  function getImgURL() {
    var files = {};
    $('.nav.nav-tabs.fd-clr li').each(function (index, ele) {
      var imgs = $(ele).data('imgs');
      var fileName = getFileName(imgs.original);
      var fileExtName = getFileName(fileExtName);
      var realFileName = `${productId}_banner_${index}.${fileExtName}`;
      // banner.push(imgs.original);
      files[realFileName] = imgs.original;
    });

    $('#mod-detail-description img').each(function (index, ele) {
      var src = $(ele).attr('src');
      detail.push(src);
    });
  }

  function start() {
    getin
  }







})();