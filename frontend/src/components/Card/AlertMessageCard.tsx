import "./AlertMessageCard.scss";

interface AlertMessageProps {
  message: string;
  variant?: "inactive" | "variants";
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  variant = "inactive",
}) => {
  return (
    <div className={`alert-message ${variant}`}>
      <i className="icon-warning" />
      <span>{message}</span>
    </div>
  );
};

export default AlertMessage;
