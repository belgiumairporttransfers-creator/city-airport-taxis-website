import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export const DRIVER_SHIFT_TYPES = ["day", "night", "both"] as const;
export type DriverShiftType = (typeof DRIVER_SHIFT_TYPES)[number];

export const DRIVER_DOCUMENT_FIELDS = [
    "chauffeurPassFront",
    "chauffeurPassBack",
    "kiwaPermit",
    "driverLicenseFront",
    "driverLicenseBack",
    "carCard",
    "carFrontView",
    "carBackView",
    "carLeftView",
    "carRightView",
    "carInsideView",
    "licensePlateView",
    "taxiInsurancePolicy",
    "kvkUittreksel",
    "bankCardCopy",
] as const;

export type DriverDocumentField = (typeof DRIVER_DOCUMENT_FIELDS)[number];
export type DriverDocuments = Record<DriverDocumentField, string>;

export type SubmitDriverApplicationPayload = {
    operatingCountry: string;
    operatingCity: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    homeAddress: string;
    carType: string;
    carColor: string;
    licensePlate: string;
    carYearModel: string;
    yearsOfExperience: number;
    shiftType: DriverShiftType;
    availableFrom: string;
    availableTo: string;
    profilePhoto?: string;
    /** Bundled mandatory documents & vehicle photos (single multi-upload field). */
    documentUploads: string[];
    /** Legacy per-field documents — kept optional for admin/manual flows. */
    documents?: DriverDocuments;
};

export type SubmitDriverApplicationResponse = {
    applicationNumber: string;
    status: string;
};

export const submitDriverApplication = (payload: SubmitDriverApplicationPayload) => {
    return api.post<SubmitDriverApplicationResponse>(API_ROUTES.DRIVERS_APPLY, payload);
};
