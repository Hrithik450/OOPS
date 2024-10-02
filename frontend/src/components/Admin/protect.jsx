import { useEffect } from "react";
import { useAuthContext } from "../../store/Context/AuthContext";
import LoadingSpinner from "../spinner/spinner";

function Protect({ children }) {
  const { loadUser, user } = useAuthContext();

  useEffect(() => {
    loadUser();
  }, []);

  if (!user || !user.Data) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (user?.Data?.role !== "ADMIN") {
    return (
      <>
        <div
          className="danger-container"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: "url(/danger1.webp)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div class="alert alert-danger" role="alert">
            You are trying to access unauthorized things, You will be banned in
            next 24hrs
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}

export default Protect;
