import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import connectDb from "../db/connectdb"
import NutritionModel from "../db/nutritionSchema"
import { revalidatePath } from "next/cache"

export function UpdateBtn({ blog }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Button</DialogTitle>
                    <DialogDescription>
                        Update the product
                    </DialogDescription>
                </DialogHeader>
                <form action={async (formData) => {
                    "use server"
                    await connectDb()
                    const title = formData.get('title')
                    const description = formData.get('description')
                    const id = formData.get('id')
                    await NutritionModel.findByIdAndUpdate(id, { title, description })
                    revalidatePath("/")
                }}>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Label >
                                Title
                            </Label>
                            <Input
                                name="title"
                                defaultValue={blog.title}

                            />
                            <input type="hidden" value={blog._id} name="id" />
                            <Label >
                                Description
                            </Label>
                            <Input
                                name="description"
                                defaultValue={blog.description}

                            />
                        </div>
                        <div className="update">
                            <Button type="submit" variant="secondary">
                                Update
                            </Button>
                        </div>

                    </div>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>

                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}