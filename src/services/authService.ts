import { message } from "antd";

export class AuthService {
  static login(username: string, password: string): boolean {
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    message.error("Неверный логин или пароль");
    return false;
  }

  static logout() {
    localStorage.removeItem("isAuthenticated");
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem("isAuthenticated") === "true";
  }
}

export default new AuthService();
