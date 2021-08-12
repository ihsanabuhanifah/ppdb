import React from "react";
export default function Aside(props) {
  const handleChangeTagline = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      return props.setTagline("Info Seputar SMK MADINATULQURAN");
    }
    return props.setTagline(e.target.value);
  };
  return (
    <aside className="w-full">
    
      <input
        value={props.tagline}
        onInput={handleChangeTagline}
        placeholder="Tagline"
        className="border mt-5 w-full px-2 py-3"
        type="text"
      />
    </aside>
  );
}
