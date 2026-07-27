import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="flex justify-center py-16 text-sm text-gray-500">
        Sign-up isn&apos;t configured yet — Clerk keys are pending (Phase 7).
      </div>
    );
  }

  return (
    <div className="flex justify-center py-16">
      <SignUp />
    </div>
  );
}
