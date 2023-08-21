export default function TableLoading(){
    return (
        <div className="border  shadow rounded-md p-4  w-full mx-auto">
        <div className="animate-pulse flex space-x-4 w-full ">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-10 bg-gray-300 rounded w-full" />
            <div className="grid grid-cols-7 gap-x-5">
              <div className="h-6 bg-gray-300 rounded " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
            </div>
            <div className="grid grid-cols-7 gap-x-5">
              <div className="h-6 bg-gray-300 rounded " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
            </div>
            <div className="grid grid-cols-7 gap-x-5">
              <div className="h-6 bg-gray-300 rounded " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
            </div>
            <div className="grid grid-cols-7 gap-x-5">
              
              <div className="h-6 bg-gray-300 rounded col-span-5 " />
              <div className="h-6 bg-gray-300 rounded col-span-2 " />
            </div>
          </div>
        </div>
      </div>
    )
}