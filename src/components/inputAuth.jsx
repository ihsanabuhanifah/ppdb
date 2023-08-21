export default function input({
    onFocus,
    onChange,
    onBlur,
    value,
    error,
    placeholder,
    tabIndex,
    type = "text",
    id,
    label,
    focus
  
   
  }) {
    return (
      <div
        onFocus={onFocus}
        className="mt-3 flex flex-col border shadow-md px-5 py-3  relative"
      >
        <label className="font-bold text-green-500" htmlFor={id}>
          Nama Lengkap
        </label>
        <input
         
          id={id}
          className="inline-flex w-full rounded-lg text-lg focus:outline-none"
          type={type}
          placeholder={placeholder}
          tabIndex={tabIndex}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {focus === id ? (
          <div className="bg-green-500 w-2 h-full absolute bottom-0  left-0"></div>
        ) : (
          ""
        )}
      </div>
    );
  }
  