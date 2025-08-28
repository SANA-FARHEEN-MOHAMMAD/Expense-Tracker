import React, { useContext, useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);

  const [name, setName] = useState(user?.fullName || "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user?.fullName || "");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVerified, setOldPasswordVerified] = useState(false);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImageUrl || null);

  // Save / Cancel edit name
  const handleSaveName = () => {
    setName(tempName);
    setIsEditingName(false);
  };
  const handleCancelEdit = () => {
    setTempName(name);
    setIsEditingName(false);
  };

  // Upload photo
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setSelectedFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  // Verify old password
  const verifyOldPassword = async () => {
    try {
      const res = await axiosInstance.post("/api/v1/user/verify-password", {
        oldPassword,
      });
      if (res.data.ok) {
        setOldPasswordVerified(true);
      } else {
        alert(res.data.message || "Incorrect old password");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to verify password");
    }
  };

  // Apply all changes
  const handleApplyChanges = async () => {
    try {
      // update name + photo
      if (name !== user?.fullName || selectedFile) {
        const formData = new FormData();
        if (name !== user?.fullName) formData.append("fullName", name);
        if (selectedFile) formData.append("profileImageUrl", selectedFile);

        const res = await axiosInstance.put("/api/v1/user/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
         updateUser(res.data);
setPreviewUrl(res.data.profileImageUrl);
   }

      // update password
      if (oldPasswordVerified && newPassword) {
        if (newPassword !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        await axiosInstance.put("/api/v1/user/password", {
          oldPassword,
          newPassword,
        });
        alert("Password updated successfully!");
        setShowPasswordForm(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOldPasswordVerified(false);
      }

      alert("Changes applied successfully!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to apply changes");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      {/* Profile Photo */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={previewUrl || "https://via.placeholder.com/120?text=Profile"}
          alt="Profile"
          className="w-28 h-28 rounded-full border shadow-md"
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Update Photo
        </button>
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700 mr-2">NAME :</label>
        {isEditingName ? (
          <>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="border rounded-lg px-3 py-1 mr-2"
            />
            <button
              onClick={handleSaveName}
              className="px-3 py-1 bg-green-600 text-white rounded-lg mr-2 hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-800 font-medium">{name}</span>
            <button
              onClick={() => setIsEditingName(true)}
              className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
        >
          {showPasswordForm ? "Cancel Password Change" : "Change Password"}
        </button>

        {showPasswordForm && (
          <div className="mt-4 space-y-3">
            {!oldPasswordVerified ? (
              <>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <p className="text-sm text-gray-500">
                  First you need to verify your old password
                </p>
                <button
                  onClick={verifyOldPassword}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                >
                  Verify Old Password
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Apply */}
      <div className="text-center">
        <button
          onClick={handleApplyChanges}
          className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
