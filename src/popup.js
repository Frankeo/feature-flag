var popupWindow = window.open(
  chrome.extension.getURL("window.html"),
  "_blank",
  "width=400,height=400"
);
window.close();
