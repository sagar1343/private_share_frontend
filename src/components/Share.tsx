import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Hashids from "hashids";
import { useEffect, useState } from "react";
import {
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  XIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import CopyLink from "./CopyLink";
import QRCode from "./QRCode";
import { Button } from "./ui/button";

const SOCIALS = [
  {
    name: "Whatsapp",
    Button: WhatsappShareButton,
    Icon: WhatsappIcon,
  },
  {
    name: "Facebook",
    Button: FacebookShareButton,
    Icon: FacebookIcon,
  },
  {
    name: "Twitter",
    Button: TwitterShareButton,
    Icon: XIcon,
  },
  {
    name: "Telegram",
    Button: TelegramShareButton,
    Icon: TelegramIcon,
  },
];

export default function Share({ id }: { id: number }) {
  const [encodedId, setEncodedId] = useState<string | null>(null);

  useEffect(() => {
    const hashids = new Hashids("private-share-salt", 10);
    setEncodedId(hashids.encode(id));
  }, []);

  if (!encodedId) return null;

  const encodedURL = `${import.meta.env.VITE_HOST_URL}share?id=${encodedId}`;

  return (
    <div className="flex items-center gap-2">
      <CopyLink encodedURL={encodedURL} />

      <Dialog>
        <DialogTrigger asChild>
          <Button>Share</Button>
        </DialogTrigger>

        <DialogContent className="flex flex-col items-center space-y-4">
          <DialogHeader>
            <DialogTitle>Share with QR</DialogTitle>
          </DialogHeader>

          <QRCode link={encodedURL} />

          <DialogFooter className="flex max-sm:flex-row space-x-2 justify-center">
            {SOCIALS.map(({ name, Button: ShareBtn, Icon }) => (
              <ShareBtn url={encodedURL} key={name}>
                <Icon className="rounded-full size-10" />
              </ShareBtn>
            ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
