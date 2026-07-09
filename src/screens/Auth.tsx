import { Container } from "../components/ui/Container";
import logo from "/nutrition.png";
import { Mail, Lock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../db/db";
import { UserRepository } from "../repositories/userRepository";

interface IAuth {
  email: string;
  password: string;
  confirmPassword?: string;
  date?: string;
}

export const Auth = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<IAuth>({
    email: "",
    password: "",
    confirmPassword: "",
    date: "",
  });
  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
    }
    try {
      const isExist = await UserRepository.findByEmail(formData.email);
      if (isExist) {
        alert("У вас уже есть аккаунт");
      }

      const userId = await UserRepository.create({
        email: formData.email,
        password: formData.password,
        date: formData.date,
      });
      if (userId) {
        localStorage.setItem("currentUserId", String(userId));
        navigate("/onBoarding");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleAuth = async () => {
    try {
      const user = await UserRepository.findByEmail(formData.email);
      if (
        user?.email &&
        user.password === formData.email &&
        formData.password
      ) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <div className="flex flex-col justify-center items-center gap-8 mt-20">
        <img src={logo} className="w-36" alt="" />
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-semibold text-[#111827]">Добро пожаловать!</h2>
          <p className="text-[#6b7280]">
            {signUp ? "Создайте" : "Войдите в "} аккаунт, чтобы
            {signUp ? " начать" : "продолжить"} свой путь к цели
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="relative w-full">
            <Mail className="absolute top-1/2 -translate-y-1/2 left-4 size-4 text-[#6b7280]" />
            <input
              type="text"
              className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-4 outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
          </div>
          <div className="relative w-full">
            <Lock className="absolute top-1/2 -translate-y-1/2 left-4 size-4 text-[#6b7280]" />
            <input
              type="password"
              className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-4 outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
              value={formData.password}
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {signUp && (
            <>
              <div className="relative w-full">
                <Lock className="absolute top-1/2 -translate-y-1/2 left-4 size-4 text-[#6b7280]" />
                <input
                  type="password"
                  className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-4 outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
                  value={formData.confirmPassword}
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative w-full overflow-hidden items-center">
                <Calendar className="absolute top-1/2 -translate-y-1/2 left-4 size-4 text-[#6b7280]" />
                {formData.date?.length === null && (
                  <p className="absolute top-1/2 -translate-y-1/2 left-14 text-[#6b7280]">
                    Enter the date
                  </p>
                )}
                <input
                  type="date"
                  className="h-11 w-full appearance-none rounded-lg border border-[#e5e7eb] bg-white py-2 pl-14 pr-4 text-left outline-none transition-colors focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/10"
                  value={formData.date}
                  placeholder=""
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </>
          )}
          {!signUp && (
            <p className="flex justify-end text-[#1677ff]">Забыли пароль?</p>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full items-center">
          <button
            className="h-11 w-full rounded-lg bg-[#1677ff] font-medium text-white shadow-sm transition-colors hover:bg-[#4096ff]"
            onClick={() => {
              if (signUp) {
                handleRegister();
              } else {
                handleAuth();
              }
            }}
          >
            {signUp ? "Зарегистрироваться" : "Войти"}
          </button>

          {signUp ? (
            <p className="flex gap-1">
              Уже есть аккаунт?{" "}
              <span
                className="cursor-pointer text-[#1677ff]"
                onClick={() => setSignUp(!signUp)}
              >
                Войти
              </span>
            </p>
          ) : (
            <p className="flex gap-1">
              Нет аккаунта?{" "}
              <span
                className="cursor-pointer text-[#1677ff]"
                onClick={() => setSignUp(!signUp)}
              >
                Зарегистрируйтесь
              </span>
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};
