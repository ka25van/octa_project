import React, { useState } from 'react';
import { 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';

const WheelsForm = ({ onNext }) => {
  const [wheels, setWheels] = useState('');

  const handleSubmit = () => {
    if (!wheels) {
      alert('Please select number of wheels');
      return;
    }
    onNext({ wheels: parseInt(wheels) });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Select Number of Wheels
      </Typography>
      <RadioGroup
        value={wheels}
        onChange={(e) => setWheels(e.target.value)}
        sx={{ justifyContent: 'center', display: 'flex' }}
      >
        <FormControlLabel 
          value="2" 
          control={<Radio />} 
          label="2 Wheels" 
        />
        <FormControlLabel 
          value="4" 
          control={<Radio />} 
          label="4 Wheels" 
        />
      </RadioGroup>
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default WheelsForm;