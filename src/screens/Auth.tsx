import { Container } from "../components/ui/Container";
import logo from "/nutrition.png";
import { Mail, Lock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../db/db";
import { UserRepository } from "../repositories/userRepository";
import { Input } from "../components/ui/Input";
import { Typography } from "../components/ui/Typography";

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
          <Typography variant={"h2"}>Добро пожаловать!</Typography>

          <Typography variant={"body"} className="text-gray-500">
            {signUp ? "Создайте" : "Войдите в "} аккаунт, чтобы
            {signUp ? " начать" : "продолжить"} свой путь к цели
          </Typography>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Input
            placeholder={"Email"}
            type={"email"}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            icon={Mail}
            iconSide="left"
          />
          <Input
            placeholder={"Password"}
            type={"password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            icon={Lock}
            iconSide="left"
          />

          {signUp && (
            <>
              <Input
                placeholder={"Confirm password"}
                type={"password"}
                value={formData.confirmPassword ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                icon={Lock}
                iconSide="left"
              />
              <Input
                type={"date"}
                value={formData.date ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                icon={Calendar}
                iconSide="left"
              />
            </>
          )}
          {!signUp && (
            <Typography variant={"body"} className="flex justify-end text-text">
              Забыли пароль?
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full items-center">
          <button
            className="py-4 bg-primary active:bg-primary-hover active:transition-all text-black w-full rounded-xl font-semibold"
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
            <Typography
              variant={"body"}
              className="flex gap-1 items-center text-text-secondary"
            >
              Уже есть аккаунт?{" "}
              <Typography
                variant={"body"}
                className="flex justify-end text-text"
                onClick={() => setSignUp(!signUp)}
              >
                Войти
              </Typography>
            </Typography>
          ) : (
            <Typography
              variant={"body"}
              className="flex gap-1 items-center text-text-secondary"
            >
              Нет аккаунта?
              <Typography
                variant={"body"}
                className="flex justify-end text-text"
                onClick={() => setSignUp(!signUp)}
              >
                Зарегистрируйтесь
              </Typography>
            </Typography>
          )}
        </div>
      </div>
    </Container>
  );
};
