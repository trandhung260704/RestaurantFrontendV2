import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8099/api/users/me", {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), 
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Không thể tải thông tin người dùng.");
      }
    };

    fetchProfile();
  }, []);

  if (message) {
    return <p>{message}</p>;
  }

  if (!user) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Thông tin tài khoản</h2>
      <ul>
        <li><strong>ID:</strong> {user.id_user}</li>
        <li><strong>Họ tên:</strong> {user.full_name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>SĐT:</strong> {user.phone}</li>
        <li><strong>Giới tính:</strong> {user.gender}</li>
        <li><strong>Vai trò:</strong> {user.role}</li>
        <li><strong>Ngày tạo:</strong> {new Date(user.created_at).toLocaleString()}</li>
      </ul>
    </div>
  );
}
