import { useMemo, useState } from "react";
import CardDetailsIcon from "@/assets/CardDetails.svg";
import RecentTrans from "@/assets/RecentTrans.svg";
import Accordion from "@/components/common/Accordion";
import type { ICardDetails } from "@/components/lib/interface";
import RecentTransaction from "./RecentTransaction";

export default function CardDetails({
  cardDetails,
}: {
  cardDetails: ICardDetails;
}) {
  const [activeAccordion, setActiveAccordion] = useState<string | number>("");

  const accordionItems = useMemo(() => {
    setActiveAccordion(cardDetails?.id ? "" : "CARD_DETAILS");
    return [
      {
        title: "Card Details",
        code: "CARD_DETAILS",
        icon: CardDetailsIcon,
        component: <p className="p-6">Card Details</p>,
      },
      {
        title: "Recent Transactions",
        code: "RECENT_TRANSACTIONS",
        icon: RecentTrans,
        component: <RecentTransaction cardDetails={cardDetails} />,
      },
    ];
  }, [cardDetails?.id]);

  function _setActiveAccordion(code: string | number) {
    setActiveAccordion((prev) => (prev === code ? "" : code));
  }

  return (
    <>
      {accordionItems.map((i, index) => (
        <Accordion
          key={index}
          icon={i.icon}
          className={`${index !== accordionItems.length - 1 ? "mb-6" : ""}`}
          title={i.title}
          code={i.code}
          isOpen={activeAccordion === i.code}
          toggle={_setActiveAccordion}
          component={i.component}
        />
      ))}
    </>
  );
}
