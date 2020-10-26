'use strict';

;;
(function () {

  var productId = $('meta[name="b2c_auction"]').attr('content');
  var productName = $('.full-name').text();

  function saveAs(content, fileName) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }

  /**
   * 获取 URL 中的文件名称
   * @param {*} url 
   */
  function getFileName(url) {
    if (url) {
      var arr = url.split('/')
      if (arr.length > 0) {
        return arr[arr.length - 1]
      }
    }
  }

  /**
   * 获取文件名的扩展名
   * @param {*} fileName 
   */
  function getFileExtName(fileName) {
    if (fileName) {
      var arr = fileName.split('.');
      if (arr.length > 1) {
        return arr[arr.length - 1] || 'jpg';
      }
    }

    return 'jpg'
  }

  /**
   * 把一个网络上的图片转换成 blob 对象 
   * @param {}} imgUrl 
   */
  function getXhrBase64(imgUrl) {
    window.URL = window.URL || window.webkitURL;
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    return new Promise(function (resolve, reject) {
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        }
      }
      xhr.onreadystatechange = function () {}
      xhr.onerror = function () {
        reject('error')
      }
      xhr.open("get", imgUrl, true);
      xhr.send();
    });
  }

  function errorPromise () {
    return new Promise((resolve, reject) => {
      resolve('error');
    });
  }

  function getBase64Image(img, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    return dataURL;
  }

  function getCanvasBase64(img) {
    try {
      if (img) {
        var image = new Image();
        //至关重要
        image.crossOrigin = '';
        image.src = img;
        //至关重要
        var deferred = $.Deferred();
        image.onerror = function () {
          console.log("img.error")
        };
        image.onabort = function () {
          console.log("img.abort")
        };
        image.onload = function () {
          console.log(image);
          deferred.resolve(getBase64Image(image)); //将base64传给done上传处理
          //document.getElementById("container2").appendChild(image);
        }
        return deferred.promise(); //问题要让onload完成后再return sessionStorage['imgTest']
      }
    } catch (error) {
      console.log(error);
    }

  }

  /**
   * 获取美菜商品头图、商品详情等素材图片
   */
  function getImgURL() {
    var files = [];
    $('.slider-item img').each(function (index, ele) {
      var imgs = $(ele).attr('src');
      if (imgs) {
        if (imgs.indexOf('?') > -1) {
          imgs = imgs.split('?')[0];
        }
        var fileName = getFileName(imgs);
        var fileExtName = getFileExtName(fileName);
        var realFileName = `banner_${index}.${fileExtName}`;
        files.push({
          url: imgs,
          filename: realFileName
        });
      }
    });

    $('.describe-tab .img-list img').each(function (index, ele) {
      var src = $(ele).attr('src');
      if (src) {
        if (src.indexOf('?') > -1) {
          src = src.split('?')[0];
        }
        var fileName = getFileName(src);
        var fileExtName = getFileExtName(fileName);
        var realFileName = `desc_${index}.${fileExtName}`;
        files.push({
          url: src,
          filename: realFileName
        });
      }
    });
    console.log(files);
    return files;
  }

  function packageZip(files) {
    var zip = new JSZip();
    for (var i = 0; i < files.length; i++) {
      zip.file(files[i].filename, files[i].blob);
    }
    zip.generateAsync({
      type: 'blob'
    }).then(function (content) {
      saveAs(content, `美菜_${productName}.zip`);
    })
  }

  function start() {
    var files = getImgURL();
    var promiseArr = [];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      try {
        var p = getXhrBase64(file.url)
        promiseArr.push(p);
      } catch (e) {
        // promiseArr.push(errorPromise())
        console.log('start  promise error');
      }

    }

    Promise.all(promiseArr).then(function (ret) {
      for (var i = 0; i < ret.length; i++) {
        files[i].blob = ret[i];
      }
      packageZip(files);
    });
  }

  start();

})();