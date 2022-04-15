import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Viewer } from './utils/PDFDocument';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// ReactDOM.render(<Viewer />, document.getElementById('root'));
