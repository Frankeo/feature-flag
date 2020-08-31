import { CONTENT } from "../constants.js";

export const saveFileIntoStorage = (file) => {
  var reader = new FileReader();
  reader.onload = function (event) {
    const result = event.target.result;
    chrome.storage.local.set({ [CONTENT]: result });
  };
  reader.readAsText(file);
};

export const getFileContentFromStorage = async () => {
  var promise = new Promise(function (resolve, _reject) {
    chrome.storage.local.get(CONTENT, function (data) {
      resolve(JSON.parse(data[CONTENT] || null));
    });
  });
  return promise;
};

export const saveStorageContentIntoFile = async () => {
  const content = await getFileContentFromStorage();
  var blob = new Blob(
    [JSON.stringify(content, null, 2)],
    { type: "application/json;charset=utf-8" },
  );
  var url = window.URL.createObjectURL(blob);
  chrome.downloads.download({
    url: url,
    conflictAction: "overwrite",
    saveAs: true,
  });
};
