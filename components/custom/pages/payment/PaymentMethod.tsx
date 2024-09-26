import { FC } from 'react';

interface PaymentMethodProps {
  name: string;
  imageSrc: string;
}

const PaymentMethod: FC<PaymentMethodProps> = ({ name, imageSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-md p-4 space-y-2">
      <img src={imageSrc} alt={name} className="w-12 h-12 object-contain" />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
};

export default PaymentMethod;
