import { SendOtpResponse, VerifyOtpResponse, User } from "../../types/auth";

class MockAuthService {
  private mockDelay(ms: number = 800): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async sendOtp(identifier: string): Promise<SendOtpResponse> {
    await this.mockDelay(1000);

    // Simulated network error check (e.g. if identifier === 'fail@test.com')
    if (identifier.toLowerCase() === "fail@test.com") {
      throw new Error("Unable to send OTP. Please check your connection and try again.");
    }

    return {
      success: true,
      message: `OTP sent successfully to ${identifier}`,
      expiresInSeconds: 60,
    };
  }

  async resendOtp(identifier: string): Promise<SendOtpResponse> {
    await this.mockDelay(800);
    return {
      success: true,
      message: `A new 6-digit OTP has been resent to ${identifier}`,
      expiresInSeconds: 60,
    };
  }

  async verifyOtp(identifier: string, otp: string): Promise<VerifyOtpResponse> {
    await this.mockDelay(1200);

    // Mock expired check
    if (otp === "000000") {
      return {
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      };
    }

    // Reject wrong OTP if not 123456 or valid 6-digit
    if (otp !== "123456" && otp.length === 6 && otp.startsWith("9")) {
      return {
        success: false,
        message: "Incorrect OTP entered. Please verify and try again.",
      };
    }

    const isPhone = /^[6-9]\d{9}$/.test(identifier);

    const user: User = {
      id: `usr_${Date.now()}`,
      identifier,
      type: isPhone ? "phone" : "email",
      name: isPhone ? `Volunteer (${identifier.slice(-4)})` : identifier.split("@")[0],
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      message: "Authentication successful! Welcome to MY Bharat.",
      user,
      token: `mock_jwt_token_${Math.random().toString(36).substring(2)}`,
    };
  }
}

export const mockAuthService = new MockAuthService();
