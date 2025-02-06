import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToast, useClipboard } from "@chakra-ui/react";
export default function Kelulusan() {
  const name = useSelector((state) => state.auth.name);
  const isLulus = useSelector((state) => state.auth.isLulus);
  const isSudahTes = useSelector((state) => state.auth.isSudahTes);
  const isPayment = useSelector((state) => state.auth.isPayment);
  const [value, setValue] = React.useState(3310006100);
  const { hasCopied, onCopy } = useClipboard(value);
  console.log(isPayment);
  let history = useHistory();
  return (
    <React.Fragment>
    <div>

      <h2>Halama Kelulusan</h2>
        </div>
      
    </React.Fragment>
  );
}
