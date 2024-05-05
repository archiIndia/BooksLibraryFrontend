import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useEffect, useState } from "react";
import { createMembers, getoneMember } from "@/Services/Members.service";
import { useNavigate, useParams } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { DateTime } from "luxon";

const AddMember = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [member_type, setMember_type] = useState("");
  const [contact_number, setContact] = useState("");
  const [join_date, setJoin_date] = useState("");
  const [email, setEmail] = useState("");
  const navi = useNavigate();
  const { toast } = useToast();
  const { memberId } = useParams();

  const handleSaveMember = async () => {
    try {
      await createMembers(
        first_name,
        last_name,
        email,
        member_type,
        gender,
        contact_number,
        dob,
        join_date
      );
      toast({
        title: "Congratulations",
        description: "Member added successfully...",
      });
      navi("/app/members");
    } catch (error) {
      console.log("Can not Save");
    }
  };
  const handleCancel = () => {
    navi("/app/members");
  };
  const handleFetch = async (fetchId: string) => {
    const fetch = await getoneMember(fetchId);
    console.log(fetch);
    setFirst_name(fetch?.first_name);
    setLast_name(fetch?.last_name);
    setDob(DateTime.fromISO(fetch?.dob).toFormat("yyyy-MM-dd"));
    setJoin_date(DateTime.fromISO(fetch?.join_date).toFormat("yyyy-MM-dd"));
    setGender(fetch?.gender);
    setContact(fetch?.contact_number);
    setEmail(fetch?.email);
    setMember_type(fetch?.member_type);
  };
  useEffect(() => {
    if (memberId) {
      handleFetch(memberId);
    }
  }, [memberId]);

  return (
    <div className={"py-2 flex flex-col h-screen"}>
      {/*header*/}
      <div className={"flex justify-between shadow px-5 py-2"}>
        <h1 className={"text-2xl text-primary"}>Add New Member</h1>
        <div>
          <Button variant={"outline"} className={"mr-3"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveMember}>Save</Button>
        </div>
      </div>

      {/*form body*/}
      <div className={"p-5 overflow-y-scroll grow"}>
        <div>
          {/*member details section*/}
          <div className={"flex gap-y-6 flex-col max-w-2xl py-5"}>
            <p className={"text-xl"}> Member details </p>
            <div className={"flex items-center"}>
              <Label htmlFor="first_name" className={"w-1/4 text-destructive"}>
                First name*
              </Label>
              <Input
                type="text"
                id="first_name"
                className={"px-2 py-1 border rounded w-1/2"}
                value={first_name}
                onChange={(ev) => setFirst_name(ev.target.value)}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="last_name" className={"w-1/4 text-destructive"}>
                Last name*
              </Label>
              <Input
                type="text"
                id="last_name"
                className={"px-2 py-1 border rounded w-1/2"}
                value={last_name}
                onChange={(ev) => setLast_name(ev.target.value)}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="dob" className={"w-1/4 text-destructive"}>
                Date of Birth*
              </Label>
              <Input
                type="date"
                id="dob"
                className={"px-2 py-1 border rounded w-1/2"}
                value={dob}
                onChange={(ev) => setDob(ev.target.value)}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="gender" className={"w-1/4 text-destructive"}>
                Gender*
              </Label>
              <Select
                onValueChange={(value) => {
                  setGender(value);
                }}
                value={gender}
              >
                <SelectTrigger className="w-1/2" id={"gender"}>
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className={"my-6"} />
          {/*other details section*/}
          <div className={"flex gap-y-6 flex-col max-w-2xl py-5"}>
            <p className={"text-xl"}>Other</p>
            <div className={"flex items-center"}>
              <Label htmlFor="member_type" className={"w-1/4"}>
                Member type
              </Label>
              <Select
                value={member_type}
                onValueChange={(val) => {
                  setMember_type(val);
                }}
              >
                <SelectTrigger className="w-1/2" id={"member_type"}>
                  <SelectValue placeholder="Select a member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="email" className={"w-1/4"}>
                Mail Id
              </Label>
              <Input
                className={"w-1/2"}
                type="text"
                id="email"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="contact_number" className={"w-1/4"}>
                Contact
              </Label>
              <Input
                className={"w-1/2"}
                type="text"
                id="contact_number"
                value={contact_number}
                onChange={(ev) => {
                  setContact(ev.target.value);
                }}
              />
            </div>
            <div className={"flex items-center"}>
              <Label htmlFor="join_date" className={"w-1/4"}>
                Join Date
              </Label>
              <Input
                className={"w-1/2"}
                type="date"
                id="join_date"
                value={join_date}
                onChange={(ev) => {
                  setJoin_date(ev.target.value);
                }}
              />
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
