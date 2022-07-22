import { doc, getDoc, setDoc } from 'firebase/firestore';

async function getUserDoc(db, uid) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }
}

function setUserDoc(db, uid, data) {
    setDoc(doc(db, 'users', uid), data);
}

export { getUserDoc, setUserDoc };
