export default function Input({  placeholder, id, name, type, className }) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      //value={value}
      //onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
