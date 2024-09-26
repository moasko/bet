import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <div className="bg-red-600 text-white flex justify-between items-center px-4 py-2">
      <div className="text-lg font-bold">f</div>
      <div className="flex items-center space-x-4">
        <div className="bg-yellow-400 px-3 py-1 rounded-full text-black">0 XOF</div>
      </div>
    </div>
  );
};

export default Navbar;
