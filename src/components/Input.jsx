

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
  children,
  disabled,
  required = false
}) {
  return (
    <div
      onFocus={onFocus}
      className="mt-3  items-center"
    >
      <label
        className="font-bold text-[#1E046C] "
        htmlFor={id}
      >
        <span className="uppercase">{label}</span> {required ? (<span className="italic text-md text-red-500">(wajib)</span>) : ""}
      </label>
      <div className="mt-5">
        <input
          id={id}
          className="w-full text-lg  border py-3 px-5 focus:bg-blue-100 "
          type={type}
          placeholder={placeholder}
          tabIndex={tabIndex}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
        />
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
