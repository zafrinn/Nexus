let hostname = process.env.REACT_APP_HOSTNAME;

export async function getUserInformation(setUserData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/user/get",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/user/update",
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

export async function deleteUserAccount(contactId) { }

export function logoutUser() {
  fetch("http://" + hostname + ":8080/api/v1/internal/basic/logout", {
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
//   SIGN UP / SIGN IN USER FUNCTIONS
// ============================

export async function updatePassword(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/password/update",
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
      console.log("Password successfully changed!");
    } else {
      console.log("Password change failed.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function loginUser(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/external/login",
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
      return { success: true };
    } else {
      return { success: false, message: "Login failed. Please try again." };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function resetPassword(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/external/password/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        message: "Password reset failed. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function createUser(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/external/user/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: "Signup failed. Please try again." };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
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
      "http://" + hostname + ":8080/api/v1/internal/basic/advertisement/create",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/advertisement/list/current/get",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/advertisement/update",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/advertisement/list/get",
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
      "http://" + hostname + ":8080/api/v1/internal/admin/advertisement/update",
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
      "http://" + hostname + ":8080/api/v1/internal/admin/advertisement/list/get",
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
      "http://" + hostname + ":8080/api/v1/internal/admin/user/list/get",
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
      "http://" + hostname + ":8080/api/v1/internal/admin/user/update",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/textbook/create",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/textbook/update",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/textbook/list/get",
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
      "http://" + hostname + ":8080/api/v1/internal/basic/textbook/contact",
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

// ====================
// Q&A Endpoints
// ====================

export async function getDiscussionList(setDiscussionData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/discussion/list/get",
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

      setDiscussionData(data)
    }

    else {
      console.error("Failed to fetch discussion data");
    }
  } catch (error) {
    console.error("Error fetching discussion data:", error);
  }
}

export async function createDiscussion(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/discussion/create",
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
      return { success: true };
    } else {
      return { success: false, message: "Discussion creation failed. Please try again." };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

export async function createDiscussionReply(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/discussion/reply/create",
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
      return { success: true };
    } else {
      return { success: false, message: "Discussion reply creation failed. Please try again." };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}

// ====================
// TUTORING FUNCTIONS
// ====================

export async function createTutoringSession(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/tutorsession/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log("Tutoring session created successfully");
    } else {
      console.error("Failed to create tutoring session");
    }
  } catch (error) {
    console.error("Error creating tutoring session:", error);
  }
}

export async function updateTutoringSession(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/tutorsession/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log("Tutoring session updated successfully");
    } else {
      console.error("Failed to update tutoring session");
    }
  } catch (error) {
    console.error("Error updating tutoring session:", error);
  }
}

export async function getTutoringSessions(setTutoringSessions) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/tutorsession/list/get",
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
      setTutoringSessions(data);
    } else {
      console.error("Failed to fetch tutoring sessions");
    }
  } catch (error) {
    console.error("Error fetching tutoring sessions:", error);
  }
}