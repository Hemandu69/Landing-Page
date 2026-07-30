"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDetectLoginType } from "../../hooks/useDetectLoginType";
import { useOtpTimer } from "../../hooks/useOtpTimer";
import { mockAuthService } from "../../services/auth/mockAuthService";

import { AuthInput } from "./AuthInput";
import { OtpInput } from "./OtpInput";
import { Countdown } from "./Countdown";
import { AuthButton } from "./AuthButton";
import { GoogleButton } from "./GoogleButton";
import { Toast, ToastMessage } from "./Toast";
import { RegistrationSteps, RegistrationStepsRef } from "./RegistrationSteps";

type Step = "INPUT" | "OTP" | "ONBOARDING";

export const LoginModal: React.FC = () => {
  const router = useRouter();
  const { isLoginModalOpen, closeLoginModal, setAuthenticatedUser, authMode, setAuthMode } = useAuth();

  const [step, setStep] = useState<Step>("INPUT");
  const [inputValue, setInputValue] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const [toast, setToast] = useState<ToastMessage | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const regStepsRef = useRef<RegistrationStepsRef>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const { type: detectedType, isValid, error: inputError, cleanedValue } = useDetectLoginType(inputValue);
  const { formattedTime, canResend, resetTimer } = useOtpTimer(60);

  useEffect(() => {
    if (isLoginModalOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setStep("INPUT");
      setInputValue("");
      setOtpValue("");
      setOtpError(null);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isLoginModalOpen]);

  // Keyboard Escape & Click Outside
  useEffect(() => {
    if (!isLoginModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLoginModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const navButton = document.getElementById("floating-nav-button");
      if (navButton && navButton.contains(e.target as Node)) return;

      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeLoginModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginModalOpen, closeLoginModal]);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({
      id: String(Date.now()),
      type,
      message,
    });
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    setOtpError(null);

    try {
      const res = await mockAuthService.sendOtp(cleanedValue);
      if (res.success) {
        setStep("OTP");
        resetTimer();
        showToast("success", res.message);
      }
    } catch (err: any) {
      showToast("error", err.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsResending(true);
    setOtpError(null);

    try {
      const res = await mockAuthService.resendOtp(cleanedValue);
      if (res.success) {
        resetTimer();
        showToast("success", res.message);
      }
    } catch (err: any) {
      showToast("error", "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otpValue.length !== 6) return;

    setIsLoading(true);
    setOtpError(null);

    try {
      const res = await mockAuthService.verifyOtp(cleanedValue, otpValue);
      if (res.success && res.user) {
        if (authMode === "register") {
          setStep("ONBOARDING");
          showToast("success", "OTP verified! Please complete your profile.");
        } else {
          setAuthenticatedUser(res.user);
          showToast("success", res.message);
          setTimeout(() => {
            closeLoginModal();
            router.push("/dashboard");
          }, 400);
        }
      } else {
        setOtpError(res.message);
        showToast("error", res.message);
      }
    } catch (err: any) {
      setOtpError("An unexpected error occurred during verification.");
      showToast("error", "Verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = (userData: {
    firstName: string;
    lastName: string;
    role: string;
    interests: string[];
  }) => {
    const newUser = {
      id: "user_" + Date.now(),
      identifier: cleanedValue,
      type: detectedType,
      name: `${userData.firstName} ${userData.lastName}`,
      createdAt: new Date().toISOString(),
    };
    setAuthenticatedUser(newUser);
    showToast("success", "Registration completed successfully!");
    setTimeout(() => {
      closeLoginModal();
      router.push("/dashboard");
    }, 400);
  };

  const handleGoogleClick = () => {
    showToast("info", "Google Sign-In is coming soon!");
  };

  if (!isLoginModalOpen) return null;

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs"
          />

          {/* Floating Navigation Pill Button (Top Left outside modal card) */}
          <div id="floating-nav-button" className="absolute top-10 left-10 z-20">
            {step === "INPUT" ? (
              <button
                type="button"
                onClick={closeLoginModal}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-[14px] font-bold text-[#1F2937] shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
              >
                <ArrowLeft size={18} />
                <span>Go to Home</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (step === "ONBOARDING") {
                    regStepsRef.current?.goBack();
                  } else {
                    setStep("INPUT");
                    setOtpValue("");
                    setOtpError(null);
                  }
                }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-[14px] font-bold text-[#1F2937] shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            )}
          </div>

          {/* Modal Card matching Figma */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative z-10 w-full overflow-hidden rounded-[32px] border border-gray-100/80 bg-[#F3F5FC] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.25)] transition-all duration-300 ${
              step === "ONBOARDING" ? "max-w-[560px]" : "max-w-[450px]"
            }`}
          >
            {/* Step 1: Identifier Input */}
            {step === "INPUT" && (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`step-input-${authMode}`}
                  initial={{ opacity: 0, x: authMode === "login" ? -32 : 32, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: authMode === "login" ? 32 : -32, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <h2
                      id="modal-title"
                      className="text-[26px] font-bold text-[#111827]"
                    >
                      {authMode === "login" ? "Log in to MY Bharat" : "Welcome to Mera Yuva Bharat!"}
                    </h2>
                    <p className="text-[14px] font-medium text-[#6B7280]">
                      {authMode === "login"
                        ? "Enter your mobile number or email to receive an OTP"
                        : "Enter or create an account in a few easy steps"}
                    </p>
                  </div>

                  <form onSubmit={handleSendOtp} className="flex flex-col gap-5 mt-2">
                    <AuthInput
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      detectedType={detectedType}
                      error={inputValue ? inputError : null}
                    />

                    <AuthButton
                      type="submit"
                      isLoading={isLoading}
                      disabled={!isValid || isLoading}
                    >
                      <span>{authMode === "login" ? "Log in with OTP" : "Send OTP"}</span>
                      <ArrowRight size={18} className="ml-1" />
                    </AuthButton>
                  </form>

                  {/* OR Divider */}
                  <div className="relative flex items-center justify-center my-0.5">
                    <span className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">
                      OR
                    </span>
                  </div>

                  {/* Google Button */}
                  <GoogleButton onClick={handleGoogleClick} />

                  {/* Footer Terms & Privacy */}
                  <div className="flex flex-col items-center text-center mt-2 gap-2">
                    <p className="text-[12px] text-[#6B7280] leading-[18px] max-w-[340px]">
                      By continuing, you agree to MY Bharat&apos;s{" "}
                      <a
                        href="https://mybharat.gov.in/pages/terms_of_use"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-semibold text-[#4B5563] hover:text-[#111827]"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://mybharat.gov.in/pages/policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-semibold text-[#4B5563] hover:text-[#111827]"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>

                    {authMode === "login" ? (
                      <p className="text-[13px] text-[#6B7280] font-medium mt-1">
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode("register");
                            setInputValue("");
                          }}
                          className="font-bold text-[#111827] hover:underline cursor-pointer"
                        >
                          Register
                        </button>
                      </p>
                    ) : (
                      <p className="text-[13px] text-[#6B7280] font-medium mt-1">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode("login");
                            setInputValue("");
                          }}
                          className="font-bold text-[#111827] hover:underline cursor-pointer"
                        >
                          Log in
                        </button>
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Step 2: OTP Verification */}
            {step === "OTP" && (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-[26px] font-bold text-[#111827]">
                    Enter OTP sent via {detectedType === "email" ? "Email" : "SMS"}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#6B7280]">
                    <span>We&apos;ve sent OTP to {cleanedValue}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("INPUT");
                        setOtpValue("");
                        setOtpError(null);
                      }}
                      className="flex items-center gap-1 text-[#6355DC] font-bold hover:underline cursor-pointer ml-1"
                    >
                      <span>Edit</span>
                      <Pencil size={13} />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-2 mt-2">
                  <label className="text-[13px] font-bold text-[#374151]">
                    OTP
                  </label>

                  <OtpInput
                    value={otpValue}
                    onChange={setOtpValue}
                    length={6}
                    hasError={!!otpError}
                  />

                  <Countdown
                    formattedTime={formattedTime}
                    canResend={canResend}
                    onResend={handleResendOtp}
                    isResending={isResending}
                  />

                  {otpError && (
                    <p className="text-[12px] font-medium text-[#EF4444] text-center mt-1">
                      {otpError}
                    </p>
                  )}

                  <AuthButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={otpValue.length !== 6 || isLoading}
                    className="mt-6"
                  >
                    Verify Now
                  </AuthButton>
                </form>
              </motion.div>
            )}

            {/* Step 3: Registration Onboarding Flow (Triggered after OTP in Register mode) */}
            {step === "ONBOARDING" && (
              <motion.div
                key="step-onboarding"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <RegistrationSteps
                  ref={regStepsRef}
                  onComplete={handleOnboardingComplete}
                  onBackToOtp={() => setStep("OTP")}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};
