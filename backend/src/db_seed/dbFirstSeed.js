const pool = require('../db_config/db.js');

const firstSeed = async () => {
    const connection = await pool.getConnection();
    try {
        //adding vehicle type
        const [vehicleType] = await connection.query('INSERT INTO vehicle_type(name,wheels) VALUES ?',
            [[
                ['Hatchback', 4],
                ['SUV', 4],
                ['Sedan', 4],
                ['Cruiser', 2],
                ['Sports', 2]

            ]]
        );
        const vehicleTypeId = vehicleType.insertId;

        //adding vehicles
        await connection.query('INSERT INTO vehicle (type_id, model) VALUES ?',
            [[
                [vehicleTypeId, 'Swift Hatchback'],
                [vehicleTypeId + 1, 'Toyota Fortuner'],
                [vehicleTypeId + 2, 'Toyata Camrey'],
                [vehicleTypeId + 3, 'Classic 350'],
                [vehicleTypeId + 4, 'Ninja H2R']
            ]]
        );
        console.log('Database seeded successfully');

    } catch (error) {
        console.log("Seeding Error: ", error);

    } finally {
        connection.release()
    }
}
module.exports = firstSeed;