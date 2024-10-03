import Image from 'next/image';

export default function CustomImage({ src, alt, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      layout="fill" // o cualquier otra configuración que necesites
    />
  );
}
