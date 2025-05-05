import mongoose from 'mongoose'
import blogModel from '@/models/Blog'
import { NextResponse } from 'next/server'

export async function GET(req) {
    await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/Inkwave?retryWrites=true&w=majority&appName=Cluster0")
          console.log("Connected to database")
    const blogs = await blogModel.find()
    return NextResponse.json({
        blogs: blogs,
        success: true
    })
}