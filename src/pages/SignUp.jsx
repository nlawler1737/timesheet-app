import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Input, Link } from "@nextui-org/react";
import InputForm from "../components/InputForm";
import PasswordEye from "../components/PasswordEye";
import LoadingButton from "../components/LoadingButton";
import { register } from "../utils/authHandler";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loginStatus, setLoginStatus] = useState({
    success: null,
    message: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function updateEmail(value) {
    setEmail(value);
    setEmailError("");
  }

  function updatePassword(value) {
    setPassword(value);
    setPasswordError("");
  }

  function updateConfirmPassword(value) {
    setConfirmPassword(value);
    setConfirmPasswordError("");
  }

  function isInvalidEmail(email) {
    if (!email) return "Enter Email";
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i))
      return "Invalid Email";
    return false;
  }

  function isInvalidPassword(password) {
    const minLength = 8
    const excludeList = ["password", "123", "1234", "12345", "123456"];
    const specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const lowercase = password.toLowerCase();
    if (!password) return "Enter Password";
    if (password.length < minLength) return `Password must be at least ${minLength} characters`;
    if (excludeList.some((a) => lowercase.includes(a)))
      return (
        "Password cannot contain " +
        excludeList.map((a) => '"' + a + '"').join(", ")
      );
    if (!specialCharacters.split("").some((a) => lowercase.includes(a)))
      return "Password must contain a special character";
    return false;
  }

  function handleCreateClick() {
    let error = false;
    const invalidEmail = isInvalidEmail(email);
    const invalidPassword = isInvalidPassword(password);
    if (invalidEmail) {
      setEmailError(invalidEmail);
      error = true;
    }
    if (invalidPassword) {
      setPasswordError(invalidPassword);
      error = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords Do Not Match");
      error = true;
    }
    if (error) return;

    setLoading(true);
    register({ email, password }).then((data) => {
      setLoading(false);
      if (!data.success) {
        setLoginStatus({ success: false, message: data.message });
        return;
      }
      setLoginStatus({ success: true, message: "Redirecting..." });
      navigate("/");
    });
  }

  const content = (
    <>
      {loginStatus.message && (
        <Card>
          <CardBody
            className={
              !loginStatus.success ? "bg-danger" : "bg-success text-black"
            }
          >
            {loginStatus.message}
          </CardBody>
        </Card>
      )}
      <Input
        type="email"
        label="Email"
        isRequired
        size="sm"
        variant="bordered"
        value={email}
        onValueChange={updateEmail}
        errorMessage={emailError}
        isInvalid={!!emailError}
      ></Input>
      <Input
        type={showPassword ? "text" : "password"}
        label="Password"
        isRequired
        size="sm"
        variant="bordered"
        value={password}
        onValueChange={updatePassword}
        errorMessage={passwordError}
        isInvalid={!!passwordError}
        endContent={
          <PasswordEye
            show={showPassword}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        }
      ></Input>
      <Input
        type={showConfirmPassword ? "text" : "password"}
        label="Confirm Password"
        isRequired
        size="sm"
        variant="bordered"
        value={confirmPassword}
        onValueChange={updateConfirmPassword}
        errorMessage={confirmPasswordError}
        isInvalid={!!confirmPasswordError}
        endContent={
          <PasswordEye
            show={showConfirmPassword}
            onClick={() => {
              setShowConfirmPassword((prev) => !prev);
            }}
          />
        }
      ></Input>
      <LoadingButton
        loading={loading}
        text="Create Account"
        onClick={handleCreateClick}
      ></LoadingButton>
      <div className="w-full text-center">
        <Link href="/login">Already Have An Account?</Link>
      </div>
    </>
  );

  return <InputForm greeting="Welcome" title="Sign Up" content={content} />;
}
