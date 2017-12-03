"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var cidadeSchema = new mongoose.Schema({
    name: String,
    // weight: Number,
    codIBGE: Number
});
var Cidade = mongoose.model('Cidade', cidadeSchema);
exports.default = Cidade;
//# sourceMappingURL=cidade.js.map