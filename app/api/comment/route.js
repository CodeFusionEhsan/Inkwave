import mongoose from "mongoose";
import blogModel from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req) {
    const formData = await req.formData()
    const by = formData.get("by")
    const comment = formData.get("content")
    const id = formData.get("blogId")

    if (by && comment && id) {
        await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Inkwave?retryWrites=true&w=majority&appName=Cluster0")
              console.log("Connected to database")
        const newcomment = {
            by: by,
            content: comment,
        }

        await blogModel.updateOne({_id: id}, {
            $push: {comments: newcomment}
        })

        return NextResponse.json({
            success: true,
            message: "Posted Comment!"
        })
    } else {
        return NextResponse.json({
            success: false,
            message:"Please Fill All The Fields."
        })
    }
}