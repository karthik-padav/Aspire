import type { ICardDetails } from "@/components/lib/interface";
import FreezeCard from "@/assets/FreezeCard.svg";
import SetSpendLimit from "@/assets/SetSpendLimit.svg";
import GPay from "@/assets/GPay.svg";
import ReplaceCard from "@/assets/ReplaceCard.svg";
import DeactivateCard from "@/assets/DeactivateCard.svg";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/components/lib/redux/store";
import { updateCardById } from "@/components/lib/redux/cardsSlice";
import Modal from "@/components/common/Modal";

interface ActionItem {
  title: string;
  icon: string;
  fnc?: () => void;
}

export default function ActionComponent({
  cardDetails,
}: {
  cardDetails: ICardDetails;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const title =
    cardDetails.status === "active" ? "Freeze Card" : "Unfreeze Card";
  const message =
    cardDetails.status === "active"
      ? "Are you sure you want to freeze this card? You won’t be able to use it for new transactions until you unfreeze it."
      : "Are you sure you want to unfreeze this card? You’ll be able to use it again for new transactions.";

  function freezeCard() {
    dispatch(
      updateCardById({
        ...cardDetails,
        status: cardDetails.status === "active" ? "frozen" : "active",
      })
    );
    setIsModalOpen(!isModalOpen);
  }

  const actions: ActionItem[] = useMemo(
    () => [
      {
        title:
          cardDetails.status === "active" ? "Freeze Card" : "Unfreeze Card",
        icon: FreezeCard,
        fnc: () => setIsModalOpen(!isModalOpen),
      },
      {
        title: "Set Spend Limit",
        icon: SetSpendLimit,
      },
      {
        title: "Add To GPay",
        icon: GPay,
      },
      {
        title: "Replace Card",
        icon: ReplaceCard,
      },
      {
        title: "Cancel Card",
        icon: DeactivateCard,
      },
    ],
    [cardDetails]
  );

  return (
    <div className="grid grid-cols-5 gap-1 md:gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          className="flex flex-col items-center"
          onClick={() => action.fnc?.()}
        >
          <img src={action.icon} alt={action.title} />
          <p className="text-navyBlue text-xs md:text-sm text-center mt-2">
            {action.title}
          </p>
        </button>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title={title}
      >
        <div>
          <p className="text-sm">{message}</p>
          <div className="flex justify-end mt-4">
            <button
              className="text-sm bg-royalBlue flex justify-end items-center rounded-md text-white px-3 py-2"
              onClick={freezeCard}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
