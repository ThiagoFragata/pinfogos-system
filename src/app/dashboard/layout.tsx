import { Footer } from "@/components/organisms/Footer";
import { Navbar } from "@/components/organisms/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendas | StockFlow",
};

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-lg mx-auto p-2">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
