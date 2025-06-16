import { QRCode as ReactQRCode } from "react-qrcode-logo";

export default function QRCode({ link }: { link: string }) {
  return <ReactQRCode value={link} />;
}
