import { useEffect, useState } from "react";
import Carousel from "@/components/common/Carousel";
import Eye from "@/assets/Eye.svg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/components/lib/redux/store";
import { fetchCards } from "@/components/lib/redux/cardsSlice";
import CardDetails from "./CardDetails";
import VCard from "@/components/common/VCard";
import ActionComponent from "./ActionComponent";
import { setCurrectCard } from "@/components/lib/redux/commonSlice";

const tabs = [
  {
    title: "My Debit Cards",
    code: "MY_DEBIT_CARDS",
  },
  {
    title: "All Company Cards",
    code: "ALL_COMPANY_CARDS",
  },
];

export default function CardTabBody() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].code);
  const [showCardNumber, toggleCardNumber] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading: cardLoader, data: debitCardDetails } = useSelector(
    (state: RootState) => state.cards
  );

  const { currentCard } = useSelector((state: RootState) => state.commonSlice);

  const currentCardDetails = debitCardDetails.find((i) => i.id === currentCard);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div className="mt-7 md:mt-11">
      <div className="mb-4">
        {tabs.map((i) => (
          <button
            onClick={() => setActiveTab(i.code)}
            key={i.code}
            className={`text-sm pb-1 mr-8 ${
              activeTab === i.code
                ? "font-AvenirNextDemi border-b-2 border-skyBlue1"
                : "AvenirNextRegular opacity-30"
            }`}
          >
            {i.title}
          </button>
        ))}
      </div>
      <div className="md:border-2 md:drop-shadow-sm md:border-white1 md:rounded-md md:p-8 xl:p-10">
        {activeTab === "MY_DEBIT_CARDS" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div>
              <button
                className="flex justify-center items-center mt-0 ml-auto mr-0 md:pb-3 pb-4 md:px-0 px-2 md:pt-0 pt-1 -mb-3 md:mb-0 bg-white md:bg-transparent rounded-md"
                onClick={() => toggleCardNumber(!showCardNumber)}
              >
                <img src={Eye} alt="Eye" />
                <span className="text-xs text-center text-green ml-1">
                  {showCardNumber ? "Hide" : "Show"} Card Number
                </span>
              </button>
              {debitCardDetails.length > 0 && (
                <div className="-mx-2">
                  <Carousel
                    setActiveIndex={(i) =>
                      dispatch(setCurrectCard(debitCardDetails[i].id))
                    }
                    items={debitCardDetails.map((i) => (
                      <div className="relative px-2" key={i.id}>
                        <div className="absolute top-0 bottom-0 left-0 right-0 z-50" />
                        <VCard
                          showCardNumber={showCardNumber}
                          details={i}
                          loading={cardLoader}
                        />
                      </div>
                    ))}
                  />
                </div>
              )}
              {currentCardDetails && (
                <div className="hidden md:block p-6 bg-pastelBlue mt-8 rounded-lg">
                  <ActionComponent cardDetails={currentCardDetails} />
                </div>
              )}
            </div>
            {currentCardDetails && (
              <div className="hidden md:block ">
                <CardDetails cardDetails={currentCardDetails} />
              </div>
            )}
          </div>
        )}
        {activeTab === "ALL_COMPANY_CARDS" && (
          <div className="flex flex-col">
            <p className="text-sm text-center my-4 opacity-50">
              You don’t have any cards yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
