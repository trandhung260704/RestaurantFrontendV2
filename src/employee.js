import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/customer.css';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8099/api/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setEmployees(res.data.filter(user => user.role === 'EMPLOYEE'));
    } catch (error) {
      console.error('Lỗi khi tải nhân viên:', error);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.phone || '').includes(searchTerm)
  );

  return (
    <div className="customer-container">
      <h2>👨‍💼 Danh sách nhân viên</h2>

      <input
        type="text"
        placeholder="🔍 Tìm kiếm theo tên, email hoặc số điện thoại"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Giới tính</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((user) => (
              <tr key={user.id_user}>
                <td>{user.id_user}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.phone || '---'}</td>
                <td>{user.gender || '---'}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">Không tìm thấy nhân viên nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
