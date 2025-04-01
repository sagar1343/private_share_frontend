import Heading from "@/components/Heading";
import { ChevronRight, Ellipsis } from "lucide-react";
import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";

interface Props {
  fileId?: number;
  fileTitle?: string;
  collectionId?: number;
  collectionTitle?: string;
}

export default function FileBreadCrumb({
  fileId,
  fileTitle,
  collectionId,
  collectionTitle,
}: Props) {
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
        {collectionId && (
          <BreadcrumbItem>
            <Link to={`/collections/${collectionId}`}>
              <BreadcrumbPage>
                {collectionTitle ? (
                  <Heading>{collectionTitle}</Heading>
                ) : (
                  <Ellipsis size="28" />
                )}
              </BreadcrumbPage>
            </Link>
          </BreadcrumbItem>
        )}
        {fileId && (
          <>
            <BreadcrumbItem className="items-center">
              <ChevronRight size="28" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/collections/${collectionId}/files/${fileId}`}>
                <BreadcrumbPage>
                  <Heading>{fileTitle}</Heading>
                </BreadcrumbPage>
              </Link>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
