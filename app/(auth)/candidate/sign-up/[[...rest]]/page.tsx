import { SignUp } from "@clerk/nextjs";

import { Container } from "@/app/components";

const SIgnupComponent = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
      <SignUp 
        path="/candidate/sign-up"
        forceRedirectUrl={"/onboarding/candidate"}
        signInFallbackRedirectUrl="/onboarding/candidate"
        unsafeMetadata={{ role: 'candidate' }}
        appearance={{
          elements: {
            rootBox: "shadow-lg border rounded-lg",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            card: "bg-white border border-gray-300 rounded-lg",
            footerText: "hidden",
            footer: "hidden",
          },
        }}
      />
      </div>
    </Container>
  );
};

export default SIgnupComponent;
