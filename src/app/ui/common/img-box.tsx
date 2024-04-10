import Image from "next/image";
import { useState } from "react";
import { Cross1Icon, CheckIcon } from "@radix-ui/react-icons";

export default function ImgBox(
  id: string,
  url: string,
  width: number,
  height: number,
  alt: string | undefined,
  onDelete: any,
) {
  const [showDelete, setShowDelete] = useState(false);

  const handleMouseEnter = () => {
    setShowDelete(true);
  };

  const handleMouseLeave = () => {
    setShowDelete(false);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div id={id} style={{ position: "relative", display: "inline-block" }}>
      <Image
        src={url}
        alt={alt ? alt : "images"}
        width={width}
        height={height}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showDelete && (
        <div
          style={{ position: "absolute", top: 0, right: 0, cursor: "pointer" }}
        >
          {onDelete ? (
            <button onClick={handleDeleteClick}>
              {" "}
              <Cross1Icon />
            </button>
          ) : (
            <CheckIcon />
          )}
        </div>
      )}
    </div>
  );
}
