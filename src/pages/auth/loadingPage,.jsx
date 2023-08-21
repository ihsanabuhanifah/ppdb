import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;
export default function LoadingPage() {
  return (
   <div className="flex justify-center items-center w-full h-screen ">
      <div>
      <ClipLoader color={"#ffffff"} loading={true} css={override} size={150} />
      <p className="text-xl uppercase font-bold mt-10 animate-bounce text-green-500">Memuat Halaman</p>
      </div>
   </div>
  );
}
