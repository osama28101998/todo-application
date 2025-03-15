'use client';

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchTodos();
    }
  }, [status, router]);

  const fetchTodos = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTodos(data);
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setTitle("");
      fetchTodos();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchTodos();
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between  mb-4">
          <h1 className="text-2xl">Todo Dashboard</h1>
          <Button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="p-2 bg-red-500 hover:bg-red-700 cursor-pointer text-white "
          >
            Logout
          </Button>
        </div>
        <form onSubmit={handleAddTodo} className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task"
            className="w-full p-2 border rounded"
          />
          <Button type="submit" className="mt-3 w-full">
            Add Task
          </Button>
        </form>
        <ul>
          {
            todos.length===0 && <div className="text-center">No Data.</div>
}
          {todos?.map((todo: any) => (
            <li key={todo.id} className="flex justify-between items-center p-2 border-b">
              <span>{todo.title}</span>
              <div>
                <Button
                  onClick={() => router.push(`/edit/${todo.id}`)}
                  className="mr-2 p-1 px-2 py-5 bg-green-500 hover:bg-green-400 cursor-pointer text-white rounded"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(todo.id)}
                  className="px-2 py-5 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}