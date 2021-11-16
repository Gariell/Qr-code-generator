// https://goqr.me/api/

let parameters
const btnGenerate = document.querySelector("button.qrCode--btn-generate");
const btnDownload = document.querySelector("button.qrCode--btn-download");
const input = document.querySelector("input.qrCode--input");
const qrImage = document.querySelector("img.qrCode--image");
const radioBtns = document.querySelector(".qrCode-radioGroup");
let format = 'svg'
let parametersJson = {
  "data": "dev.to",
  "ecc": "1",
  "size": 380,
  "backgroundColor": "255-255-255",
  "qrColor": "38-38-38",
  "padding": 1,
};



input.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) generate()
});

window.addEventListener('load', function () {
  generate()
})

function toggleFormat(p) {
  format = p;
  generate();
}

function toggleEcc(p) {
  parametersJson.ecc = p
  generate();
}

function generate() {
  parametersJson.format = format
  parametersJson.data = input.value || "https://krizganovskiy.ru";
  parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}&format=${parametersJson.format}&ecc=${parametersJson.ecc}`
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?${parameters}`
}

function downloadImage() {
  (function () {
    try {
      downloadResource(qrImage.src)
    } catch (e) {
      alert("Download failed.");
      console.log('Download failed.', e);
    }

    function forceDownload(blob) {
      let a = document.createElement('a');
      a.download = "QR-code";
      a.href = blob;
      a.click()
    }

    function downloadResource(url) {
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