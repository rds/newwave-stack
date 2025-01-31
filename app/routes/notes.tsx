import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react"
import { getNoteListItems } from "~/models/note.server"
import { requireUserId } from "~/session.server"
import { useUser } from "~/utils"

type LoaderData = {
  noteListItems: Awaited<ReturnType<typeof getNoteListItems>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const noteListItems = await getNoteListItems({ userId })
  return json<LoaderData>({ noteListItems })
}

export default function NotesPage() {
  const data = useLoaderData() as LoaderData
  const user = useUser()

  return (
    <div className="flex flex-col h-full min-h-screen">
      <header className="flex items-center justify-between p-4 text-white bg-slate-800">
        <h1 className="text-3xl font-bold">
          <Link to=".">Notes</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="px-4 py-2 text-blue-100 rounded bg-slate-600 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full border-r w-80 bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Note
          </Link>

          <hr />

          {data.noteListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`}
                    to={note.id}
                  >
                    📝 {note.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
