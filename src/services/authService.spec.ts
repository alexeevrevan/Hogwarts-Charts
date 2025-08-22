import { AuthService } from "./authService";
import { message } from "antd";

jest.mock("antd", () => ({
  message: {
    error: jest.fn(),
  },
}));

describe("AuthService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("login", () => {
    it("должен успешно войти с правильными данными", () => {
      const result = AuthService.login("admin", "password");

      expect(result).toBe(true);
      expect(localStorage.getItem("isAuthenticated")).toBe("true");
      expect(message.error).not.toHaveBeenCalled();
    });

    it("должен отклонить вход с неправильным логином", () => {
      const result = AuthService.login("wronguser", "password");

      expect(result).toBe(false);
      expect(localStorage.getItem("isAuthenticated")).toBeNull();
      expect(message.error).toHaveBeenCalledWith("Неверный логин или пароль");
    });

    it("должен отклонить вход с неправильным паролем", () => {
      const result = AuthService.login("admin", "wrongpassword");

      expect(result).toBe(false);
      expect(localStorage.getItem("isAuthenticated")).toBeNull();
      expect(message.error).toHaveBeenCalledWith("Неверный логин или пароль");
    });
  });

  describe("logout", () => {
    it("должен удалить флаг аутентификации", () => {
      // Сначала устанавливаем флаг аутентификации
      localStorage.setItem("isAuthenticated", "true");

      AuthService.logout();

      expect(localStorage.getItem("isAuthenticated")).toBeNull();
    });
  });

  describe("isAuthenticated", () => {
    it("должен вернуть true, если пользователь аутентифицирован", () => {
      localStorage.setItem("isAuthenticated", "true");

      expect(AuthService.isAuthenticated()).toBe(true);
    });

    it("должен вернуть false, если пользователь не аутентифицирован", () => {
      expect(AuthService.isAuthenticated()).toBe(false);
    });

    it("должен вернуть false с неправильным значением", () => {
      localStorage.setItem("isAuthenticated", "something");

      expect(AuthService.isAuthenticated()).toBe(false);
    });
  });
});
