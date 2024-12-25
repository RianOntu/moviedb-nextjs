import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { connectMongoDB } from "@/dbConnect/connectMongo";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./_providers/AuthProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function RootLayout({ children }) {
  await connectMongoDB();

  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/styles/output.css" />
        </head>
        <body className="bg-black text-white">
          <ToastContainer />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
export default RootLayout;
