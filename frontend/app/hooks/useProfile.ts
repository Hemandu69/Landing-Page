"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profileService";
import { UpdateProfilePayload } from "../types/profile";

export const PROFILE_QUERY_KEY = ["userProfile"];

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => profileService.getProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      profileService.updateProfile(payload),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile);
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileService.deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}
