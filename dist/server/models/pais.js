"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var paisSchema = new mongoose.Schema({
    name: String,
    codBACEN: Number
});
var Pais = mongoose.model('Pais', paisSchema);
exports.default = Pais;
//# sourceMappingURL=pais.js.map