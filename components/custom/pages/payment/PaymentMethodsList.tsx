"use client";

import { FC } from 'react';
import PaymentMethod from './PaymentMethod';

const recommendedMethods = [
  { name: 'Orange', imageSrc: '/images/orange.png' },
  { name: 'MTN', imageSrc: '/images/mtn.png' },
  { name: 'Wave', imageSrc: '/images/wave.png' },
  { name: 'LigidCash', imageSrc: '/images/ligidcash.png' },
  { name: 'Moov Africa', imageSrc: '/images/moov.png' },
];

const electronicWallets = [
  { name: 'Astropay', imageSrc: '/images/astropay.png' },
  { name: 'Perfect Money', imageSrc: '/images/perfectmoney.png' },
  { name: 'Jeton Wallet', imageSrc: '/images/jeton.png' },
  { name: 'Sticpay', imageSrc: '/images/sticpay.png' },
];

const PaymentMethodsList: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-center text-lg font-bold text-gray-700 mb-4">MÉTHODES RECOMMANDÉES</h3>
        <div className="grid grid-cols-2 gap-4">
          {recommendedMethods.map((method) => (
            <PaymentMethod key={method.name} name={method.name} imageSrc={method.imageSrc} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-center text-lg font-bold text-gray-700 mb-4">PORTEFEUILLES ÉLECTRONIQUES</h3>
        <div className="grid grid-cols-2 gap-4">
          {electronicWallets.map((method) => (
            <PaymentMethod key={method.name} name={method.name} imageSrc={method.imageSrc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsList;
