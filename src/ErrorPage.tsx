import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorMessage = ({error}: {error: unknown}) => {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </>
    );
  }
};

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="container text-center">
      <div className="row align-items-center">
        <div className="col">
          <h1>Ouch</h1>
          <ErrorMessage error={error} />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
