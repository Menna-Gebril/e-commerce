import React, { useEffect, useState } from "react";
import classes from "./ForgetPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import EmailStep from "../EmailStep/EmailStep.jsx";
import CodeStep from "../CodeStep/CodeStep.jsx";
import RecentPasswordStep from "../RecentPasswordStep/RecentPasswordStep.jsx";
import PasswordReset from "../PasswordReset/PasswordReset.jsx";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
export default function ForgetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  async function sendEmail(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values,
      );

      console.log("email step", data);


      setEmail(values.email);
      if (data.statusMsg === "success") {
        setStep("verifyCode");
        toast.success(data.message)
        setError(null);
      } else {

      }
    } catch (error) {
      setError(error.response.data.message);

      setMsg(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendCode(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values,
      );
      console.log("send code step", data);
      if (data.status === "Success") {
        toast.success("Code verified!")
        setStep("resetPassword");
        console.log(data);
        setError(null);
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message)

    } finally {
      setIsLoading(false);
    }
  }

  async function resendCode() {
    await sendEmail({ email });
    setMsg("New code sent!");
  }

  function changeEmail() {
    setStep("email");
  }


  async function resetPassword(values) {
    try {
      setIsLoading(true);

      const body = {
        email: values.email,
        newPassword: values.newPassword,
        token,
      };
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        body,
      );

      console.log("reset code step", data);

      if (data.token) {
        setStep("resetSuccess");
        toast.success("Password reset successfully!")
        console.log(values);
        setError(null);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className={`${classes.ForgetPassword}`}>
        <div className="container mx-auto px-6">
           <Helmet>
                      <title>Forget Password</title>
                      <meta name="description" content="Forget Password" />
                    </Helmet>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
             max-w-7xl 
          mx-auto py-12"
          >
            <div className="hidden lg:block">
              <div className="text-center space-y-4">
                <h2 className="mt-4 font-bold text-3xl text-gray-800">
                  Reset Your Password
                </h2>
                <p className="text-lg text-gray-600">
                  Don't worry, it happens to the best of us. We'll help you get
                  back into your account in no time.
                </p>
                <div className="flex items-center justify-evenly ">
                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-envelope text-green-500 text-sm"></i>
                    <span className="text-gray-500">Email Verification</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-shield-halved text-green-500 text-sm"></i>
                    <span className="text-gray-500">Secure Reset</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <i className="fa-solid fa-lock text-green-500 text-sm"></i>
                    <span className="text-gray-500">Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {step === "email" && (
              <EmailStep
                sendEmail={sendEmail}
                error={error}
                isLoading={isLoading}
              />
            )}

            {step === "verifyCode" && (
              <CodeStep
                email={email}
                error={error}
                isLoading={isLoading}
                sendCode={sendCode}
                resendCode={resendCode}
                changeEmail={changeEmail}

              />
            )}

            {step === "resetPassword" && (
              <RecentPasswordStep
                error={error}
                isLoading={isLoading}
                sendCode={sendCode}
                resetPassword={resetPassword}
                email={email}
              />
            )}

            {step === "resetSuccess" && (
              <PasswordReset error={error} isLoading={isLoading} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
