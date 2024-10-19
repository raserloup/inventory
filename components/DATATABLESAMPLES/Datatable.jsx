import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="w-[50px]">Age</TableHead>
          <TableHead className="w-[200px]">Email</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <Input type="text" defaultValue="John Doe" />
          </TableCell>
          <TableCell>
            <Input type="number" defaultValue="30" />
          </TableCell>
          <TableCell>
            <Input type="email" defaultValue="john.doe@example.com" />
          </TableCell>
          <TableCell className="flex gap-2">
            <Button variant="outline" size="sm">
              Save
            </Button>
            <Button variant="outline" size="sm">
              Delete
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Input type="text" defaultValue="Jane Doe" />
          </TableCell>
          <TableCell>
            <Input type="number" defaultValue="28" />
          </TableCell>
          <TableCell>
            <Input type="email" defaultValue="jane.doe@example.com" />
          </TableCell>
          <TableCell className="flex gap-2">
            <Button variant="outline" size="sm">
              Save
            </Button>
            <Button variant="outline" size="sm">
              Delete
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Input type="text" defaultValue="Robert Smith" />
          </TableCell>
          <TableCell>
            <Input type="number" defaultValue="35" />
          </TableCell>
          <TableCell>
            <Input type="email" defaultValue="robert.smith@example.com" />
          </TableCell>
          <TableCell className="flex gap-2">
            <Button variant="outline" size="sm">
              Save
            </Button>
            <Button variant="outline" size="sm">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
