import todayIcon from "./icons/today.png";
import calendarIcon from "./icons/calendar.png";
import somedayIcon from "./icons/somday.png";
import doneIcon from "./icons/done.png";
import addIcon from "./icons/add.png";
import optionsIcon from "./icons/options.png";
import trashIcon from "./icons/poubelle.png";

// today icon
const imageToday = document.createElement("img");
imageToday.src = todayIcon;

const todayIconContainer = document.getElementById("today-icon");
todayIconContainer.appendChild(imageToday);

// calender icon
const imageCalendar = document.createElement("img");
imageCalendar.src = calendarIcon;

const calendarIconContainer = document.getElementById("calendar-icon");
calendarIconContainer.appendChild(imageCalendar);

// someday icon
const imageSomeday = document.createElement("img");
imageSomeday.src = somedayIcon;

const somedayIconContainer = document.getElementById("someday-icon");
somedayIconContainer.appendChild(imageSomeday);

// done icon
const imageDone = document.createElement("img");
imageDone.src = doneIcon;

const doneIconContainer = document.getElementById("done-icon");
doneIconContainer.appendChild(imageDone);

// add icon

const imageAdd = document.createElement("img");
imageAdd.src = addIcon;

const addIconContainer = document.getElementById("add-icon");
addIconContainer.appendChild(imageAdd);

const titleAddIcon = document.createElement("div");
titleAddIcon.textContent = "Add new page";
titleAddIcon.classList.add("hover-text");
addIconContainer.appendChild(titleAddIcon);

// options icon

export function addOptionsIcon(iconContainer) {
  const imageOptions = document.createElement("img");
  imageOptions.src = optionsIcon;

  iconContainer.appendChild(imageOptions);

  const titleOptionsIcon = document.createElement("div");
  titleOptionsIcon.textContent = "Rename,delete.";
  titleOptionsIcon.classList.add("hover-text");

  iconContainer.appendChild(titleOptionsIcon);
}

export function addTrashIcon(iconContainer) {
  const imageTrash = document.createElement("img");
  imageTrash.src = trashIcon;
  imageTrash.className = "trash-icon";

  const labeltrashIcon = document.createElement("div");
  labeltrashIcon.className = "label-trash-icon";
  labeltrashIcon.textContent = "Delete task";

  if (iconContainer.children.length === 0) {
    iconContainer.appendChild(imageTrash);
    iconContainer.appendChild(labeltrashIcon);
  }
}
