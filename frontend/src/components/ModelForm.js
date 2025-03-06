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

const ModelForm = ({ vehicleType, onNext }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const fetchedVehicles = await apiService.getVehicleOnType(vehicleType);
        setVehicles(fetchedVehicles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [vehicleType]);

  const handleSubmit = () => {
    if (!selectedVehicle) {
      alert('Please select a vehicle model');
      return;
    }
    onNext({ vehicleId: selectedVehicle });
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
        Select Vehicle Model
      </Typography>
      <RadioGroup
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
        sx={{ justifyContent: 'center', display: 'flex' }}
      >
        {vehicles.map(vehicle => (
          <FormControlLabel 
            key={vehicle.id} 
            value={vehicle.id.toString()} 
            control={<Radio />} 
            label={vehicle.model} 
          />
        ))}
      </RadioGroup>
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
        disabled={vehicles.length === 0}
      >
        Next
      </Button>
    </Box>
  );
};

export default ModelForm;