import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';

async function signInUser() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
    signOut(getAuth());
}

// Initialize firebase auth
function initFirebaseAuth(callback) {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), callback);
}

function getUserPhotoURL() {
    return getAuth().currentUser.photoURL;
}

function getUserEmail() {
    return getAuth().currentUser.email;
}

export {
    signInUser,
    signOutUser,
    initFirebaseAuth,
    getUserPhotoURL,
    getUserEmail
};
