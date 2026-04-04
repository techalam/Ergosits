import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });

  const [images, setImages] = useState([]); // new files
  const [preview, setPreview] = useState([]); // all images
  const [editingId, setEditingId] = useState(null);

  // ---------------- FETCH ----------------

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ---------------- IMAGE UPLOAD ----------------

  const uploadImages = async () => {
    const urls = [];

    for (let file of images) {
      const fileName = `product-${Date.now()}-${file.name}`;

      await supabase.storage
        .from("products")
        .upload(fileName, file);

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      urls.push(data.publicUrl);
    }

    return urls;
  };

  // ---------------- SUBMIT ----------------

  const handleSubmit = async () => {

    let imageUrls = [];

    // existing images (edit mode)
    const existingImages = preview.filter((img) =>
      img.startsWith("http")
    );

    // new images
    const uploaded = await uploadImages();

    imageUrls = [...existingImages, ...uploaded];

    if (editingId) {
      await supabase
        .from("products")
        .update({
          ...form,
          price: parseInt(form.price),
          images: imageUrls,
          slug: form.name.toLowerCase().replaceAll(" ", "-")
        })
        .eq("id", editingId);
    } else {
      await supabase
        .from("products")
        .insert([
          {
            ...form,
            price: parseInt(form.price),
            images: imageUrls,
            slug: form.name.toLowerCase().replaceAll(" ", "-")
          },
        ]);
    }

    // RESET
    setForm({ name: "", description: "", price: "", category_id: "" });
    setImages([]);
    setPreview([]);
    setEditingId(null);
    setShowModal(false);

    fetchProducts();
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  // ---------------- EDIT ----------------

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category_id: p.category_id,
    });

    setPreview(p.images || []);
    setEditingId(p.id);
    setShowModal(true);
  };

  // ---------------- REMOVE IMAGE ----------------

  const removeImage = (index) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- UI ----------------

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold">Products</h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-black text-white rounded-xl"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">

                <td className="p-4">
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>

                <td className="p-4">{p.name}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4">{p.categories?.name}</td>

                <td className="p-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">

            <h2 className="text-2xl font-semibold mb-6">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border px-4 py-3 rounded-xl mb-4"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl mb-4"
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl mb-4"
            />

            {/* CATEGORY */}
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl mb-4"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);

                setImages((prev) => [...prev, ...files]);

                const newPreview = files.map((f) =>
                  URL.createObjectURL(f)
                );

                setPreview((prev) => [...prev, ...newPreview]);
              }}
              className="mb-4"
            />

            {/* PREVIEW */}
            <div className="flex gap-3 flex-wrap mb-4">
              {preview.map((img, i) => (
                <div key={i} className="relative">

                  <img
                    src={img}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full"
                  >
                    ×
                  </button>

                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-black text-white rounded-xl"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}