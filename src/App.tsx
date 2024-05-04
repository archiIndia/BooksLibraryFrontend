import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/components/Home.tsx";
import Authors from "@/components/Authors.tsx";
import Books from "@/components/Books.tsx";
import Members from "@/components/Members.tsx";
import AddMember from "@/components/AddMember.tsx";
import KH from "@/components/KH";
import AddBook from "@/components/AddBook.tsx";
import Checkouts from "@/components/Checkouts.tsx";
import AddCheckout from "@/components/AddCheckout.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/app",
      element: <KH />,
      children: [
        {
          path: "authors",
          element: <Authors />,
        },
        {
          path: "authors/add",
          element: <Authors />,
        },
        {
          path: "books",
          element: <Books />,
        },
        {
          path: "books/add",
          element: <AddBook />,
        },
        {
          path: "books/edit/:bookId",
          element: <AddBook />,
        },
        {
          path: "members/add",
          element: <AddMember />,
        },
        {
          path: "members/edit/:memberId",
          element: <AddMember />,
        },
        {
          path: "members",
          element: <Members />,
        },
        {
          path: "checkouts",
          element: <Checkouts />,
        },
        {
          path: "checkouts/add/",
          element: <AddCheckout />,
        },
        {
          path: "checkouts/edit/:checkoutId",
          element: <AddCheckout />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
