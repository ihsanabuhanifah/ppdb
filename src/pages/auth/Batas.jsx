export default function Batas({ title, children }) {
  return (
  <section className="px-4 py-5 border rounded-lg  mt-4  ">
      <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          height: "2px",
          backgroundColor: "#2c5aa0",
        }}
      ></div>
      <div
        className="text-blue-400 font-semibold"
        style={{
          fontSize: "18px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          flexGrow: 1,
          height: "2px",
          backgroundColor: "#2c5aa0",
        }}
      ></div>
    </div>
    <div>
        {children}
    </div>
  </section>
  );
}
