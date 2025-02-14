import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;
export default function LoadingPage() {
  return (
   <div className="flex justify-center items-center w-full h-screen ">
      <div>
      <ClipLoader color={"blue"} loading={true} css={override} size={150} />
      <p className="text-xl uppercase font-bold mt-10 animate-bounce text-blue-400">Memuat Halaman</p>
      </div>
   </div>
  );
}
