import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export type UserAccount = {
    _id?: string;
    fullName?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    phoneNumber?: string;
    avatar?: string;
    companyName?: string;
    businessProfile?: string;
    isVerified?: boolean;
    rideDiscounts?: {
        oneWay?: number;
        returnTrip?: number;
    };
};

export type AuthMeResponse = {
    data: {
        account: UserAccount;
    };
};

export type LoginPayload = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export type SignupPayload = {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    phoneNumber?: string;
    password: string;
    confirmPassword?: string;
    terms?: boolean;
    companyName?: string;
    agencyName?: string;
    businessProfile?: string;
};

export type ForgotPasswordPayload = {
    email: string;
    scope?: string;
};

export type ResetPasswordPayload = {
    token: string;
    password: string;
    scope?: string;
};

export type VerifyEmailPayload = {
    token: string;
    email?: string;
};

export type ResendVerificationPayload = {
    email: string;
};

const toSignupRequest = (payload: SignupPayload) => {
    const fullName = (payload.fullName || "").trim();
    let firstName = (payload.firstName || "").trim();
    let lastName = (payload.lastName || "").trim();

    if (fullName) {
        const parts = fullName.split(/\s+/);
        firstName = parts[0] || fullName;
        lastName = parts.slice(1).join(" ") || "";
    }

    const resolvedFullName =
        fullName ||
        (firstName && lastName && firstName !== lastName
            ? `${firstName} ${lastName}`.trim()
            : firstName || lastName);

    if (!resolvedFullName && !firstName) {
        throw { message: "Full name is required." };
    }

    if (payload.confirmPassword !== undefined && payload.password !== payload.confirmPassword) {
        throw { message: "Passwords do not match." };
    }

    if (payload.terms === false) {
        throw { message: "You must accept the terms and conditions." };
    }

    return {
        fullName: resolvedFullName,
        name: resolvedFullName,
        firstName: firstName || resolvedFullName,
        lastName: lastName,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phoneNumber || payload.phone || "",
        companyName: payload.companyName || payload.agencyName,
        businessProfile: payload.businessProfile,
    };
};

export const signup = async (payload: SignupPayload) => {
    return api.post(API_ROUTES.AUTH_REGISTER, toSignupRequest(payload));
};

export const login = async (payload: LoginPayload) => {
    return api.post<UserAccount>(API_ROUTES.AUTH_LOGIN, payload);
};

export const logout = async () => {
    return api.post(API_ROUTES.AUTH_LOGOUT);
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
    const { email } = payload;
    return api.post(API_ROUTES.AUTH_FORGOT_PASSWORD, { email });
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
    const { token, password } = payload;
    return api.post(API_ROUTES.AUTH_RESET_PASSWORD, { token, password });
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
    return api.post<UserAccount>(API_ROUTES.AUTH_VERIFY_EMAIL, payload);
};

export const resendVerification = async (payload: ResendVerificationPayload) => {
    return api.post(API_ROUTES.AUTH_RESEND_VERIFICATION, payload);
};

export const me = async (): Promise<AuthMeResponse | undefined> => {
    const account = await api.get<UserAccount>(API_ROUTES.AUTH_ME);
    if (!account) return undefined;

    return { data: { account } };
};

export const logoutAllDevices = async () => {
    return api.post(API_ROUTES.AUTH_LOGOUT_ALL);
};
