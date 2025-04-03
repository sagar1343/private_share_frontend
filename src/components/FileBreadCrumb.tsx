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
        {!fileId && (
          <>
            <BreadcrumbItem className="max-md:hidden">
              <Link to="/collections">
                <Heading>Collections</Heading>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem className="items-center max-md:hidden">
              <ChevronRight size="28" />
            </BreadcrumbItem>
          </>
        )}
        {collectionId && (
          <BreadcrumbItem className="max-md:hidden">
            <Link to={`/collections/${collectionId}`}>
              {fileId ? (
                <>
                  {collectionTitle ? (
                    <Heading className="max-w-[12ch] truncate">
                      {collectionTitle}
                    </Heading>
                  ) : (
                    <Ellipsis size="28" />
                  )}
                </>
              ) : (
                <BreadcrumbPage>
                  {collectionTitle ? (
                    <Heading className="max-w-[12ch] truncate">
                      {collectionTitle}
                    </Heading>
                  ) : (
                    <Ellipsis size="28" />
                  )}
                </BreadcrumbPage>
              )}
            </Link>
          </BreadcrumbItem>
        )}
        {fileId && (
          <>
            <BreadcrumbItem className="items-center max-md:hidden">
              <ChevronRight size="28" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/collections/${collectionId}/files/${fileId}`}>
                <BreadcrumbPage>
                  <Heading className="max-w-[12ch] truncate">
                    {fileTitle}
                  </Heading>
                </BreadcrumbPage>
              </Link>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
