import type { Note, User } from "@prisma/client"
import { db } from "~/db.server"

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"]
}) {
  return db.note.findFirst({
    where: { id, userId },
  })
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return db.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  })
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"]
}) {
  return db.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export function deleteNote({ id, userId }: Pick<Note, "id"> & { userId: User["id"] }) {
  return db.note.deleteMany({
    where: { id, userId },
  })
}
