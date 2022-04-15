import { getAllForms } from './localStorage';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { PDFDocument } from './PDFDocument';

const generatePDF = async () => {
    const cv = await getAllForms();
    const blob = await pdf(<PDFDocument cv={cv} />).toBlob();
    saveAs(blob, 'cv.pdf');
};

export default generatePDF;
