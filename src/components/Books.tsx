import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getallBooks } from "@/Services/Books.service";

const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const loadBooks = async () => {
      const data = await getallBooks();
      setBooks([...data]);
    };
    loadBooks();
  }, []);

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Books</span>
        </div>
        <div>
          <Link to={"/app/books/add"}>
            <Button className={"ml-3"}>
              <CirclePlus className={"size-4"} />
              <span className={"ml-2"}>Add Book</span>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>ISBN Code</TableHead>
              <TableHead>Edition</TableHead>
              <TableHead>Authors</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.edition}</TableCell>
                <TableCell>
                  {book.author_list
                    .map((auth) => `${auth.first_name} ${auth.last_name}`)
                    .join(", ")}
                </TableCell>
                <TableCell className={"flex justify-end"}>
                  <Link to={`/app/books/edit/${book._id}`}>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className={"h-8 w-8"}
                    >
                      <Pencil className={"w-4 h-4 text-primary"} />
                    </Button>
                  </Link>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8 ml-2"}
                  >
                    <Trash2 className={"w-4 h-4 text-red-500"} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Books;
