export default function TableHeader({setPer_page, setKeyword}) {
  // const [pageSize, setPageSize] = React.useState(10)
  return (
    <div className="flex items-center justify-between mb-5">
    
      <div className="ml-4 w-full lg:w-1/3">
      
             <input
          className="border px-3 lg:px-5 py-2 w-full rounded-md"
          placeholder="Cari ... "
          type="text"
          onChange={(e)=> {
            setKeyword(e.target.value)
          }}
        />
       
      </div>
    </div>
  );
}
