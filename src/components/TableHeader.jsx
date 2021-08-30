export default function TableHeader() {
  return (
    <div className="flex items-center justify-between mb-5">
      <select className="border p-2 rounded-md" name="" id="">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>

        <option value="100">100</option>
      </select>
      <div className="ml-4 w-full lg:w-1/3">
        <input
          className="border px-3 lg:px-5 py-2 w-full rounded-md"
          placeholder="Cari ... "
          type="text"
        />
      </div>
    </div>
  );
}
