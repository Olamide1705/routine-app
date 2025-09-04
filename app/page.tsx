"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";

interface Routine {
  title: string;
  description: string;
  tasks: string;
}
export default function Routines() {
  const [formData, setFormData] = useState<Routine>({
    title: "",
    description: "",
    tasks: "",
  });

  const [data, setData] = useState<Routine[]>([]);
  const { title, description, tasks } = formData;
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && description && tasks) {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData)
        .then((res) => console.log("RES:", res.data))
        .catch((err) => console.log(err));
      setData([...data, formData]);
      setFormData({ title: "", description: "", tasks: "" });
      setShowForm(false);
    }
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((item, i) => i !== index);
    setData(newData);
  };

  const handleEdit = (index: number) => {
    const ItemToEdit = data[index];
    setFormData(ItemToEdit);
    handleDelete(index);
    setShowForm(true);
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => console.log("ALL DATA:", res.data))
      .catch((err) => console.log(err));

    // console.log(data);
  }, [data]);

  return (
    <div className="">
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-[rgb(255,208,102)] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:bg-yellow-500 hover:scale-110 transition-transform duration-200 z-50"
      >
        <FaPlusCircle size={36} />
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <h1 className="font-bold text-base md:text-xl mb-5">Add Routine</h1>

            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-xl hover:bg-yellow-500 hover:scale-110 transition-transform duration-200 z-50"
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="space-y-5">
              <label htmlFor="id"></label>
              Title
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                className="border p-2 rounded-md w-full mt-2"
                onChange={handleChange}
              />
              {/* Description */}
              <label htmlFor="description"></label>
              Description
              <input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                className="border p-2 rounded-md w-full mt-2"
                onChange={handleChange}
              />
              {/* Tasks */}
              <label htmlFor="tasks"></label>
              Tasks
              <input
                id="tasks"
                name="tasks"
                type="text"
                value={formData.tasks}
                className="border p-2 rounded-md w-full mt-2"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save Routine
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Routine Lists*/}
      <div className="place-content-center mt-5 p-2">
        <table className="table-auto border-collapse border border-gray-300 max-w-3xl w-full mx-auto">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-base">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th>Description</th>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center text-[9px] md:text-base">
                <td className="border border-gray-300 px-4 py-2">
                  {item.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.tasks}
                </td>

                <td className="space-x-2 md:space-x-3">
                  <button
                    className="px-3 md:px-4 py-1 bg-blue-600 text-white text-[9px] md:text-sm rounded"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-1 md:px-4 py-1 bg-red-600 text-white text-[9px] md:text-sm rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
