import { ReactElement } from "react";

const ModalButtonTemplate = (props: {
  uniqueModalName: string;
  template: ReactElement<any>;
  buttonText: string;
  buttonColor?: string;
}) => {
  return (
    <div>
      <button
        className={`btn btn-${props.buttonColor ? props.buttonColor : 'primary'}`}
        onClick={() => {
          const modal = document.getElementById(
            props.uniqueModalName
          ) as HTMLFormElement;
          if (modal) {
            modal.showModal();
          }
        }}>
        {props.buttonText}
      </button>
      <dialog
        id={props.uniqueModalName}
        className="modal bg-transparent modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="modal-box modal-bottom sm:modal-middle">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          {props.template}
        </form>
      </dialog>
    </div>
  );
};

export default ModalButtonTemplate;
