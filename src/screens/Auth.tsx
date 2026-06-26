import { Container } from "../components/ui/Container";
import logo from "/nutrition.png";
import { Mail, Lock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  return (
    <Container>
      <div className="flex flex-col justify-center items-center gap-8 mt-20">
        <img src={logo} className="w-36" alt="" />
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-semibold">Добро пожаловать!</h2>
          <p className="text-gray-500">
            {signUp ? "Создайте" : "Войдите в "} аккаунт, чтобы
            {signUp ? " начать" : "продолжить"} свой путь к цели
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="relative w-full">
            <Mail className="absolute top-4 left-5 text-gray-500" />
            <input
              type="text"
              className="w-full bg-[#1C2128] px-14 py-4 rounded-xl"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
          </div>
          <div className="relative w-full">
            <Lock className="absolute top-4 left-5 text-gray-500" />
            <input
              type="password"
              className="w-full bg-[#1C2128] px-14 py-4 rounded-xl"
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
                <Lock className="absolute top-4 left-5 text-gray-500" />
                <input
                  type="password"
                  className="w-full bg-[#1C2128] px-14 py-4 rounded-xl"
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
                <Calendar className="absolute top-5 left-5 text-gray-500" />
                {formData.date?.length === null && (
                  <p className="absolute top-4 left-14.5 text-gray-500">
                    Enter the date
                  </p>
                )}
                <input
                  type="date"
                  className="w-full bg-[#1C2128] py-4 text-left px-15 rounded-xl appearance-none"
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
            <p className="flex justify-end text-[#75d253]">Забыли пароль?</p>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full items-center">
          <button
            className="py-4 bg-[#7FE35B] text-black w-full rounded-xl font-semibold"
            onClick={() =>
              signUp ? navigate("/onBoarding") : navigate("/home")
            }
          >
            {signUp ? "Зарегистрироваться" : "Войти"}
          </button>

          {signUp ? (
            <p className="flex gap-1">
              Уже есть аккаунт?{" "}
              <span
                className="text-[#75d253]"
                onClick={() => setSignUp(!signUp)}
              >
                Войти
              </span>
            </p>
          ) : (
            <p className="flex gap-1">
              Нет аккаунта?{" "}
              <span
                className="text-[#75d253]"
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
