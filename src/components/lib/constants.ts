import FileStorage from "@/assets/FileStorage.svg";
import Flights from "@/assets/Flights.svg";
import Megaphone from "@/assets/Megaphone.svg";
import Home from "@/assets/Home.svg";
import Card from "@/assets/Card.svg";
import Payments from "@/assets/Payments.svg";
import Credit from "@/assets/Credit.svg";
import Account from "@/assets/Account.svg";
import MLogo from "@/assets/MLogo.svg";
import MCard from "@/assets/MCard.svg";
import MPayments from "@/assets/MPayments.svg";
import MCredit from "@/assets/MCredit.svg";
import MAccount from "@/assets/MAccount.svg";

export const constants = {
  transactionCatg: [
    { color: "#009DFF1A", icon: FileStorage, code: "FILE_STORAGE" },
    { color: "#00D6B51A", icon: Flights, code: "FLIGHTS" },
    { color: "#F251951A", icon: Megaphone, code: "MEGAPHONE" },
  ],
  menu: [
    {
      title: "Home",
      icon: Home,
      m_icon: MLogo,
      url: "/",
    },
    {
      title: "Cards",
      icon: Card,
      m_icon: MCard,
      url: "/cards",
    },
    {
      title: "Payments",
      icon: Payments,
      m_icon: MPayments,
      url: "/payments",
    },
    {
      title: "Credit",
      icon: Credit,
      m_icon: MCredit,
      url: "/credit",
    },
    {
      title: "Settings",
      icon: Account,
      m_icon: MAccount,
      url: "/account",
    },
  ],
};
