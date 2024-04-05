import styles from "./dashboard.module.css";
import React, { useState, useEffect, Fragment } from "react";
import { getUsersList, updateAdminUser } from "../../apiHelpers";

/**
 * EditableRow component renders a table row with input fields for editing user data.
 * @param {Object} props - Props passed to the component.
 * @param {Object} props.editFormData - Form data for editing user.
 * @param {Function} props.handleEditFormChange - Function to handle changes in the edit form.
 * @param {Function} props.handleCancelClick - Function to handle canceling the edit action.
 * @param {Function} props.handleEditFormSubmit - Function to handle submitting the edit form.
 * @param {Array} props.roles - List of user roles.
 */

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,
  roles,
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
      <td>
        <select
          className={styles.editInput}
          name="roleName"
          value={editFormData.roleName}
          onChange={handleEditFormChange}
        >
          {roles.map((role) => (
            <option key={role.userId} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
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

/**
 * ReadOnlyRow component renders a table row with read-only user data and action buttons.
 * @param {Object} props - Props passed to the component.
 * @param {Object} props.contact - User data.
 * @param {Function} props.handleEditClick - Function to handle clicking the edit button.
 * @param {Function} props.handleEnableDisableClick - Function to handle clicking the enable/disable button.
 */
const ReadOnlyRow = ({
  contact,
  handleEditClick,
  handleEnableDisableClick,
}) => {
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
          onClick={() => handleEnableDisableClick(contact)}
        >
          {contact.enabled ? "Disable" : "Enable"}
        </button>
      </td>
    </tr>
  );
};

/**
 * UserTable component renders a table for displaying and managing users.
 */
function UserTable() {
  const [usersList, setUsersList] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getUsersList(setUsersList);
    // Fetch roles data from API or define it locally
    const rolesData = [
      { id: 1, name: "Admin" },
      { id: 2, name: "Basic" },
    ];
    setRoles(rolesData);
  }, []);

  const [editFormData, setEditFormData] = useState({
    displayName: "",
    emailAddress: "",
    roleName: "", // Add roleName to edit form data
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
      enabled: true, // assuming edit mode always enables user
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
    setEditUserId(user.userId);
    const formValues = {
      displayName: user.displayName,
      emailAddress: user.emailAddress,
      roleName: user.roleName, // Add roleName to formValues
    };
    setEditFormData(formValues);
  };

  const handleEnableDisableClick = async (user) => {
    try {
      const editedUser = {
        displayName: user.displayName,
        emailAddress: user.emailAddress,
        roleId: getRoleId(user.roleName),
        userId: user.userId,
        enabled: !user.enabled,
      };
      await updateAdminUser(editedUser);
      console.log("User enabled/disabled successfully");
      getUsersList(setUsersList); // Refresh user list
    } catch (error) {
      console.error("Error enabling/disabling user:", error);
    }
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
              <Fragment key={user.userId}>
                {editUserId === user.userId ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={() => setEditUserId(null)}
                    handleEditFormSubmit={handleEditFormSubmit}
                    roles={roles} // Pass roles data to EditableRow
                  />
                ) : (
                  <ReadOnlyRow
                    contact={user}
                    handleEditClick={handleEditClick}
                    handleEnableDisableClick={handleEnableDisableClick}
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
