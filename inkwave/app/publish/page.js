'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function PublishPage() {
    const [previewImage, setPreviewImage] = useState(null);
    const [title, setTitle] = useState("")
    const [excerpt, setExcerpt] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const [reading, setReading] = useState("")
    const [patreon, setPatreon] = useState("")
    const [tags, setTags] = useState("")
    const [sources, setSources] = useState("")  
    const[error, setError] = useState("")

    const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0])
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("excerpt", excerpt)
    formData.append("content", content)
    formData.append("image", image)
    formData.append("reading", reading)
    formData.append("patreon", patreon)
    formData.append("tags", tags)
    formData.append("sources", sources)
    formData.append("author", userId)

    const res = await fetch('/api/upload',  {
            method: "POST",
            body: formData
        }
    )

    const jsres = await res.json()

    if (jsres.success = true) {
        window.location = "/"
    } else {
        setError(jsres.message)
    }
  }

  if (!isSignedIn) {
    return(
      <section className="w-full bg-gradient-to-br from-indigo-900 via-gray-900 to-indigo-800 py-20 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Welcome to <span className="text-indigo-400">Inkwave</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          Sign up or log in to start publishing your stories, discover blogs from talented writers, and join a vibrant community. Your words can make waves!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SignInButton className='bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded transition-colors text-lg'/>
        </div>
      </div>
    </section>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 font-jost flex items-center justify-center py-8 px-2">
        <h1 className="text-2xl font-bold text-indigo-400 mb-6 text-center">{error}</h1>
      <div className="w-full max-w-2xl bg-gray-800/90 rounded-xl shadow-lg p-8 space-y-8">
        {/* Bigger Heading */}
        <h1 className="text-4xl font-bold text-indigo-400 mb-2 text-center">Publish a New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {setTitle(e.target.value)}}
              name="title"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the blog title"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="excerpt"
            >
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={excerpt}
              onChange={(e) => {setExcerpt(e.target.value)}}
              rows={2}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="A short summary of your blog"
              required
            />
          </div>

          {/* Preview Image */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="previewImage"
            >
              Preview Image
            </label>
            <input
              type="file"
              id="previewImage"
              name="previewImage"
              accept="image/*"
              className="block w-full text-white file:bg-indigo-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:mr-4"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-3 rounded-lg border border-gray-700 object-cover max-h-48 w-full"
              />
            )}
          </div>

          {/* Content */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => {setContent(e.target.value)}}
              rows={8}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your blog content here..."
              required
            />
          </div>

          {/* Reading Time */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="readingTime"
            >
              Reading Time (minutes)
            </label>
            <input
              type="number"
              id="readingTime"
              name="readingTime"
              value={reading}
              onChange={(e) => {setReading(e.target.value)}}
              min="1"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 5"
              required
            />
          </div>

          {/* Patreon Link */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="patreon"
            >
              Patreon Link
            </label>
            <input
              type="url"
              id="patreon"
              value={patreon}
              onChange={(e) => {setPatreon(e.target.value)}}
              name="patreon"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://patreon.com/yourpage"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="tags"
            >
              Tags <span className="text-gray-400 text-sm">(comma separated)</span>
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => {setTags(e.target.value)}}
              name="tags"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., javascript, webdev, nextjs"
            />
          </div>

          {/* Sources */}
          <div>
            <label
              className="block text-white font-semibold mb-1"
              htmlFor="sources"
            >
              Sources <span className="text-gray-400 text-sm">(comma separated URLs)</span>
            </label>
            <input
              type="text"
              id="sources"
              value={sources}
              onChange={(e) => {setSources(e.target.value)}}
              name="sources"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., https://source1.com, https://source2.com"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded transition-colors"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
