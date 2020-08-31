import {
  AddStorageOnChangedEvent,
  AddUploadFileEvent,
  AddDownloadFileEvent,
} from "./logic/event-listener.js";
import { renderContentInLabel } from "./logic/render.js";

(function initialExecute() {
  AddStorageOnChangedEvent();
  AddUploadFileEvent();
  AddDownloadFileEvent();
  renderContentInLabel();
})();
