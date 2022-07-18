import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { getFirebaseConfig } from './firebase/firebase-config';
import { initializeApp } from 'firebase/app';
import {
    signInUser,
    signOutUser,
    initFirebaseAuth
} from './firebase/authentication';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

const app = initializeApp(getFirebaseConfig());
initFirebaseAuth();

const root = document.querySelector('body');
root.addEventListener('click', signInUser);
