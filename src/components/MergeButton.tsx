import React from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { mergePdfs } from '../utils/pdfMerger';

interface MergeButtonProps {
  files: File[];
}

const MergeButton: React.FC<MergeButtonProps> = ({ files }) => {
  const handleMerge = async () => {
    if (files.length < 2) {
      toast.warning('Necesitas al menos 2 archivos para unir');
      return;
    }

    try {
      toast.info('Procesando archivos...');
      const mergedPdf = await mergePdfs(files);
      
      // Crear descarga
      const blob = new Blob([mergedPdf], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged-document.pdf';
      link.click();
      
      toast.success('PDFs unidos exitosamente!');
    } catch (error) {
      toast.error('Error al unir los PDFs');
      console.error(error);
    }
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      size="large"
      onClick={handleMerge}
      fullWidth
      sx={{ padding: '10px' }}
    >
      Unir PDFs
    </Button>
  );
};

export default MergeButton;