# TODO: Integrate Backend Error Handling into Frontend

- [x] Plan confirmed with user
- [x] Modify `frontend/app/services/auth/authService.ts` — attach HTTP status code to errors thrown by `requestOTP`
- [x] Modify `frontend/app/components/auth/LoginModal.tsx` — add `backendError` state and reset on modal open
- [x] Modify `frontend/app/components/auth/LoginModal.tsx` — update `handleSendOtp` catch: HTTP 400 → show backend message under input; otherwise → generic network toast
- [x] Modify `frontend/app/components/auth/LoginModal.tsx` — clear backend error on typing and pass combined error to `AuthInput`
- [x] Verify only the two allowed files were changed (authService.ts and LoginModal.tsx)
