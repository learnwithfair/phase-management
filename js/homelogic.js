const addSlotBtn = document.getElementById("addSlotBtn");
const deleteSlotDialog = document.getElementById("deleteSlotDialog");
const favDialog = document.getElementById("favDialog");
const number = document.getElementById("number");

const slotNameInput = document.getElementById("slot-name");
const slotsContainer = document.getElementById("slotsContainer");

let data = [];

const addNewSlot = () => {
  const formData = new FormData();
  formData.append("name", slotNameInput.value);
  axios
    .post(
      `http://localhost/_F_SlotSimulator/server/api/table/create.php`,
      formData
    )
    .then((response) => {
      let { slot_id } = response.data;

      const slotBox = document.createElement("div");
      slotBox.id = `slot-id-${slot_id}`;
      slotBox.className = "w-full";

      // title box
      const slotTitleDiv = document.createElement("div");
      slotTitleDiv.className = "w-full bg-[#FF914D] py-2";
      const slotTitle = document.createElement("p");
      slotTitle.classList =
        "font-bold text-xl text-center uppercase text-[#1b1b1b]";
      slotTitle.textContent = slotNameInput.value;

      slotTitleDiv.appendChild(slotTitle);

      // image box ...
      const slotImgDiv = document.createElement("div");
      slotImgDiv.classList = "w-full overflow-hidden";
      const slotImg = document.createElement("img");
      slotImg.classList = "h-[210px] w-full";
      const imageUrl = "./assets/gameover.jpg";
      slotImg.setAttribute("src", imageUrl);
      slotImgDiv.appendChild(slotImg);

      // all actions buttons ...
      const allActionsButtonContainer = document.createElement("div");
      allActionsButtonContainer.classList = "grid grid-cols-3 w-full";

      // test...
      const testButton = document.createElement("div");
      testButton.classList = "w-full";
      const testLink = document.createElement("a");
      testLink.classList =
        "w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-[#7ED957]";
      const linkUrl = `/test/${slot_id}`; // Replace with your URL
      testLink.setAttribute("href", linkUrl);
      testLink.textContent = "Test";

      testButton.appendChild(testLink);
      allActionsButtonContainer.appendChild(testButton);

      // edit...

      const editButton = document.createElement("div");
      editButton.classList = "w-full";
      const editLink = document.createElement("a");
      editLink.classList =
        "w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-[#D9D9D9]";
      const editlinkUrl = `phase1.html?id=${slot_id}`; // Replace with your URL
      editLink.setAttribute("href", editlinkUrl);
      editLink.textContent = "Edit";

      editButton.appendChild(editLink);
      allActionsButtonContainer.appendChild(editButton);
      // delete...
      const deleteButton = document.createElement("div");
      deleteButton.classList = "w-full cursor-pointer";

      deleteButton.addEventListener("click", function () {
        deleteFunc(slot_id);
      });

      const delete_p_tag = document.createElement("p");
      delete_p_tag.classList =
        "w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-[#FF3131]";
      delete_p_tag.textContent = "Delete";

      deleteButton.appendChild(delete_p_tag);
      allActionsButtonContainer.appendChild(deleteButton);

      slotBox.appendChild(slotTitleDiv);
      slotBox.appendChild(slotImgDiv);
      slotBox.appendChild(allActionsButtonContainer);

      slotsContainer.appendChild(slotBox);
      slotNameInput.value = "";
    })
    .catch((error) => {
      console.error("Axios error:", error);
    });
};

// delete slot...
const deleteFunc = (id) => {
  deleteSlotDialog.showModal();
  const deleteSlotForm = deleteSlotDialog.querySelector("form");

  deleteSlotForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const ItemToDelete = document.getElementById(`slot-id-${id}`);
    slotsContainer.removeChild(ItemToDelete);
    deleteSlotDialog.close();
  });
};

const get_all_slots = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost/_F_SlotSimulator/server/api/table/index.php`
    );

    if (data.length == 0) return;
    let html = "";

    data.forEach((element) => {
      const testLink = `test/${element._id}`;
      const editLink = `phase1.html?id=${element._id}`;
      html =
        html +
        `<div id=slot-id-${element._id} class="w-full">
              <div class="w-full bg-[#FF914D] py-2">
                <p class="font-bold text-xl text-center uppercase text-[#1b1b1b]">
                ${element.name}
                </p>
              </div>
              <div class="w-full overflow-hidden">
                <img src="./assets/gameover.jpg" class="" alt="" />
              </div>
  
              <div class="grid grid-cols-3 w-full">
                <div class="w-full">
                  <a
                    href=${testLink}
                    class="w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-[#7ED957]"
                    >Test</a
                  >
                </div>
  
                <div class="w-full">
                  <a
                    href=${editLink}
                    class="w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-slate-200"
                    >Edit</a
                  >
                </div>
  
                <div onclick="deleteFunc(${element._id})" class="w-full cursor-pointer">
                  <p
                    class="w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-[#FF3131]"
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>`;
    });
    slotsContainer.innerHTML = html;
    console.log(data);
    // <div id="1" class="w-full">
    //         <div class="w-full bg-[#FF914D] py-2">
    //           <p class="font-bold text-xl text-center uppercase text-[#1b1b1b]">
    //             My slot 23344
    //           </p>
    //         </div>
    //         <div class="w-full overflow-hidden">
    //           <img src="./assets/gameover.jpg" class="" alt="" />
    //         </div>

    //         <div class="grid grid-cols-3 w-full">
    //           <div class="w-full">
    //             <a
    //               href="/test"
    //               class="w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-[#7ED957]"
    //               >Test</a
    //             >
    //           </div>

    //           <div class="w-full">
    //             <a
    //               href="/edit"
    //               class="w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-slate-200"
    //               >Edit</a
    //             >
    //           </div>

    //           <div onclick="deleteFunc(1)" class="w-full cursor-pointer">
    //             <p
    //               class="w-full py-2 block text-lg text-center text-[#1b1b1b] font-medium bg-[#FF3131]"
    //             >
    //               Delete
    //             </p>
    //           </div>
    //         </div>
    //       </div>
  } catch (e) {
    console.log(e);
  }
};

get_all_slots();

// modal releted code ...
addSlotBtn.addEventListener("click", (event) => {
  favDialog.showModal();
});

favDialog.addEventListener("click", (event) => {
  if (event.target === favDialog) {
    favDialog.close();
  }
});

deleteSlotDialog.addEventListener("click", (event) => {
  if (event.target === deleteSlotDialog) {
    deleteSlotDialog.close();
  }
});
