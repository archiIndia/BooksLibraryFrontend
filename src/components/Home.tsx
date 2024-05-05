import { BookCopy } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Toaster } from "./ui/toaster";


const Home = () => {
  return (
    <div
      className={
        "fixed inset-0 flex flex-col p-10 bg-primary text-primary-foreground"
      }
    >
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center h-fit"}>
          <div
            className={
              "size-12 m-auto p-2 flex justify-center items-center  bg-background rounded shadow text-primary"
            }
          >
            <BookCopy className={"size-6 text-zinc-700"}/>
          </div>
          <div className={"flex flex-col ml-4"}>
          <span className={"text-xl"}>Knowledge Hub</span>
          </div>
        </div>

        <div>
          {/*on this button click goes to the author page as it is a link to the author page*/}
          <Link to={"/app/authors"}>
            <Button variant={"secondary"} className={"uppercase text-xs"}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className={"grow flex flex-col justify-end"}>
        <blockquote className="space-y-2">
          <p className="text-lg">
            “Knowledge Hub(K.H) is a Library Management Software.”
          </p>
          <footer className="text-sm">Reducer</footer>
        </blockquote>
      </div>
      <Toaster />
    </div>
  );
};
export default Home;
