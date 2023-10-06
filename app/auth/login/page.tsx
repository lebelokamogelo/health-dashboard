"use client"

import { auth } from "@/model/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Formik } from "formik"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { PulseLoader } from "react-spinners"
import * as Yup from "yup"

export default function Login() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  if (auth.currentUser) return router.push("/")

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
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true)

          if (values.Email != "support@mail.com") {
            toast.success(
              "Standard user are not allowed to login to this website"
            )
            setLoading(false)
          } else {
            await signInWithEmailAndPassword(
              auth,
              values.Email,
              values.Password
            )
              .then((userCredential) => {
                const user = userCredential.user
                toast.success(`Authenticated as ${user.email}`)
                setLoading(false)
                router.push("/")
              })
              .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage)

                toast.success("Incorrect email address or password")
                setLoading(false)
              })
          }
          setSubmitting(false)
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

              <div className="loading flex justify-center mt-14">
                {loading ? (
                  <PulseLoader color="#36d7b7" />
                ) : (
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-slate-600 rounded-md hover:bg-slate-700"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}
