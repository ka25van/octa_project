const express = require('express');
const {getVehicletype,getVehicleOnType,booking, checkAvailable} = require('../controllers/vehicleControl.js');
const router = express.Router();

router.get('/vehicle-type', getVehicletype);
router.get('/vehicle/:typeId', getVehicleOnType);
router.post('/booking', booking);
router.post('/vehicle-availability', checkAvailable);

module.exports = router;