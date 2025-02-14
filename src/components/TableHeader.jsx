export default function TableHeader({ setPer_page, setKeyword }) {
  // const [pageSize, setPageSize] = React.useState(10)
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="ml-4 w-full flex items-center justify-between ">
        <input
          className="border px-3 lg:px-5 py-2 w-1/2 rounded-md"
          placeholder="Cari ... "
          type="text"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />

        <button className="bg-blue-300  rounded-md px-4 py-2 border blue-200">
          Download Excel
        </button>
      </div>
    </div>
  );
}
