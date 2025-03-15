'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router=useRouter()
  console.log("🚀 ~ Home ~ status:", status)
    useEffect(() => {
      if (status === "authenticated") {
        router.push("/dashboard");

      }
    }, [status, router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Organize Your Tasks Efficiently
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Stay productive and manage your tasks with our easy-to-use todo
          application.
        </p>
        <div className="flex items-center justify-center flex-col sm:flex-row gap-4">
          <Link
            href={"/auth/register"}
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition"
            >
            Register
          </Link>
          <Link
            href={"/auth/signin"}
            className="px-6 py-3 bg-gray-700 text-white text-lg rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
