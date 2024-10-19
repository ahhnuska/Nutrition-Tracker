import { revalidatePath } from "next/cache";
import connectDb from "../db/connectdb";
import NutritionModel from "../db/nutritionSchema";
import { UpdateBtn } from "../buttone/page";

export default async function Info() {
    await connectDb();
    const blogs = await NutritionModel.find();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <form
                action={async (formData) => {
                    "use server";
                    await connectDb();
                    const title = formData.get("title");
                    const description = formData.get("description");
                    console.log(title, description);
                    await NutritionModel.create({ title, description });
                    console.log("log");
                    revalidatePath("/")
                }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8"
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Nutrition Info Page
                </h1>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Enter the title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="title"

                    />
                </div>

                {/* Description Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Description
                    </label>
                    <input
                        type="text"
                        placeholder="Enter the description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="description"
                    />
                </div>

                {/* Submit Button */}
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    type="submit"
                >
                    Submit
                </button>
            </form>

            {/* Blog Entries Section */}
            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    Submitted Nutrition Info
                </h2>
                {blogs.length > 0 ? (
                    <ul className="space-y-4">
                        {blogs.map((blog) => (
                            <li
                                key={blog._id}
                                className="bg-white p-4 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {blog.description}
                                </p>
                                <form action={async (formData) => {
                                    "use server"
                                    const id = formData.get("id")
                                    console.log(id)
                                    await connectDb()
                                    await NutritionModel.findByIdAndDelete(id)
                                    revalidatePath("/")
                                }}>
                                    <input name="id" type="hidden" value={blog._id.toString()} />
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                        type="submit"
                                    >
                                        Delete
                                    </button>
                                    <br />



                                </form>
                                < UpdateBtn blog={blog} />
                            </li>

                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center">
                        No nutrition info submitted yet.
                    </p>
                )}
            </div>
        </div>
    );
}

