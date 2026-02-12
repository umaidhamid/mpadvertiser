import "../globals.css";
// import Sidebar from "@/components/admin/Sidebar";
// import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">
          
          {/* <Sidebar /> */}

          <div className="flex-1 flex flex-col">
            {/* <Topbar /> */}
            <h1>Admin Layout</h1>
            <main className="p-6 flex-1 overflow-y-auto">
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}
