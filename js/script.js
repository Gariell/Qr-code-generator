let parameters
let parametersJson
let btnGenerate = document.querySelector("button.qrCode--btnGenerate");
let btnDownload = document.querySelector("button.qrCode--btnDownload");
let input = document.querySelector("input.qrCode--input");
let img = document.querySelector("img.qrCode--image");
let radioBtns = document.querySelector(".qrCode-radio");
let radioDisabled = true
let format

// убрать атрибут disabled с кнопки
input.addEventListener('input', e => {
  if (input.value != "") {
    btnGenerate.removeAttribute('disabled'); 
    radioBtns.classList.add('active');
  }
  if (input.value == "") {
    btnGenerate.setAttribute('disabled', ''); 
    radioBtns.classList.remove('active');
  }
});

// генерания по кнопке Enter
input.addEventListener('keydown', function (e) { if (e.keyCode === 13)  generate() });

//смена формата
function toggleFormat(p) {
  if ( btnGenerate.hasAttribute('disabled') || radioDisabled == true)   format = p; else if (parametersJson.format != p ) format = p; generate(); 
}

// функция генерации
function generate(){
  radioDisabled = false
  parametersJson.format = format
  parametersJson.data = input.value || "dev.to";
  parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}&format=${parametersJson.format}`
  img.src = `https://api.qrserver.com/v1/create-qr-code/?${parameters}`
  btnDownload.style.display = "block"
}

// функция скачки 
function downloadImage() {
  (function () {
    let images = [].slice.call(document.querySelectorAll('img'));
    try {
      images.forEach(function (img) {
        downloadResource(img.src)
      })
    } catch (e) {
      alert("Download failed."); console.log('Download failed.', e);
    }
    function forceDownload(blob) {
      let a = document.createElement('a');
      a.download = "QR-code";
      a.href = blob;
      a.click()
    }
    function downloadResource(url, filename) {
      fetch(url, {
        headers: new Headers({
          'Origin': location.origin
        }),
        mode: 'cors'
      }).then(response => response.blob()).then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl)
      }).catch(e => console.error(e))
    }
  }).call(window);
}