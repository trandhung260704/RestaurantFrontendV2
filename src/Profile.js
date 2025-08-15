import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./image/favicon-48x48.png";
import "./css/profile.css";
import ProfileEffects from "./components/ProfileEffects";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  const effectsRef = useRef(null);

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
        setEditData(res.data);
        setIsLoading(false);
        
        // Khởi tạo effects sau khi loading xong
        setTimeout(() => {
          effectsRef.current = new ProfileEffects();
          effectsRef.current.addRoleBadgeEffect();
          effectsRef.current.addMessageEffects();
          effectsRef.current.addFormValidation();
        }, 500);
      } catch (err) {
        console.error(err);
        setMessage("Không thể tải thông tin người dùng.");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:8099/api/users/me", editData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(editData);
      setIsEditing(false);
      setMessage("Cập nhật thông tin thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Cập nhật thông tin thất bại.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner">
          <img src={logo} alt="Restaurant Logo" className="loading-logo" />
          <div className="loading-text">Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  if (message && !user) {
    return (
      <div className="profile-error">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{message}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Quay lại Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="header-content">
            <div className="logo-section">
              <img src={logo} alt="Restaurant Logo" className="profile-logo" />
              <div className="logo-text">
                <h1>Thông tin cá nhân</h1>
                <p>Quản lý thông tin tài khoản</p>
              </div>
            </div>
            <button onClick={() => navigate('/')} className="back-btn">
              ← Quay lại
            </button>
          </div>
        </div>

        {message && (
          <div className={`message ${message.includes('thành công') ? 'success' : 'error'}`}>
            <span className="message-icon">
              {message.includes('thành công') ? '✅' : '⚠️'}
            </span>
            <span>{message}</span>
          </div>
        )}

        <div className="profile-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <span className="avatar-text">{user?.full_name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
            <div className="avatar-info">
              <h2>{user?.full_name || 'Người dùng'}</h2>
              <span className="role-badge">{user?.role || 'USER'}</span>
            </div>
          </div>

          <div className="profile-form">
            <div className="form-section">
              <h3>Thông tin cơ bản</h3>
              
              <div className="form-group">
                <label>ID người dùng</label>
                <input
                  type="text"
                  value={user?.id_user || ''}
                  disabled
                  className="form-input disabled"
                />
              </div>

              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  name="full_name"
                  value={isEditing ? editData.full_name : user?.full_name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'disabled' : ''}`}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={isEditing ? editData.email : user?.email || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'disabled' : ''}`}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={isEditing ? editData.phone : user?.phone || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'disabled' : ''}`}
                />
              </div>

              <div className="form-group">
                <label>Giới tính</label>
                <select
                  name="gender"
                  value={isEditing ? editData.gender : user?.gender || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'disabled' : ''}`}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label>Vai trò</label>
                <input
                  type="text"
                  value={user?.role || ''}
                  disabled
                  className="form-input disabled"
                />
              </div>

              <div className="form-group">
                <label>Ngày tạo tài khoản</label>
                <input
                  type="text"
                  value={user?.created_at ? new Date(user.created_at).toLocaleString('vi-VN') : ''}
                  disabled
                  className="form-input disabled"
                />
              </div>
            </div>

            <div className="form-actions">
              {!isEditing ? (
                <button onClick={handleEdit} className="edit-button">
                  ✏️ Chỉnh sửa thông tin
                </button>
              ) : (
                <div className="action-buttons">
                  <button onClick={handleSave} className="save-button">
                    💾 Lưu thay đổi
                  </button>
                  <button onClick={handleCancel} className="cancel-button">
                    ❌ Hủy bỏ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
