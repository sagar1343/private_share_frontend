import Heading from "@/components/Heading";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";

interface Props {
  id: string | undefined;
  title: string;
}

export default function CollectionBreadCrumb({ id, title }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/collections">
            <Heading>Collections</Heading>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem className="items-center">
          <ChevronRight size="28" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/collections/${id}`}>
            <BreadcrumbPage>
              <Heading>{title}</Heading>
            </BreadcrumbPage>
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
