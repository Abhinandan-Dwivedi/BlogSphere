import React, { useState } from 'react';
import { authservice } from '../Appwrite/Auth';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { Link, useNavigation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as loginstate } from '../store/authslice';
import { LogInIcon } from 'lucide-react';

function Login() {
    const { register, handleSubmit } = useForm();
    const [error, seterror] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const login = async (data) => {
        console.log(data);
        seterror("");

        try {
            const session = await authservice.login(data);

            if (session) {
                const userdata = await authservice.getaccount();

                if (userdata) {
                    dispatch(loginstate(userdata));
                }

                navigation("/");
            }
        } catch (error) {
            seterror(error.message);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-900 px-4 py-4">
       
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-zinc-700/20 blur-3xl" />
                <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 rounded-full bg-zinc-600/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(161,161,170,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(82,82,91,0.15),transparent_40%)]" />
            </div>

            <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-10">
                {/* Top Border Glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />

                <div className="mb-4 flex justify-center">
                    <div className="rounded-2xl border border-zinc-700 bg-zinc-800/60 px-6 py-4 shadow-[0_0_25px_rgba(161,161,170,0.08)] backdrop-blur-xl">
                        <span className="inline-block w-full max-w-[100px] text-center text-lg font-bold tracking-wide text-zinc-100">
                            <LogInIcon className="inline-block mr-2 mb-1" />
                            Sign In
                        </span>
                    </div>
                </div>

                <h2 className="text-center text-3xl font-bold leading-tight text-zinc-100">
                    Sign in to your account
                </h2>

                <p className="mt-3 text-center text-sm text-zinc-400">
                    Welcome back. Continue your experience.
                </p>

                <p className="mt-2 text-center text-base text-zinc-500">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-zinc-300 transition-all duration-200 hover:text-zinc-100 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 transition-all duration-300 focus-within:border-zinc-500 focus-within:shadow-[0_0_20px_rgba(161,161,170,0.12)]">
                            <Input
                                label="email"
                                type="email"
                                placeholder="Enter your mail id"
                                className="border-none bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:ring-0"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    },
                                })}
                            />
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 transition-all duration-300 focus-within:border-zinc-500 focus-within:shadow-[0_0_20px_rgba(161,161,170,0.12)]">
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                className="border-none bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:ring-0"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>

                        <Button
                            type="Submit"
                            className="w-full rounded-2xl border border-zinc-700 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800 py-3 text-base font-semibold text-zinc-100 shadow-[0_0_25px_rgba(113,113,122,0.25)] transition-all duration-300 hover:-translate-y-1 hover:from-zinc-600 hover:via-zinc-500 hover:to-zinc-700 hover:shadow-[0_0_40px_rgba(161,161,170,0.25)]"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;