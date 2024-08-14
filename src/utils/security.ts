import * as CryptoJS from "crypto-js";
import { getRndInteger } from "./mathUtil";

// Establish SALT, KEY SIZE, MIN MAX iterations
const SALT_LENGTH = 128;
const KEY_SIZE = 256 / 32;
const MIN_ITERATIONS = 3;
const MAX_ITERATIONS = 10;

// Function to hash data with a randomly generated salt
export function hashData(data: string) {
  // Generate a random salt of specified length
  const salt = CryptoJS.lib.WordArray.random(SALT_LENGTH).toString(
    CryptoJS.enc.Base64
  );
  // Generate a random number of iterations between MIN_ITERATIONS and MAX_ITERATIONS
  const iterations = getRndInteger(MIN_ITERATIONS, MAX_ITERATIONS);
  // Create a hash using PBKDF2 with the data, salt, and specified key size and iterations
  const hash = CryptoJS.PBKDF2(data, salt, {
    keySize: KEY_SIZE,
    iterations: iterations,
  });
  // Return the hash, salt, and iterations used
  return {
    hash: hash.toString(CryptoJS.enc.Base64),
    salt: salt,
    iterations: iterations,
  };
}

// Function to hash data with a provided salt and iteration count
export function hashDataWithSaltRounds(
  data: string,
  salt: string,
  iterations: number
) {
  // Create a hash using PBKDF2 with the data, provided salt, and specified key size and iterations
  return CryptoJS.PBKDF2(data, salt, {
    keySize: KEY_SIZE,
    iterations: iterations,
  }).toString(CryptoJS.enc.Base64);
}

// Function to store a token in local storage
export function storeToken(token: string) {
  localStorage.setItem("token", token);
}

// Function to retrieve and validate a token from local storage
export function getToken() {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Obtain the payload of the token from the JWT
  const payload = JSON.parse(atob(token.split(".")[1]));
  // Check if the token has expired (JWT's exp is in seconds, not milliseconds)
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from local storage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

// Function to remove a token from local storage
export function removeToken() {
  localStorage.removeItem("token");
}

// Function to extract user ID from the token
export function getUserIdFromToken() {
  const token = getToken();
  if (!token) {
    throw new Error("User not authenticated");
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.payload.user;
}

// Function to extract listing ID from the token
export function getListingIdFromToken() {
  const token = getToken();
  if (!token) {
    throw new Error("User not authenticated");
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.listing_id;
}

// Function to extract email from the token
export function getEmailFromToken() {
  const token = getToken();
  if (!token) {
    throw new Error("User not authenticated");
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.payload.email;
}
