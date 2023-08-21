import React from "react";
import { useQuery } from "react-query";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
// import { Link, useHistory } from "react-router-dom";
import { getAdmin } from "../../../api/admin";
import ReactWhatsapp from "react-whatsapp";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/messaging";
import postfirebase from "../../../api/axiosfirebae";
export default function Admin() {
  const [page] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [keyword, setKeyword] = React.useState("");
  const { data } = useQuery(
    //query key
    [
      "list_admin",
      {
        page: page,
        limit: pageSize,
        keyword: keyword,
      },
    ],

    () =>
      getAdmin({
        page: page,
        limit: pageSize,
        keyword: keyword,
      }),

    {
      keepPreviousData: true,
      select: (response) => response.data,
      staleTime: 1000 * 60 * 10,
    }
  );

  const sendMessage = async () => {
    let payload = {
      message: {
        token:
          "cTJ28sulobE9QpG5FDW1No:APA91bGsfjoc0GRWZS6dSR4Ed_K7I62CBgbYBcNyUw_lmqI6Ob_einjATPDEnltgifQHmocwN4Il6aso_h1l0prMBhAhYdoEItljSG87FmnkAmEHclufp28LNG-MAC4X8irCTrPHXq_c",
        notification: {
          title: "Background Message Title",
          body: "Background message body",
        },
        webpush: {
          fcm_options: {
            link: "https://dummypage.com",
          },
        },
      },
    };
    await postfirebase.post("/messages:send", payload);
    //  "dTwHKcTDIw01birvmSdbeH:APA91bE4EoVEChzlAX1y-QREDqrBJQO6pClbfCuN2uymMsRj_Gi01mEfc4jYyC7WU8I8eXR-WDAmG-Bj-5qcwvBPySRqqhJtUXaCdZwULr482OZ763GFfBsLZouQA8qsuLCiw1DHuQFK",
  };
  return (
    <div className="text-green-500 grid grid-cols-1 gap-5">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl  font-semibold">
          DAFTAR USER PORTAL PPDB SMK MADINATULQURAN
        </h1>
      </div>

      <button onClick={sendMessage}>Kirim Mmessage</button>
      {/* table */}
      <div className="p-1n ">
        <TableHeader></TableHeader>
      </div>
      <div className="p-1  overflow-auto ">
        <table className="min-w-full relative ">
          <thead>
            <tr className="uppercase">
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-green-500 tracking-wider">
                No
              </th>

              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Nomor HP
              </th>

              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
            </tr>
          </thead>{" "}
          <tbody className="bg-white relative">
            {}
            {data?.data?.map((dt, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm leading-5 text-gray-800">
                        {(page - 1) * pageSize + index + 1}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <ReactWhatsapp number={dt.phone} message={"bismillah"}>
                    <button className="hover:text-green-500 hover:font-bold hover:text-lg">
                      {dt.phone}
                    </button>
                  </ReactWhatsapp>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-5 text-green-500">
          <PaginationInfo
            totalItems={5}
            currentPage={1}
            pageSize={pageSize}
          ></PaginationInfo>
          {/* <Pagination
            totalItems={20}
            currentPage={1}
            pageSize={pageSize}
          ></Pagination> */}
        </div>
      </div>
      {/* table */}
    </div>
  );
}
