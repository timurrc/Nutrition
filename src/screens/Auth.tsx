import { Container } from "../components/ui/Container";
import logo from "/nutrition.png";
import { Mail, Lock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserRepository } from "../repositories/userRepository";
import { Input } from "../components/ui/Input";
import { Typography } from "../components/ui/Typography";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { setCurrentUserId } from "../utils/currentUser";
import { resolvePostLoginPath } from "../utils/authRedirect";

type AuthForm = {
  email: string;
  password: string;
  confirmPassword?: string;
  date?: string;
};

export const Auth = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<AuthForm>({
    email: "",
    password: "",
    confirmPassword: "",
    date: "",
  });

  const handleRegister = async () => {
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    const existing = await UserRepository.findByEmail(formData.email);
    if (existing) {
      setError("Аккаунт с таким email уже существует");
      return;
    }

    const userId = await UserRepository.create({
      email: formData.email,
      password: formData.password,
      date: formData.date,
    });

    if (!userId) return;

    setCurrentUserId(userId);
    navigate("/onBoarding");
  };

  const handleAuth = async () => {
    setError("");
    const user = await UserRepository.findByEmail(formData.email);

    if (!user?.id || user.password !== formData.password) {
      setError("Неверный email или пароль");
      return;
    }

    setCurrentUserId(user.id);
    navigate(await resolvePostLoginPath(user.id));
  };

  return (
    <Container>
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center gap-6 py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-surface shadow-sm">
            <img src={logo} className="w-10" alt="" />
          </div>
          <Typography variant={"h2"}>BodyForge</Typography>
          <Typography variant={"body"} className="max-w-xs text-text-secondary">
            {signUp
              ? "Создайте аккаунт и начните вести дневник питания"
              : "Войдите, чтобы продолжить свой путь к цели"}
          </Typography>
        </div>

        <Card className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-surface-secondary p-1">
            <button
              type="button"
              className={`h-10 rounded-md text-sm font-medium transition-all ${!signUp ? "bg-surface text-text shadow-sm" : "text-text-secondary"}`}
              onClick={() => {
                setSignUp(false);
                setError("");
              }}
            >
              Вход
            </button>
            <button
              type="button"
              className={`h-10 rounded-md text-sm font-medium transition-all ${signUp ? "bg-surface text-text shadow-sm" : "text-text-secondary"}`}
              onClick={() => {
                setSignUp(true);
                setError("");
              }}
            >
              Регистрация
            </button>
          </div>

          <div className="flex flex-col gap-3">
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
              placeholder={"Пароль"}
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
                  placeholder={"Подтвердите пароль"}
                  type={"password"}
                  value={formData.confirmPassword ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
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
              <Typography
                variant={"body"}
                className="flex justify-end text-sm text-primary"
              >
                Забыли пароль?
              </Typography>
            )}
          </div>

          {error && (
            <Typography variant={"body"} className="mt-3 text-sm text-danger">
              {error}
            </Typography>
          )}

          <div className="mt-5 flex flex-col gap-3">
            <Button
              variant="primary"
              onClick={() => {
                if (signUp) {
                  handleRegister();
                } else {
                  handleAuth();
                }
              }}
            >
              {signUp ? "Зарегистрироваться" : "Войти"}
            </Button>

            <Typography
              variant={"body"}
              className="text-center text-sm text-text-secondary"
            >
              {signUp ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
              <Typography
                variant={"body"}
                className="inline cursor-pointer text-sm font-medium text-primary"
                onClick={() => {
                  setSignUp(!signUp);
                  setError("");
                }}
              >
                {signUp ? "Войти" : "Зарегистрироваться"}
              </Typography>
            </Typography>
          </div>
        </Card>
      </div>
    </Container>
  );
};
