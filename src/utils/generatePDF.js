import { getAllForms } from './clientStorage';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { PDFDocument } from './PDFDocument';

const generatePDF = async isLoggedIn => {
    const cv = getAllForms(isLoggedIn);
    const blob = await pdf(<PDFDocument cv={cv} />).toBlob();
    saveAs(blob, 'cv.pdf');
};

export default generatePDF;
