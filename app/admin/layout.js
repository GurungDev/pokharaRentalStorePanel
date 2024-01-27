import Navbar from "@/components/admin/navbar";

export default function BaseLayout({ children, className = "" }) {
    return (
        <div className="flex">
        <Navbar className="min-w-[260px] h-[100vh] shadow-md flex-none sticky top-0 bg-shade-light" />
        <div className=" grow rounded-lg bg-[#F8FAFC] overflow-auto">
          {children}
        </div>
      </div>
    );
  }