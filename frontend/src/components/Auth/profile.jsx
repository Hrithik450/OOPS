import React from "react";
import "./profile.css";

const ProfileEditPage = () => {
  return (
    <div className="profile-container">
      <div>
        <header className="profile-header">
          <button className="back-btn">
            <span>←</span>
          </button>
          <h2 style={{ paddingTop: "0.7rem" }}>Edit Profile</h2>
          <button className="share-btn">🔗</button>
        </header>

        <div className="profile-picture-section">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-picture"
          />
          <p>Change Picture</p>
        </div>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" placeholder="Enter your phone number" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
