import SideBar from "@/components/SideBar.tsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const KH = () => {
  return (
    <div
      className={
        "fixed top-0 bottom-0 left-0 right-0 flex flex-row overflow-hidden"
      }
    >
      <SideBar />
      <div className={" grow"}>
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};
export default KH;
