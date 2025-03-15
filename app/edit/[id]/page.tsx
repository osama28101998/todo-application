'use client';

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";

export default function EditTodo() {
  // const { id } = params;
  const params = useParams();
  
  const [taskID, settaskID] = useState(params.id)
  console.log("🚀 ~ taskID:", taskID)
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`/api/tasks/${taskID}`);
      const data = await res.json();
      console.log("🚀 ~ fetchTodo ~ res:", res)
      console.log("🚀 ~ fetchTodo ~ data:", data)
      setTitle(data.title);
    };
    fetchTodo();
  }, []);


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const res = await fetch(`/api/tasks/${taskID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleUpdate} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Edit Todo</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <Button type="submit" className="w-full p-2 bg-green-500 hover:bg-green-700 text-white">
          Update
        </Button>
      </form>
    </div>
  );
}