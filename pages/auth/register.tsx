import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import NextLink from "next/link";
//import { signIn, getSession } from 'next-auth/react';

import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Check, CheckCircle, ErrorOutline } from "@mui/icons-material";

import { AuthContext } from "../../context";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useAuth } from "../../hooks/useAuth";
import { tesloApi } from "../../api";
import axios from "axios";
import { CircularLoading } from "../../components/ui/CircularLoading";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const { registerUser } = useContext( AuthContext );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const registerUser = async ({ name, email, password }: FormData) => {
    setLoading(true);
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });

      setShowSuccess(true);
      setMessageSuccess(data.message);
      setTimeout(() => setShowSuccess(false), 10000);
      setLoading(false);
    reset();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        setShowError(true);
        setMessageError(error.response?.data.message);
      }
      setTimeout(() => setShowError(false), 10000);
      reset();
    }
  };
  // const [ showError, setShowError ] = useState(false);
  // const [ errorMessage, setErrorMessage ] = useState('');

  // const onRegisterForm = async( {  name, email, password }: FormData ) => {

  //     setShowError(false);
  //     const { hasError, message } = await registerUser(name, email, password);

  //     if ( hasError ) {
  //         setShowError(true);
  //         setErrorMessage( message! );
  //         setTimeout(() => setShowError(false), 3000);
  //         return;
  //     }

  //     // Todo: navegar a la pantalla que el usuario estaba
  //     // const destination = router.query.p?.toString() || '/';
  //     // router.replace(destination);

  //  //   await signIn('credentials',{ email, password });

  // }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(registerUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              {/************************ Alert******************************* */}
              <Chip
                label={messageError}
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />

              <Chip
                label={messageSuccess}
                color="success"
                icon={<CheckCircle />}
                className="fadeIn"
                sx={{ display: showSuccess ? "flex" : "none" }}
              />
              {/************************ Alert******************************* */}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="outlined"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                {loading ? <CircularLoading /> : "Registrar"}
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : "/auth/login"
                }
                passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

//     const session = await getSession({ req });
//     // console.log({session});

//     const { p = '/' } = query;

//     if ( session ) {
//         return {
//             redirect: {
//                 destination: p.toString(),
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: { }
//     }
// }

export default RegisterPage;
