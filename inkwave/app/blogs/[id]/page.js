'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // If using App Router
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

export default function BlogPage() {
  const params = useParams();
  const blogId = params?.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

    const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()

  useEffect(() => {
    if (!blogId) return;
    async function fetchBlog() {
      setLoading(true);
      try {
        const res = await fetch(`/api/get`);
        const data = await res.json();
        setBlog(data.blogs.filter((blog) => {return blog._id == blogId}));
      } catch (err) {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blogId]);

  const handleLike = async () => {
    
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("content", comment)
    formData.append("by", userId)
    formData.append("blogId", blogId)

    const res = await fetch('/api/comment', {
        method: "POST",
        body: formData
    })

    const jsres = await res.json()

    if (jsres.success == true) {
        window.location.reload()
    } else {
        console.log("Error")
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100 font-jost flex items-center justify-center">
        <div className="text-lg text-gray-300">Loading blog...</div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100 font-jost flex items-center justify-center">
        <div className="text-lg text-gray-300">Blog not found.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 font-jost py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-2xl p-6 md:p-10 space-y-8">
        {/* Blog Card */}
        {blog[0].image && (
          <img
            src={`/images/${blog[0].image}`}
            alt={blog[0].title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-indigo-400">{blog[0].title}</h1>
          <p className="text-gray-200 text-lg">{blog[0].excerpt}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog[0].tags && blog[0].tags.split(', ').map((tag, idx) => (
              <span
                key={idx}
                className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-400 mt-2">{blog[0].reading} min read</span>
        </div>

        {/* Blog Content */}
        <div className="prose prose-invert max-w-none text-white mt-4">
          {/* If your content is markdown, use a markdown renderer here */}
          <div>{blog[0].content}</div>
        </div>

        {/* Like & Comment Section */}
        <div className="flex flex-col gap-6 mt-8">
          {/* Like Button */}
          

          {/* Comments */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-indigo-400 mb-4">Comments</h2>
            {blog[0].comments.length === 0 ? (
              <div className="text-gray-400 mb-4">No comments yet. Be the first to comment!</div>
            ) : (
              <ul className="space-y-4 mb-4">
                {blog[0].comments.map((c, idx) => (
                  <li key={idx} className="border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-300 font-semibold">{c.by || 'User'}</span>
                      <span className="text-xs text-gray-500">
                        {c.posted_at ? new Date(c.createdAt).toLocaleString() : ''}
                      </span>
                    </div>
                    <div className="text-gray-200 mt-1">{c.content}</div>
                  </li>
                ))}
              </ul>
            )}

            {/* Post Comment */}
            <form onSubmit={handleComment} className="flex flex-col gap-2">
              <textarea
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={"Write a comment"}
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={2}
                required
              />
              <button
                type="submit"
                className="self-end bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded transition-colors disabled:opacity-50"
              >
                {'Post Comment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
