import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel 
} from '@mui/material';
import NameForm from './components/NameForm';
import WheelsForm from './components/WheelsForm';
import VehicleTypeForm from './components/VehicleTypeForm';
import ModelForm from './components/ModelForm';
import DateRangeForm from './components/DateRangeForm';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    'Personal Information',
    'Number of Wheels',
    'Vehicle Type',
    'Vehicle Model',
    'Booking Dates'
  ];

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setActiveStep(prev => prev + 1);
  };

  const handleBookingComplete = (booking) => {
    alert(`Booking Successful! Booking ID: ${booking.bookingId}`);
    // You could redirect or show a success page here
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <NameForm onNext={handleNext} />;
      case 1:
        return <WheelsForm onNext={handleNext} />;
      case 2:
        return <VehicleTypeForm wheels={formData.wheels} onNext={handleNext} />;
      case 3:
        return <ModelForm vehicleType={formData.vehicleType} onNext={handleNext} />;
      case 4:
        return (
          <DateRangeForm 
            vehicleId={formData.vehicleId}
            firstName={formData.firstName}
            lastName={formData.lastName}
            onBookingComplete={handleBookingComplete}
          />
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Vehicle Rental Booking
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 3 }}>
          {renderStepContent(activeStep)}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;