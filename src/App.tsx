import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./features/auth/pages/LoginPage";
import CreateAccountPage from "./features/auth/pages/CreateAccountPage";
import ReviewAccountPage from "./features/auth/pages/ReviewAccountPage";
import DeliveryMethodsPage from "./features/auth/pages/DeliveryMethodsPage";
import DeliveryMethodSelectionPage from "./features/auth/pages/DeliveryMethodSelectionPage";
import PharmacySelectionSuccessPage from "./features/auth/pages/PharmacySelectionSuccessPage";
import OTPVerificationPage from "./features/auth/pages/OTPVerificationPage";
import RegisterDetailsPage from "./features/auth/pages/RegisterDetailsPage";
import ChangePasswordPage from "./features/auth/pages/ChangePasswordPage";
import PasswordSuccessPage from "./features/auth/pages/PasswordSuccessPage";
import AccountReadyPage from "./features/auth/pages/AccountReadyPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ForgotPasswordSentPage from "./features/auth/pages/ForgotPasswordSentPage";
import ProductSelectionPage from "./features/product/pages/ProductSelectionPage";
import MedicalQuestionnairePage from "./features/questionnaire/pages/MedicalQuestionnairePage";
import ImportantInformationPage from "./features/questionnaire/pages/ImportantInformationPage";
import ProfilePersonalInformationPage from "./features/profile/pages/ProfilePersonalInformationPage";
import ProfileAddressPage from "./features/profile/pages/ProfileAddressPage";
import ProfileHealthInformationPage from "./features/profile/pages/ProfileHealthInformationPage";
import ProfileQuestionnairePage from "./features/profile/pages/ProfileQuestionnairePage";
import ProfilePaymentMethodsPage from "./features/profile/pages/ProfilePaymentMethodsPage";
import ProfileOverviewPage from "./features/profile/pages/ProfileOverviewPage";
import UserDashboardLayout from "./features/profile/components/UserDashboardLayout";
import PharmacyOverviewPage from "./features/profile/pages/PharmacyOverviewPage";
import PharmacyOrderListPage from "./features/profile/pages/PharmacyOrderListPage";
import PharmacyInformationPage from "./features/profile/pages/PharmacyInformationPage";
import CreatePatient from "./features/auth/pages/CreatePatient";
import VerifyIdentityPage from "./features/auth/pages/VerifyIdentityPage";
import RecommendationPage from "./features/auth/pages/RecommendationPage";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import TeamPage from "./pages/TeamPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import AdminDashboardLayout from "./features/admin-dashboard/components/AdminDashboardLayout";
import AdminOverviewPage from "./features/admin-dashboard/pages/AdminOverviewPage";
import AdminRequestsPage from "./features/admin-dashboard/pages/AdminRequestsPage";
import AdminBatchPage from "./features/admin-dashboard/pages/AdminBatchPage";
import AdminInvoicesPage from "./features/admin-dashboard/pages/AdminInvoicesPage";
import AdminPatientsPage from "./features/admin-dashboard/pages/AdminPatientsPage";
import AdminDoctorsPage from "./features/admin-dashboard/pages/AdminDoctorsPage";
import AdminSettingsPage from "./features/admin-dashboard/pages/AdminSettingsPage";
import CreateRegister from "./features/auth/pages/CreateRegister";
import VerifyRegister from "./features/auth/pages/VerifyRegister";
import Prescription from "./pages/Prescription";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PharmacyDashboardLogin from "./features/auth/pages/PharmacyDashboardLogin";
import PharmacyPaymentBankSuccessPage from "./pages/PharmacyPaymentBankSuccessPage";
import PharmacyPaymentCardSuccessPage from "./pages/PharmacyPaymentCardSuccessPage";
import BookingConfirmed from "./components/BookingConfirmed/BookingConfirmed";
import PharmacySoldPerMonthPage from "./features/profile/pages/PharmacySoldPerMonthPage";

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
        // element: "Hello, World!",
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
        //
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
  return <RouterProvider router={router} />;
}
