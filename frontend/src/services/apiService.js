import axios from 'axios';

const api = 'http://localhost:5000/api';

export const apiService = {
    getVehicleType: async () => {
        const res = await axios.get(`${api}/vehicle-type`);
        return res.data;
    },

    getVehicleOnType: async (typeId) => {
        const res = await axios.get(`${api}/vehicle/${typeId}`);
        return res.data;
    },

    booking: async (bookingData) => {
        const res = await axios.post(`${api}/booking`, bookingData);
        return res.data;
    },

    checkAvailable: async (vehicleId, startDate, endDate) => {
        const response = await axios.get(`${api}/vehicle-availability`, {
          params: { vehicleId, startDate, endDate }
        });
        return response.data;
      }
}
