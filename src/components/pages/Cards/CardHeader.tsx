import GenerateCard from "./GenerateCard";

export default function CardHeader() {
  return (
    <>
      <p>Available Balance</p>
      <div className="flex items-center justify-between mt-2">
        <p className="flex items-center">
          <span className="px-3 py-1 text-sm text-white rounded-md bg-green mr-3">
            S$
          </span>
          <span className="text-2xl font-semibold">3,000</span>
        </p>
        <GenerateCard />
      </div>
    </>
  );
}
