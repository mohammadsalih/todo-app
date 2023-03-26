"use strict";

// funcitons
const updateUI = function () {
  itemsLeftLable.textContent = `${listItems.length} item left`;
};

const themeToggle = function () {
  if (themeToggleBtn.getAttribute("src") == "images/icon-moon.svg") {
    themeToggleBtn.src = "images/icon-sun.svg";

    root.style.setProperty("--body-background", "hsl(240, 20%, 12%)");
    root.style.setProperty("--task-background", "hsl(235, 24%, 19%)");
    root.style.setProperty("--text-color", "hsl(235, 29%, 83%)");
    root.style.setProperty(
      "--text-color-light",
      "hsl(235, 13%, 35%)"
    );
    root.style.setProperty(
      "--task-underline-color",
      "hsl(235, 17%, 26%)"
    );
  } else {
    themeToggleBtn.src = "images/icon-moon.svg";

    root.style.setProperty("--body-background", "hsl(0, 0%, 98%)");
    root.style.setProperty("--task-background", "hsl(0, 0%, 98%)");
    root.style.setProperty("--text-color", "hsl(235, 19%, 35%)");
    root.style.setProperty("--text-color-light", "hsl(236, 9%, 61%)");
    root.style.setProperty(
      "--task-underline-color",
      "hsl(255, 8%, 91%)"
    );
  }
};

// Function to swap two items in the list
const swapItems = function (fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

// Event listeners for the draggable items
const dragStart = function () {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
};

const drop = function () {
  const dragEndIndex = +this.closest("li").getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);
};

const dragOver = function (event) {
  event.preventDefault();
};

// Add event listeners to the draggable items
const addEventListeners = () => {
  const draggables = document.querySelectorAll(".draggable");
  const deleteTaskBtn = document.querySelectorAll(".task-delete");
  const checkboxs = document.querySelectorAll(".task-checkbox");
  const clearAll = document.querySelector(".clear-all-completed");
  const all = document.querySelector(".show-all");
  const avtive = document.querySelector(".show-avtive");
  const completed = document.querySelector(".show-completed");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragover", dragOver);
    draggable.addEventListener("drop", drop);
  });
  deleteTaskBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", deleteTask);
  });
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("click", toggleComplete);
  });
  all.addEventListener("click", showAll);
  avtive.addEventListener("click", showAvtive);
  completed.addEventListener("click", showCompleted);
  clearAll.addEventListener("click", clearAllTaskes);
};

const resetList = function () {
  index = 0;

  listItems.forEach((item) => {
    item.setAttribute("data-index", index);
    index++;
  });
};

const showAll = function () {
  listItems.forEach((item) => {
    item.classList.remove("hide-tsk");
  });
};
const showAvtive = function () {
  listItems.forEach((item) => {
    item.classList.contains("task-complete") &&
      item.classList.add("hide-tsk");
    !item.classList.contains("task-complete") &&
      item.classList.remove("hide-tsk");
  });
};

const showCompleted = function () {
  listItems.forEach((item) => {
    !item.classList.contains("task-complete") &&
      item.classList.add("hide-tsk");
    item.classList.contains("task-complete") &&
      item.classList.remove("hide-tsk");
  });
};

const clearAllTaskes = function () {
  // listItems.forEach((item) => {
  //   item.classList.contains("task-complete") && item.remove();
  //   if (item.classList.contains("task-complete")) {

  //     item.remove();
  //   }
  // });

  for (const [index, item] of listItems.entries()) {
    if (item.classList.contains("task-complete")) {
      item.remove();
      listItems.splice(index, 1);
    }
  }

  resetList();
  updateUI();
};

const toggleComplete = function () {
  const thisItem = this.closest("li");
  thisItem.classList.toggle("task-complete");
};

const deleteTask = function () {
  const thisItem = this.closest("li");
  const thisItemIndex = this.closest("li").getAttribute("data-index");

  listItems.splice(thisItemIndex, 1);
  thisItem.remove();

  resetList();

  updateUI();
};

const toggleActive = function () {
  allsettingsEl.forEach((setting) => {
    setting.classList.remove("settings-active");
  });

  this.classList.add("settings-active");
};

const addTask = function (event) {
  event.preventDefault();

  const inputValue = input.value;

  if (inputValue.trim() !== "") {
    const listItem = document.createElement("li");

    // Set the "data-index" attribute to the index of the person in the original array
    listItem.setAttribute("data-index", ++index);

    // Add HTML to the <li> element to display the person's name and number
    listItem.innerHTML = `
        <div class="draggable-container draggable" draggable="true">
          <label for="check${index}" class="task-checkbox-container">
            <input
              type="checkbox"
              id="check${index}"
              class="task-checkbox"
            />

            <div class="task-checkbox-style"></div>
          </label>

          <p class="task-text">${inputValue}</p>

          <a href="#" class="task-delete">
            <img src="images/icon-cross.svg" alt="calose icon"/>
          </a>
        </div>
      `;

    // Add the <li> element to the array
    listItems.push(listItem);

    // Add the <li> element to the <ul> element
    draggableList.appendChild(listItem);

    // update the ui after each change
    updateUI();
    // addding event listnes for the list elements
    addEventListeners();

    input.value = "";
  }
};

// elements variables
const root = document.documentElement;
const themeToggleBtn = document.querySelector(".theme-toggle");
const submit = document.querySelector(".task-submit");
const input = document.querySelector(".task-input");
const draggableList = document.querySelector(".draggable-list");
const itemsLeftLable = document.querySelector(".items-left");
const allsettingsEl = document.querySelectorAll(".setting");

// program variables
const listItems = [];

let index = -1;
let dragStartIndex;

// event listners
themeToggleBtn.addEventListener("click", themeToggle);

submit.addEventListener("click", addTask);
allsettingsEl.forEach((setting) => {
  setting.addEventListener("click", toggleActive);
});

// program
