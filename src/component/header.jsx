import React from "react";

function Header(props) {
  const [count, setCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <header className="h-full w-full flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold">
          MQ<span className="text-red-400 font-bold">NEWS</span>
        </h1>
        <p className="text-md font-semibold">Info SMK MADINATULQURAN</p>
      </div>

      <div>
        <p className="text-xl font-bold text-center">{count}</p>
        <p className="text-red-500 font-bold italic">{errorMessage}</p>
        <div>
          <button
            onClick={() => {
              setErrorMessage("");
              return setCount((count) => count + 1);
            }}
            className="inline-flex bg-blue-500 px-3 py-3 text-white rounded-lg"
          >
            Tambah
          </button>
          <button
            onClick={() => {
              if (count === 0) {
                return setErrorMessage(
                  "Nilai sudah 0 , anda tidak bisa mengurangi lagi"
                );
              }
              return setCount((count) => count - 1);
            }}
            className="inline-flex bg-red-500 px-3 py-3 text-white rounded-lg"
          >
            Kurang
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
