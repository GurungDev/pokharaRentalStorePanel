import Navbar from "@/components/admin/navbar";
import TopBar from "@/components/admin/topbar";

export default function BaseLayout({ children, className = "" }) {
  return (
    <div className="flex">
      <Navbar className="min-w-[260px] h-[100vh] shadow-md flex-none sticky top-0 bg-shade-light" />
      <div className=" grow h-[100vh] overflow-scroll bg-[#F8FAFC] overflow-auto">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
