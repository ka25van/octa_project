import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { 
  Button, 
  Typography, 
  Box, 
  Alert 
} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { apiService } from '../services/apiService';

const DateRangeForm = ({ vehicleId, firstName, lastName, onBookingComplete }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    // Validation
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    if (startDate >= endDate) {
      setError('End date must be after start date');
      return;
    }

    try {
      // Check vehicle availability
      const availability = await apiService.checkAvailable(
        vehicleId, 
        startDate.toISOString().split('T')[0], 
        endDate.toISOString().split('T')[0]
      );

      if (!availability.available) {
        setError('Vehicle is not available for the selected dates');
        return;
      }

      // Create booking
      const bookingData = {
        firstName,
        lastName,
        vehicleId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };

      const booking = await apiService.booking(bookingData);
      onBookingComplete(booking);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Select Booking Dates
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ width: '45%' }}>
          <Typography variant="subtitle2">Start Date</Typography>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
          />
        </Box>
        <Box sx={{ width: '45%' }}>
          <Typography variant="subtitle2">End Date</Typography>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy-MM-dd"
          />
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button 
        variant="contained" 
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
        disabled={!startDate || !endDate}
      >
        Book Vehicle
      </Button>
    </Box>
  );
};

export default DateRangeForm;