import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export type UserAccount = {
    _id?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    role?: string;
    phoneNumber?: string;
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

const toSignupRequest = (payload: SignupPayload) => {
    let firstName = payload.firstName;
    let lastName = payload.lastName;

    if (payload.fullName) {
        const parts = payload.fullName.trim().split(/\s+/);
        firstName = parts[0];
        lastName = parts.slice(1).join(" ") || parts[0];
    }

    if (!firstName?.trim() || !lastName?.trim()) {
        throw { message: "First name and last name are required." };
    }

    if (payload.confirmPassword !== undefined && payload.password !== payload.confirmPassword) {
        throw { message: "Passwords do not match." };
    }

    if (payload.terms === false) {
        throw { message: "You must accept the terms and conditions." };
    }

    return {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
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

export const me = async (): Promise<AuthMeResponse | undefined> => {
    const account = await api.get<UserAccount>(API_ROUTES.AUTH_ME);
    if (!account) return undefined;

    return { data: { account } };
};

export const logoutAllDevices = async () => {
    return api.post(API_ROUTES.AUTH_LOGOUT_ALL);
};
