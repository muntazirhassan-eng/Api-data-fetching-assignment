
import React, { useState, useEffect } from "react";
import "./Card.css";

function Card({img,name}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/defunkt")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (!user) return <h2>Failed to load user data.</h2>;

  return (
    <div className="card-container">
      <div className="card">
        <img src={img} alt={user.login} />

        <h2>{name}</h2>
        <span className="badge">{user.type}</span>

        <div className="card-details">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Node ID:</strong> {user.node_id}</p>
          <p><strong>Admin:</strong> {user.site_admin ? "Yes" : "No"}</p>
          <p><strong>View Type:</strong> {user.user_view_type}</p>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="profile-btn"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default Card;
