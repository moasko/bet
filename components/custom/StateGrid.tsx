import React from "react";
import StateCard from "./StateCard";

// data interface
interface Data {
  title: string;
  value: string;
  description: string;
  route: string;
}

const StateGrid = ({ data, loading }: { data: Data[]; loading: boolean }) => {
  if (loading) {
    // Indicateur de chargement
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4">
            <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-4/6 mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    // Message si aucune donnée
    return <div>No data available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <StateCard key={index} data={item} />
      ))}
    </div>
  );
};

export default StateGrid;
