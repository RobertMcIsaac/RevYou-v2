import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";
//Wraps protected pages - pass in page/ component that requires authentication for access
  // e.g. <ProtectedRoute component={<PageFileName>} />

// Layouts
import TopBarLayout from "./layouts/TopBarLayout.jsx";
import NoTopBarLayout from "./layouts/NoTopBarLayout.jsx";

// Pages
import NotFound from "./pages/NotFound.jsx";
import CreateCampaign from "./pages/create-campaign/CreateCampaign.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import DetailsPage from "./pages/details/DetailsPage.jsx";
import UserAccount from "./pages/user-account/UserAccount.jsx";
import FeedbackFormPage from "./pages/feedback-form/FeedBackFormPage.jsx";
import ShareableProfilePage from "./pages/shareable-profile/ShareableProfilePage.jsx";
import FeedbackLandingPage from "./pages/landing-page/FeedbackLandingPage.jsx";

// Dev pages
import SyncUserTestPage from "./pages/dev/SyncUser.jsx";

const router = createBrowserRouter([
  {
    path: "/", 
    element: (
      <NoTopBarLayout>
        <FeedbackLandingPage />
      </NoTopBarLayout>
    ),
  },
  {
    path: "/feedback/:linkUuid",
    element: (
      <NoTopBarLayout>
        <FeedbackFormPage />
      </NoTopBarLayout>
    ),
  },
  {
    path: "/shareable-profile/:userId",
    element: (
      <NoTopBarLayout>
        <ShareableProfilePage />
      </NoTopBarLayout>
    ),
  },
  {
    path: "/create-campaign",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={CreateCampaign} />
      </TopBarLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={DashboardPage} />
      </TopBarLayout>
    ),
  },
  {
    path: "/details/:campaignId",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={DetailsPage} />
      </TopBarLayout>
    ),
  },
  {
    path: "/me",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={UserAccount} />
      </TopBarLayout>
    ),
  },
  {
    // DEV PAGE
    path: "/sync-test",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={SyncUserTestPage} />
      </TopBarLayout>
    ),
  },
  {
    path: "*",
    element: (
      <NoTopBarLayout>
        <NotFound />
      </NoTopBarLayout>
    ),
  },
]);

export default router;