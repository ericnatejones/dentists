import { Inter } from "next/font/google";
import Navbar from "./Navbar";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
