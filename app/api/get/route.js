import mongoose from 'mongoose'
import blogModel from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URI)
          console.log("Connected to database")
    const blogs = await blogModel.find()
    return NextResponse.json({
        blogs: blogs,
        success: true
    })
}
