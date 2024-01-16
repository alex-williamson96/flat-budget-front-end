import { Category } from "../../../routes/budget";
import NewCategoryModal from "./NewCategoryModal";

interface NewCategoryButtonProps {
  mainOrder: number;
  categoryId: number;
}

const NewCategoryButton = ({
  mainOrder,
  categoryId,
}: NewCategoryButtonProps) => {

  return (
    <>
      <button
        className="btn btn-circle btn-sm md:btn-xs btn-outline"
        onClick={() => {
          const modal = document.getElementById(
            `button-${categoryId}-new`
          ) as HTMLFormElement;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        <svg
          className="fill-neutral-content"
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
      <NewCategoryModal
        mainOrder={mainOrder}
        categoryId={categoryId}
      />
    </>
  );
};

export default NewCategoryButton;
