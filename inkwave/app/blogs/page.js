'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/get');
        const data = await res.json();
        setBlogs(data.blogs || []); // Adjust if your API returns a different structure
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 font-jost py-10 px-4">
      <h1 className="text-4xl font-bold text-indigo-400 mb-10 text-center">Blogs</h1>

      {loading ? (
        <div className="text-center text-lg text-gray-300">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-lg text-gray-300">No blogs found.</div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
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
                  {blog.tags && blog.tags.split(", ").map((tag, idx) => (
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
                    Read Blog
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
