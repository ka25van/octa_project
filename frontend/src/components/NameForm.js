import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const NameForm = ({ onNext }) => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!fName === ''){
        newErrors.fName = 'First name is required';
    }
    if (!lName===''){
        newErrors.lName = 'Last name is required';
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({firstName: fName, lastName: lName });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <TextField
        fullWidth
        label="First Name"
        value={fName}
        onChange={(e) => setFName(e.target.value)}
        error={!!errors.fName}
        helperText={errors.fName}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Last Name"
        value={lName}
        onChange={(e) => setLName(e.target.value)}
        error={!!errors.lName}
        helperText={errors.lName}
        margin="normal"
      />
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

export default NameForm;