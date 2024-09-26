"use client";

import { FC, useState } from 'react';

const TabSwitcher: FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <div className="flex justify-around border-b-2">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`w-1/2 text-center py-2 ${activeTab === 'deposit' ? 'text-yellow-500 border-b-4 border-yellow-500' : 'text-gray-600'}`}
        >
          Dépôt
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`w-1/2 text-center py-2 ${activeTab === 'withdraw' ? 'text-yellow-500 border-b-4 border-yellow-500' : 'text-gray-600'}`}
        >
          Retraits
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'deposit' ? (
          <p>Dépôt: 987733469</p>
        ) : (
          <p>Retraits: Coming soon...</p>
        )}
      </div>
    </div>
  );
};

export default TabSwitcher;
