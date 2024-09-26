import { NextPage } from 'next';
import Navbar from './Navbar';
import PaymentMethodsList from './PaymentMethodsList';
import TabSwitcher from './TabSwitcher';

const Payement: NextPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Dépôt/Retraits Switcher */}
      <div className="p-4">
        <TabSwitcher />
      </div>

      {/* Méthodes de paiement */}
      <div className="p-4">
        <PaymentMethodsList />
      </div>
    </div>
  );
};

export default Payement;
