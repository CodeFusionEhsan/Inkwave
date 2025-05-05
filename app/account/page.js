'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

export default function YourBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()

  useEffect(() => {

    if (isLoaded) {
      setBlogs([]);
      setLoading(false);
      return;
    }

    async function fetchBlogs() {
      try {
        const res = await fetch(`/api/get`);
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const formData = new FormData()
    formData.append("id", id)

    const  res = await fetch('/api/delete', {
      method: "POST",
      body: formData
    })

    const jsres= await res.json()

    if (jsres.success) {
      window.location.reload()
    } else {
      console.log("error")
    }
  }

  function checkBlogs(blog) {
    return blog.author == userId;
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
    <main className="min-h-screen bg-gray-900 text-gray-100 font-jost py-10 px-4">
      <h1 className="text-4xl font-bold text-indigo-400 mb-10 text-center">Your Uploaded Blogs</h1>

      {!isLoaded ? (
        <div className="text-center text-lg text-gray-300">Please wait...</div>
      ) : loading ? (
        <div className="text-center text-lg text-gray-300">Loading your blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-lg text-gray-300">You haven't uploaded any blogs yet.</div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.filter(checkBlogs).map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 rounded-xl shadow-lg flex flex-col overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              {blog.image && (
                <img
                  src={`/images/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="flex flex-col flex-1 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{blog.title}</h2>
                <p className="text-gray-200 mb-4 flex-1">{blog.excerpt}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {blog.tags && blog.tags.split(', ').map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-400">
                    {blog.reading} min read
                  </span>
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold transition-colors"
                  >
                    Read
                  </Link>
                  <Link
                    href={`#`}
                    onClick={() => { handleDelete(blog._id) }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold transition-colors"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
