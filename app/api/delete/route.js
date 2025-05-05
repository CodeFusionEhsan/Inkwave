import mongoose from 'mongoose'
import blogModel from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const formData = await req.formData()
    const id = formData.get("id")
    console.log(id)

    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database")
    
    const result = blogModel.findByIdAndDelete({_id: id}).exec()
    console.log(result)

    return NextResponse.json({
        success: true,
        message: "Blog Deleted"
    })
}
