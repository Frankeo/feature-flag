var popupWindow = window.open(
  chrome.extension.getURL("main.html"),
  "_blank",
  "width=400,height=400",
);
window.close();
