import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // fetch
  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    setCategories(data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // upload
  const uploadImage = async () => {
    if (!image) return null;

    const fileName = `category-${Date.now()}`;

    await supabase.storage
      .from("categories")
      .upload(fileName, image);

    const { data } = supabase.storage
      .from("categories")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // submit
  const handleSubmit = async () => {

    if (!name) return;

    let imageUrl = preview;

    if (image) {
      imageUrl = await uploadImage();
    }

    if (editingId) {
      await supabase
        .from("categories")
        .update({ name, image: imageUrl })
        .eq("id", editingId);
    } else {
      await supabase
        .from("categories")
        .insert([{ name, image: imageUrl }]);
    }

    // reset
    setName("");
    setImage(null);
    setPreview(null);
    setEditingId(null);
    setShowModal(false);

    fetchCategories();
  };

  // delete
  const handleDelete = async (id) => {
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  // edit
  const handleEdit = (cat) => {
    setName(cat.name);
    setPreview(cat.image);
    setEditingId(cat.id);
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold">Categories</h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-black text-white rounded-xl"
        >
          + Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">

                <td className="p-4">
                  {cat.image && (
                    <img
                      src={cat.image}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>

                <td className="p-4">{cat.name}</td>

                <td className="p-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id)}
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

          <div className="bg-white p-8 rounded-2xl w-full max-w-md">

            <h2 className="text-2xl font-semibold mb-6">
              {editingId ? "Edit Category" : "Add Category"}
            </h2>

            <input
              type="text"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl mb-4"
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="mb-4"
            />

            {/* PREVIEW */}
            {preview && (
              <div className="mb-4">
                <img
                  src={preview}
                  className="w-24 h-24 object-cover rounded mb-2"
                />

                <button
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                  className="text-red-500 text-sm"
                >
                  Remove Image
                </button>
              </div>
            )}

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