import CommentModel from "@/app/db/commentSchema";
import connectDb from "@/app/db/connectdb";
import NutritionModel from "@/app/db/nutritionSchema";
import { revalidatePath } from "next/cache";

export default async function InfoDetail({ params }: { params: { id: string } }) {
    "use server";
    await connectDb();
    const blog = await NutritionModel.findById(params.id);
    const comments = await CommentModel.find({ nutritionID: params.id });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                {/* Blog Title and Description */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog?.title}</h1>
                    <p className="text-lg text-gray-600">{blog?.description}</p>
                </div>

                {/* Add Comment Section */}
                <div className="border-t border-gray-200 pt-4">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a Comment</h2>
                    <form
                        className="space-y-6"
                        action={async (formData) => {
                            "use server";
                            await connectDb();
                            const name = formData.get("name");
                            const comment = formData.get("comment");
                            console.log(name, comment);
                            await CommentModel.create({
                                name, comment, nutritionID: params.id

                            });
                            revalidatePath("/");
                        }}
                    >
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Comment Input */}
                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                                Comment:
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your comment..."
                                rows={4}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                        >
                            Add Comment
                        </button>
                    </form>

                    {/* Comments Display */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Comments</h3>
                        <ul className="space-y-4">
                            {comments.map((comment) => (
                                <li
                                    key={comment._id}
                                    className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200"
                                >
                                    <p className="font-medium text-red-900">{comment.name}</p>
                                    <p className="text-black-600">{comment.comment}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
