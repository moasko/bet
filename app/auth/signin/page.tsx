"use client";
import LoginForm from "@/components/custom/forms/LoginForm";
import SimpleLayout from "@/components/layouts/app/SimpleLayout";

const PageConnexion = () => {
  return (
    <SimpleLayout
      showHeader={false}
      showFooter={false}
      showSecondHeader={false}
    >
      <LoginForm />
    </SimpleLayout>
  );
};

export default PageConnexion;
