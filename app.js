let out = document.getElementById("output");
let canvas = document.getElementById("canvas");
let download = document.getElementById("download");
let testButton = document.getElementById("test-button");
let width = document.getElementById("width-input");
let height = document.getElementById("height-input");
let xpos = document.getElementById("xpos-input");
let ypos = document.getElementById("ypos-input");

let widthText = document.getElementById("width-text-input");
let heightText = document.getElementById("height-text-input");
let xposText = document.getElementById("xpos-text-input");
let yposText = document.getElementById("ypos-text-input");

let captureInput = document.getElementById("capture-input");
let captureXpos = document.getElementById("capture-xpos-input");
let captureYpos = document.getElementById("capture-ypos-input");
let captureXposText = document.getElementById("capture-xpos-text-input");
let captureYposText = document.getElementById("capture-ypos-text-input");

let colorPickerBg1 = document.getElementById("color-picker-bg1");
let colorPickerBg2 = document.getElementById("color-picker-bg2");
let colorPickerText = document.getElementById("color-picker-textcolor");

let advice = document.getElementById("advice");
let container = document.getElementById("container");

let origWidth = document.getElementById("original-width");
let origHeight = document.getElementById("original-height");

let originalWidth = 0;
let originalHeight = 0;

let globalImage;

const startUp = () => {
  height.value = globalImage.height;
  width.value = globalImage.width;
  xpos.value = globalImage.xpos;
  ypos.value = globalImage.ypos;
  captureXpos.value = globalImage.textXpos;
  captureYpos.value = globalImage.textYpos;
  colorPickerBg1.value = "#000000";
  colorPickerBg2.value = "#000000";
  colorPickerText.value = "#ffffff";

  setInterval(() => {
    captureXposText.value = captureXpos.value;
    captureYposText.value = captureYpos.value;

    origWidth.innerHTML = originalWidth.toString();
    origHeight.innerHTML = originalHeight.toString();

    globalImage.setColors(
      colorPickerBg1.value,
      colorPickerBg2.value,
      colorPickerText.value
    );

    globalImage.setTextPosition(captureXpos.value, captureYpos.value);
  }, 50);

  setInterval(() => {
    globalImage.setText(captureInput.value.toString());
  }, 200);

  setInterval(() => {
    heightText.value = height.value;
    globalImage.changeHeight(height.value);
  }, 100);
  setInterval(() => {
    widthText.value = width.value;
    globalImage.changeWidth(width.value);
  }, 100);
  setInterval(() => {
    xposText.value = xpos.value;
    globalImage.changeXPos(xpos.value);
  }, 100);
  setInterval(() => {
    yposText.value = ypos.value;
    globalImage.changeYPos(ypos.value);
  }, 100);
};

out.addEventListener("dragenter", (event) => {
  event.stopPropagation();
  event.preventDefault();
});

out.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
});

out.addEventListener("drop", (event) => {
  console.log("test");

  event.stopPropagation();
  event.preventDefault();

  canvas.height = "540";

  globalImage = getFilesAndDraw(event);

  startUp();

  advice.style.display = "none";

  return;
});

const getFilesAndDraw = (event) => {
  const fileList = event.dataTransfer.files;
  const reader = new FileReader();

  let ctx = canvas.getContext("2d");
  let img = new CanvaImg(ctx);

  for (const file of fileList) {
    reader.addEventListener("load", (event) => {
      //set img src to result
      img.src = event.target.result;

      let tempImg = new Image();

      tempImg.src = event.target.result;

      originalWidth = tempImg.width;
      originalHeight = tempImg.height;

      img.addEventListener("load", () => {
        img.drawImageOnCanva();
      });
    });
    reader.readAsDataURL(file);
  }
  return img;
};

download.addEventListener("click", () => {
  let image = canvas.toDataURL("image/jpg");
  download.href = image;
});

download_img = function () {
  var image = canvas.toDataURL("image/jpg");
  canvas.href = image;
};

//Standard format 1080x1080px

class CanvaImg extends Image {
  constructor(ctx, xpos = 0, ypos = 0, width = 540, height = 540) {
    super();

    this.ctx = ctx;
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;

    this.backgroundColor = "#000000";
    this.textColor = "#ffffff";

    this.textXpos = 80;
    this.textYpos = 530;
    this.fontSize = "30px";
    this.font = "Helvetica";

    this.text = "";
  }

  changeWidth = (width) => {
    this.width = width;
    this.drawImageOnCanva();
  };

  changeHeight = (height) => {
    this.height = height;
    this.drawImageOnCanva();
  };

  changeXPos = (xpos) => {
    this.xpos = xpos;
    this.drawImageOnCanva();
  };

  changeYPos = (ypos) => {
    this.ypos = ypos;
    this.drawImageOnCanva();
  };

  drawImageOnCanva = () => {
    this.ctx.fillStyle = this.backgroundColor;

    this.ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    this.ctx.drawImage(this, this.xpos, this.ypos, this.width, this.height);
    this.drawTextOnCanva();
  };

  drawTextOnCanva = () => {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, this.textYpos - 30, this.width, 40);
    this.ctx.fillStyle = this.textColor;
    this.ctx.font = "30px Helvetica";

    this.ctx.fillText(this.text, this.textXpos, this.textYpos);
  };

  setText = (text) => {
    this.text = text;
  };

  setTextPosition = (xpos, ypos) => {
    this.textXpos = xpos;
    this.textYpos = ypos;
  };

  setBackgroundColor = (colorOne, colorTwo) => {
    let gradient = this.ctx.createLinearGradient(0, 0, 800, 800);
    gradient.addColorStop(0, colorOne);
    gradient.addColorStop(1, colorTwo);

    this.backgroundColor = gradient;
  };

  setColors(bgColor1, bgColor2, textColor) {
    this.setBackgroundColor(bgColor1, bgColor2);
    this.setTextColor(textColor);
  }

  setTextColor = (textColor) => {
    this.textColor = textColor;
  };

  setLinearGradientBackground = () => {};

  changeBorderColor = () => {};

  changeFontColor = () => {};
}

let LinkedList = {
  Head: {
    Value: 10,

    Next: {
      Value: 11,

      Next: {
        Value: 12,

        Next: null,
      },
    },
  },
};
