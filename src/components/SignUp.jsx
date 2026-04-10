import React, { useState } from 'react'
import { authservice } from '../Appwrite/Auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authslice'
import Button from './Button.jsx'
import Input from './Input.jsx'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Logo from './Logo.jsx'
import { LucideLogIn } from 'lucide-react'

function Signup() {
  const navigate = useNavigate()
  const [error, seterror] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const CreateAcc = async (data) => {
    seterror("")

    try {
      const useraccount = await authservice.createAccount(data)

      if (useraccount) {
        const userdata = await authservice.getaccount()

        if (userdata) {
          dispatch(login(userdata))
          navigate("/")
        }
      }
    } catch (error) {
      seterror(error.message)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-10">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-80 w-80 rounded-full bg-zinc-700/20 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] h-96 w-96 rounded-full bg-zinc-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(161,161,170,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(82,82,91,0.12),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10">
       
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent" />

        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-800/70 p-4 shadow-[0_0_20px_rgba(161,161,170,0.08)]">
            <span className="inline-flex items-center justify-center">
              {/* <Logo /> */}
              <LucideLogIn className="mr-2 h-6 w-6 text-zinc-300" />
            </span>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold leading-tight text-zinc-100">
          Sign up to create account
        </h2>

        <p className="mt-3 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-zinc-300 transition-all duration-200 hover:text-zinc-100 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(CreateAcc)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full rounded-2xl border border-zinc-700 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800 py-3 text-base font-semibold text-zinc-100 shadow-[0_0_25px_rgba(161,161,170,0.15)] transition-all duration-300 hover:-translate-y-1 hover:from-zinc-600 hover:via-zinc-500 hover:to-zinc-700 hover:shadow-[0_0_40px_rgba(161,161,170,0.22)]"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup