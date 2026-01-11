
import React from 'react';
import { CalculationResult } from '../types';

interface HeaderSectionProps {
  age: string;
  setAge: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  rescuers: 1 | 2;
  setRescuers: (v: 1 | 2) => void;
  calculations: CalculationResult;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  age, setAge, weight, setWeight, rescuers, setRescuers, calculations 
}) => {
  return (
    <div className="space-y-3">
      {/* Title Bar */}
      <div className="flex justify-between items-start px-1">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            儿科基础生命支持-LZRYEK
            <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md font-bold">Build v2025.2</span>
          </h1>
        </div>
        <div className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
          2025 AHA/AAP 指南
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="体重 (KG)" value={weight} onChange={setWeight} />
          <InputGroup label="年龄 (岁)" value={age} onChange={setAge} />
        </div>

        {/* Rescuer Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setRescuers(1)}
            className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${rescuers === 1 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
          >
            单人复苏 (30:2)
          </button>
          <button 
            onClick={() => setRescuers(2)}
            className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${rescuers === 2 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
          >
            多人复苏 (15:2)
          </button>
        </div>

        {/* Info Grid - 3 Rows x 2 Columns */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-8 pt-2 border-t border-slate-50">
          <CompactInfoRow label="按压比例:" value={calculations.ratio} color="text-red-500" />
          <CompactInfoRow label="AED 电极:" value={calculations.aedPads} color="text-amber-500" />
          <CompactInfoRow label="通气频率:" value={calculations.respiratoryRate} color="text-blue-500" />
          <CompactInfoRow label="生理盐水:" value={calculations.fluidBolus} color="text-emerald-500" />
          <CompactInfoRow label="肾上(IV/IO):" value={calculations.epinephrineIV} color="text-rose-600" />
          <CompactInfoRow label="肾上(气管):" value={calculations.epinephrineET} color="text-rose-400" />
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    <div className="bg-slate-50 rounded-xl px-4 py-1.5 border border-slate-100">
      <input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="text-base font-black text-slate-900 bg-transparent outline-none w-full"
      />
    </div>
  </div>
);

const CompactInfoRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex justify-between items-center text-[11px]">
    <span className="font-bold text-slate-500 whitespace-nowrap">{label}</span>
    <span className={`font-black ${color}`}>{value}</span>
  </div>
);

export default HeaderSection;
