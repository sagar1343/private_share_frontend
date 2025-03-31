import Heading from "@/components/Heading";
import SecureFileForm from "@/components/SecureFileForm";

export default function FileCreate() {
  return (
    <div>
      <Heading asHeading className="capitalize">
        Secure your file smartly
      </Heading>
      <SecureFileForm />
    </div>
  );
}
