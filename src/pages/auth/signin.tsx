import PublicLayout from "@/components/layout/public";
import SignIn from "@/components/auth/signin";

const Connexion = () => {
  return (
    <PublicLayout title="Connexion">
      <SignIn />
    </PublicLayout>
  );
};

export default Connexion;
