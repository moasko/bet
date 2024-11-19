"use client";
import RegisterForm from "@/components/custom/forms/RegisterForm";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";

const RegisterPage = () => {
  return (
    <SimpleLayout showFirstHeader={false} goBackLabel="INSCRIPTION">
      <RegisterForm />
    </SimpleLayout>
  );
};

export default RegisterPage;
