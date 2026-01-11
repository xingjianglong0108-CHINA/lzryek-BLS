
import React from 'react';
import { PatientState } from '../types';

interface CalculationLinkageProps {
  patientState: PatientState;
  onNavigateToGoal?: (key: string) => void;
}

const CalculationLinkage: React.FC<CalculationLinkageProps> = ({ patientState, onNavigateToGoal }) => {
  const { weight, age } = patientState;

  // Airway Calculations (PBLS specific logic)
  const ettUncuffed = age > 0 ? (age / 4 + 4).toFixed(1) : (age <= 0.5 ? '3.0' : '3.5');
  const ettCuffed = age > 0 ? (age / 4 + 3.5).toFixed(1) : '3.0';
  const ettDepth = (parseFloat(ettCuffed) * 3).toFixed(1);

  // Defibrillation
  const firstShock = weight * 2;
  const subsequentShock = weight * 4;

  // Blood Pressure Goal
  const sbpGoal = age > 0 ? 70 + (age * 2) : 60;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-4">
      <div className="grid grid-cols-1 gap-4">
        
        {/* Airway Card */}
        <CategoryCard title="气道管理 / 气管插管" icon="🫁" color="bg-cyan-50 text-cyan-700">
          <div className="grid grid-cols-2 gap-4">
            <DataRow label="未加压囊导管 (ID)" value={`${ettUncuffed} mm`} />
            <DataRow label="加压囊导管 (ID)" value={`${ettCuffed} mm`} />
            <DataRow label="插管深度 (唇缘)" value={`${ettDepth} cm`} />
            <DataRow label="喉镜片型号" value={age < 1 ? '0-1 号直片' : age < 8 ? '2 号平/弯' : '3 号弯片'} />
          </div>
        </CategoryCard>

        {/* Defibrillation Card */}
        <CategoryCard title="电击除颤 (双相波)" icon="⚡️" color="bg-red-50 text-red-700">
          <div className="grid grid-cols-2 gap-4">
            <DataRow label="首剂 (2 J/kg)" value={`${firstShock} J`} />
            <DataRow label="后续 (4 J/kg)" value={`${subsequentShock} J`} />
            <DataRow label="最高限量" value="10 J/kg" />
            <DataRow 
              label="SBP 下限目标" 
              value={
                <button 
                  onClick={() => onNavigateToGoal?.('sbp')}
                  className="text-blue-600 underline decoration-dotted underline-offset-4 font-black hover:text-blue-800 transition-colors flex items-center gap-1"
                >
                  {sbpGoal} mmHg
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              } 
            />
          </div>
        </CategoryCard>

        {/* Critical Drugs Card */}
        <CategoryCard title="核心急救药物 (IV/IO)" icon="💊" color="bg-blue-50 text-blue-700">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <DataRow label="肾上腺素 (1:10000)" value={`${(weight * 0.1).toFixed(1)} ml`} sub="0.01 mg/kg" />
              <DataRow label="10% 葡萄糖 (GS)" value={`${(weight * 5).toFixed(0)} ml`} sub="5 ml/kg" />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-blue-100/50 pt-3">
              <DataRow label="胺碘酮 (抗心律失常)" value={`${(weight * 5).toFixed(0)} mg`} sub="5 mg/kg" />
              <DataRow label="利多卡因 (抗心律失常)" value={`${(weight * 1).toFixed(1)} mg`} sub="1 mg/kg" />
            </div>
          </div>
        </CategoryCard>

        {/* Fluids Card */}
        <CategoryCard title="液体与扩容" icon="💧" color="bg-indigo-50 text-indigo-700">
          <div className="grid grid-cols-2 gap-4">
            <DataRow label="等渗盐水 (20ml/kg)" value={`${weight * 20} ml`} />
            <DataRow label="阿托品 (缓慢性心律失常)" value={`${(weight * 0.02).toFixed(2)} mg`} sub="0.02 mg/kg" />
          </div>
        </CategoryCard>
      </div>

      <div className="p-4 bg-amber-50 rounded-2xl border border-dashed border-amber-200 text-center">
        <p className="text-[10px] text-amber-700 font-black uppercase tracking-widest flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          所有计算结果仅供参考，使用前请按 2025 指南二次核对
        </p>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, icon, color, children }: { title: string, icon: string, color: string, children?: React.ReactNode }) => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
    <div className={`px-5 py-3 flex items-center gap-2 font-black text-xs uppercase tracking-tight ${color}`}>
      <span className="text-base">{icon}</span>
      <span>{title}</span>
    </div>
    <div className="p-5 flex-1">
      {children}
    </div>
  </div>
);

const DataRow = ({ label, value, sub }: { label: string, value: React.ReactNode, sub?: string }) => (
  <div className="flex flex-col border-b border-slate-50 pb-2 h-full justify-between">
    <div className="flex flex-col mb-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
      {sub && <span className="text-[9px] text-slate-300 italic font-medium">{sub}</span>}
    </div>
    <div className="text-base font-black text-slate-900 tracking-tighter">
      {value}
    </div>
  </div>
);

export default CalculationLinkage;
