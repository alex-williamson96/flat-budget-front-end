import { useState } from "react";
import useBudgetStore from "../../../stores/budget-store";
import { useMutation } from "react-query";
import { Category } from "../../../routes/budget";

interface NewCategoryModalProps {
  mainOrder: number;
  categoryId: number;
}

interface AddCategoryPayLoad {
  year: string;
  month: string;
  name: string;
}

const NewCategoryModal = ({ mainOrder, categoryId }: NewCategoryModalProps) => {
  const { year, month } = useBudgetStore();

  const [categoryName, setCategoryName] = useState("");

  const { mutate: addNewCateogry } = useMutation(
    async ({ year: year, month: month, name: name }: AddCategoryPayLoad) => null
  );

  const handleSubmit = () => {
    console.log("submitted!");
  };

  return (
    <dialog
      id={`button-${categoryId}-new`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box sm:w-auto">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">New category name:</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs mr-2"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <form method="dialog" className="flex items-center">
            <span
              className="btn btn-primary modal-action"
              onClick={handleSubmit}
            >
              Submit
            </span>
            <button className="btn modal-action ml-auto">Close</button>
          </form>
        </label>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default NewCategoryModal;
