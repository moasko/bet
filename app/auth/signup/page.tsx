import RegisterForm from "@/components/custom/forms/RegisterForm";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";

const RegisterPage = () => {
  return (
    <SimpleLayout
      showFooter={false}
      showFirstHeader={false}
      goBackLabel="INSCRIPTION"
    >
      <RegisterForm />
    </SimpleLayout>
  );
};

export default RegisterPage;
