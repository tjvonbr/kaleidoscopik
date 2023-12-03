import { forwardRef } from "react";
import Image from "next/image";

interface PrintableImageProps {
  alt: string;
  onClick: () => void;
  prompt: string;
  src: string;
}

export type PrintableImageRef = HTMLImageElement;

export const PrintableImage = forwardRef<
  PrintableImageRef,
  PrintableImageProps
>(function PrintableComponent({ alt, src }, ref) {
  return (
    <div className="min-h-screen">
      <Image src={src} alt={alt} fill={true} ref={ref} />
    </div>
  );
});
PrintableImage.displayName = "PrintableComponent";
