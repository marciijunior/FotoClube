import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const userData = await loginUser(data.email, data.password);
      toast.success("Login realizado com sucesso!");
      login(userData); // Atualiza o estado global e redireciona
    } catch (error) {
      toast.error(error.message || "Não foi possível fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login de Associado</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Email (associado@email.com)"
            {...register("email", { required: "Email é obrigatório" })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Senha (senha123)"
            {...register("password", { required: "Senha é obrigatória" })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
