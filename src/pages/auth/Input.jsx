import clsx from "clsx";

export default function InputReg({
  errors,
  touched,
  placeholder,
  handleBlur,
  handleChange,
  isSubmitting,
  value,
  title,
  id,
  focus,
  setFocus,
  type,
  isRequired = false, disabled
}) {
  return (
    <>
      {" "}
      <div
        onFocus={() => {
          setFocus(id);
        }}
        className={clsx(
          `mt-3 flex flex-col border shadow-md px-5 py-3 relative   rounded-lg`,
          {
            "border-red-500": errors && touched,
            "opacity-100" : isSubmitting || disabled === true
          }
        )}
      >
        <label className="font-bold text-blue-400" htmlFor="name">
          {title} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          id={id}
          className={clsx(`inline-flex w-full rounded-lg text-lg focus:outline-none`, {
            "opacity-10" : isSubmitting || disabled
          })}
          type={type}
          placeholder={placeholder}
          tabIndex="1"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          disabled={isSubmitting || disabled}
        />
        {focus === id ? (
          <div className="bg-blue-400 w-2 h-full absolute bottom-0  left-0"></div>
        ) : (
          ""
        )}
      </div>
      {errors && touched && (
        <p className="text-red-500 italic font-bold  text-sm mt-1">
          {errors}
        </p>
      )}
    </>
  );
}
