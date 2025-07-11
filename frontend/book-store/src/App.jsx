import { useEffect, useState } from "react";

const API_URL = "/books"; // Ensure this matches your backend route

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: "", author: "", publishedYear: "" });
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.title.trim() || !form.author.trim() || !form.publishedYear.trim()) {
      setFormError("All fields are required.");
      return false;
    }
    if (!/^\d{4}$/.test(form.publishedYear)) {
      setFormError("Published Year must be a valid 4-digit number.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          author: form.author,
          publishedYear: Number(form.publishedYear),
        }),
      });

      if (!res.ok) throw new Error("Failed to save book");

      const savedBook = await res.json();
      setBooks(editingId ? books.map((b) => (b._id === editingId ? savedBook : b)) : [...books, savedBook]);
      setEditingId(null);
      setForm({ title: "", author: "", publishedYear: "" });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm({ title: book.title, author: book.author, publishedYear: book.publishedYear.toString() });
    setFormError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete book");

      setBooks((prevBooks) => prevBooks.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-bold text-indigo-600 text-center mb-6">📚 Book Store</h1>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["title", "author", "publishedYear"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          {formError && <p className="text-red-600 text-sm">{formError}</p>}
          <div className="flex justify-end">
            <button type="submit" disabled={formLoading} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50">
              {editingId ? (formLoading ? "Updating..." : "Update Book") : formLoading ? "Adding..." : "Add Book"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ title: "", author: "", publishedYear: "" });
                  setFormError(null);
                }}
                className="ml-4 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <p className="text-xl text-gray-600 text-center">Loading books...</p>
        ) : error ? (
          <p className="text-xl text-red-600 text-center">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {books.map((book) => (
              <div key={book._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
                <p className="text-gray-600">✍️ Author: {book.author}</p>
                <p className="text-gray-500">📅 Year: {book.publishedYear}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button onClick={() => handleEdit(book)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">✏️ Edit</button>
                  <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
