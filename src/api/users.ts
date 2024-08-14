import {
  User,
  SignInDetails,
  SignInDetailsResponse,
} from "../types/autheticationTypes";
import { TicketFormData } from "../types/dataTypes";

const BASE_URL = "http://localhost:3000/users";

// Registers a new user with the provided user data.
export async function signUp(user: User): Promise<string> {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Failed to sign up. Please check the user data."
    );
  }
}

// Retrieves sign-in details for a user based on their email.
export async function getSigninDetails(email: string): Promise<SignInDetails> {
  const queryParams = new URLSearchParams({ email });
  const url = `${BASE_URL}/signin?${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Failed to retrieve sign-in details. Invalid email."
    );
  }
}

// Signs in a user with the provided credentials.
export async function signinUser(user: User): Promise<SignInDetailsResponse> {
  const url = `${BASE_URL}/signin`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Sign-in failed.");
  }
}

// Stores a token for a user in the backend.
export async function storeToken(user: User): Promise<string> {
  const url = `${BASE_URL}/storeToken`;
  // console.log(`Storing token at: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  // console.log("api/user - storeToken - response:", response);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed to store token. Please check the user data.");
  }
}

// Validates the provided token to check if the user is signed in.
export async function checksignin(token: string): Promise<string> {
  const url = `${BASE_URL}/checksignin`;
  console.log(`Checking sign-in status at: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  console.log("api/user - checksignin - response:", response);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Sign-in check failed. Invalid token.");
  }
}

// Checks if the user has the necessary permissions (e.g., admin rights).
export async function checkPermission(token: string): Promise<string> {
  const url = `${BASE_URL}/checkpermission`;
  console.log(`Checking user permissions at: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(
      "Permission check failed. Invalid token or insufficient permissions."
    );
  }
}

// Signs out a user and invalidates their session.
export async function signoutUser(token: string, user: User): Promise<string> {
  const url = `${BASE_URL}/signout`;
  console.log(`Signing out user at: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Sign-out failed. Please try again.");
  }
}

// Fetches details of a specific user based on their user ID.
export async function getUserDetails(userId: string): Promise<User> {
  try {
    const url = `${BASE_URL}/${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("api/user - getUserDetails - response:", response);

    return response.json();
  } catch (error: unknown) {
    console.error(
      `Error fetching user details: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    throw error;
  }
}

// Sends a ticket form to the backend
export async function sendTicketForm(data: TicketFormData): Promise<void> {
  const url = `${BASE_URL}/ticket`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send ticket form.");
  }
}
