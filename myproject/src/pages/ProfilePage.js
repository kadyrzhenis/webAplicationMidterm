import React, { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    name: 'Zhenis',
    email: 'zhenis@example.com',
    phoneNumber: '8704577984',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <label>Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <span>{user.email}</span>
      </div>
      <div>
        <label>Phone Number:</label>
        {isEditing ? (
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
        ) : (
          <span>{user.phoneNumber}</span>
        )}
      </div>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit Profile</button>
      )}
    </div>
  );
}

export default UserProfile;