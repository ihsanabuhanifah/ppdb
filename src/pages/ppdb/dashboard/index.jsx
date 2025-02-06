import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Payment from "../payment";
import Payment2 from "../payment/index2";
export default function Dashboard() {
  const name = useSelector((state) => state.auth.name);
  const isPayment = useSelector((state) => state.auth.isPayment);
  console.log(isPayment);
  let history = useHistory();
  return (
    <div>
      <div className="leading-relaxed border-b-2 pb-5">
        <h2 className="text-2xl font-bold mb-3">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </h2>
        <h4>
          <span className="italic font-bold text-gray-600">
            Assalamualikum Warohmatullahi Wabarokatuh{" "}
          </span>{" "}
          <br />
          <span className="text-green-500 font-semibold text-lg">
            Selamat Kepada {name}
          </span>
        </h4>
      </div>
     

    
    </div>
  );
}
