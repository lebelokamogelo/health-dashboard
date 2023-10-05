"use client"

import React, { useState } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import { PulseLoader } from "react-spinners"
import toast from "react-hot-toast"
import { sendPasswordResetEmail } from "@firebase/auth"
import { auth } from "@/model/firebase"

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex items-center justify-center w-full h-full px-2 text-xl">
      <Formik
        initialValues={{ Email: "" }}
        validationSchema={Yup.object({
          Email: Yup.string()
            .email("Please enter a email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true)
          await sendPasswordResetEmail(auth, "patient.email")
            .then(() => {
              toast.success(
                `You should receive an email with a link to reset your password ${values.Email}`
              )
              setLoading(false)
            })
            .catch((error) => {
              const errorMessage = error.message
              toast.error(errorMessage)
              setLoading(false)
            })
          setSubmitting(false)
        }}
      >
        {(formik) => (
          <div className="shadow bg-white rounded-md w-[480px] p-4 border border-slate-200">
            <h1 className="mx-4 text-2xl font-semibold text-center mt-8">
              Forgot Password?
            </h1>
            <p className="mx-4 mt-6">
              Enter the email associated with your account and we will send you
              an email with instruction to reset.
            </p>
            <form
              onSubmit={formik.handleSubmit}
              className="w-11/12 mx-auto mt-8"
            >
              <div className="mb-4">
                <label htmlFor="Email" className="block mb-2">
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

              <div className="mt-14">
                {loading ? (
                  <div className="loading w-full text-center">
                    <PulseLoader color="#36d7b7" />{" "}
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-slate-600 rounded-md hover:bg-slate-700"
                  >
                    request reset
                  </button>
                )}
              </div>

              <div className="mt-8 login hover:underline hover:text-blue-700">
                <Link href={"/auth/login"}>Back to login</Link>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}
