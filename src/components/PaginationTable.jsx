export default function PaginationTable() {
  return (
    <>
      <div className="flex item-center justify-between text-blue-400 my-10">
        <section>
Menampilkan 1 dari 10 Pendaftar
        </section>
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item">
              <button
                className=" text-blue-400 page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 focus:shadow-none"
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <button className="text-blue-400 page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                1
              </button>
            </li>
            <li className="page-item">
              <button className="text-blue-400 page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                2
              </button>
            </li>
            <li className="page-item">
              <button className="text-blue-400 page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                3
              </button>
            </li>
            <li className="page-item">
              <button className="text-blue-400 page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
