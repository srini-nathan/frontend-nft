export type ErrorDisplayProps = {
    errors?: string[];
  };
  
  const ErrorMessage: React.FC<ErrorDisplayProps> = ({ errors }:ErrorDisplayProps) => {
    if (!errors || !errors.length) return <></>;
  
    const errorMessages = errors.map((message, idx) => {
      return (
        <div
          key={idx}
          data-testid="error-message"
          className="bg-light mx-auto px-5 border-0"
        >
          <h5 className="text-danger">{message}</h5>
        </div>
      );
    });
    return <>{errorMessages}</>;
  };

  export default ErrorMessage