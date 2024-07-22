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
import { useLoadingAssetTable } from "@/store/global-search";
import { LoaderCircle } from "lucide-react";
const ITEMS_PER_PAGE = 2;
const AssetsTable = ({ data }) => {
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

  const { loadingAssetTable } = useLoadingAssetTable();
  return (
    <>
      {" "}
      <div className=" flex overflow-auto w-[940px] ">
        <div className="h-[280px]">
          {" "}
          <Table className="">
            <TableHeader>
              <TableRow className="">
                <TableHead>No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stage</TableHead>

                <TableHead>Commodities</TableHead>
                <TableHead className="w-[350px]">Area</TableHead>
                <TableHead className="w-[150px]">State / Province </TableHead>
                <TableHead> Country </TableHead>
                <TableHead> Region</TableHead>
                <TableHead>Accuracy </TableHead>
                <TableHead2>Owners </TableHead2>
                <TableHead>Property </TableHead>
                <TableHead>Latitude </TableHead>
                <TableHead>Longitude </TableHead>
                <TableHead>Id </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loadingAssetTable &&
                displayedData?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.assetno}</TableCell>

                    <TableCell>{data.asset_name}</TableCell>
                    <TableCell>{data.asset_type}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.dev_stage}</TableCell>
                    <TableCell>{data.commodities}</TableCell>
                    <TableCell>{data.area}</TableCell>
                    <TableCell>{data.state_prov}</TableCell>
                    <TableCell>{data.country}</TableCell>
                    <TableCell>{data.region}</TableCell>
                    <TableCell2>{data.accuracy}</TableCell2>
                    <TableCell>{data.owners}</TableCell>
                    <TableCell>{data.property}</TableCell>
                    <TableCell>{data.latitude}</TableCell>
                    <TableCell>{data.longitude}</TableCell>
                    <TableCell>{data.assetid}</TableCell>
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
          {loadingAssetTable && (
            <div className="w-[900px] h-[200px]  flex justify-center items-center">
              {loadingAssetTable && <LoaderCircle className="animate-spin" />}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
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
export default AssetsTable;
