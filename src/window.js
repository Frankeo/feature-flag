export const CONTENT = "content";

export function initialExecute() {
  AddChromeOnChangedListener();
  AddUploadFileEvent();
  AddDownloadFileEvent();
  renderContentInLabel();
}

function saveFileContent(file) {
  var reader = new FileReader();
  reader.onload = function (event) {
    const result = event.target.result;
    chrome.storage.local.set({ [CONTENT]: result });
  };
  reader.readAsText(file);
}

export const renderContentInLabel = async (content) => {
  const optionsSelector = document.getElementById('switches');
  const fileContent = (content && JSON.parse(content)) || await getFileContent();
  if (!fileContent) return;
  optionsSelector.innerHTML = '';
  for (const property in fileContent) {
    const isChecked = fileContent[property];
    const option = createOption(property, isChecked);
    optionsSelector.appendChild(option);
    updatePropertyWithOption(option);
  }
}

function updatePropertyWithOption(option) {
  const checkboxId = getCheckboxId(option);
  const checkboxElement = document.getElementById(checkboxId);
  checkboxElement.addEventListener('change', async ({target}) => {
    const content = await getFileContent();
    content[checkboxId] = target.checked;
    chrome.storage.local.set({ [CONTENT]: JSON.stringify(content) });
  });
}

export function getCheckboxId(option) {
  const switchNode = option.childNodes[1]
  if (!switchNode) return;
  const checkboxNode = switchNode.childNodes[0];
  return checkboxNode.id;
}

function AddUploadFileEvent() {
  const fileInput = document.getElementById('file');
  fileInput.addEventListener('click', ({target}) => {
    target.value = '';
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    saveFileContent(file);
  });
}

function AddDownloadFileEvent() {
  const fileInput = document.getElementById('save');
  fileInput.addEventListener('click', () => {
    saveContentToFile();
  });
}

function AddChromeOnChangedListener() {
  chrome.storage.onChanged.addListener(async function (changes, _namespace) {
    for (var key in changes) {
      if (CONTENT == key) {
        await renderContentInLabel(changes[key].newValue);
      }
    }
  });
}

export const getFileContent = async () => {
  var promise = new Promise(function (resolve, _reject) {
    chrome.storage.local.get(CONTENT, function (data) {
      resolve(JSON.parse(data[CONTENT] || null));
    });
  });
  return promise;
}

/**
 * @param  {string} property
 * @param  {boolean} [isChecked]
 */
export function createOption(property, isChecked) {
  // Create Container with property and checkbox
  const container = document.createElement("div");
  container.className = "option"
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

export const saveContentToFile = async () => {
  const content = await getFileContent();
  var blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json;charset=utf-8" });
  var url = window.URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    conflictAction: "overwrite",
    saveAs: true
  });
}