import styles from "./dashboard.module.css";
import React, { useState, useEffect, Fragment } from "react";
import { getUsersList, updateAdminUser } from "../../apiHelpers";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,
}) => {
  return (
    <tr>
      <td>
        <input
          className={styles.editInput}
          type="text"
          required="required"
          placeholder="Enter Username"
          name="displayName"
          value={editFormData.displayName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          className={styles.editInput}
          type="email"
          required="required"
          placeholder="Enter Email"
          name="emailAddress"
          value={editFormData.emailAddress}
          onChange={handleEditFormChange}
        />
      </td>
      <td className={`${styles.col} ${styles["col-4"]}`}>
        <button
          className={styles.exchangeBtn}
          role="button"
          onClick={handleEditFormSubmit}
          style={{ marginRight: "10px" }}
        >
          Save
        </button>
        <button
          className={styles.exchangeBtn}
          role="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className={`${styles.col} ${styles["col-1"]}`}>
        {contact.displayName}
      </td>
      <td className={`${styles.col} ${styles["col-2"]}`}>
        {contact.emailAddress}
      </td>
      <td className={`${styles.col} ${styles["col-3"]}`}>{contact.roleName}</td>
      <td className={`${styles.col} ${styles["col-4"]}`}>
        <button
          className={styles.exchangeBtn}
          role="button"
          onClick={(e) => handleEditClick(e, contact)}
          style={{ marginRight: "10px" }}
        >
          Edit
        </button>
        <button
          className={styles.exchangeBtn}
          role="button"
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

function UserTable() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsersList(setUsersList);
  }, []);

  const [editFormData, setEditFormData] = useState({
    displayName: "",
    emailAddress: "",
  });
  const [editUserId, setEditUserId] = useState(null);

  const handleEditFormChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setEditFormData({ ...editFormData, [fieldName]: fieldValue });
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const editedUser = {
      ...editFormData,
      roleId: getRoleId(editFormData.roleName),
      userId: editUserId,
      enabled: true,
    };
    try {
      await updateAdminUser(editedUser);
      console.log("User data updated successfully");
      setEditUserId(null); // Reset edit mode
      getUsersList(setUsersList); // Refresh user list
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const getRoleId = (roleName) => {
    switch (roleName) {
      case "Admin":
        return 1;
      case "Basic":
        return 2;
      default:
        return 2; // Default to Basic if roleName is not recognized
    }
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);
    const formValues = {
      displayName: user.displayName,
      emailAddress: user.emailAddress,
      roleName: user.roleName, // Add roleName to formValues
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleDeleteClick = (userId) => {
    // Implement your logic to delete user with userId
  };

  return (
    <div className={styles.UserTable}>
      <form onSubmit={handleEditFormSubmit}>
        <table className={styles.responsiveTable}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRow}>
              <th className={`${styles.col} ${styles["col-1"]}`}>
                Display Name
              </th>
              <th className={`${styles.col} ${styles["col-2"]}`}>
                Email Address
              </th>
              <th className={`${styles.col} ${styles["col-3"]}`}>Role Name</th>
              <th className={`${styles.col} ${styles["col-4"]}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <Fragment key={user.id}>
                {editUserId === user.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={user}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default UserTable;
