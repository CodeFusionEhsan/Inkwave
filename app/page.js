'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/get');
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

  const featuredBlogs = blogs.slice(0, 3);
  const otherBlogs = blogs

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 font-jost">
      {/* Special Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 mb-8 text-center">
          Welcome to Inkwave
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Featured Blogs
        </h2>
        {loading ? (
          <div className="text-center text-lg text-gray-300">Loading blogs...</div>
        ) : featuredBlogs.length === 0 ? (
          <div className="text-center text-lg text-gray-300">No blogs found.</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {featuredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gradient-to-br from-indigo-800/80 to-gray-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-indigo-600"
              >
                {blog.image && (
                  <img
                    src={`/tmp/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{blog.title}</h3>
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
                      {blog.readingTime} min read
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
      </section>

      {/* Other Blogs Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Explore More Blogs
        </h2>
        {loading ? (
          <div className="text-center text-lg text-gray-300">Loading blogs...</div>
        ) : otherBlogs.length === 0 ? (
          <div className="text-center text-lg text-gray-300">No more blogs available.</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {otherBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-800 rounded-xl shadow-lg flex flex-col overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                {blog.image && (
                  <img
                    src={`/tmp/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
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
                      {blog.readingTime} min read
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
      </section>

      {/* Hero Invite Section */}
      <section className="w-full bg-gradient-to-br from-indigo-800 to-indigo-600 py-16 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Love Inkwave? Share the Wave!
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Invite your friends to join Inkwave and start sharing your stories together.
            Let’s build a vibrant community of writers and readers!
          </p>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Inkwave',
                  text: 'Join me on Inkwave to read and publish amazing blogs!',
                  url: window.location.origin,
                });
              } else {
                navigator.clipboard.writeText(window.location.origin);
                alert('Link copied! Share it with your friends.');
              }
            }}
            className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-50 transition-colors"
          >
            Invite Friends
          </button>
        </div>
      </section>
    </main>
  );
}
