import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingBar({loading}) {
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: green;
  `;
    return (
        <ClipLoader color={"#ffffff"} loading={loading} css={override} size={150} />
    );
  }
  