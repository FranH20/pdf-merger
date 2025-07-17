import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Box, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 10,
    onDrop: acceptedFiles => {
      onFilesAdded(acceptedFiles);
    }
  });

  return (
    <Box 
      {...getRootProps()} 
      sx={{
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
        marginBottom: '20px'
      }}
    >
      <input {...getInputProps()} />
      <CloudUpload sx={{ fontSize: 48, color: '#3f51b5' }} />
      <Typography variant="h6">
        {isDragActive ? 
          'Suelta los archivos PDF aquí' : 
          'Arrastra y suelta archivos PDF aquí, o haz clic para seleccionar'}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Máximo 10 archivos PDF
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Seleccionar archivos
      </Button>
    </Box>
  );
};

export default FileUpload;