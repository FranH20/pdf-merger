import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper,
  Typography 
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  ArrowUpward as ArrowUpwardIcon, 
  ArrowDownward as ArrowDownwardIcon 
} from '@mui/icons-material';

interface PdfListProps {
  files: File[];
  onRemove: (index: number) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const PdfList: React.FC<PdfListProps> = ({ files, onRemove, onMove }) => {
  return (
    <Paper elevation={3} sx={{ marginBottom: '20px', padding: '10px' }}>
      <Typography variant="h6" sx={{ padding: '10px' }}>
        Archivos seleccionados ({files.length})
      </Typography>
      <List>
        {files.map((file, index) => (
          <ListItem 
            key={index}
            secondaryAction={
              <>
                <IconButton 
                  edge="end" 
                  onClick={() => onMove(index, index - 1)}
                  disabled={index === 0}
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  onClick={() => onMove(index, index + 1)}
                  disabled={index === files.length - 1}
                >
                  <ArrowDownwardIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => onRemove(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={file.name}
              secondary={`${(file.size / 1024).toFixed(2)} KB`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PdfList;