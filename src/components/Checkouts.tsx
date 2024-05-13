import { Button } from "@/components/ui/button.tsx";
import { CirclePlus, Eye, Trash2, Undo2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { deleteCheckouts, getAllCheckouts, returnCheckout } from "@/Services/Checkout.service";

const Checkouts = () => {
  const [checkouts, setCheckouts] = useState([]);
  useEffect(() => {
    const loadAllCheckouts = async () => {
      const data = await getAllCheckouts();
      setCheckouts([...data]);
    };
    loadAllCheckouts();
  }, []);
  const handleDelete = async (delId: string) => {
    try{
    await deleteCheckouts(delId);
    const tempArray = checkouts.filter((checkout) => checkout._id !== delId);
    setCheckouts(tempArray);
    }catch(err){
      alert(err.message);
    }
  };
  const handleReturn = async(rId: string)=> {
    try{
      await returnCheckout(rId);
      const index= checkouts.findIndex((checkout)=> checkout._id === rId);
     const tempArray=[...checkouts];
    tempArray[index].has_return = true;
    setCheckouts(tempArray);
    }
    catch(err){
      alert("Can not returned..."+err.message);
    }
  }

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Checkouts</span>
        </div>
        <div>
          <Link to={"/app/checkouts/add"}>
            <Button className={"ml-3"}>
              <CirclePlus className={"size-4"} />
              <span className={"ml-2"}>New Checkout</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className={"mt-3"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Date</TableHead>
              <TableHead>Member name</TableHead>
              <TableHead>Book name</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Has return</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkouts.map((chk, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {DateTime.fromISO(chk.issue_date).toFormat("dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {chk.member_details.first_name} {chk.member_details.last_name}
                </TableCell>
                <TableCell>
                  {chk.book_list.map((b) => b.book_details.title).join(", ")}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(chk.due_date).toFormat("dd-MM-yyyy")}
                </TableCell>
                <TableCell>{chk.has_return ? "Yes" : "No"}</TableCell>
                <TableCell className={"flex justify-end"}>
                  <Link to={`/app/checkouts/edit/${chk._id}`}>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className={"h-8 w-8"}
                    >
                      <Eye className={"w-4 h-4 text-blue-500"} />
                    </Button>
                  </Link>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8 ml-2"}
                    onClick={()=> handleReturn(chk._id)}
                  >
                    <Undo2 className={"w-4 h-4 text-primary"} />
                  </Button>

                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className={"h-8 w-8 ml-2"}
                    onClick={() => handleDelete(chk._id)}
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

export default Checkouts;
