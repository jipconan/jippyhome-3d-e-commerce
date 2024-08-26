import * as usersAPI from "../api/users";
import { getToken, removeToken } from "../utils/security";
import {
  User,
  SignInDetails,
  SignInDetailsResponse,
  UserDetailsProps,
} from "../types/autheticationTypes";
import { TicketFormData } from "../types/dataTypes";

// Signs up a user and returns a token
export async function signUp(user: User): Promise<string> {
  try {
    const token = await usersAPI.signUp(user);
    return token;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

// Retrieves sign-in details for a given email
export async function getSigninDetails(email: string): Promise<SignInDetails> {
  try {
    const signinDetails = await usersAPI.getSigninDetails(email);
    return signinDetails;
  } catch (error) {
    console.error("Error retrieving sign-in details:", error);
    throw error;
  }
}

// Signs in a user and returns a token
export async function signinUser(user: User): Promise<SignInDetailsResponse> {
  try {
    const res = await usersAPI.signinUser(user);
    return res;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
}

// Retrieves the user from the token payload if available
export function getUser(): string | null {
  const token = getToken();
  // console.log(token);
  return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
}

// Retrieves the user from the token payload if available
export function getAdmin(): boolean {
  const token = getToken();
  // console.log(token);
  return token ? JSON.parse(atob(token.split(".")[1])).payload.is_admin : null;
}

// Checks if the user is signed in by calling an API endpoint
export async function checkSignin(): Promise<string | null> {
  const token = getToken();
  if (token) {
    try {
      const res = await usersAPI.checksignin(token);
      // console.log("service/user - checkSignin - checkSignin:", res);
      return res;
    } catch (e) {
      console.error("Error checking signin:", e);
      return null;
    }
  }
  return null;
}

// Checks user permissions by calling an API endpoint
export async function checkPermission(): Promise<string | null> {
  const token = getToken();
  if (token) {
    try {
      const res = await usersAPI.checkPermission(token);
      return res;
    } catch (e) {
      console.error("Error checking permission:", e);
      return null;
    }
  }
  return null;
}

// Logs out the user by removing the token
export async function logoutUser(): Promise<void> {
  const token = getToken();
  if (token) {
    removeToken();
  }
}

// Retrieves user details for a given user ID
export async function getUserDetails(): Promise<UserDetailsProps> {
  const userDetails = await usersAPI.getUserDetails();
  // console.log("service/user - getUserDetails - userDetails:", userDetails);
  return userDetails;
}

// Sends a ticket form to the backend
export async function sendTicketForm(data: TicketFormData): Promise<void> {
  try {
    await usersAPI.sendTicketForm(data);
  } catch (error) {
    console.error("Error sending ticket form:", error);
    throw error;
  }
}
