import { useEffect, useRef, useState } from "react";
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
import {
  useLoadingAssetTable,
  useLoadingPropertyTable,
} from "@/store/global-search";
import { LoaderCircle } from "lucide-react";
const ITEMS_PER_PAGE = 2;
const SyncPropTable = ({ data }) => {
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

  const { loadingPropertyTable } = useLoadingPropertyTable();

  return (
    <>
      <div className=" flex overflow-auto w-[940px] ">
        <div className="h-[280px]  ">
          {" "}
          <Table className="">
            <TableHeader>
              <TableRow className="">
                <TableHead>No.</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Alias</TableHead>
                <TableHead>Mineral Belt</TableHead>
                <TableHead2>Owners </TableHead2>
                <TableHead> Location </TableHead>
                <TableHead> Area</TableHead>
                <TableHead>State / Province </TableHead>
                <TableHead>Country </TableHead>
                <TableHead>Region </TableHead>
                <TableHead>Url </TableHead>
                <TableHead>Latitude </TableHead>
                <TableHead>Longitude </TableHead>
                <TableHead>Accuracy </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loadingPropertyTable &&
                displayedData?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.propno}</TableCell>
                    <TableCell>{data.propertyid}</TableCell>
                    <TableCell>{data.prop_name}</TableCell>
                    <TableCell>{data.prop_alias}</TableCell>

                    <TableCell>{data.min_belt}</TableCell>
                    <TableCell2>{data.owners}</TableCell2>
                    <TableCell>{data.prop_loc}</TableCell>
                    <TableCell>{data.area}</TableCell>
                    <TableCell>{data.state_prov}</TableCell>
                    <TableCell>{data.country}</TableCell>
                    <TableCell>{data.region}</TableCell>
                    <TableCell>{data.prop_url}</TableCell>
                    <TableCell>{data.latitude}</TableCell>
                    <TableCell>{data.longitude}</TableCell>
                    <TableCell>{data.accuracy}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {loadingPropertyTable && (
            <div className="w-[900px] h-[200px]  flex justify-center items-center">
              {loadingPropertyTable && (
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
export default SyncPropTable;
