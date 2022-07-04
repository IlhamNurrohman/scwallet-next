import Image from "next/image";

const ImageWrapper = ({ alt, imageClass, source }) => {
  return (
    <div className={imageClass}>
      <Image alt={alt} src={source} />
    </div>
  );
};

export default ImageWrapper;
