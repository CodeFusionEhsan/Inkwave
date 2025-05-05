import mongoose from 'mongoose'
import blogModel from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const formData = await req.formData()
    const id = formData.get("id")
    console.log(id)

    await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Inkwave?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to database")
    
    const result = blogModel.findByIdAndDelete({_id: id}).exec()
    console.log(result)

    return NextResponse.json({
        success: true,
        message: "Blog Deleted"
    })
}