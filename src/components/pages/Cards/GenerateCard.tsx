import Plus from "@/assets/Plus.svg";
import PlusSkyBlue from "@/assets/PlusSkyBlue.svg";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/components/lib/redux/store";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import { addCard } from "@/components/lib/redux/cardsSlice";
import { v4 } from "uuid";
import {
  generateCardNumber,
  generateExpiryDate,
} from "@/components/lib/common";
import { useForm } from "react-hook-form";

interface CardFormValues {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function GenerateCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormValues>({
    defaultValues: {
      expiryDate: generateExpiryDate(),
      cardNumber: generateCardNumber(),
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  function onSubmit(data: CardFormValues) {
    dispatch(
      addCard({
        id: v4(),
        ...data,
        cvv: Number(data.cvv),
        cardType: "VISA",
        status: "active",
      })
    );
    reset();
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="text-sm md:bg-royalBlue flex justify-center items-center rounded-md text-skyBlue1 md:text-white px-3 py-2"
      >
        <img src={Plus} alt="Plus" className="mr-2 hidden md:block" />
        <img src={PlusSkyBlue} alt="Plus" className="mr-2 md:hidden" />
        New Card
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Add Card"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Card Holder Name",
                name: "cardHolder",
                required: "Card Holder Name Is Required",
                minLength: { value: 2, message: "Name is too short" },
              },
              {
                title: "Card Number",
                name: "cardNumber",
                required: "Card Number Is Required",
                pattern: {
                  value: /^\d{16}$/,
                  message: "Card number must be 16 digits",
                },
              },
              {
                title: "Expiry Date",
                name: "expiryDate",
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Enter a valid date in MM/YY format",
                },
                attr: { placeholder: "MM/YY" },
              },
              {
                title: "CVV",
                name: "cvv",
                required: "CVV Is Required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "CVV must be 3 digits",
                },
                attr: { maxLength: 3 },
              },
            ].map((item, index) => {
              const {
                title,
                name,
                attr = {},
                ...rest
              } = item as {
                title: string;
                name: keyof CardFormValues;
                [key: string]: any;
              };
              return (
                <>
                  <div key={index}>
                    <label className="text-sm">{title}</label>
                    <input
                      {...register(name, rest)}
                      {...attr}
                      className="border px-3 py-2 rounded w-full text-xs"
                    />
                    {errors[name] && (
                      <p className="text-red-500 text-xs">
                        {errors[name].message}
                      </p>
                    )}
                  </div>
                </>
              );
            })}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-royalBlue flex justify-center items-center rounded-md text-white px-3 py-2 text-sm"
            >
              Add Card
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
