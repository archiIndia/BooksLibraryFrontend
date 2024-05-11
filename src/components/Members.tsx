import { Button } from "@/components/ui/button.tsx";
import { CirclePlus, Eye, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge.tsx";
import { useState, useEffect } from "react";
import { deleteMember, getallMembers } from "@/Services/Members.service";
import { DateTime } from "luxon";

const Members = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const loadMembers = async () => {
      const data = await getallMembers();
      setMembers([...data]);
    };
    loadMembers();
  }, []);
  const handleDelete = async (delId: string) => {
    await deleteMember(delId);
    const tempArray = members.filter((member) => {
      return member._id !== delId;
    });
    setMembers(tempArray);
  };

  return (
    <div className={"h-full overflow-y-auto p-5"}>
      <div className={"flex items-center justify-between"}>
        <div className={"text-xl font-medium"}>
          <span>Members</span>
        </div>
        <div>
          <Link to={"/app/members/add"}>
            <Button className={"ml-3"} >
              <CirclePlus className={"size-4"} />
              <span className={"ml-2"}>New Member</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className={"mt-3"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Dob</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {member.first_name}
                </TableCell>
                <TableCell>{member.last_name}</TableCell>
                <TableCell>
                  {member.gender === "M" && "Male"}
                  {member.gender === "F" && "Female"}
                  {member.gender === "O" && "Others"}
                </TableCell>
                <TableCell>{member.contact_number}</TableCell>
                <TableCell>{DateTime.fromISO(member.dob).toFormat("dd-MM-yyyy")}</TableCell>
                <TableCell>{DateTime.fromISO(member.join_date).toFormat("dd-MM-yyyy")}</TableCell>
                <TableCell>
                  {member.member_type=== "premium" &&<Badge
                    className={
                      "bg-yellow-200 text-yellow-600 hover:bg-yellow-300"
                    }
                  >
                    {member.member_type.toUpperCase()}
                  </Badge>}
                  {member.member_type=== "regular" &&<Badge
                    className={
                      "bg-green-200 text-green-600 hover:bg-green-300"
                    }
                  >
                    {member.member_type.toUpperCase()}
                  </Badge>}
                </TableCell>
                <TableCell className={"flex justify-end"}>
                  <Link to={`/app/members/edit/${member._id}`}>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className={"h-8 w-8"}
                    >
                      <Eye className={"w-4 h-4 text-primary"} />
                    </Button>
                  </Link>
                  <Button
                      size={"icon"}
                      variant={"outline"}
                      className={"h-8 w-8 ml-2"}
                      onClick={() => {
                        handleDelete(member._id);
                      }}
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

export default Members;
