import { useState } from "react";
import { useMutation } from "react-query";
import CategoryService from "../../../services/category-service";
import { Category } from "../../../routes/budget";

interface BudgetRowNameModalProps {
  categoryId: number;
  categoryName: string;
  onNameChange: (name: string) => void;
}

const BudgetRowNameModal = ({
  categoryId,
  categoryName,
  onNameChange,
}: BudgetRowNameModalProps) => {
  const [newRowName, setNewRowName] = useState(categoryName);

  const { mutate: updateCategoryAssignedValues } = useMutation(
    async ({ name, id }: { name: string; id: number }) =>
      CategoryService.updateCategoryName(name, id),
    {
      onError: (err) => {
        console.error(err);
      },
      onSuccess: () => {
        const modal = document.getElementById(
          `button-${categoryId}`
        ) as HTMLFormElement;
        modal.close();
        onNameChange(newRowName);
      },
    }
  );

  const handleSubmit = () => {
    updateCategoryAssignedValues({ name: newRowName, id: categoryId });
  };

  return (
    <dialog
      id={`button-${categoryId}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box w-auto">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Update category name:</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs mr-2"
            value={newRowName}
            onChange={(e) => setNewRowName(e.target.value)}
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

export default BudgetRowNameModal;
