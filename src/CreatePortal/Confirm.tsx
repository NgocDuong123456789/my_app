
import { createPortal } from "react-dom";
interface ConfirmProps {
  visible: boolean;
  ok:()=>void; 
  cancel:()=>void
}
export const Confirm = (props: ConfirmProps) => {
  const { visible, ok , cancel } = props;
  const handleOk=()=>{
    ok()
  }
  const handleCancel=()=>{
    cancel()
  }
  const root = document.querySelector('#root') as HTMLElement;
  return createPortal(
    <div style={{ visibility: visible ? "visible" : "hidden" }}>
      <div>
        <p>Are you sure</p>
        <button onClick={handleOk}>Ok</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>,root
  );
};
