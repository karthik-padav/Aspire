import MLogoGreen from "@/assets/MLogoGreen.svg";
import CardHeader from "./CardHeader";
import CardTabBody from "./CardTabBody";
import ActionComponent from "./ActionComponent";
import CardDetails from "./CardDetails";
import { useSelector } from "react-redux";
import type { RootState } from "@/components/lib/redux/store";

export default function Cards() {
  const { currentCard } = useSelector((state: RootState) => state.commonSlice);

  const { data: debitCardDetails } = useSelector(
    (state: RootState) => state.cards
  );
  const currentCardDetails = debitCardDetails.find((i) => i.id === currentCard);

  return (
    <>
      {/* Mobile Layout Start*/}
      <div className="relative h-screen w-full overflow-hidden md:hidden bg-navyBlue ">
        <div className="fixed top-0 left-0 w-full h-[75vh] bg-navyBlue text-white z-10 p-6">
          <img src={MLogoGreen} alt="aspire" className="my-0 ml-auto mr-0" />
          <CardHeader />
          <CardTabBody />
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-y-scroll z-20 pointer-events-none">
          <div className="h-[75vh]" />
          <div className="pointer-events-auto bg-white h-auto rounded-t-3xl overflow-hidden pb-20">
            {currentCardDetails && (
              <div className="p-5 bg-pastelBlue rounded-lg">
                <ActionComponent cardDetails={currentCardDetails} />
              </div>
            )}
            {currentCardDetails && (
              <div className="p-6">
                <CardDetails cardDetails={currentCardDetails} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Layout Ends*/}

      {/* Desktop Layout Start*/}
      <div className="hidden md:block">
        <CardHeader />
        <CardTabBody />
      </div>
      {/* Desktop Layout Ends*/}
    </>
  );
}
