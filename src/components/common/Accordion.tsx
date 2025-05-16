import DownArrow from "@/assets/DownArrow.svg";
import UpArrow from "@/assets/UpArrow.svg";

interface Props {
  component: React.ReactNode;
  isOpen: boolean;
  icon: string;
  code: string;
  toggle: (code: string | number) => void;
  title: string;
  className?: string;
}

export default function Accordion({
  component,
  title,
  icon,
  toggle,
  code,
  isOpen,
  className = "",
}: Props) {
  return (
    <div
      key={code}
      className={`border overflow-hidden rounded-lg border-grey5 ${className}`}
    >
      <div
        onClick={() => toggle(code)}
        className="bg-cream1 drop-shadow-sm p-6 cursor-pointer flex items-center justify-between rounded-lg"
      >
        <div className="flex items-center">
          {icon && <img src={icon} alt="Down Arrow" className="mr-3" />}
          <p className="text-navyBlue text-sm">{title}</p>
        </div>
        {isOpen ? (
          <img src={UpArrow} alt="Up Arrow" />
        ) : (
          <img src={DownArrow} alt="Down Arrow" />
        )}
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        {isOpen && component}
      </div>
    </div>
  );
}
