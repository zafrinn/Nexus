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
//   BASIC USER ADVERTISEMENT FUNCTIONS
// ============================

export async function createAdvertisement(formData) {
  try {
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      credentials: "include",
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/advertisement/create",
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to create advertisement");
    }
  } catch (error) {
    console.error("Error creating advertisement:", error);
    throw error;
  }
}

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

// If the Ad is disabled, it won't be returned to this function
// Good for HomePage
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
//      ADMIN ADVERTISEMENT FUNCTIONS
// ============================
export async function updateAdminAdvertisement(advertisementData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/admin/advertisement/update",
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

export async function getAdminAdvertisementsByCategoryId(categoryId) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/admin/advertisement/list/get",
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
      console.error("Failed to fetch advertisements");
    }
  } catch (error) {
    console.error("Error fetching advertisements:", error);
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
        userId: user.userId,
        displayName: user.displayName,
        emailAddress: user.emailAddress,
        roleName: user.roleName,
        enabled: user.enabled,
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

// ============================
//      TEXTBOOK FUNCTIONS
// ============================

export async function createTextbook(textbookData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/textbook/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(textbookData),
      }
    );
    if (response.ok) {
      console.log("Textbook created successfully");
    } else {
      console.error("Failed to create textbook");
    }
  } catch (error) {
    console.error("Error creating textbook:", error);
  }
}

export async function updateTextbook(textbookData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/textbook/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(textbookData),
      }
    );
    if (response.ok) {
      console.log("Textbook updated successfully");
    } else {
      console.error("Failed to update textbook");
    }
  } catch (error) {
    console.error("Error updating textbook:", error);
  }
}

export async function getTextbooksList(setTextbooksList) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/textbook/list/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch textbooks data");
    }
    const data = await response.json();
    setTextbooksList(
      data.map((textbook) => ({
        textbookId: textbook.textbookId,
        name: textbook.name,
        isbn: textbook.isbn,
        location: textbook.location,
        displayName: textbook.displayName,
        emailAddress: textbook.emailAddress,
        genre: {
          textbookGenreId: textbook.genre.textbookGenreId,
          name: textbook.genre.name,
        },
      }))
    );
  } catch (error) {
    console.error("Error fetching textbooks data:", error);
    setTextbooksList([]);
  }
}

export async function contactTextbookOwner(formData) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/internal/basic/textbook/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: formData,
      }
    );
    if (response.ok) {
      console.log("Contacted textbook owner successfully");
    } else {
      console.error("Failed to contact textbook owner");
    }
  } catch (error) {
    console.error("Error contacting textbook owner:", error);
  }
}
