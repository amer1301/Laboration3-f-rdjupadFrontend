import type { ReactNode } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: ReactNode;
  message: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title = "Bekräfta",
  message,
  onConfirm,
  onCancel,
  confirmText = "Ta bort",
  cancelText = "Avbryt",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        {title && <h3>{title}</h3>}

        <p>{message}</p>

        <div className="modalActions">
          <button className="btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button className="btn danger" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
