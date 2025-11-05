import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiTag,
  FiUser,
  FiCalendar,
  FiChevronRight,
} from "react-icons/fi";

// BlogPage.jsx
// A single-file React component for the "Online Shop" blog page.
// - Tailwind CSS utility classes
// - Framer Motion animations
// - Axios for fetching /api/blogs

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchPosts() {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/blogs");
        // Expect data to be an array of posts: { _id, title, excerpt, image, author, date, category }
        if (!mounted) return;
        setPosts(data);
        setFiltered(data);
        // extract categories
        const cats = Array.from(new Set((data || []).map((p) => p.category).filter(Boolean)));
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        setPosts([]);
        setFiltered([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchPosts();
    return () => (mounted = false);
  }, []);

  // filter when query or activeCategory changes
  useEffect(() => {
    const q = query.trim().toLowerCase();
    const result = posts.filter((p) => {
      const matchesQuery = q === "" || (p.title || "").toLowerCase().includes(q);
      const matchesCat = !activeCategory || p.category === activeCategory;
      return matchesQuery && matchesCat;
    });
    setFiltered(result);
  }, [query, posts, activeCategory]);

  const onClear = () => {
    setQuery("");
    setActiveCategory(null);
  };

  const formattedDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch (e) {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Page header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Our Blog</h1>
            <p className="mt-1 text-gray-600">Latest updates from <span className="font-semibold" style={{ color: "#f59e0b" }}>Online Shop</span></p>
          </div>

          <div className="mt-4 md:mt-0 md:w-1/3">
            <label htmlFor="search" className="sr-only">Search posts</label>
            <div className="relative">
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts by title..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <FiTag /> Categories
              </h3>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md ${!activeCategory ? "bg-amber-50 border border-amber-200" : "hover:bg-gray-50"}`}
                >
                  All
                </button>
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500 mt-2">No categories</p>
                ) : (
                  categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`w-full text-left px-3 py-2 rounded-md ${activeCategory === c ? "bg-amber-50 border border-amber-200" : "hover:bg-gray-50"}`}
                    >
                      {c}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2"><FiUser /> Featured</h3>
              <p className="text-sm text-gray-500 mt-2">Hand-picked posts from Online Shop editors.</p>
              <div className="mt-3 space-y-3">
                {(posts || []).slice(0, 3).map((p) => (
                  <a
                    key={p._id}
                    href={`/blog/${p._id}`}
                    className="block text-sm hover:underline"
                  >
                    {p.title}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm text-sm text-gray-600">
              <h4 className="font-medium mb-2">Quick actions</h4>
              <button onClick={onClear} className="w-full text-left px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100">Clear filters</button>
            </div>
          </div>
        </aside>

        {/* Blog grid */}
        <section className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing <span className="font-medium text-gray-900">{filtered.length}</span> posts</p>
            <div className="text-sm text-gray-500">Theme: <span className="font-semibold" style={{ color: "#f59e0b" }}>Amber</span></div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                {/* Loading spinner */}
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-400 border-t-transparent"></div>
                  <div className="text-sm text-gray-500">Loading posts...</div>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-600">No posts found. Try another search or clear filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => (
                  <motion.article
                    key={post._id}
                    whileHover={{ y: -6 }}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                    layout
                  >
                    <a href={`/blog/${post._id}`} className="block">
                      <div className="h-44 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={post.image || `https://picsum.photos/seed/${post._id}/800/600`}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1"><FiUser /> <span>{post.author || "Admin"}</span></div>
                          <div className="flex items-center gap-1"><FiCalendar /> <span>{formattedDate(post.date)}</span></div>
                        </div>
                        <div className="text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-100">{post.category || "General"}</div>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <a
                          href={`/blog/${post._id}`}
                          className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg shadow-sm"
                        >
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600"
                          >
                            Read More <FiChevronRight />
                          </motion.button>
                        </a>

                        <div className="text-sm text-gray-400">{Math.max( (post.readTime || 3), 1)} min read</div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
