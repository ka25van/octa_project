const pool = require('../db_config/db.js');

const getVehicleType = async (req, res) => {
    try {
        const [types] = await pool.query('SELECT * FROM vehicle_type')
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getVehicleOnType = async (req, res) => {
    try {
        const [vehicles] = await pool.query('SELECT * FROM vehicle WHERE type_id = ?', [req.params.typeId])
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const booking = async (req, res) => {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Check for vehicle availability before booking
        const [existingBookings] = await connection.query(
            `SELECT * FROM booking
           WHERE vehicle_id = ? AND 
           ((start_date <= ? AND end_date >= ?) OR 
            (start_date <= ? AND end_date >= ?) OR 
            (start_date >= ? AND end_date <= ?))`,
            [vehicleId, startDate, startDate, endDate, endDate, startDate, endDate]
        );

        if (existingBookings.length > 0) {
            return res.status(400).json({ error: 'Vehicle not available for selected dates' });
        }

        //if available then do booking
        const [result] = await connection.query(
            'INSERT INTO booking (first_name, last_name, vehicle_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, vehicleId, startDate, endDate]
        );

        await connection.commit();
        res.status(201).json({ bookingId: result.insertId });
    } catch (error) {
        await connection.rollback();
        console.log('Error in booking', error);
        res.status(500).json({ error: 'Booking failed' });
    } finally {
        connection.release();
    }
}

//checking for vehicle availability
const checkAvailable = async (req, res) => {
    const { vehicleId, startDate, endDate } = req.query;

  try {
    const [existingBookings] = await pool.query(
      `SELECT * FROM booking
       WHERE vehicle_id = ? AND 
       ((start_date <= ? AND end_date >= ?) OR 
        (start_date <= ? AND end_date >= ?) OR 
        (start_date >= ? AND end_date <= ?))`,
      [vehicleId, startDate, startDate, endDate, endDate, startDate, endDate]
    );

    res.json({ available: existingBookings.length === 0 });
  } catch (error) {
    res.status(500).json({ error: 'Availability check failed' });
  }
}

module.exports = {getVehicleType, getVehicleOnType, booking, checkAvailable}