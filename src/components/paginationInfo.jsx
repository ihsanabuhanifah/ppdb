import React from "react";

function PaginationInfo({ currentPage, pageSize, totalItems }) {
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  return (
    <div className="text-sm text-gray-700">
      Menampilkan {startIndex + 1} sampai {endIndex + 1} dari {totalItems} pendaftar
    </div>
  );
}

export default PaginationInfo;