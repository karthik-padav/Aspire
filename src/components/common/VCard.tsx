import LogoWhite from "@/assets/Logo-White.svg";
import VisaLogo from "@/assets/VisaLogo.svg";
import type { ICardDetails } from "../lib/interface";

interface Props {
  details: ICardDetails;
  showCardNumber: boolean;
  loading?: boolean;
}

function dot() {
  return (
    <span className="flex items-center">
      {Array.from({ length: 4 }, (_, i) => i).map((i) => (
        <span
          className={`h-2 w-2 rounded-full bg-white ${i === 3 ? "" : "mr-1"}`}
          key={i}
        />
      ))}
    </span>
  );
}

export default function VCard({ details, showCardNumber }: Props) {
  const cardNumber = details.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  return (
    <div
      className={`text-white p-6 md:p-7 bg-green rounded-xl transition-all duration-300 ${
        details.status === "frozen" ? "opacity-50 grayscale" : ""
      }`}
    >
      <img src={LogoWhite} alt="Eye" className="my-0 mr-0 mx-auto" />
      <p className="text-xl md:text-2xl font-semibold my-6">
        {details.cardHolder}
      </p>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {cardNumber.split(" ").map((i, index) => {
          const isLast = index === cardNumber.split(" ").length - 1;
          return (
            <span
              key={index}
              className={`text-sm font-semibold flex items-center`}
            >
              {isLast ? i : showCardNumber ? i : dot()}
            </span>
          );
        })}
      </div>
      <div className="mt-5 text-sm font-semibold flex items-center">
        <span>{details.expiryDate}</span>
        <p className="ml-9 flex items-center">
          CVV:{" "}
          <span className="text-2xl md:text-3xl mt-1 md:mt-2 leading-none">
            ***
          </span>
        </p>
      </div>
      {details.cardType === "VISA" && (
        <img src={VisaLogo} alt="Eye" className="ml-auto mr-0" />
      )}
    </div>
  );
}
