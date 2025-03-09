import React, { useState } from "react";
import { Card } from "./components/ui/card";
import Authorization from "./helpers/Authorization";
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "./components/ui/pagination";

interface NewsItem {
    _id: string;
    article: string;
    claims: any[]; // Adjust this if you have a specific claim structure
    created_by: string;
    created_at: string;
  }

const NewsCheckedList = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  React.useEffect(() => {
    const headers = Authorization.getHttpHeader();
    console.log(headers);
        axios
        .get("http://localhost:3001/api/fact-check", { headers })
        .then((response) => {
            console.log(response);
          setNews(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });

  }, [])


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(news?.length / itemsPerPage);

  const paginatedNews = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white px-4 w-full">
      <Card className="w-full max-w-4xl p-6 shadow-md rounded-lg bg-white border border-gray-300">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          News Checked List
        </h1>

        {/* Table Container with Fixed Height & Width */}
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
          <Table className="w-full min-w-[800px]">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="text-black text-center w-[10%]">S.No</TableHead>
                <TableHead className="text-black w-[25%]">Article Name</TableHead>
                <TableHead className="text-black w-[30%]">Sources</TableHead>
                <TableHead className="text-black w-[20%]">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedNews.length > 0 ? (
                paginatedNews.map((news, index) => (
                  <TableRow key={news._id} className="hover:bg-gray-100 transition">
                    <TableCell className="text-center text-black">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="text-black">{news.article}</TableCell>
                    <TableCell className="text-black">
                      <ul className="list-disc pl-4">
                        {news?.claims.map((claim: any, idx: any) => (
                          <li key={idx}>
                            <a
                              href={claim.claimReview[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              {claim.claimReview[0].title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="text-black">{news.created_at}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Component */}
        {news.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`text-black ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  />
                </PaginationItem>

                <PaginationItem>
                  <span className="text-black px-4">
                    {currentPage} / {totalPages}
                  </span>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    className={`text-black ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NewsCheckedList;
