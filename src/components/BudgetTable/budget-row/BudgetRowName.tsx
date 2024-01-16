import { useState } from "react";
import BudgetRowNameModal from "./BudgetRowNameModal";

interface BudgetRowNameProps {
  categoryId: number;
  categoryName: string;
  onCategoryNameChange: (name: string) => void;
}

const BudgetRowName = ({
  categoryId,
  categoryName,
  onCategoryNameChange,
}: BudgetRowNameProps) => {
  const handleNameChange = (name: string) => {
    onCategoryNameChange(name);
  };

  return (
    <>
      <span
        className="hover:cursor-pointer"
        onClick={() => {
          const modal = document.getElementById(
            `button-${categoryId}`
          ) as HTMLFormElement;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        {categoryName}
      </span>

      <BudgetRowNameModal
        categoryId={categoryId}
        categoryName={categoryName}
        onNameChange={handleNameChange}
      />
    </>
  );
};

export default BudgetRowName;
