const pool = require('../db_config/db.js');

const migrate =async()=>{
    const connection = await pool.getConnection();
    try {
        //type of vehicles table
        await connection.query(
            `CREATE TABLE IF NOT EXISTS vehicle_type(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            wheels INT NOT NULL
            )`
        )
        //vehicle table
        await connection.query(
            `CREATE TABLE IF NOT EXISTS vehicle(
            id INT AUTO_INCREMENT PRIMARY KEY,
            type_id INT,
            model VARCHAR(100) NOT NULL,
            FOREIGN KEY(type_id) REFERENCES vehicle_type(id)
            )`
        )
        //booking table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS booking(
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            vehicle_id INT NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            FOREIGN KEY(vehicle_id) REFERENCES vehicle(id)
            )
            `)
        console.log('Migration successfull');
    } catch (error) {
        console.log("Migration error: ", error);
        
    }
    finally{
        connection.release();
    }
}
module.exports = migrate;