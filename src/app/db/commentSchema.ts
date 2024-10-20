import mongoose, { Model, Schema } from "mongoose";

export interface IComment extends Document {
    name: string;
    comment: string,
    nutritionID:mongoose.Schema.Types.ObjectId
}

const commentSchema = new Schema<IComment>(
    {
        name: { type: String, required: true },
        comment: { type: String, required: true },
        nutritionID:{type:mongoose.Schema.Types.ObjectId,ref:"Nutrition",required:true}
    }
);



const CommentModel: Model<IComment> =
    mongoose.models.comment || mongoose.model<IComment>("comment", commentSchema);

export default CommentModel;