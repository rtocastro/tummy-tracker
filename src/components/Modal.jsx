function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>

      <section className="app-modal">
        <div className="modal-header">
          <h2>{title}</h2>

          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {children}
      </section>
    </>
  );
}

export default Modal;