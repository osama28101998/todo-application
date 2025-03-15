import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todo = await prisma.todo.findUnique({
    where: { id: resolvedParams.id, userId: session.user.id },
  });
  if (!todo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(todo);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params; 
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await request.json();
  const todo = await prisma.todo.update({
    where: { id: resolvedParams.id, userId: session.user.id },
    data: { title },
  });
  return NextResponse.json(todo);
}

export async function DELETE(
  request: Request,
  { params }: { params:  Promise<{ id: string }> }
) {
  const resolvedParams = await params; 

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.todo.delete({
    where: { id: resolvedParams.id, userId: session.user.id },
  });
  return NextResponse.json({ message: "Deleted" });
}
