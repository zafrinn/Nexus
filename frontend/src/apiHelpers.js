let hostname = process.env.REACT_APP_HOSTNAME;

/**
 * Fetches user information from the server.
 * @param {Function} setUserData - Function to set the user data in the component's state.
 */
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
      setUserData(data);
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

/**
 * Updates user account information on the server.
 * @param {Object} updatedData - Data object containing updated user information.
 */
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

/**
 * Logs out the user from the application.
 */
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
        localStorage.removeItem("token");
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

/**
 * Updates the user's password on the server.
 * @param {Object} formData - Data object containing user's new password.
 */
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

/**
 * Logs in the user to the application.
 * @param {Object} formData - Data object containing user's login credentials.
 * @returns {Object} - Object indicating login success or failure along with a message.
 */
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

/**
 * Resets the user's password.
 * @param {Object} formData - Data object containing user's email for password reset.
 * @returns {Object} - Object indicating password reset success or failure along with a message.
 */
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

/**
 * Creates a new user account.
 * @param {Object} formData - Data object containing new user's information.
 * @returns {Object} - Object indicating signup success or failure along with a message.
 */
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

/**
 * Creates a new advertisement.
 * @param {Object} formData - Data object containing advertisement information.
 */
export async function createAdvertisement(formData) {
  try {
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {},
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

/**
 * Fetches advertisements from the server and sets them in the component's state.
 * @param {Function} setAdvertisementData - Function to set advertisement data in the component's state.
 */
export async function getAdvertisements(setAdvertisementData) {
  try {
    const response = await fetch(
      "http://" +
        hostname +
        ":8080/api/v1/internal/basic/advertisement/list/current/get",
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
      setAdvertisementData(data);
    } else {
      console.error("Failed to fetch advertisement data");
    }
  } catch (error) {
    console.error("Error fetching advertisement data:", error);
  }
}

/**
 * Updates an existing advertisement on the server.
 *
 * @param {Object} advertisementData - Data object containing updated advertisement information.
 */
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

/**
 * Fetches advertisements by category ID from the server.
 *
 * @param {string} categoryId - ID of the category for which advertisements are fetched.
 * @returns {Array} - Array of advertisement objects.
 */
export async function getAdvertisementsByCategoryId(categoryId) {
  try {
    const response = await fetch(
      "http://" +
        hostname +
        ":8080/api/v1/internal/basic/advertisement/list/get",
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

/**
 * Contacts the owner of an advertisement.
 *
 * @param {Object} formData - Data object containing contact information.
 */
export async function contactAdvertisementOwner(formData) {
  try {
    const response = await fetch(
      "http://" +
        hostname +
        ":8080/api/v1/internal/basic/advertisement/contact",
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
      console.log("Contacted advertisement poster successfully");
    } else {
      console.error("Failed to contact advertisement poster");
    }
  } catch (error) {
    console.error("Error contacting advertisement poster:", error);
  }
}

// ============================
//      ADMIN ADVERTISEMENT FUNCTIONS
// ============================

/**
 * Updates an existing advertisement by an admin user.
 *
 * @param {Object} advertisementData - Data object containing updated advertisement information.
 */
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

/**
 * Fetches advertisements by category ID from the server for admin users.
 *
 * @param {string} categoryId - ID of the category for which advertisements are fetched.
 * @returns {Array} - Array of advertisement objects.
 */
export async function getAdminAdvertisementsByCategoryId(categoryId) {
  try {
    const response = await fetch(
      "http://" +
        hostname +
        ":8080/api/v1/internal/admin/advertisement/list/get",
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

/**
 * Fetches the list of users from the server and sets them in the component's state.
 *
 * @param {Function} setUsersList - Function to set user list in the component's state.
 */
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

/**
 * Updates user information by an admin user.
 *
 * @param {Object} userData - Data object containing updated user information.
 */
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

/**
 * Creates a new textbook on the server.
 *
 * @param {Object} textbookData - Data object containing textbook information.
 */
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

/**
 * Updates an existing textbook on the server.
 *
 * @param {Object} textbookData - Data object containing updated textbook information.
 */
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

/**
 * Fetches the list of textbooks from the server and sets them in the component's state.
 *
 * @param {Function} setTextbooksList - Function to set textbook list in the component's state.
 */
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

/**
 * Contacts the owner of a textbook.
 *
 * @param {Object} formData - Data object containing contact information.
 */
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

/**
 * Fetches the list of discussions from the server and sets them in the component's state.
 *
 * @param {Function} setDiscussionData - Function to set discussion list in the component's state.
 */
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

      setDiscussionData(data);
    } else {
      console.error("Failed to fetch discussion data");
    }
  } catch (error) {
    console.error("Error fetching discussion data:", error);
  }
}

/**
 * Creates a new discussion on the server.
 *
 * @param {Object} formData - Data object containing discussion information.
 * @returns {Object} - Object indicating discussion creation success or failure along with a message.
 */
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
      return {
        success: false,
        message: "Discussion creation failed. Please try again.",
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

/**
 * Creates a new reply to a discussion on the server.
 *
 * @param {Object} formData - Data object containing reply information.
 * @returns {Object} - Object indicating reply creation success or failure along with a message.
 */
export async function createDiscussionReply(formData) {
  try {
    const response = await fetch(
      "http://" +
        hostname +
        ":8080/api/v1/internal/basic/discussion/reply/create",
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
      return {
        success: false,
        message: "Discussion reply creation failed. Please try again.",
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

// ====================
// TUTORING FUNCTIONS
// ====================

/**
 * Creates a new tutoring session on the server.
 *
 * @param {Object} formData - Data object containing tutoring session information.
 */
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

/**
 * Updates an existing tutoring session on the server.
 *
 * @param {Object} formData - Data object containing updated tutoring session information.
 */
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

/**
 * Fetches the list of tutoring sessions from the server and sets them in the component's state.
 *
 * @param {Function} setTutoringSessions - Function to set tutoring session list in the component's state.
 */
export async function getTutoringSessions(setTutoringSessions) {
  try {
    const response = await fetch(
      "http://" +
        hostname +
        ":8080/api/v1/internal/basic/tutorsession/list/get",
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

/**
 * Contacts the owner of a tutoring session.
 *
 * @param {Object} formData - Data object containing contact information.
 */
export async function contactTutorSessionOwner(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/tutorsession/contact",
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
      console.log("Contacted textbook owner successfully");
    } else {
      console.error("Failed to contact textbook owner");
    }
  } catch (error) {
    console.error("Error contacting textbook owner:", error);
  }
}

/**
 * Fetches the list of study groups from the server and sets them in the component's state.
 *
 * @param {Function} setStudyGroupData - Function to set study group list in the component's state.
 */
export async function getStudyGroupList(setStudyGroupData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/studygroup/list/get",
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
      setStudyGroupData(data);
    } else {
      console.error("Failed to fetch study group list");
    }
  } catch (error) {
    console.error("Error fetching study group list:", error);
  }
}

// ============================
//      STUDY GROUP FUNCTIONS
// ============================

/**
 * Joins a study group.
 *
 * @param {Object} formData - Data object containing study group join information.
 */
export async function joinStudyGroup(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/studygroup/join",
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
      console.log("Successfully joined the study group");
    } else {
      console.error("Failed to join the study group");
    }
  } catch (error) {
    console.error("Error joining the study group:", error);
  }
}

/**
 * Leaves a study group.
 *
 * @param {Object} formData - Data object containing study group leave information.
 */
export async function leaveStudyGroup(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/studygroup/leave",
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
      console.log("Successfully left the study group");
    } else {
      console.error("Failed to leave the study group");
    }
  } catch (error) {
    console.error("Error leaving the study group:", error);
  }
}

/**
 * Updates an existing study group on the server.
 *
 * @param {Object} studyGroupData - Data object containing updated study group information.
 */
export async function updateStudyGroup(studyGroupData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/studygroup/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(studyGroupData),
      }
    );
    if (response.ok) {
      console.log("Study group updated successfully");
    } else {
      console.error("Failed to update study group");
    }
  } catch (error) {
    console.error("Error updating study group:", error);
  }
}

/**
 * Fetches a study group by its ID from the server.
 *
 * @param {string} studyGroupId - ID of the study group to fetch.
 * @returns {Object|null} - Study group object if found, otherwise null.
 */
export async function getStudyGroupById(studyGroupId) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/studygroup/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ studyGroupId }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch study group by ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching study group by ID:", error);
    return null;
  }
}

/**
 * Creates a new study group on the server.
 *
 * @param {Object} formData - Data object containing study group information.
 */
export async function createStudyGroup(formData) {
  try {
    const response = await fetch(
      "http://" + hostname + ":8080/api/v1/internal/basic/studygroup/create",
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
