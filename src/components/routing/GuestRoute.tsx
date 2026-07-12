import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { OnBoardingRepository } from "../../repositories/onBoardingRepository";
import { getCurrentUserId } from "../../utils/currentUser";

export const GuestRoute = () => {
  const userId = getCurrentUserId();
  const [ready, setReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (!userId) {
      setReady(true);
      return;
    }

    OnBoardingRepository.findByUserId(userId).then((profile) => {
      setHasProfile(Boolean(profile));
      setReady(true);
    });
  }, [userId]);

  if (userId && !ready) {
    return null;
  }

  if (userId && hasProfile) {
    return <Navigate to="/" replace />;
  }

  if (userId && ready) {
    return <Navigate to="/onBoarding" replace />;
  }

  return <Outlet />;
};
