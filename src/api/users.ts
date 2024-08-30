import axios from "axios";
import {
  User,
  SignInDetails,
  SignInDetailsResponse,
  UserDetailsProps,
} from "../types/autheticationTypes";
import { getUserIdFromToken } from "../utils/security";
import { TicketFormData } from "../types/dataTypes";

// const BASE_URL = "http://localhost:3000/users";
// const BASE_URL = "https://jippy.home.ngrok.app/users";
const BASE_URL = "https://jippyhome-be-node-express-mongodb.onrender.com/users";

// Registers a new user with the provided user data.
export async function signUp(user: User): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error during sign-up:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to sign up. Please check the user data."
      );
    } else {
      throw new Error("An unexpected error occurred during sign-up.");
    }
  }
}

// Retrieves sign-in details for a user based on their email.
export async function getSigninDetails(email: string): Promise<SignInDetails> {
  try {
    const response = await axios.get<SignInDetails>(`${BASE_URL}/signin`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error retrieving sign-in details:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to retrieve sign-in details. Invalid email."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while retrieving sign-in details."
      );
    }
  }
}

// Signs in a user with the provided credentials.
export async function signinUser(user: User): Promise<SignInDetailsResponse> {
  try {
    const response = await axios.post<SignInDetailsResponse>(
      `${BASE_URL}/signin`,
      user
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error during sign-in:", error);
      throw new Error(error.response?.data?.message || "Sign-in failed.");
    } else {
      throw new Error("An unexpected error occurred during sign-in.");
    }
  }
}

// Stores a token for a user in the backend.
export async function storeToken(user: User): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/storeToken`, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error storing token:", error);
      throw new Error("Failed to store token. Please check the user data.");
    } else {
      throw new Error("An unexpected error occurred while storing the token.");
    }
  }
}

// Validates the provided token to check if the user is signed in.
export async function checksignin(token: string): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/checksignin`, null, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error checking sign-in status:", error);
      throw new Error("Sign-in check failed. Invalid token.");
    } else {
      throw new Error(
        "An unexpected error occurred while checking sign-in status."
      );
    }
  }
}

// Checks if the user has the necessary permissions (e.g., admin rights).
export async function checkPermission(token: string): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/checkpermission`, null, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error checking permissions:", error);
      throw new Error(
        "Permission check failed. Invalid token or insufficient permissions."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while checking permissions."
      );
    }
  }
}

// Signs out a user and invalidates their session.
export async function signoutUser(token: string, user: User): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/signout`, user, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error signing out:", error);
      throw new Error("Sign-out failed. Please try again.");
    } else {
      throw new Error("An unexpected error occurred during sign-out.");
    }
  }
}

// Fetches details of a specific user based on their user ID.
export async function getUserDetails(): Promise<UserDetailsProps> {
  try {
    const userId = getUserIdFromToken(); // Function to extract user ID from token
    // console.log(userId);
    const response = await axios.get(`${BASE_URL}/${userId}`);

    // Extract user details from the nested structure
    const user = response.data.user;

    // Return user details in the expected format
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      addressLine1: "",
      addressLine2: "",
      postalCode: "",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error fetching user details: ${error.response?.data?.message || "Unknown error"}`
      );
      throw error;
    } else {
      throw new Error(
        "An unexpected error occurred while fetching user details."
      );
    }
  }
}

// Sends a ticket form to the backend.
export async function sendTicketForm(data: TicketFormData): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/ticket`, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error sending ticket form:", error);
      throw new Error(
        error.response?.data?.message || "Failed to send ticket form."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while sending the ticket form."
      );
    }
  }
}
