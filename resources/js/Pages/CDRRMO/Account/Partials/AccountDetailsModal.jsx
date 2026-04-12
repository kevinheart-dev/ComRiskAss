import { MoveRight, Landmark, ShieldCheck, KeyRound } from "lucide-react";

import SidebarModal from "@/components/SidebarModal";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import DropdownInputField from "@/components/DropdownInputField";
import InputError from "@/components/InputError";
import PasswordValidationChecklist from "@/components/PasswordValidationChecklist";
import BarangayEmailValidation from "@/components/BarangayEmailValidation";

export default function AccountDetailsModal({
    isOpen,
    onClose,
    modalState,
    accountDetails,
    data,
    setData,
    errors,
    barangaysList,
    handleBarangayChange,
    handleAddAccountSubmit,
    handleEditAccountSubmit,
    passwordError,
}) {
    const isAddMode = modalState === "add";
    const isEditMode = modalState === "edit";
    const isFormMode = isAddMode || isEditMode;

    const modalTitle = isAddMode
        ? accountDetails
            ? "Edit Account Details"
            : "Add Account Details"
        : "View Resident Details";

    const formTitle = isAddMode
        ? "Create Barangay Officer Account"
        : "Edit Barangay Officer Account";

    const formDescription = isAddMode
        ? "Set up a new barangay officer account by selecting the barangay and providing login credentials."
        : "Update the account information. Password changes are handled separately for added security.";

    return (
        <SidebarModal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            {isFormMode && (
                <div className="w-full">
                    <form
                        onSubmit={
                            isAddMode
                                ? handleAddAccountSubmit
                                : handleEditAccountSubmit
                        }
                        className="space-y-6"
                    >
                        {/* Top Header */}
                        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                                        {formTitle}
                                    </h3>
                                    <p className="max-w-2xl text-sm leading-6 text-slate-600">
                                        {formDescription}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Barangay Section */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                                    <Landmark className="h-5 w-5" />
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        Barangay Assignment
                                    </h4>
                                    <p className="text-sm leading-6 text-slate-600">
                                        Choose the barangay connected to this
                                        officer account. This field is locked
                                        once the account has already been
                                        created.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <DropdownInputField
                                    label="Barangay"
                                    name="barangay_name"
                                    value={data.barangay_name || ""}
                                    placeholder="Select a barangay"
                                    items={barangaysList}
                                    disabled={isEditMode}
                                    onChange={handleBarangayChange}
                                    className="w-full"
                                />
                                <InputError
                                    message={errors.barangay_id}
                                    className="text-red-600"
                                />
                            </div>
                        </section>

                        {/* Credentials Section */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                                    <KeyRound className="h-5 w-5" />
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        Account Credentials
                                    </h4>
                                    <p className="text-sm leading-6 text-slate-600">
                                        Enter the login details for the officer
                                        account. These credentials will be used
                                        for authentication and account-related
                                        notifications.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <InputField
                                    label="Username"
                                    name="username"
                                    value={data.username || ""}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                />

                                <BarangayEmailValidation
                                    data={data}
                                    setData={setData}
                                    originalEmail={data.originalEmail ?? null}
                                    barangayEmail={data.barangay_email ?? null}
                                />
                            </div>

                            {isAddMode && (
                                <div className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <div>
                                        <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                                            Password Setup
                                        </h5>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            Create a secure password for the new
                                            account. Make sure both password
                                            fields match and satisfy the
                                            required rules below.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <InputField
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={data.password || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        <InputField
                                            label="Confirm Password"
                                            name="password_confirmation"
                                            type="password"
                                            value={
                                                data.password_confirmation || ""
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <PasswordValidationChecklist data={data} />
                                </div>
                            )}

                            {isEditMode && (
                                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                    You are editing an existing account.
                                    Password updates are not available here. Use
                                    the reset password action instead.
                                </div>
                            )}
                        </section>

                        {/* Footer Actions */}
                        <div className="flex justify-end border-t border-slate-200 pt-4">
                            <Button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-800"
                                disabled={
                                    isAddMode &&
                                    (!!passwordError ||
                                        !data.password ||
                                        !data.password_confirmation)
                                }
                            >
                                {isAddMode
                                    ? "Create Account"
                                    : "Update Account"}
                                <MoveRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </SidebarModal>
    );
}
