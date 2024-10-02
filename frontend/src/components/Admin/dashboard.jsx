import { useEffect } from "react";
import DashboardCard from "./card";
import "./dashboard.css";
import { useAuthContext } from "../../store/Context/AuthContext";
import LoadingSpinner from "../spinner/spinner";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <section
        style={{
          width: "auto",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            marginBlock: "30px",
            fontWeight: "900",
            fontSize: "30px",
            color: "grey",
          }}
        >
          Dashboard
        </h2>

        <div className="grid-container">
          <DashboardCard title={"NEW PRODUCT"} route={"newproduct"} />
          <DashboardCard title={"UPDATE PRODUCT"} route={"updateproduct"} />
          <DashboardCard title={"GET USERS"} route={"getAllUsers"} />
          <DashboardCard title={"DELETE PRODUCT"} route={"deleteproduct"} />
          <DashboardCard title={"DELETE USER"} route={"deleteUser"} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
