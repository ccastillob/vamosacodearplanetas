interface LineProps {
  className?: string;
}
export const Line = ({ className = "" }: LineProps) => (
  <div
    data-testid="line-component"
    className={`h-px ${className} bg-gray`}
  ></div>
);
