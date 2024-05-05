
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils.ts";

const SideBar = () => {
  return (
    <div className="w-[250px] bg-muted h-full p-5 relative  shadow border-r-[0.5px]">
      {/*<div*/}
      {/*  className={*/}
      {/*    "h-8 w-8 inline-flex items-center justify-center bg-primary rounded-full absolute -right-4 bottom-4 cursor-pointer"*/}
      {/*  }*/}
      {/*>*/}
      {/*  <ChevronLeft className={"w-4 h-4 -ml-0.5 text-primary-foreground"} />*/}
      {/*</div>*/}
      <h2 className={"text-xl text-gray-900 font-semibold tracking-wider"}>
        Knowledge Hub
      </h2>
      <div className={"mt-5 flex space-y-2 flex-col"}>
        <NavLink to={"/app/authors"}>
          {({ isActive }) => (
            <div
              className={cn(
                "h-10 flex items-center rounded px-2 w-full",
                isActive ? "bg-primary text-primary-foreground" : "text-primary"
              )}
            >
              <span className={"ml-2"}>Authors</span>
            </div>
          )}
        </NavLink>
        <NavLink to={"/app/books"}>
          {({ isActive }) => (
            <div
              className={cn(
                "h-10 flex items-center rounded px-2 w-full",
                  isActive ? "bg-primary text-primary-foreground" : "text-primary"
              )}
            >
              <span className={"ml-2"}>Books</span>
            </div>
          )}
        </NavLink>
        <NavLink to={"/app/members"}>
          {({ isActive }) => (
            <div
              className={cn(
                "h-10 flex items-center rounded px-2 w-full",
                  isActive ? "bg-primary text-primary-foreground" : "text-primary"
              )}
            >
              <span className={"ml-2"}>Members</span>
            </div>
          )}
        </NavLink>
        <NavLink to={"/app/checkouts"}>
          {({ isActive }) => (
            <div
              className={cn(
                "h-10 flex items-center rounded px-2 w-full",
                  isActive ? "bg-primary text-primary-foreground" : "text-primary"
              )}
            >
              <span className={"ml-2"}>Checkouts</span>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
export default SideBar;
