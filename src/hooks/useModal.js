import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal, closeAllModals } from "../store/slice/ModalSlice";

export const useModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);

  const open = (modalName) => dispatch(openModal(modalName));
  const close = (modalName) => dispatch(closeModal(modalName));
  const closeAll = () => dispatch(closeAllModals());

  return { modal, open, close, closeAll };
};
