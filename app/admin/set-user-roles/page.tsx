// import { SearchUsers } from "./SearchUsers";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./actions";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { revalidatePath } from 'next/cache'

// export default async function AdminDashboard(params: {
//   searchParams: Promise<{ search?: string }>
// }) {
//   const query = (await params.searchParams).search

//   const client = await clerkClient()
//  //const users = query ? (await client.users.getUserList({ query })).data : (await client.users.getUserList())
//  const options = query ? { query } : {};

// const response = await client.users.getUserList(options);
// const users = response.data;

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="container mx-auto grow p-4">
//         <form className="mb-6">
//           <div className="flex flex-col gap-2">
//             <label htmlFor="search">Search for users</label>
//             <div className="flex gap-2">
//               <Input id="search" name="search" type="text" className="grow" />
//               <Button type="submit">Submit</Button>
//             </div>
//           </div>
//         </form>
//         {users.map((user) => (
//           <div key={user.id} className="flex min-h-screen flex-col">
//             <div className="space-y-4 rounded-md bg-white p-4 shadow-md">
//               <div className="text-lg font-semibold text-gray-800">
//                 {user.firstName} {user.lastName}
//               </div>

//               <div className="text-sm text-gray-600">
//                 {
//                   user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
//                     ?.emailAddress
//                 }
//               </div>

//               <div className="text-sm font-medium text-blue-600">
//                 Role: {user.publicMetadata.role as string}
//               </div>
//               <div className="mt-2 flex space-x-4">
//                 <form action={setRole} className="mt-2">
//                   <input type="hidden" value={user.id} name="id" />
//                   <input type="hidden" value="admin" name="role" />
//                   <Button type="submit">Make Admin</Button>
//                 </form>

//                 <form action={setRole} className="mt-2">
//                   <input type="hidden" value={user.id} name="id" />
//                   <input type="hidden" value="moderator" name="role" />
//                   <Button type="submit">Make Moderator</Button>
//                 </form>

//                 <form action={setRole} className="mt-2">
//                   <input type="hidden" value={user.id} name="id" />
//                   <input type="hidden" value="contributor" name="role" />
//                   <Button type="submit">Make Contributor</Button>
//                 </form>

//                 <form action={setRole} className="mt-2">
//                   <input type="hidden" value={user.id} name="id" />
//                   <input type="hidden" value="viewer" name="role" />
//                   <Button type="submit">Make Viewer</Button>
//                 </form>

//                 <form action={removeRole} className="mt-2">
//                   <input type="hidden" value={user.id} name="id" />
//                   <Button
//                     type="submit"
//                     className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
//                   >
//                     Remove Role
//                   </Button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>
//     </div>
//   )
// }

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  const query = (await params.searchParams).search;
  const client = await clerkClient();
  const options = query ? { query } : {};
  const response = await client.users.getUserList(options);
  const users = response.data;
  const { sessionClaims } = await auth();
  const currentUserRole = sessionClaims?.metadata?.role;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto grow p-4">
        <form className="mb-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="search" className="font-bold">
              Search for users
            </label>
            <div className="flex gap-2">
              <Input
                id="search"
                name="search"
                type="text"
                defaultValue={query}
                className="grow"
                placeholder="Search by name or email..."
              />
              <Button type="submit">Search</Button>
              {query && (
                <Button variant="outline" asChild>
                  <a href="/admin">Clear</a>
                </Button>
              )}
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col space-y-4 rounded-md bg-white p-4 shadow-md border border-gray-200"
            >
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {user.firstName} {user.lastName || "(No Last Name)"}
                </div>
                <div className="text-sm text-gray-600">
                  {
                    user.emailAddresses.find(
                      (e) => e.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                  Role: {(user.publicMetadata.role as string) || "None"}
                </div>
              </div>

              {/* Button to change role */}
              {currentUserRole === "admin" && (
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t">
                  {["admin", "moderator", "contributor", "viewer"].map(
                    (role) => (
                      <form key={role} action={setRole}>
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value={role} name="role" />
                        <Button type="submit" size="sm" className="capitalize">
                          {role}
                        </Button>
                      </form>
                    )
                  )}

                  <form action={removeRole} className="w-fill">
                    <input type="hidden" value={user.id} name="id" />
                    <Button
                      type="submit"
                      variant="destructive"
                      size="sm"
                      className="w-full"
                    >
                      Remove Role
                    </Button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </main>
    </div>
  );
}
