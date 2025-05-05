'use server'

import mongoose from 'mongoose'
import blogModel from '../../../models/Blog'
import { writeFile } from "fs/promises";
import path from "path";
import {NextResponse} from 'next/server'

export async function POST(req, Response) {
    const formData = await req.formData()
    const title = formData.get('title')
    const excerpt = formData.get('excerpt')
    const file = formData.get('image')
    const content = formData.get('content')
    const reading = formData.get('reading')
    const patreon = formData.get('patreon')
    const tags = formData.get('tags')
    const sources = formData.get('sources')
    const author = formData.get('author')

    if(!file) {
        return NextResponse.json({error: "No Files Received"})
    }

    if (author && title && content && excerpt) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = Date.now() + file.name.replaceAll(" ", "_")
      await writeFile(path.join(process.cwd(), "public/images/"+ filename), buffer)
      await mongoose.connect(process.env.MONGO_URI)
      console.log("Connected to database")

      const newupload = new blogModel({
        title: title,
        excerpt: excerpt,
        content: content,
        image: filename,
        reading: reading,
        patreon: patreon,
        tags: tags,
        sources: sources,
        author: author
      })

      const result = await newupload.save()

      if(result) {
        console.log(result)
        return NextResponse.json({
          success: true,
          result: result
        })
      } else {
        return NextResponse.json({
          success: false,
        })
      }
    } else {
      return NextResponse.json({
        message: "Please fill all the fields",
        success: false
      })
    }
}
