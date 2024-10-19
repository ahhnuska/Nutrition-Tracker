import mongoose,{Model, Schema} from "mongoose";

export interface INutrition extends Document {
  title: string;
  description:string
}

const nutritionSchema = new Schema<INutrition>(
  {
    title: { type: String, required: true},
    description:{type:String,required:true}
  }
);



const NutritionModel: Model<INutrition> =
  mongoose.models.Nutrition || mongoose.model<INutrition>("Nutrition", nutritionSchema);

export default NutritionModel;