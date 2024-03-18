interface CanvasProps {
  children?: React.ReactNode;
}

export default function CanvasLayout({ children }: CanvasProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  );
}
