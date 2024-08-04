import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  ingrediants:{type:String},
  instructions:{type:String},
  imgurl:{type:String,require:true},
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }

});

export const Recipe = mongoose.model("recipe",recipeSchema)