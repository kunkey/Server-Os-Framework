const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadString, getDownloadURL } = require("firebase/storage");
const firebaseConfig = require("@Configs/lib/firebase/config");

class FireBase {
    constructor() {
        // init storage firebase session
        initializeApp(firebaseConfig);
    }
    setRef(pathSave, fileName) {
        return ref(
            this.storage,
            `/${pathSave}/${fileName}`
        );
    }
    async uploadFile(pathSave, dataBase64,fileName) {
        // get storage firebase zone
        this.storage = getStorage();
        // set path for images upload
        const storageRef = this.setRef(pathSave, fileName);
        return await uploadString(storageRef, dataBase64, 'base64');
    }
    async downloadUrl(storageRef) {
        return await getDownloadURL(storageRef);
    }
}

module.exports = new FireBase();