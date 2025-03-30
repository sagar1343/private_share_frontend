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
          <BreadcrumbLink>
            <Link to="/collections">
              <Heading>Collections</Heading>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem className="items-center">
          <ChevronRight size="28" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to={`/collections/${id}`}>
              <BreadcrumbPage>
                <Heading>{title}</Heading>
              </BreadcrumbPage>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
