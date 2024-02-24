import { Title } from "./pagesStyles";
import { addOrder } from "../firebase/services";

const StripePage = () => {
  const handleClickOrderButton = async () => {
    const result = await addOrder({
      product: "potato",
      weight: 10,
      cost: 3.3,
    });

    console.log(result);
    if (result?.status) {
      alert("send");
    }
  };

  return (
    <>
      <Title>StripePage</Title>

      <button
        onClick={handleClickOrderButton}
        type="button"
        aria-label="addOrder button"
      >
        addOrder
      </button>
    </>
  );
};

export default StripePage;
