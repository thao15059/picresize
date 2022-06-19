const finalCropWidth = 750;
const finalCropHeight = 500;
const finalAspectRatio = finalCropWidth / finalCropHeight;

const rex = /src="?([^"\s]+)"?\s*/;

let cropper;
let cropperBig;
let file;
let url;
let imageBig;

const loadFile = (event) => {
  // const image = document.getElementById("output");
  imageBig = document.getElementById("outputBig");

  if (event.type !== "drop") {
    // access local file
    file = !event.target.files
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    console.log(file);
    imageBig.src = URL.createObjectURL(file);

    imageBig.src = URL.createObjectURL(file);
    cropperBig = new Cropper(imageBig, {
      dragMode: "move",
      // autoCropArea: 1,
      restore: false,
      guides: true,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      minCropBoxWidth: 1000,
      minCropBoxHeight: 1000,
      wheelZoomRatio: 0.01,
    });
  } else {
    // access online file
    const imageUrl = event.dataTransfer.getData("text/html");
    url = rex.exec(imageUrl); // alert(url[1]);
    const fileName = "imageFromGoogle";
    fetch(url[1], {
      mode: "cors",
    }).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      file = new File([blob], fileName, { type: contentType });
      // access file here
      imageBig.src = URL.createObjectURL(file);
      cropperBig = new Cropper(imageBig, {
        dragMode: "move",
        // autoCropArea: 1,
        restore: false,
        guides: true,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        minCropBoxWidth: 1000,
        minCropBoxHeight: 1000,
        wheelZoomRatio: 0.01,
      });
    });
  }

  // image.src = URL.createObjectURL(event.target.files[0]);
  // cropper = new Cropper(image, {
  //   dragMode: "move",
  //   autoCropArea: finalAspectRatio,
  //   restore: false,
  //   guides: true,
  //   center: false,
  //   highlight: false,
  //   cropBoxMovable: false,
  //   cropBoxResizable: true,
  //   toggleDragModeOnDblclick: false,
  // });
  // imageBig.src = URL.createObjectURL(file);
  // cropperBig = new Cropper(imageBig, {
  //   dragMode: "move",
  //   // autoCropArea: 1,
  //   restore: false,
  //   guides: true,
  //   center: false,
  //   highlight: false,
  //   cropBoxMovable: false,
  //   cropBoxResizable: true,
  //   toggleDragModeOnDblclick: false,
  //   minCropBoxWidth: 1000,
  //   minCropBoxHeight: 1000,
  //   wheelZoomRatio: 0.01,
  // });
};

document.querySelector("#btnExport").addEventListener("click", function (e) {
  e.preventDefault();
  // var croppedImageDataURL = cropper.getCroppedCanvas({
  //   width: 750,
  //   height: 500,
  //   fillColor: "#fff",
  // });
  var croppedImageDataURLBig = cropperBig.getCroppedCanvas({
    width: 1000,
    height: 1000,
    fillColor: "#fff",
  });
  // document
  //   .querySelector("#output-crop")
  //   .setAttribute("src", croppedImageDataURL.toDataURL("image/png"));

  //   croppedImageDataURL.toBlob((blob) => {
  //     var link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = "750x500.png";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });

  document
    .querySelector("#output-crop-big")
    .setAttribute("src", croppedImageDataURLBig.toDataURL("image/png"));

  croppedImageDataURLBig.toBlob((blob) => {
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "1000x1000.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    location.reload();
  });
});

document.querySelector("#file").addEventListener("change", loadFile);

const dropArea = document.querySelector(".drag-area");

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropArea.addEventListener("dragleave", () => {});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();

  loadFile(event);
});
