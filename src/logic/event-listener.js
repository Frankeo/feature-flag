import { saveFileIntoStorage, saveStorageContentIntoFile} from './content-management.js'
import { renderContentInLabel } from './render.js';
import { CONTENT } from '../constants.js';

export const AddStorageOnChangedEvent = () => {
    chrome.storage.onChanged.addListener(async function (changes, _namespace) {
        for (var key in changes) {
            if (CONTENT == key) {
                await renderContentInLabel(changes[key].newValue);
            }
        }
    });
}

export const AddUploadFileEvent = () => {
    const fileInput = document.getElementById('file');
    fileInput.addEventListener('click', ({ target }) => {
        target.value = '';
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        saveFileIntoStorage(file);
    });
}

export const AddDownloadFileEvent = () => {
    const fileInput = document.getElementById('save');
    fileInput.addEventListener('click', () => {
        saveStorageContentIntoFile();
    });
}