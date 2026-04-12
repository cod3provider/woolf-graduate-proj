import { useMemo, useState } from "react";
import { api } from "@/services/api.js";

import cl from "./PaymentModal.module.css";

const onlyDigits = (value) => value.replace(/\D/g, "");

const formatCardNumber = (value) => {
  const digits = onlyDigits(value).slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  courseId,
}) => {
  const [form, setForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormFilled = useMemo(() => {
    return (
      onlyDigits(form.cardNumber).length === 16 &&
      form.cardName.trim().length >= 2 &&
      form.expiry.length === 5 &&
      onlyDigits(form.cvc).length === 3
    );
  }, [form]);

  if (!isOpen) return null;

  const resetState = () => {
    setForm({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
    });
    setError("");
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleChange = (field, value) => {
    setError("");

    if (field === "cardNumber") {
      setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
      return;
    }

    if (field === "expiry") {
      setForm((prev) => ({ ...prev, expiry: formatExpiry(value) }));
      return;
    }

    if (field === "cvc") {
      setForm((prev) => ({
        ...prev,
        cvc: onlyDigits(value).slice(0, 3),
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateExpiry = (expiry) => {
    const [month, year] = expiry.split("/");
    const mm = Number(month);
    const yy = Number(year);

    if (!month || !year || mm < 1 || mm > 12) return false;

    const now = new Date();
    const currentYear = Number(String(now.getFullYear()).slice(-2));
    const currentMonth = now.getMonth() + 1;

    if (yy < currentYear) return false;
    if (yy === currentYear && mm < currentMonth) return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) {
      setError("Technical error: Course ID not found. Please refresh the page.");
      return;
    }

    const rawCard = onlyDigits(form.cardNumber);

    if (rawCard.length !== 16) {
      setError("Card number must contain 16 digits.");
      return;
    }

    if (!form.cardName.trim()) {
      setError("Please enter the cardholder name.");
      return;
    }

    if (!validateExpiry(form.expiry)) {
      setError("Please enter a valid expiry date.");
      return;
    }

    if (onlyDigits(form.cvc).length !== 3) {
      setError("CVC must contain 3 digits.");
      return;
    }

    // setIsSuccess(true);
    // onPaymentSuccess();

    try {
      setIsSubmitting(true);

      await api.purchaseCourse(courseId, rawCard);

      setIsSuccess(true);
      onPaymentSuccess();
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cl.backdrop} onClick={handleClose}>
      <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={cl.closeBtn}
          onClick={handleClose}
          aria-label="Close payment modal"
        >
          ×
        </button>

        {!isSuccess ? (
          <>
            <p className={cl.badge}>Upgrade</p>
            <h2 className={cl.title}>Buy Full Course</h2>
            <p className={cl.text}>
              Demo checkout: enter a valid-looking card and unlock all lessons.
            </p>

            <form className={cl.form} onSubmit={handleSubmit}>
              <label className={cl.label}>
                Card Number
                <input
                  type="text"
                  className={cl.input}
                  placeholder="1111 2222 3333 4444"
                  value={form.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                />
              </label>

              <label className={cl.label}>
                Cardholder Name
                <input
                  type="text"
                  className={cl.input}
                  placeholder="Kateryna Example"
                  value={form.cardName}
                  onChange={(e) => handleChange("cardName", e.target.value)}
                />
              </label>

              <div className={cl.row}>
                <label className={cl.label}>
                  Expiry
                  <input
                    type="text"
                    className={cl.input}
                    placeholder="12/30"
                    value={form.expiry}
                    onChange={(e) => handleChange("expiry", e.target.value)}
                  />
                </label>

                <label className={cl.label}>
                  CVC
                  <input
                    type="text"
                    className={cl.input}
                    placeholder="123"
                    value={form.cvc}
                    onChange={(e) => handleChange("cvc", e.target.value)}
                  />
                </label>
              </div>

              {error && <p className={cl.error}>{error}</p>}

              <button
                type="submit"
                className={cl.payBtn}
                // disabled={!isFormFilled}
                disabled={!isFormFilled || isSubmitting || !courseId}
              >
                {/*Pay Now*/}
                {isSubmitting ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </>
        ) : (
          <div className={cl.successBox}>
            <p className={cl.badge}>Success</p>
            <h2 className={cl.title}>Payment successful</h2>
            <p className={cl.text}>
              Full course access has been unlocked.
            </p>

            <button
              type="button"
              className={cl.payBtn}
              onClick={handleClose}
            >
              Continue Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;