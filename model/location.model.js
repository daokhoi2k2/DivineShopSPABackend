const City = require("../schema/city.schema");
const District = require("../schema/district.schema");
const Ward = require("../schema/ward.schema");

module.exports = {
    getAllCity: () => {
        return City.find();
    },
    getAllDistrictByCity: (city) => {
        return District.find({matp: city})
    },
    getAllWardByDistrict: (district) => {
        return Ward.find({maqh: district})
    }
}