import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";

import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { CircularLoading } from "../../components/ui/CircularLoading";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    setLoading(true);
    const { hasError, message } = await loginUser(email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 10000);
      reset();
      setLoading(false);
      return;
    }
    router.push("/");
  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              {/***********************Alert******************************************** */}
              <Chip
                label={errorMessage}
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
              {/***********************Alert******************************************** */}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth>
                {loading ? <CircularLoading /> : "Ingresar"}
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref>
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>

            {/* <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end">
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials")
                  return <div key="credentials"></div>;

                return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ mb: 1 }}
                    onClick={() => signIn(provider.id)}>
                    {provider.name}
                  </Button>
                );
              })}
            </Grid> */}
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
