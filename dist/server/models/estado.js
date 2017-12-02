"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var estadoSchema = new mongoose.Schema({
    name: String,
    UF: String,
    codIBGE: Number
});
var Estado = mongoose.model('Estado', estadoSchema);
exports.default = Estado;
//# sourceMappingURL=estado.js.map