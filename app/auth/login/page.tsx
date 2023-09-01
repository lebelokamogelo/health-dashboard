"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "@/model/firebase";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (auth.currentUser) return router.push("/");

  return (
    <div className="flex items-center justify-center w-full h-full px-2 text-xl">
      <Formik
        initialValues={{ Email: "", Password: "", Remember: false }}
        validationSchema={Yup.object({
          Email: Yup.string()
            .email("Please enter a email address")
            .required("Required"),
          Remember: Yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);

          setTimeout(async () => {
            if (values.Email != "admin@gmail.com") {
              toast.success("Standard user are not allowed to login to this website");
              setLoading(false);
            } else {
              await signInWithEmailAndPassword(
                auth,
                values.Email,
                values.Password
              )
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  toast.success(`Authenticated as ${user.email}`);
                  setLoading(false);
                  router.push("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);

                  toast.success("Incorrect email address or password");
                  setLoading(false);
                });
            }
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <div className="shadown relative bg-white rounded-md container lg:w-[480px] p-4 border border-slate-200">
            <h1 className="mt-10 text-2xl font-semibold text-center">
              Sign in to your account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="mx-auto lg:w-11/12 mt-14"
            >
              <div className="mb-4">
                <label htmlFor="Email" className="block mb-2 ">
                  Email Address
                </label>
                <input
                  id="Email"
                  type="email"
                  {...formik.getFieldProps("Email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {formik.touched.Email && formik.errors.Email ? (
                  <div className="mt-1 text-red-500">{formik.errors.Email}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="Password" className="block mb-2">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-md input-password">
                  <input
                    id="Password"
                    type={show ? "text" : "password"}
                    {...formik.getFieldProps("Password")}
                    className="flex-1 w-full h-full px-4 py-2 rounded-md focus:outline-none"
                  />
                  <div
                    className="p-1 mx-2 rounded-md show-hide-password hover:bg-slate-200"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? <Eye /> : <EyeOff />}
                  </div>
                </div>

                {formik.touched.Password && formik.errors.Password ? (
                  <div className="mt-1">{formik.errors.Password}</div>
                ) : null}
              </div>
              <div className="flex items-center mt-5">
                <input
                  id="Remember"
                  type="checkbox"
                  {...formik.getFieldProps("Remember")}
                  className="mr-2"
                />
                <label className="text-base">Remember me</label>
                <Link
                  href="/auth/forgot"
                  className="ml-auto text-blue-500 text-md hover:text-blue-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="loading flex justify-center mt-4">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#000"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={loading}
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-400 rounded-md mt-14 hover:bg-blue-500"
              >
                Sign in
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
