// function output(text) {
//   document.getElementById("output").textContent += text;
//   //dump(text);
// }

// let img = document.getElementById("img");
let out = document.getElementById("output");
let canvas = document.getElementById("canvas");
let textInput = document.getElementById("text-input");
let download = document.getElementById("download");

out.addEventListener("dragenter", (event) => {
  console.log("test");

  event.stopPropagation();
  event.preventDefault();
});

out.addEventListener("dragover", (event) => {
  console.log("test");
  event.stopPropagation();
  event.preventDefault();
});

out.addEventListener("drop", (event) => {
  console.log("test");

  console.log(event);
  event.stopPropagation();
  event.preventDefault();

  const fileList = event.dataTransfer.files;
  const reader = new FileReader();
  let img = new Image();
  console.log(fileList);

  for (const file of fileList) {
    console.log(file);

    reader.addEventListener("load", (event) => {
      console.log(event.target.result);

      img.addEventListener("load", () => {
        draw(img);
      });

      img.src = event.target.result;
    });

    reader.readAsDataURL(file);
  }
  return;
});

function draw(image) {
  let ctx = canvas.getContext("2d");

  console.log(image.width);

  ctx.drawImage(image, -100, -100);

  ctx.fillRect(0, 460, canvas.clientWidth, 40);

  ctx.font = "30px Helvetica";

  ctx.fillStyle = "#fff";

  ctx.fillText(textInput.value.toString(), 10, 490);

  drawNewText(ctx);

  //   let cropper = new Cropper(canvas);
}

const drawNewText = (ctx) => {
  ctx.fillStyle = "#000";

  ctx.fillRect(0, 460, canvas.clientWidth, 40);

  ctx.font = "30px Helvetica";

  ctx.fillStyle = "#fff";

  ctx.fillText(textInput.value.toString(), 80, 490);
};

download.addEventListener("click", () => {
  let image = canvas.toDataURL("image/jpg");
  download.href = image;
});

download_img = function (el) {
  var image = canvas.toDataURL("image/jpg");
  canvas.href = image;
};
