import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/system";

const schema = z.object({
  email: z
    .string()
    .email("Неправильный формат email")
    .min(1, "Email является обязательным"),
  phone: z.string().min(1, "Телефон является обязательным"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  referralCode: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Необходимо принять условия использования",
  }),
});

const validatePassword = (password) => {
  const criteria = {
    length: password.length >= 8,
    number: /[0-9]/.test(password),
    specialChar: /[\W_]/.test(password),
    capitalLetter: /[A-Z]/.test(password),
  };
  return criteria;
};

const SignInForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const CustomTabs = styled(Tabs)({
    width: "436px",
    height: "48px",
    color: "#A6ABB0",
    backgroundColor: "#F4F4F4",
    borderRadius: "8px",
    margin: "0 auto",
  });

  const CustomTab = styled(Tab)(({ theme }) => ({
    width: "210px",
    height: "40px",
    borderRadius: "8px",
    "&.Mui-selected": {
      backgroundColor: "white",
      color: "#101112",
      borderRadius: "8px",
    },
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  }));

  const [passwordCriteria, setPasswordCriteria] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const onPasswordChange = (e) => {
    const password = e.target.value;
    const criteria = validatePassword(password);
    setPasswordCriteria(criteria);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, borderRadius: 2, width: "516px", height: "736px" }}
    >
      <CustomTabs value={activeTab} onChange={handleTabChange} centered>
        <CustomTab label="Sign Up" value="register" />
        <CustomTab label="Login" value="login" />
      </CustomTabs>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
        {activeTab === "register" && (
          <>
            <TextField
              {...register("email")}
              label="E-mail"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("phone")}
              label="Phone number"
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ""}
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={onPasswordChange}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="body2"
              color={
                passwordCriteria.length
                  ? "green"
                  : passwordCriteria.length === false
                    ? "red"
                    : "#A6ABB0"
              }
            >
              {passwordCriteria.length
                ? "✓ At least 8 characters"
                : "At least 8 characters!"}
            </Typography>
            <Typography
              variant="body2"
              color={
                passwordCriteria.number
                  ? "green"
                  : passwordCriteria.number === false
                    ? "red"
                    : "#A6ABB0"
              }
            >
              {passwordCriteria.number
                ? "✓ Contains a number"
                : "Contains a number!"}
            </Typography>
            <Typography
              variant="body2"
              color={
                passwordCriteria.specialChar
                  ? "green"
                  : passwordCriteria.specialChar === false
                    ? "red"
                    : "#A6ABB0"
              }
            >
              {passwordCriteria.specialChar
                ? "✓ Contains a special character"
                : "Contains a special character!"}
            </Typography>
            <Typography
              variant="body2"
              color={
                passwordCriteria.capitalLetter
                  ? "green"
                  : passwordCriteria.capitalLetter === false
                    ? "red"
                    : "#A6ABB0"
              }
            >
              {passwordCriteria.capitalLetter
                ? "✓ One or more capitalized letters"
                : "One or more capitalized letters!"}
            </Typography>
            <TextField
              {...register("referralCode")}
              label="Referral code"
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    mt: 2,
                    width: "24px",
                    height: "24px",
                    borderRadius: 8,
                    color: "##DCDEE0",
                    borderColor: "##DCDEE0",
                  }}
                  {...register("acceptTerms")}
                />
              }
              label="I accept the Terms of Use and have read Privacy Policy"
            />
          </>
        )}

        {activeTab === "login" && (
          <>
            <TextField
              {...register("email")}
              label="E-mail"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              fullWidth
              margin="normal"
            />
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            sx={{
              mt: 2,
              width: "436px",
              borderRadius: 20,
              backgroundColor: "#526ED3",
              borderColor: "#526ED3",
              color: "white",
              "&:hover": {
                backgroundColor: "#A1B1E7",
              },
            }}
          >
            {activeTab === "register" ? "Sign Up" : "Login"}
          </Button>
        </div>
      </Box>
    </Paper>
  );
};

export default SignInForm;
