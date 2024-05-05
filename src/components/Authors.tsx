import {
  createAuthors,
  deleteAuthor,
  getallAuthors,
} from "../Services/Authors.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { CirclePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useEffect, useState } from "react";

const Authors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authors, setAuthors] = useState([]);
  const { toast } = useToast()

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const loadAuthors = async () => { 
      const data = await getallAuthors();
      setAuthors([...data]);
    };
    loadAuthors();
  }, []);
  const handleAdd = (new_author) => {
    setAuthors([...authors, new_author]);
    setIsModalOpen(false);
    toast({
      title: "Successfully",
      description: "Authors Added",
    })
  };
  const handleDelete = async (delId: string) => {
    await deleteAuthor(delId);
    const tempArray = authors.filter((author) => {
      return author._id !== delId;
    })
    setAuthors(tempArray);
  };

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Authors</span>
        </div>
        <div>
          <Button className={"ml-3"} onClick={openModal}>
            <CirclePlus className={"size-4"} />
            <span className={"ml-2"}>New Author</span>
          </Button>
        </div>
      </div>
      <div className={"mt-3"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {author.first_name}
                </TableCell>
                <TableCell>{author.last_name}</TableCell>
                <TableCell>{author.email}</TableCell>
                <TableCell className={"flex justify-end"}>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8"}
                    onClick={()=> {handleDelete(author._id)}}
                  >
                    <Trash2 className={"w-6 h-10 text-destructive"} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toaster />
      </div>
      <AddAuthorsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleAdd={handleAdd}
      />
    </div>
  );
};
export default Authors;

export function AddAuthorsModal({ isOpen, onClose, handleAdd }) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateAuthors = async () => {
    try {
      const data = await createAuthors(first_name, last_name, email);
      handleAdd(data);
    } catch (err) {
      console.log("Something Went Wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        // stop the modal from closing when clicking outside
        onPointerDownOutside={(ev) => ev.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Author</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first_name" className="text-left">
              First name
            </Label>
            <Input
              id="first_name"
              placeholder="Enter first name"
              className="col-span-3"
              onChange={(ev) => setFirst_name(ev.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last_name" className="text-left">
              Last name
            </Label>
            <Input
              id="last_name"
              placeholder="Enter last name"
              className="col-span-3"
              onChange={(ev) => setLast_name(ev.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter email address"
              className="col-span-3"
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateAuthors}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
