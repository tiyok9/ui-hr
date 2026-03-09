import React from "react";

const HeaderSummary = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Total Karyawan</p>
        <h2 className="text-3xl font-bold">120</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Karyawan Aktif</p>
        <h2 className="text-3xl font-bold text-green-600">110</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Izin / Cuti Bulan Ini</p>
        <h2 className="text-3xl font-bold text-orange-500">12</h2>
      </div>
    </div>
  );
};

export default HeaderSummary;
