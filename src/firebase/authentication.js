import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    setPersistence,
    inMemoryPersistence
} from 'firebase/auth';

function signInUser() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    signInWithPopup(getAuth(), provider);
}

function signOutUser() {
    signOut(getAuth());
}

function registerAuthListener(callback) {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), callback);
}

function disableAuthPersistence() {
    setPersistence(getAuth(), inMemoryPersistence);
}

function getUserPhotoURL() {
    return getAuth().currentUser.photoURL;
}

function getUserEmail() {
    return getAuth().currentUser.email;
}

function getUID() {
    return getAuth().currentUser.uid;
}

export {
    signInUser,
    signOutUser,
    registerAuthListener,
    disableAuthPersistence,
    getUserPhotoURL,
    getUserEmail,
    getUID
};
