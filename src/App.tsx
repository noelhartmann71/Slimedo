import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// Eager-loaded: public pages + layout shells (lazy layouts cause double-waterfall)
import LandingPage from "./pages/LandingPage";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import TeamPage from "./pages/TeamPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import Prescription from "./pages/Prescription";
import UserDashboardLayout from "./features/profile/components/UserDashboardLayout";
import AdminDashboardLayout from "./features/admin-dashboard/components/AdminDashboardLayout";

// Auth pages — lazy (only needed after the user clicks CTA)
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const CreateAccountPage = lazy(() => import("./features/auth/pages/CreateAccountPage"));
const ReviewAccountPage = lazy(() => import("./features/auth/pages/ReviewAccountPage"));
const DeliveryMethodsPage = lazy(() => import("./features/auth/pages/DeliveryMethodsPage"));
const DeliveryMethodSelectionPage = lazy(() => import("./features/auth/pages/DeliveryMethodSelectionPage"));
const PharmacySelectionSuccessPage = lazy(() => import("./features/auth/pages/PharmacySelectionSuccessPage"));
const OTPVerificationPage = lazy(() => import("./features/auth/pages/OTPVerificationPage"));
const RegisterDetailsPage = lazy(() => import("./features/auth/pages/RegisterDetailsPage"));
const ChangePasswordPage = lazy(() => import("./features/auth/pages/ChangePasswordPage"));
const PasswordSuccessPage = lazy(() => import("./features/auth/pages/PasswordSuccessPage"));
const AccountReadyPage = lazy(() => import("./features/auth/pages/AccountReadyPage"));
const ForgotPasswordPage = lazy(() => import("./features/auth/pages/ForgotPasswordPage"));
const ForgotPasswordSentPage = lazy(() => import("./features/auth/pages/ForgotPasswordSentPage"));
const CreateRegister = lazy(() => import("./features/auth/pages/CreateRegister"));
const VerifyRegister = lazy(() => import("./features/auth/pages/VerifyRegister"));
const CreatePatient = lazy(() => import("./features/auth/pages/CreatePatient"));
const VerifyIdentityPage = lazy(() => import("./features/auth/pages/VerifyIdentityPage"));
const RecommendationPage = lazy(() => import("./features/auth/pages/RecommendationPage"));
const PharmacyDashboardLogin = lazy(() => import("./features/auth/pages/PharmacyDashboardLogin"));

// Product / payment
const ProductSelectionPage = lazy(() => import("./features/product/pages/ProductSelectionPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const PharmacyPaymentBankSuccessPage = lazy(() => import("./pages/PharmacyPaymentBankSuccessPage"));
const PharmacyPaymentCardSuccessPage = lazy(() => import("./pages/PharmacyPaymentCardSuccessPage"));
const BookingConfirmed = lazy(() => import("./components/BookingConfirmed/BookingConfirmed"));

// Questionnaire
const MedicalQuestionnairePage = lazy(() => import("./features/questionnaire/pages/MedicalQuestionnairePage"));
const ImportantInformationPage = lazy(() => import("./features/questionnaire/pages/ImportantInformationPage"));

// Patient profile dashboard
const ProfilePersonalInformationPage = lazy(() => import("./features/profile/pages/ProfilePersonalInformationPage"));
const ProfileAddressPage = lazy(() => import("./features/profile/pages/ProfileAddressPage"));
const ProfileHealthInformationPage = lazy(() => import("./features/profile/pages/ProfileHealthInformationPage"));
const ProfileQuestionnairePage = lazy(() => import("./features/profile/pages/ProfileQuestionnairePage"));
const ProfilePaymentMethodsPage = lazy(() => import("./features/profile/pages/ProfilePaymentMethodsPage"));
const ProfileOverviewPage = lazy(() => import("./features/profile/pages/ProfileOverviewPage"));
// UserDashboardLayout is eager — layout shell, lazy would cause double-waterfall before children render
const PharmacyOverviewPage = lazy(() => import("./features/profile/pages/PharmacyOverviewPage"));
const PharmacyOrderListPage = lazy(() => import("./features/profile/pages/PharmacyOrderListPage"));
const PharmacyInformationPage = lazy(() => import("./features/profile/pages/PharmacyInformationPage"));
const PharmacySoldPerMonthPage = lazy(() => import("./features/profile/pages/PharmacySoldPerMonthPage"));

// Admin dashboard — AdminDashboardLayout is eager for the same reason as UserDashboardLayout
const AdminOverviewPage = lazy(() => import("./features/admin-dashboard/pages/AdminOverviewPage"));
const AdminRequestsPage = lazy(() => import("./features/admin-dashboard/pages/AdminRequestsPage"));
const AdminBatchPage = lazy(() => import("./features/admin-dashboard/pages/AdminBatchPage"));
const AdminInvoicesPage = lazy(() => import("./features/admin-dashboard/pages/AdminInvoicesPage"));
const AdminPatientsPage = lazy(() => import("./features/admin-dashboard/pages/AdminPatientsPage"));
const AdminDoctorsPage = lazy(() => import("./features/admin-dashboard/pages/AdminDoctorsPage"));
const AdminSettingsPage = lazy(() => import("./features/admin-dashboard/pages/AdminSettingsPage"));

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/blog", element: <Blog /> },
      { path: "/team", element: <TeamPage /> },
      { path: "/prescriptions", element: <Prescription /> },
      { path: "/privacy", element: <PrivacyPolicyPage /> },
      { path: "/terms", element: <TermsConditionsPage /> },
      { path: "/blog/:id", element: <BlogDetails /> },
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/register", element: <CreateAccountPage /> },
      { path: "/auth/review", element: <ReviewAccountPage /> },
      {
        path: "/pharmacy-dashboard/login",
        element: <PharmacyDashboardLogin />,
      },
      {
        path: "/auth/delivery-methods",
        element: <DeliveryMethodsPage />,
      },
      {
        path: "/auth/delivery-method-selection",
        element: <DeliveryMethodSelectionPage />,
      },
      {
        path: "/auth/pharmacy-success",
        element: <PharmacySelectionSuccessPage />,
      },
      { path: "/auth/verify", element: <OTPVerificationPage /> },
      { path: "/auth/create-register", element: <CreateRegister /> },
      { path: "/auth/verify-register", element: <VerifyRegister /> },
      {
        path: "/auth/register-details",
        element: <RegisterDetailsPage />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/auth/forgot-password-sent",
        element: <ForgotPasswordSentPage />,
      },
      {
        path: "/auth/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/auth/password-success",
        element: <PasswordSuccessPage />,
      },
      { path: "/auth/create-patient", element: <CreatePatient /> },
      { path: "/auth/account-ready", element: <AccountReadyPage /> },
      { path: "/auth/verify-identity", element: <VerifyIdentityPage /> },
      { path: "/auth/recommendation", element: <RecommendationPage /> },
      { path: "/product/select", element: <ProductSelectionPage /> },
      { path: "/payment-success", element: <PaymentSuccessPage /> },
      {
        path: "/pharmacy-payment-card-success",
        element: <PharmacyPaymentCardSuccessPage />,
      },
      {
        path: "/pharmacy-payment-bank-success",
        element: <PharmacyPaymentBankSuccessPage />,
      },
      {
        path: "/questionnaire/medical",
        element: <MedicalQuestionnairePage />,
      },
      {
        path: "/questionnaire/info",
        element: <ImportantInformationPage />,
      },
      {
        path: "/dashboard",
        element: <Navigate to="/patient/profile/overview" replace />,
      },
      {
        path: "/patient/profile",
        element: <Navigate to="/patient/profile/overview" replace />,
      },
      {
        path: "/patient/profile/overview",
        element: <ProfileOverviewPage />,
      },
      {
        path: "/patient/profile/personal-information",
        element: <ProfilePersonalInformationPage />,
      },
      {
        path: "/patient/profile/address",
        element: <ProfileAddressPage />,
      },
      {
        path: "/patient/profile/health-information",
        element: <ProfileHealthInformationPage />,
      },
      {
        path: "/patient/profile/questionnaire",
        element: <ProfileQuestionnairePage />,
      },
      {
        path: "/patient/profile/payment-methods",
        element: <ProfilePaymentMethodsPage />,
      },
      {
        path: "/patient/booking-confirmed",
        element: <BookingConfirmed />,
      },
      {
        path: "/pharmacy-dashboard",
        element: <UserDashboardLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <PharmacyOverviewPage /> },
          { path: "order-list", element: <PharmacyOrderListPage /> },
          { path: "information", element: <PharmacyInformationPage /> },
          { path: "sold-per-month", element: <PharmacySoldPerMonthPage /> },
        ],
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboardLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <AdminOverviewPage /> },
          {
            path: "requests",
            element: <AdminRequestsPage />,
          },
          { path: "batch", element: <AdminBatchPage /> },
          { path: "invoices", element: <AdminInvoicesPage /> },
          { path: "patients", element: <AdminPatientsPage /> },
          { path: "doctors", element: <AdminDoctorsPage /> },
          { path: "settings", element: <AdminSettingsPage /> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
