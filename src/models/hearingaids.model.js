// Load mongoose package
const mongoose = require('mongoose');

const AidSchema = new mongoose.Schema({
  make: String,
  style: String,
  model: String,
  ioiha: Number,
  deleted: { type: Boolean }
});

const Aid = mongoose.model('Aid', AidSchema);


Aid.count({}, function(err, count) {
  if (err) {
    throw err;
  }
  if (count > 0) return ;

  const hearingaids = require("./aids.seed.json");
  Aid.create(hearingaids, function(err, newAids){
    if(err) {
      throw err;
    }
    console.log("DB seeded")
  });
});

module.exports = Aid;
