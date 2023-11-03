const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  formUid: {
    type: String,
  },
  questions: {
    type: Array,
  },
});

formSchema.set("timestamps", true);

module.exports = mongoose.model("Form", formSchema);
