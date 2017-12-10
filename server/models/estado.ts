import * as mongoose from 'mongoose';

const estadoSchema = new mongoose.Schema({
  name: String,
  UF: String,
  codIBGE: Number
});

const Estado = mongoose.model('Estado', estadoSchema);

export default Estado;