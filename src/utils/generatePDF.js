import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

const generatePDF = async () => {
    const blob = await pdf(<PDFDocument />).toBlob();
    saveAs(blob, 'cv.pdf');
};

export default generatePDF;
