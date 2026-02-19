const mongoose =require("mongoose");

const avengerSchema = new mongoose.Schema({  //schema for avengers collection
avenger: {
    type:String,
    required:true
  },
cast: {
    type:String,
    required:true
  }
}, {timestamps:true });

module.exports = mongoose.model("Avengers", avengerSchema) // model name is Avengers and schema is avengerSchema