export const Balance = ({ value }) => {
  return (
    <div className="flex">
      <div className="text-lg font-bold">Your balance</div>
      <div className="ml-4 text-lg font-semibold">Rs {value}</div>
    </div>
  );
};
