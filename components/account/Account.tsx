"use client";

import { auth, db } from "@/model/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export default function Account() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const createAccount = (
    email: string,
    password: string,
    phone: string,
    name: string
  ) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const docRef = await setDoc(doc(db, "patients", user.uid), {
          name: name,
          image: "",
          email: email,
          phone: phone,
          uuid: user.uid,
        })
          .then(() => {
            toast.success("Account created successfully");
            setLoading(false);
          })
          .catch((err) => {
            toast.success(err.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  return (
    <div className="bg-grey-lighter flex flex-col">
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-xl text-center">Create Account</h1>
          <input
            type="text"
            className="input-border text-base text-slate-800"
            name="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />

          <input
            type="text"
            className="input-border text-base text-slate-800"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="text"
            className="input-border text-base text-slate-800"
            name="phone"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          <div className="flex items-center border mb-4 border-gray-300 rounded-md p-0.5 input-password">
            <input
              id="Password"
              type={show ? "text" : "password"}
              className="flex-1 w-full h-full px-4 py-2 rounded-md focus:outline-none text-base text-slate-800"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div
              className="p-1 mx-2 rounded-md show-hide-password hover:bg-slate-200"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <Eye /> : <EyeOff />}
            </div>
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
            className="border-0 text-white text-base mt-20 bg-slate-600 hover:bg-slate-700 w-full p-2.5 rounded-md outline-none"
            onClick={() => {
              createAccount(email, password, phone, name);
            }}
          >
            Create Accout
          </button>
        </div>
      </div>
    </div>
  );
}
