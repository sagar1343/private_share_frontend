import { DateTimePicker } from "@/components/DateTimePicker";
import FileUplaod from "@/components/FileUpload";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, RotateCcw } from "lucide-react";

export default function FileCreate() {
  return (
    <div>
      <Heading asHeading className="capitalize">
        Secure your file smartly
      </Heading>
      <form className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-20">
        <div className="space-y-10">
          <div className="space-y-3">
            <Label htmlFor="file-name">File Name</Label>
            <Input id="file-name" type="text" placeholder="File name" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="file-password">Set Password (optional)</Label>
            <Input id="file-password" type="password" placeholder="*******" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="file-expiration">Expiration Date</Label>
            <DateTimePicker />
          </div>
          <div className="space-y-3">
            <Label htmlFor="file-download-limit">Download Limit</Label>
            <Input id="file-download-limit" type="number" defaultValue={3} />
          </div>
        </div>
        <FileUplaod />
        <div className="flex justify-between max-lg:mb-20 mt-4">
          <Button type="reset" variant="secondary" className="cursor-pointer">
            <RotateCcw />
            Reset
          </Button>
          <Button type="submit" className="cursor-pointer">
            <Lock />
            Secure File
          </Button>
        </div>
      </form>
    </div>
  );
}
