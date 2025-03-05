
const express = require('express');
const cors = require('cors');
const routes = require('./routes/vehicleRoute.js');
const migrate = require('./db_config/dbMigrate.js');
const firstSeed = require('./db_seed/dbFirstSeed.js');

const app = express();

app.use(cors());
app.use(express.json()); 


app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

const PORT = process.env.PORT || 5000;

const startServer = async()=> {
  try {
    // Run migrations
    await migrate();

    // Seed database
    await firstSeed();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();