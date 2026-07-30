"use client";

import { useMemo } from "react";
import { z } from "zod";
import { LoginType } from "../types/auth";

const emailSchema = z.string().email("Please enter a valid email address");
const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number starting with 6–9");

export function useDetectLoginType(value: string) {
  const trimmed = value.trim();

  const type: LoginType = useMemo(() => {
    if (!trimmed) return "unknown";
    if (trimmed.includes("@") || /[a-zA-Z]/.test(trimmed)) return "email";
    if (/^\d+$/.test(trimmed.replace(/\s+/g, ""))) return "phone";
    return "unknown";
  }, [trimmed]);

  const validationResult = useMemo(() => {
    if (!trimmed) {
      return { isValid: false, error: null, cleanedValue: "" };
    }

    if (type === "phone") {
      const cleanedPhone = trimmed.replace(/\D/g, "");
      const parseResult = phoneSchema.safeParse(cleanedPhone);
      return {
        isValid: parseResult.success,
        error: parseResult.success ? null : parseResult.error.issues[0]?.message || "Invalid mobile number",
        cleanedValue: cleanedPhone,
      };
    }

    if (type === "email") {
      const parseResult = emailSchema.safeParse(trimmed);
      return {
        isValid: parseResult.success,
        error: parseResult.success ? null : parseResult.error.issues[0]?.message || "Invalid email address",
        cleanedValue: trimmed.toLowerCase(),
      };
    }

    return {
      isValid: false,
      error: "Please enter a valid email address or 10-digit mobile number",
      cleanedValue: trimmed,
    };
  }, [trimmed, type]);

  return {
    type,
    isValid: validationResult.isValid,
    error: validationResult.error,
    cleanedValue: validationResult.cleanedValue,
  };
}
