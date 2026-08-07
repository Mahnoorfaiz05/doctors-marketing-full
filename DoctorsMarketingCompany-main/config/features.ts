const enabled = (value: string | undefined) => value === "true";
export const features = {
  patientDirectory: enabled(process.env.NEXT_PUBLIC_FEATURE_PATIENT_DIRECTORY),
  publicSignup: enabled(process.env.NEXT_PUBLIC_FEATURE_PUBLIC_SIGNUP),
  aiBackend: enabled(process.env.NEXT_PUBLIC_FEATURE_AI_BACKEND),
  roiReportEmail: enabled(process.env.NEXT_PUBLIC_FEATURE_ROI_REPORT_EMAIL),
  resourceGating: enabled(process.env.NEXT_PUBLIC_FEATURE_RESOURCE_GATING),
  payments: enabled(process.env.NEXT_PUBLIC_FEATURE_PAYMENTS),
  portal: process.env.NEXT_PUBLIC_FEATURE_PORTAL !== "false",
} as const;

