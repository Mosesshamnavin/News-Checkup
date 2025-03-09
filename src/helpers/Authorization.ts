import { jwtDecode } from "jwt-decode";
import {localstorage  } from './localStorage'
import React from 'react';
import { Route, Navigate, RouteProps, Outlet } from 'react-router-dom';
class Authorization {
  /**
   * Set auth user details to class property
   * @return object
   */
  getHttpHeader(): Record<string, string> {
    const authToken = localstorage.get("token");

    const header: Record<string, string> =
      typeof authToken !== "undefined" && authToken !== null
        ? {
            "Content-Type": "application/json; charset=utf-8",
            "X-REQUEST-TYPE": "web",
            "X-LANGUAGE-CODE": "en",
            Authorization: authToken,
          }
        : {
            "Content-Type": "application/json; charset=utf-8",
            "X-REQUEST-TYPE": "web",
            "X-LANGUAGE-CODE": "en",
          };

    return header;
  }

  /**
   * Get Logged user name
   * @return logged user name
   */
  getLoggedUsername(): string {
    const authToken = localstorage.get("token");
    if (authToken) {
      const decoded = jwtDecode(authToken) as { _uname?: string } | null;
      return decoded?._uname || "";
    }
    return "";
  }

  /**
   * Get Logged profile picture
   * @return logged profile picture
   */
  getLoggedUser(): object {
    const authToken = localstorage.get("token");
    if (authToken) {
      const decoded = jwtDecode(authToken) as { name?: string, email?: string, photo?: any } | null;
      return decoded || {};
    }
    return {};
  }

  /**
   * Check if an active user is logged in
   * @return boolean
   */
  isLoggedIn(): boolean {
    return typeof localstorage.get("token") === "string";
  }

  /**
   * Login the user by setting it in local storage
   * @return boolean
   */
  login(token: string, userId: string): boolean {
    if (typeof Storage !== "undefined") {
      localstorage.remove("token");
      localstorage.set("token", token);
      return true;
    } else {
      console.error("Local storage is not supported");
      return false;
    }
  }

  /**
   * Logout the user by removing credentials from local storage
   * @return boolean
   */
  logout(): boolean {
    if (typeof Storage !== "undefined") {
      localstorage.remove("token");
      return true;
    } else {
      console.error("Local storage is not supported");
      return false;
    }
  }
}

export default new Authorization();
