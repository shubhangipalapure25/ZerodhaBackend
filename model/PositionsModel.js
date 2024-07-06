const {model} = require('mongoose');
const{PositionSchema} = require('../schemas/PositionsSchema')

const PositionModel = new model("position",PositionSchema);

module.exports = {PositionModel};