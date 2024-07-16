import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableCell2,
  TableHead,
  TableHead2,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { useLoadingClaimLinkTable } from "@/store/global-search";
import { LoaderCircle } from "lucide-react";
const ITEMS_PER_PAGE = 2;
const SyncClaimLinkTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const getPaginationItems = () => {
    const paginationItems = [];
    const ellipsis = <PaginationEllipsis key="ellipsis" />;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={1 === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        paginationItems.push(ellipsis);
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        paginationItems.push(ellipsis);
      }

      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={totalPages === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  const { loadingClaimLinkTable } = useLoadingClaimLinkTable();
  return (
    <>
      <div className=" flex overflow-auto w-[940px] ">
        {" "}
        <div className="h-[280px]">
          {" "}
          <Table className="">
            <TableHeader>
              <TableRow className="">
                <TableHead>propno</TableHead>
                <TableHead>prop_name</TableHead>
                <TableHead>prop_alias</TableHead>
                <TableHead2>owners</TableHead2>
                <TableHead>state_prov</TableHead>
                <TableHead>country</TableHead>
                <TableHead>region</TableHead>
                <TableHead>prop_url </TableHead>
                <TableHead>status </TableHead>
                <TableHead> map_area</TableHead>
                <TableHead>area_ha </TableHead>
                <TableHead>prop_loc </TableHead>
                <TableHead>propertyid </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loadingClaimLinkTable &&
                displayedData?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.propno}</TableCell>
                    <TableCell>{data.prop_name}</TableCell>
                    <TableCell>{data.prop_alias}</TableCell>
                    <TableCell2>{data.owners}</TableCell2>
                    <TableCell>{data.state_prov}</TableCell>
                    <TableCell>{data.country}</TableCell>
                    <TableCell>{data.region}</TableCell>
                    <TableCell>{data.prop_url}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.map_area}</TableCell>
                    <TableCell>{data.area_ha}</TableCell>
                    <TableCell>{data.prop_loc}</TableCell>
                    <TableCell>{data.propertyid}</TableCell>
                  </TableRow>
                ))}

              {/* <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
          {loadingClaimLinkTable && (
            <div className="w-[900px] h-[200px]  flex justify-center items-center">
              {loadingClaimLinkTable && (
                <LoaderCircle className="animate-spin" />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        {" "}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {getPaginationItems()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
export default SyncClaimLinkTable;
