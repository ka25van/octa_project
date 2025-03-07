import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Button, 
  Typography, 
  Box, 
  CircularProgress 
} from '@mui/material';
import { apiService } from '../services/apiService';

const VehicleTypeForm = ({ wheels, onNext }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const types = await apiService.getVehicleType();
        const filteredTypes = types.filter(type => type.wheels === wheels);
        
        const uniqueTypesSet = new Set();
        const uniqueTypes = filteredTypes.filter(type => {
          const identifier = `${type.id}-${type.name}`;
          if (!uniqueTypesSet.has(identifier)) {
            uniqueTypesSet.add(identifier);
            return true;
          }
          return false;
        });
    
        setVehicleTypes(uniqueTypes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [wheels]);

  const handleSubmit = () => {
    if (!selectedType) {
      alert('Please select a vehicle type');
      return;
    }
    onNext({ vehicleType: selectedType });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Select Vehicle Type
      </Typography>
      <RadioGroup
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        sx={{ justifyContent: 'center', display: 'flex' }}
      >
        {vehicleTypes.map(type => (
          <FormControlLabel 
            key={type.id} 
            value={type.id.toString()} 
            control={<Radio />} 
            label={type.name} 
          />
        ))}
      </RadioGroup>
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
        disabled={vehicleTypes.length === 0}
      >
        Next
      </Button>
    </Box>
  );
};

export default VehicleTypeForm;