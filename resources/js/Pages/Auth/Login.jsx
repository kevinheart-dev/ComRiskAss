import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
            onError: (err) => {
                console.error("Login error details:", err);

                if (err.email) {
                    toast.error(`Email Error: ${err.email}`);
                } else if (err.password) {
                    toast.error(`Password Error: ${err.password}`);
                } else if (err.message) {
                    toast.error(`Login Failed: ${err.message}`);
                } else {
                    toast.error(
                        "Login failed. Please check your credentials and try again.",
                    );
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="w-full">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
                        <span className="text-xl text-white">🔐</span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Sign in to securely access your account and continue
                        managing your records.
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-sm">
                        {status}
                    </div>
                )}

                {/* Form Card */}
                <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.25)] backdrop-blur-sm">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="text-sm font-semibold text-gray-700"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 shadow-sm transition duration-200 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="you@example.com"
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-sm font-semibold text-gray-700"
                                />

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm font-medium text-indigo-600 transition duration-200 hover:text-indigo-800"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 shadow-sm transition duration-200 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter your password"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span>Remember me</span>
                            </label>
                        </div>

                        <PrimaryButton
                            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? "Signing in..." : "Log in"}
                        </PrimaryButton>
                    </form>

                    {/* Bottom Detail */}
                    <div className="mt-6 border-t border-gray-100 pt-4 text-center">
                        <p className="text-xs leading-5 text-gray-400">
                            Protected access. Your credentials are securely
                            processed.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
