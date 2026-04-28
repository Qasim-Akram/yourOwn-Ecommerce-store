import { useEffect } from "react";
import "./Toast.css";

export function Toast({ message, onClose, type = "success" }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-content">
                <span className="toast-message">{message}</span>
                <button className="toast-close" onClick={onClose} aria-label="Close notification">
                    X
                </button>
            </div>
        </div>
    );
}