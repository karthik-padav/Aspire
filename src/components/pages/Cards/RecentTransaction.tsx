import { useEffect } from "react";
import type { ICardDetails } from "@/components/lib/interface";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/components/lib/redux/store";
import { fetchTransactionsByCardId } from "@/components/lib/redux/transactionsSlice";
import { constants } from "@/components/lib/constants";
import NextArrow from "@/assets/Next.svg";
import BusinessAndFinance from "@/assets/BusinessAndFinance.svg";

export default function RecentTransaction({
  cardDetails,
}: {
  cardDetails: ICardDetails;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) =>
    cardDetails ? state.transactions.data[cardDetails.id] || [] : []
  );
  const loading = useSelector((state: RootState) => state.transactions.loading);

  useEffect(() => {
    dispatch(fetchTransactionsByCardId(cardDetails.id));
  }, [dispatch, cardDetails?.id]);

  return (
    <div className="">
      <div className="px-6 border-b rounded-lg">
        {loading ? (
          <p className="text-base text-center p-6">Loading...</p>
        ) : (
          <>
            {transactions.map((item) => {
              const catg = constants.transactionCatg.find(
                (cat) => cat.code === item.transType
              );
              return (
                <div
                  key={item.id}
                  className={`flex items-start justify-between border-b py-4 border-grey5`}
                >
                  <div className="flex items-start">
                    {catg?.icon && (
                      <div
                        className="p-4 rounded-full mr-3"
                        style={{ backgroundColor: catg.color }}
                      >
                        <img src={catg.icon} alt="Transaction Icon" />
                      </div>
                    )}
                    <div className="text-sm">
                      <p className="text-navyBlue">{item.title}</p>
                      <p className="text-darkGrey">{item.date}</p>
                      <div className="mt-2 flex items-center">
                        <div className="mr-2 bg-royalBlue inline-block p-2 rounded-xl">
                          <img
                            src={BusinessAndFinance}
                            alt="Business And Finance"
                          />
                        </div>
                        <span className="text-xs text-royalBlue">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p
                      className={`text-sm font-semibold ${
                        item.action === "DEBIT" ? "" : "text-green"
                      }`}
                    >
                      {item.action === "DEBIT"
                        ? "-"
                        : item.action === "CREDIT"
                        ? "+"
                        : ""}
                      {item.currency} {item.amount}
                    </p>
                    <img src={NextArrow} alt="View All" className="ml-2" />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      {!loading && transactions.length > 0 && (
        <div className="bg-pistaGreen1 px-6 py-4 text-center">
          <p className="text-sm text-green font-semibold">
            View All Card Transactions
          </p>
        </div>
      )}
    </div>
  );
}
