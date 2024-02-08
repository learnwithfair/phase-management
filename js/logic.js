let sidebar = document.getElementById("sidebar");
let humburger = document.getElementById("humbergar");
let xicon = document.getElementById("xicon");

const background_section = document.getElementById("background_section");
const welcome_section = document.getElementById("welcome_section");
const continue_section = document.getElementById("continue_section");
const logos_section = document.getElementById("logos_section");
const game_section = document.getElementById("game_section");

const phaseOneBtn = document.getElementById("phase-1");
const phaseOTwoBtn = document.getElementById("phase-2");

const xInputWelcome = document.getElementById("welcome-text-x-position");
const yInputWelcome = document.getElementById("welcome-text-y-position");
xInputWelcome.value = window.innerWidth / 2;
yInputWelcome.value = window.innerHeight * 0.75;

const xInputContinue = document.getElementById("continue-text-x-position");
const yInputContinue = document.getElementById("continue-text-y-position");
xInputContinue.value = window.innerWidth / 2;
yInputContinue.value = window.innerHeight * 0.9;

const toggleSideBarContent = (section) => {
  const clickedSection = document.getElementById(section);
  const open_section = document.querySelector(".show_section");

  if (clickedSection) {
    if ([...clickedSection.classList].includes("hide_section")) {
      clickedSection.classList.remove("hide_section");
      clickedSection.classList.add("show_section");
      if (open_section) {
        open_section.classList.add("hide_section");
        open_section.classList.remove("show_section");
      }
    } else {
      clickedSection.classList.add("hide_section");
      clickedSection.classList.remove("show_section");
    }
  }
};

const toggleSideBarFunc = () => {
  sidebar.classList.toggle("open_sidebar");
  game_section.classList.toggle("game_expand");
  if ([...sidebar.classList].includes("open_sidebar")) {
    humburger.classList.add("hidden");
    xicon.classList.toggle("hidden");
    background_section.classList.add("hide_section");
    welcome_section.classList.add("hide_section");
    continue_section.classList.add("hide_section");
    logos_section.classList.add("hide_section");
    // sidebarIsopen = true;
    xicon.classList.add("block");
  } else {
    xicon.classList.add("hidden");
    humburger.classList.remove("hidden");
    sidebarIsopen = false;
  }
};

function extractNumberFromLogoId(logoId) {
  const parts = logoId.split("-");
  const lastPart = parts[parts.length - 1];
  const logoNumber = parseInt(lastPart, 10);
  return isNaN(logoNumber) ? null : logoNumber;
}

const deleteLogo = (logo) => {
  const logoElement = document.getElementById(logo);
  logoElement.classList.add("hidden");
  const logoNumber = extractNumberFromLogoId(logo);
  deleteSign(logoNumber);
};

const signPositions = [
  { x: 0.25, y: 0.25 },
  { x: 0.5, y: 0.25 },
  { x: 0.75, y: 0.25 },
  { x: 0.33, y: 0.5 },
  { x: 0.66, y: 0.5 },
];

// for (let i = 1; i <= 5; i++) {
//   createLogo(i);
// }

function createLogo(logoNumber, logoPos) {
  const logosSection = document.getElementById("logos_section");

  // Create logo container div
  const logoDiv = document.createElement("div");
  logoDiv.id = `logo-${logoNumber}`;
  logoDiv.className = "space-y-4 pb-4";

  // Create logo header
  const headerDiv = document.createElement("div");
  headerDiv.className = "flex items-center justify-between";
  headerDiv.innerHTML = `
    <p class="font-semibold">Logo ${logoNumber}</p>
    <svg onclick="deleteLogo('logo-${logoNumber}')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  `;
  logoDiv.appendChild(headerDiv);
  logosSection.appendChild(logoDiv);

  // Create logo content
  const contentDiv = document.createElement("div");
  contentDiv.className = "space-y-6";

  const elements = [
    {
      label: "Text",
      type: "selectbox",
      id: `logo-${logoNumber}-text`,
      value: `Logo ${logoNumber}`,
    },
    {
      label: "Logo Position",
      type: "position",
      idX: `logo-${logoNumber}-x-position`,
      idY: `logo-${logoNumber}-y-position`,
    },
  ];

  elements.forEach((element) => {
    const containerDiv = document.createElement("div");

    if (element.type === "selectbox") {
      containerDiv.innerHTML = `
        <p class="block mb-2 text-sm font-medium text-gray-900">${element.label}</p>
        <select id="${element.id}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none">
           <option value="8" selected>8 Free Spins</option>
           <option value="10">10 Free Spins</option>
           <option value="15">15 Free Spins</option>
           <option value="16">16 Free Spins</option>
           <option value="18">18 Free Spins</option>
           <option value="20">20 Free Spins</option>
           <option value="22">22 Free Spins</option>
           <option value="24">24 Free Spins</option>
           <option value="26">26 Free Spins</option>
      </select>
      `;
    } else if (element.type === "position") {
      containerDiv.innerHTML = `
        <p class="block mb-2 text-sm font-medium text-gray-900">${
          element.label
        }</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 mr-2">
            <label for="${
              element.idX
            }" class="text-sm font-medium text-gray-900">X</label>
            <input type="text" id="${
              element.idX
            }" class="px-2 py-1 border-none outline-none focus:outline-none" value="${
        window.innerWidth * logoPos.x
      }"/>
          </div>
          <div class="flex items-center space-x-3 ml-2">
            <label for="${
              element.idY
            }" class="text-sm font-medium text-gray-900">Y</label>
            <input type="text" id="${
              element.idY
            }" class="px-2 py-1 border-none outline-none focus:outline-none" value="${
        window.innerHeight * logoPos.y
      }"/>
          </div>
        </div>
      `;
    } else {
      containerDiv.innerHTML = `
        <label for="${
          element.id
        }" class="block mb-2 text-md font-medium text-gray-900">${
        element.label
      }</label>
        <div class="w-full">
          <input id="${
            element.id
          }" class="px-2 py-1 w-full border-none outline-none focus:outline-none" type="${
        element.type
      }" value="${element.value || ""}" />
        </div>
      `;
    }

    contentDiv.appendChild(containerDiv);
    logosSection.appendChild(contentDiv);
  });

  // if (logoNumber >= signPositions.length) {
  //   document.getElementById(`logo-${logoNumber}-x-position`).value =
  //     window.innerWidth * 0.5;
  //   document.getElementById(`logo-${logoNumber}-y-position`).value =
  //     window.innerHeight * 0.5;
  //   document.getElementById(`logo-${logoNumber}-text-x-position`).value =
  //     window.innerWidth * 0.5;
  //   document.getElementById(`logo-${logoNumber}-text-y-position`).value =
  //     window.innerHeight * 0.5 + 50;
  // } else {
  //   document.getElementById(`logo-${logoNumber}-x-position`).value =
  //     window.innerWidth * signPositions[logoNumber - 1].x;
  //   document.getElementById(`logo-${logoNumber}-y-position`).value =
  //     window.innerHeight * signPositions[logoNumber - 1].y;
  //   document.getElementById(`logo-${logoNumber}-text-x-position`).value =
  //     window.innerWidth * signPositions[logoNumber - 1].x;
  //   document.getElementById(`logo-${logoNumber}-text-y-position`).value =
  //     window.innerHeight * signPositions[logoNumber - 1].y + 50;
  // }

  // Create "Change" button
  const button = document.createElement("button");
  button.innerHTML = "Change";
  button.className = "btn w-full";
  button.onclick = () => changeSign(logoNumber);

  // Append content and button to logo container
  contentDiv.appendChild(button);
  logoDiv.appendChild(contentDiv);

  // Create container for logo
  const containerDiv = document.createElement("div");
  containerDiv.className = `flex aaaaaaaaaaaa`;
  containerDiv.appendChild(logoDiv);

  // Append logo container to logos section
  logosSection.appendChild(logoDiv);
}

// Event listeners for drag and drop

const dropZoneBG = document.getElementById("bg-drop-zone");
dropZoneBG.addEventListener("dragover", handleDragOver);
dropZoneBG.addEventListener("drop", handleBGFileDrop);

function handleBGFileDrop(event) {
  event.preventDefault();
  dropZoneBG.classList.remove("bg-gray-300");
  const files = event.dataTransfer.files;

  if (files.length >= 3) {
    let atlasFile, jsonFile, imageFile;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name.toLowerCase();

      // Check file type based on extension
      if (fileName.endsWith(".atlas")) {
        atlasFile = file;
      } else if (fileName.endsWith(".json")) {
        jsonFile = file;
      } else if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg")
      ) {
        imageFile = file;
      }
    }

    if (atlasFile && jsonFile && imageFile) {
      console.log("found spine file");

      const formData = new FormData();
      formData.append("atlas", atlasFile);
      formData.append("json", jsonFile);
      formData.append("image", imageFile);

      // fetch("https://games.saz-zad.com/pixiSlotSimulator/server/index.php", {
      fetch("http://localhost/game/___PIXI/_F_SlotSimulator/server/upload.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          changeBackgroundSpine(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  if (files.length == 1) {
    console.log("found sprite file");
    addNewSign(files[0]);
  }
}

const dropZone = document.getElementById("drop-zone");
dropZone.addEventListener("dragover", handleDragOver);
dropZone.addEventListener("drop", handleFileDrop);

function handleDragOver(event) {
  event.preventDefault();
  dropZone.classList.add("bg-gray-300");
}

function handleBackgroundUpload() {
  const jsonFileInput = document.getElementById("json_background");
  const atlasFileInput = document.getElementById("atlas_background");
  const imageFileInput = document.getElementById("Spine_image_background");

  const atlasFile = atlasFileInput.files[0];
  const jsonFile = jsonFileInput.files[0];
  const imageFile = imageFileInput.files[0];

  if (atlasFile && jsonFile && imageFile) {
    // Create FormData and append all three files
    const formData = new FormData();
    formData.append("atlas", atlasFile);
    formData.append("json", jsonFile);
    formData.append("image", imageFile);

    // Send the files to the PHP script
    // fetch("https://games.saz-zad.com/pixiSlotSimulator/server/index.php", {
    fetch("http://localhost/game/___PIXI/_F_SlotSimulator/server/upload.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Use the received URLs to show the Spine animation
        console.log("data", data);
        changeBackgroundSpine(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function handleFileDrop(event) {
  event.preventDefault();
  dropZone.classList.remove("bg-gray-300");
  const files = event.dataTransfer.files;

  if (files.length >= 3) {
    let atlasFile, jsonFile, imageFile;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name.toLowerCase();

      // Check file type based on extension
      if (fileName.endsWith(".atlas")) {
        atlasFile = file;
      } else if (fileName.endsWith(".json")) {
        jsonFile = file;
      } else if (
        fileName.endsWith(".png") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg")
      ) {
        imageFile = file;
      }
    }

    if (atlasFile && jsonFile && imageFile) {
      console.log("found spine file");

      const formData = new FormData();
      formData.append("atlas", atlasFile);
      formData.append("json", jsonFile);
      formData.append("image", imageFile);

      // fetch("https://games.saz-zad.com/pixiSlotSimulator/server/index.php", {
      fetch(api_element_create, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          addNewSpine(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  if (files.length == 1) {
    console.log("found sprite file");
    addNewSign(files[0]);
  }
}

// changePhase

const changePhase = () => {
  phaseOneBtn.classList.remove("active_phase");
  phaseOTwoBtn.classList.add("active_phase");
};
