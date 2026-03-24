import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentModal from "../pages/Course/components/payment/PaymentModal/PaymentModal";

describe("PaymentModal", () => {
  it("disables Pay Now button until the form is valid", () => {
    render(
      <PaymentModal
        isOpen={true}
        onClose={() => {}}
        onPaymentSuccess={() => {}}
      />
    );

    const payButton = screen.getByRole("button", { name: /pay now/i });
    expect(payButton).toBeDisabled();
  });

  it("calls onPaymentSuccess and shows success state for valid data", async () => {
    const user = userEvent.setup();
    const onPaymentSuccess = vi.fn();

    render(
      <PaymentModal
        isOpen={true}
        onClose={() => {}}
        onPaymentSuccess={onPaymentSuccess}
      />
    );

    await user.type(
      screen.getByLabelText(/card number/i),
      "1111222233334444"
    );
    await user.type(
      screen.getByLabelText(/cardholder name/i),
      "Kateryna Example"
    );
    await user.type(screen.getByLabelText(/expiry/i), "12/30");
    await user.type(screen.getByLabelText(/cvc/i), "123");

    const payButton = screen.getByRole("button", { name: /pay now/i });
    expect(payButton).toBeEnabled();

    await user.click(payButton);

    expect(onPaymentSuccess).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("heading", { name: /payment successful/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/full course access has been unlocked/i)
    ).toBeInTheDocument();
  });
});