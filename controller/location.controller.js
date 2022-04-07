const locationModel = require("../model/location.model");
module.exports = {
  city: async (req, res) => {
    try {
      const result = await locationModel.getAllCity();

      res.send(result);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
  district: async (req, res) => {
    try {
      const { city } = req.params;

      const result = await locationModel.getAllDistrictByCity(city);
      res.status(200).json(result);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
  ward: async (req, res) => {
    try {
      const { district } = req.params;

      const result = await locationModel.getAllWardByDistrict(district);
      res.status(200).json(result);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
};
