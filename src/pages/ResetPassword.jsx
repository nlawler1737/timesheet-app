import React, { useMemo, useState } from "react";
import InputForm from "../components/InputForm";
import { Card, CardBody, Input } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import LoadingButton from "../components/LoadingButton";
import { requestPasswordChange } from "../utils/authHandler";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState({ success: null, message: null });
  const isInvalid = useMemo(() => {
    if (!email) return false;
    return validateEmail(email) ? false : true;
  }, [email]);
  const [loading, setLoading] = useState(false);

  function validateEmail(value) {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  }

  function handleRequestClick() {
    let error = false;
    if (!email) {
      setEmailError(true);
      error = true;
    }
    if (isInvalid) {
      error = true;
    }
    if (error) return;
    setLoading(true);
    requestPasswordChange({ email }).then((data) => {
      setLoading(false);
      if (!data.success) {
        setStatus({ success: false, message: data.message });
        return;
      }
      setStatus({
        success: true,
        message: "Open the link sent to this email address",
      });
    });
  }

  const content = (
    <>
      {status.message && (
        <Card>
          <CardBody
            className={!status.success ? "bg-danger" : "bg-success text-black"}
          >
            {status.message}
          </CardBody>
        </Card>
      )}
      <Input
        type="email"
        label="Email"
        isRequired
        size="sm"
        variant="bordered"
        color={
          emailError || isInvalid ? "danger" : !email ? "default" : "success"
        }
        value={email}
        onValueChange={(value) => {
          setEmailError(false);
          setEmail(value);
        }}
        isInvalid={isInvalid}
        errorMessage={(emailError || isInvalid) && "Please enter a valid email"}
      ></Input>
      <LoadingButton
        loading={loading}
        text="Request Reset"
        onClick={handleRequestClick}
      />
      <div className="w-full text-center">
        <Link href="/signup">Don't Have An Account?</Link>
      </div>
    </>
  );
  return (
    <InputForm
      title="Reset Password"
      message="Enter your accounts email to receive a link to reset your password"
      content={content}
    />
  );
}
