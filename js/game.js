var textures;
var welcomeText;
var button, buttonText;
var logos = [];
var logoNo = 0;
var logoPositions;
var prevSign;
var prevSignSkin;
var logoContainer;
var overlay;
var bg;
// let sidebar = document.getElementById("sidebar");
const app = new PIXI.Application({
  // width: window.innerWidth,
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  resizeTo: window,
});

const isPortrait = window.innerHeight > window.innerWidth;
// const bgStage2Url = isPortrait ? 'assets/stage2portrait/bg_bonus_portrait.json' : 'assets/stage2desktop/bg_bonus_desktop.json';

// PIXI.Assets.add("bgStage2", bgStage2Url);
PIXI.Assets.add("button", "assets/button.png");
PIXI.Assets.add("button_click", "assets/button_click.png");
PIXI.Assets.add("button_over", "assets/button_over.png");

var assets = [ "button", "button_click", "button_over"];

const texturesPromise = PIXI.Assets.load(assets);
texturesPromise.then((texture) => {
  textures = texture;

  bg = new PIXI.Container();
  app.stage.addChild(bg);

  const welcomeTextStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    align: "center",
    fontSize: 36,
    fontWeight: "bold",
    fill: ["#E9F5FF"],
    wordWrap: true,
    wordWrapWidth: 700,
  });
  welcomeText = new PIXI.Text(
    "Scegli il Jazz Club\ne scopri il numero di giri gratuiti",
    welcomeTextStyle
  );
  welcomeText.anchor.set(0.5);
  welcomeText.x = app.screen.width * 0.5;
  welcomeText.y = app.screen.height * 0.75;
  app.stage.addChild(welcomeText);

  button = PIXI.Sprite.from(textures.button);
  button.anchor.set(0.5);
  button.x = app.screen.width * 0.5;
  button.y = app.screen.height * 0.9;
  button.alpha = 0;
  button.eventMode = "static";
  button.cursor = "pointer";
  button
    .on("pointerdown", onButtonDown)
    .on("pointerover", onButtonOver)
    .on("pointerout", onButtonOut);

  const style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontWeight: "lighter",
    fill: ["#501B01"],
    wordWrap: true,
  });
  buttonText = new PIXI.Text("CONTINUA", style);
  buttonText.anchor.set(0.5);
  buttonText.x = app.screen.width * 0.5;
  buttonText.y = app.screen.height * 0.9;
  buttonText.alpha = 0;

  logoContainer = new PIXI.Container();
  app.stage.addChild(logoContainer);

  logoPositions = [
    { x: 0.25, y: 0.25 },
    { x: 0.5, y: 0.25 },
    { x: 0.75, y: 0.25 },
    { x: 0.33, y: 0.5 },
    { x: 0.66, y: 0.5 },
    { x: 0.25, y: 0.75 },
    { x: 0.5, y: 0.75 },
    { x: 0.75, y: 0.75 },
  ];

  overlay = new PIXI.Graphics();
  overlay.beginFill(0x000000, 0.9);
  overlay.drawRect(0, 0, app.renderer.width, app.renderer.height);
  overlay.endFill();
  overlay.position.set(0, 0);

});


function changeBackgroundSpine(data) {
  PIXI.Assets.load(data.json).then((resource) => {
    if (bg) {
      bg.removeChildren();
      const spine = new PIXI.spine.Spine(resource.spineData);
      spine.x = app.screen.width / 2;
      spine.y = app.screen.height / 2;
      spine.width = app.renderer.width;
      spine.height = app.renderer.height;
      bg.addChild(spine);
      setBackgroundConfigDefault();
    } else {
      console.log("bg not found");
    }
  });
}

function setBackgroundConfigDefault() {
  document.getElementById(`bg-width`).value = app.renderer.width;
  document.getElementById(`bg-height`).value = app.renderer.height;
  document.getElementById('bg-x-position').value = app.screen.width / 2;
  document.getElementById('bg-y-position').value = app.screen.height / 2;
}

function changeBackgroundConfig() {
  if (bg) {
    var newbg = bg.getChildAt(0);
    newbg.x = document.getElementById('bg-x-position').value;
    newbg.y = document.getElementById('bg-y-position').value;
    newbg.width = document.getElementById(`bg-width`).value;
    newbg.height = document.getElementById(`bg-height`).value;
  }
}

function changeBackground() {
  const imageBackground = document.getElementById('imageBackground');
  const file = imageBackground.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageDataURL = e.target.result;

      // Remove existing background sprite if any


      // Create a new texture from the uploaded image
      const newTexture = PIXI.Texture.from(imageDataURL);
      if (bg) {
        bg.removeChildren();
        var newbg = PIXI.Sprite.from(newTexture);
        newbg.anchor.set(0.5);
        newbg.x = app.screen.width / 2;
        newbg.y = app.screen.height / 2;
        newbg.width = app.renderer.width;
        newbg.height = app.renderer.height;
        bg.addChild(newbg);
        setBackgroundConfigDefault();
      } else {
        console.log("bg not found");
      }
    };
    reader.readAsDataURL(file);
  }
}

function changeButton() {
  const continueFile1 = document.getElementById('continue-image-1').files[0];
  const continueFile2 = document.getElementById('continue-image-2').files[0];
  const continueFile3 = document.getElementById('continue-image-3').files[0];

  if (continueFile1 && continueFile2 && continueFile3) {
    
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataURL = e.target.result;
      const newTexture = PIXI.Texture.from(imageDataURL);
      if (button) {
        button.texture = newTexture;
      } else {
        console.log("button not found");
      }
    };
    reader.readAsDataURL(continueFile1);
    
    const reader2 = new FileReader();
    reader2.onload = function (e) {
      const imageDataURL = e.target.result;
      const newTexture = PIXI.Texture.from(imageDataURL);
      if (textures) {
        textures.button_over = newTexture;
      } else {
        console.log("textures not found");
      }
    };
    reader2.readAsDataURL(continueFile2);
    
    const reader3 = new FileReader();
    reader3.onload = function (e) {
      const imageDataURL = e.target.result;
      const newTexture = PIXI.Texture.from(imageDataURL);
      if (textures) {
        textures.button_down = newTexture;
      } else {
        console.log("textures not found");
      }
    };
    reader3.readAsDataURL(continueFile2);
  }
}

function changeWelcomeText() {
  const textarea = document.getElementById('welcome-text');
  const xInput = document.getElementById('welcome-text-x-position');
  const yInput = document.getElementById('welcome-text-y-position');
  const xValue = parseFloat(xInput.value) || 0;
  const yValue = parseFloat(yInput.value) || 0;

  const newText = textarea.value;
  if (welcomeText) {
    welcomeText.text = newText;
    welcomeText.x = xValue;
    welcomeText.y = yValue;
  } else {
    console.log("welcomeText not found");
  }
}

function changeContinueText() {
  const textarea = document.getElementById('continue-text');
  const xInput = document.getElementById('continue-text-x-position');
  const yInput = document.getElementById('continue-text-y-position');
  const xValue = parseFloat(xInput.value) || 0;
  const yValue = parseFloat(yInput.value) || 0;

  const newText = textarea.value;
  if (buttonText) {
    buttonText.text = newText;
    buttonText.x = xValue;
    buttonText.y = yValue;
  } else {
    console.log("buttonText not found");
  }
}



function addNewSpine(data) {
  if (logoNo > 7) return;

  PIXI.Assets.load(data.json).then((resource) => {
    const logo = new PIXI.spine.Spine(resource.spineData);
    logo.position.set(
      window.innerWidth * logoPositions[logoNo].x,
      window.innerHeight * logoPositions[logoNo].y
    );
    for (const animation of logo.spineData.animations) {
      const match = animation.name.match(/(\w+)_(\d+)_(\w+)/);
      if (match) {
        const prefix = match[1];
        const number = match[2];
        const suffix = match[3]; 
        logo.name = `${prefix}_${number}` + "_";

        if(suffix=="idle") logo.animIdle = animation.name;
        else if(suffix=="win") logo.animWin = animation.name;
        console.log(`Prefix: ${prefix}, Number: ${number}, Suffix: ${suffix}`);
      }
    }
    logo.animSkin = 8;
    logo.scale.set(0.5);
    logo.eventMode = "static";
    logo.cursor = "pointer";
    logo
      .on("pointerdown", onSignDown)
      .on("pointerover", onSignOver)
      .on("pointerout", onSignOut);
    logoContainer.addChild(logo);
    logos[logoNo] = logo;
    createLogo(logoNo,logoPositions[logoNo]);
    window.logo=logo;
    logoNo++;
  });
}

function addNewSign(file) {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const texture = PIXI.Texture.from(e.target.result);
      const sprite = new PIXI.Sprite(texture);

      // Center the sprite
      sprite.anchor.set(0.5);
      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2;

      sprite.eventMode = "static";
      sprite.cursor = "pointer";
      // sprite.name = `sign_${logoNo + 1}` + "_";
      sprite
        .on("pointerdown", onSignDown)
        .on("pointerover", onSignOver)
        .on("pointerout", onSignOut);
      logoContainer.addChild(sprite);
      logos[logoNo] = sprite;
      logoNo++;
      createLogo(logoNo);
    };

    // Read the file as Data URL
    reader.readAsDataURL(file);
  } else {
    alert('Please drop/select an image file.');
  }
}

function changeSign(logoNumber) {
  const xInput = document.getElementById(`logo-${logoNumber}-x-position`)
  const yInput = document.getElementById(`logo-${logoNumber}-y-position`)
  const textInput = document.getElementById(`logo-${logoNumber}-text`)

  const xValue = parseFloat(xInput.value) || 0;
  const yValue = parseFloat(yInput.value) || 0;
  const skinValue = parseFloat(textInput.value) || 8;

  if (logos[logoNumber]) {
    logos[logoNumber].x = xValue;
    logos[logoNumber].y = yValue;
    logos[logoNumber].animSkin = skinValue;
  } else {
    console.log("logos[logoNumber] not found");
  }
}

function deleteSign(logoNumber) {
  {
    if (logos[logoNumber]) {
      logoContainer.removeChild(logos[logoNumber]);
    }
  }
}

function removeOverlay() {
  gsap.to(overlay, {
    alpha: 0,
    duration: 1,
    onComplete: () => {
      logoContainer.removeChild(overlay);
      console.log("Fad complete");
    },
  });
}

function onSignDown() {
  this.isdown = true;
  overlay.alpha = 0.9;
  logoContainer.addChild(overlay);
  logoContainer.removeChild(this);
  logoContainer.addChild(this);

  setTimeout(() => {
    removeOverlay();
  }, 2000);

  if (prevSign != null) {
    prevSign.skeleton.setSkinByName(prevSignSkin + "_l");
  }
  // this.skeleton.setSkinByName('8_fs')
  const availableSkinNumbers = [8, 10, 15, 16, 18, 20, 22, 24, 26];
  const randomSkinNumber = this.animSkin;
  const randomSkinName = `${this.animSkin}_fs`;
  if (this.name) {
    this.state.setAnimation(0, this.name + "win", false);
    this.skeleton.setSkinByName(randomSkinName);
  }
  this.alpha = 1;
  welcomeText.alpha = 0;
  // button.alpha = 1;
  // buttonText.alpha = 1;

  if (button.alpha == 0) {
    buttonText.alpha = 1;
    button.alpha = 1;
    app.stage.addChild(button);
    app.stage.addChild(buttonText);
  }

  prevSign = this;
  prevSignSkin = randomSkinName;
}

function onSignOver() {
  this.isOver = true;
  if (this.isdown) {
    return;
  }
  if (this.name) this.state.setAnimation(0, this.name + "idle", true);
  // this.state.setAnimation(0, 'sign_1_win', true)
  // container.addChild(overlay);
}

function onSignOut() {
  this.isOver = false;
  if (this.isdown) {
    return;
  }
  if (this.name) this.state.clearTrack(0);
  // container.removeChild(overlay);
}

function startNewScene() {
  console.log("Phase 2");
  app.stage.removeChildren();
  // app.stage.removeChild(container);
  // app.stage.removeChild(bg);
  // container.removeChild(this);

  // const stage2 = new PIXI.spine.Spine(textures.bgStage2.spineData);
  // if (isPortrait) {
  //   stage2.state.setAnimation(0, "bonus_bg_portrait_idle", true);
  // } else {
  //   stage2.state.setAnimation(0, "bonus_bg_desktop_idle", true);
  // }
  // stage2.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
  // bg.width = app.renderer.width;
  // bg.height = app.renderer.height;
  // app.stage.addChild(stage2);
}

function onButtonDown() {
  this.isdown = true;
  this.texture = textures.button_down;
  this.alpha = 1;
  startNewScene();
}

function onButtonOver() {
  this.isOver = true;
  if (this.isdown) {
    return;
  }
  this.texture = textures.button_over;
}

function onButtonOut() {
  this.isOver = false;
  if (this.isdown) {
    return;
  }
  this.texture = textures.button;
}

window.addEventListener("resize", () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);

  const sprite = app.stage.children[0];
  sprite.width = app.renderer.width;
  sprite.height = app.renderer.height;
});

document.addEventListener("DOMContentLoaded", () => {
  // document.body.appendChild(app.view);
  document.getElementById("pixi-container").appendChild(app.view);
});
