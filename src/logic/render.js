import { getFileContentFromStorage } from "./content-management.js";
import { getCheckboxId } from "../utils.js";
import { CONTENT } from "../constants.js";

/**
 * @param  {string} property
 * @param  {boolean} [isChecked]
 */
export function renderOption(property, isChecked) {
  // Create Container with property and checkbox
  const container = document.createElement("div");
  container.className = "option";
  const labelProperty = document.createElement("label");
  labelProperty.textContent = property;
  const labelSwitch = document.createElement("label");
  container.appendChild(labelProperty);
  container.appendChild(labelSwitch);

  // Create checkbox and checked if corresponds
  labelSwitch.className = "switch";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;
  checkbox.id = property;
  const span = document.createElement("span");
  span.className = "slider round";
  labelSwitch.appendChild(checkbox);
  labelSwitch.appendChild(span);
  return container;
}

export const renderContentInLabel = async (content) => {
  const optionsSelector = document.getElementById("switches");
  const fileContent = (content && JSON.parse(content)) ||
    await getFileContentFromStorage();
  if (!fileContent) return;
  optionsSelector.innerHTML = "";
  for (const property in fileContent) {
    const isChecked = fileContent[property];
    const option = renderOption(property, isChecked);
    optionsSelector.appendChild(option);
    renderPropertyWithOption(option);
  }
};

export const renderPropertyWithOption = (option) => {
  const checkboxId = getCheckboxId(option);
  const checkboxElement = document.getElementById(checkboxId);
  checkboxElement.addEventListener("change", async ({ target }) => {
    const content = await getFileContentFromStorage();
    content[checkboxId] = target.checked;
    chrome.storage.local.set({ [CONTENT]: JSON.stringify(content) });
  });
};
