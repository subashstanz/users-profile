import { Inter } from "@next/font/google";
import Users from "../components/users";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white">
      <Users />
    </div>
  );
}
