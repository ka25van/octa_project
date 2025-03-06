const express = require('express');
const {getVehicleType, getVehicleOnType, booking, checkAvailable} = require('../controllers/vehicleControl.js');
const router = express.Router();

router.get('/vehicle-type', getVehicleType);
router.get('/vehicle/:typeId', getVehicleOnType);
router.post('/booking', booking);
router.get('/vehicle-availability', checkAvailable);

module.exports = router;