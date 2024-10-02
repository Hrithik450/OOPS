import { useState } from "react";
import CardOverview from "./cardoverview";
import { Link } from "react-router-dom";

function DashboardCard({ title, route }) {
  return (
    <>
      <Link
        className="ProductCard"
        style={{
          padding: "20px",
          height: "20vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 0px 5px 1px rgba(0 , 0 ,0 , 0.7)",
        }}
        to={`/admin/dashboard/${route}`}
      >
        <p className="Title" style={{ color: "grey", fontWeight: "900" }}>
          {title}
        </p>
      </Link>
    </>
  );
}

export default DashboardCard;
