import React from "react";

interface Props {
  show: boolean;
  title: string;
  message: string;
  confirmText?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  show, title, message,
  confirmText = "Confirm",
  confirmColor = "#c62828",
  onConfirm, onCancel
}) => {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.45)", zIndex: 99999,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(3px)"
    }}>
      <div style={{
        background: "white", borderRadius: "20px",
        padding: "36px 32px", maxWidth: "420px", width: "90%",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        border: "1px solid #e8dfc9", textAlign: "center"
      }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "14px" }}>??</div>
        <h3 style={{ color: "#2D5A27", margin: "0 0 10px", fontSize: "1.25rem", fontWeight: 700 }}>
          {title}
        </h3>
        <p style={{ color: "#666", margin: "0 0 28px", lineHeight: 1.65, fontSize: "0.95rem" }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button onClick={onCancel} style={{
            padding: "11px 28px", borderRadius: "10px",
            border: "2px solid #e8dfc9", background: "white",
            color: "#666", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem"
          }}>
            Cancel
          </button>
          <button onClick={() => { onConfirm(); onCancel(); }} style={{
            padding: "11px 28px", borderRadius: "10px",
            border: "none", background: confirmColor,
            color: "white", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem"
          }}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
