"use client";

import { useState, useEffect } from "react";

interface Tag {
  id: string;
  name: string;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  imageBlog: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageBlog, setImageBlog] = useState("");
  const [published, setPublished] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchBlogs();
    fetchTags();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch("/api/blog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch blog posts");
      }

      const data = await response.json();
      setBlogs(data);
      setError(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error fetching blog posts:", err);
      setError(
        errorMessage || "Failed to load blog posts. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch("/api/tags", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tags");
      }

      const data = await response.json();
      setAllTags(data);
    } catch (err) {
      console.error("Error fetching tags:", err);
      // Not setting error state here to avoid blocking the main page
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete blog post");
      }

      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error deleting blog post:", err);
      alert(
        errorMessage || "Failed to delete blog post. Please try again later."
      );
    }
  };

  const togglePublishedStatus = async (
    id: string,
    currentPublishedStatus: boolean
  ) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: !currentPublishedStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update blog post status");
      }

      const updatedBlog = await response.json();
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error updating blog post status:", err);
      alert(
        errorMessage ||
          "Failed to update blog post status. Please try again later."
      );
    }
  };

  const handleEditClick = (blog: Blog) => {
    setIsEditing(true);
    setEditingBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    setImageBlog(blog.imageBlog || "");
    setPublished(blog.published);
    setSelectedTags(blog.tags?.map((tag) => tag.name) || []);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSelectExistingTag = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const blogData = {
        title,
        description,
        imageBlog: imageBlog || null,
        published,
        tags: selectedTags,
      };

      let url = "/api/blog";
      let method = "POST";

      // If editing an existing blog, use PUT request to the specific blog ID
      if (isEditing && editingBlog) {
        url = `/api/blog/${editingBlog.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Failed to ${isEditing ? "update" : "create"} blog post`
        );
      }

      const savedBlog = await response.json();

      if (isEditing) {
        setBlogs(
          blogs.map((blog) => (blog.id === savedBlog.id ? savedBlog : blog))
        );
      } else {
        setBlogs([savedBlog, ...blogs]);
      }

      // Reset form
      resetForm();

      // Refresh tags list
      fetchTags();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error(
        `Error ${isEditing ? "updating" : "creating"} blog post:`,
        err
      );
      alert(
        errorMessage ||
          `Failed to ${
            isEditing ? "update" : "create"
          } blog post. Please try again later.`
      );
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingBlog(null);
    setTitle("");
    setDescription("");
    setImageBlog("");
    setPublished(false);
    setSelectedTags([]);
    setTagInput("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Blog Management
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={fetchBlogs}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
          {isEditing ? (
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel Editing
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              New Post
            </button>
          )}
        </div>
      </div>

      {/* Blog Post Form */}
      {isEditing && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="imageBlog"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageBlog"
                value={imageBlog}
                onChange={(e) => setImageBlog(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Description* (max 300 characters)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                maxLength={300}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              ></textarea>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description.length}/300 characters
              </p>
            </div>

            {/* Tags section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Existing tags suggestions */}
              {allTags.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Existing tags:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {allTags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleSelectExistingTag(tag.name)}
                        disabled={selectedTags.includes(tag.name)}
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedTags.includes(tag.name)
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Publish this post
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingBlog ? "Update Post" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          {blogs.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-center py-4">
              No blog posts yet.
            </p>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {blog.title}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          togglePublishedStatus(blog.id, blog.published)
                        }
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          blog.published
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </button>
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {blog.description}
                  </p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
