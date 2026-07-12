import { OnBoardingRepository } from "../repositories/onBoardingRepository";

export async function resolvePostLoginPath(userId: number): Promise<string> {
  const profile = await OnBoardingRepository.findByUserId(userId);
  return profile ? "/" : "/onBoarding";
}
