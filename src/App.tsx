import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from './components/FileUpload';
import PdfList from './components/PdfList';
import MergeButton from './components/MergeButton';
import './styles.css';

const App: React.FC = () => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const handleFiles = (files: File[]) => {
    setPdfFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...pdfFiles];
    const [removed] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, removed);
    setPdfFiles(newFiles);
  };

  return (
    <div className="app-container">
      <header>
        <h1>PDF Merger</h1>
        <p>Une múltiples archivos PDF en uno solo</p>
      </header>

      <main>
        <FileUpload onFilesAdded={handleFiles} />
        {pdfFiles.length > 0 && (
          <>
            <PdfList 
              files={pdfFiles} 
              onRemove={removeFile} 
              onMove={moveFile} 
            />
            <MergeButton files={pdfFiles} />
          </>
        )}
      </main>

      <footer>
        <p>Creado con React y pdf-lib</p>
      </footer>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;