export default function Button({ children, type, className }) {
    return (
      <button
        type={type}
        className={className}
        //onClick={onClick}
      >
        {children}
      </button>
    );
  }