export async function getUserInformation(setUserData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/user/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setUserData(data); // Assuming setUserData is a function passed from the component
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function updateUserAccount(updatedData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/user/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      }
    );
    if (response.ok) {
      console.log("User data updated successfully");
    } else {
      console.error("Failed to update user data");
    }
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}

export async function deleteUserAccount(contactId) {}

export function logoutUser() {
  fetch("http://localhost:8080/api/v1/internal/basic/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        console.log("User logged out successfully");
      } else {
        console.error("Failed to logout user");
      }
    })
    .catch((error) => {
      console.error("Error logging out user:", error);
    });
}

// ============================
//   ADVERTISEMENT FUNCTIONS
// ============================

export async function getAdvertisements(setAdvertisementData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/advertisement/list/current/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setAdvertisementData(data); // Assuming setAdvertisementData is a function passed from the component
    } else {
      console.error("Failed to fetch advertisement data");
    }
  } catch (error) {
    console.error("Error fetching advertisement data:", error);
  }
}

export async function updateAdvertisement(advertisementData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/advertisement/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(advertisementData),
      }
    );
    if (response.ok) {
      console.log("Advertisement updated successfully");
    } else {
      console.error("Failed to update advertisement");
    }
  } catch (error) {
    console.error("Error updating advertisement:", error);
  }
}

export async function getAdvertisementsByCategoryId(categoryId) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/advertisement/list/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ categoryId }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch advertisements");
    }
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw error;
  }
}

// ============================
//      ADMIN FUNCTIONS
// ============================

export async function getUsersList(setUsersList) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/admin/user/list/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    setUsersList(
      data.map((user) => ({
        id: user.userId,
        displayName: user.displayName,
        emailAddress: user.emailAddress,
        roleName: user.roleName,
      }))
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    setUsersList([]);
  }
}

export async function updateAdminUser(userData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/admin/user/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      }
    );
    if (response.ok) {
      console.log("Admin user data updated successfully");
    } else {
      console.error("Failed to update admin user data");
    }
  } catch (error) {
    console.error("Error updating admin user data:", error);
  }
}
