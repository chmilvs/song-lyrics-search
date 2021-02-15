const mongoose = require("mongoose");

const bdConnect = () => {
  mongoose.connect("mongodb://localhost:27017/SoloProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
module.exports = { bdConnect }
