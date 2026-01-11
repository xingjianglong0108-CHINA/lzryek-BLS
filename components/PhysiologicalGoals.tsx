
import React, { useEffect } from 'react';
import { PatientState } from '../types';

interface PhysiologicalGoalsProps {
  patientState: PatientState;
  highlightedGoal?: string | null;
  onClearHighlight?: () => void;
}

const PhysiologicalGoals: React.FC<PhysiologicalGoalsProps> = ({ 
  patientState, 
  highlightedGoal, 
  onClearHighlight 
}) => {
  
  useEffect(() => {
    if (highlightedGoal && onClearHighlight) {
      const timer = setTimeout(() => {
        onClearHighlight();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedGoal, onClearHighlight]);

  return (
    <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-800 border-b-2 border-green-500 pb-2 inline-block">CPR 生理目标</h3>
        <ul className="space-y-4">
          <GoalItem label="按压频率" value="100-120 次/分" sub="避免过快，确保胸廓完全回弹" />
          <GoalItem label="按压深度" value={patientState.isInfant ? "至少 4cm" : "至少 5cm"} sub="至少为前后径的 1/3" />
          <GoalItem label="通气比例" value={patientState.rescuers === 1 ? "30:2" : "15:2"} sub="建立高级气道后改用 20-30次/分 连续通气" />
          <GoalItem label="中断时间" value="< 10 秒" sub="最大程度提高按压分数 (CCF > 60%)" />
        </ul>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-800 border-b-2 border-blue-500 pb-2 inline-block">生命体征目标</h3>
        <ul className="space-y-4">
          <GoalItem label="血氧饱和度 (SpO2)" value="94-99%" sub="避免高氧或低氧损伤" />
          <GoalItem 
            label="收缩压下限" 
            value={`${70 + (patientState.age * 2)} mmHg`} 
            sub="计算公式: 70 + (2 × 岁)" 
            isHighlighted={highlightedGoal === 'sbp'}
          />
          <GoalItem label="呼气末二氧化碳 (EtCO2)" value="> 15-20 mmHg" sub="如果 < 10mmHg，需评估并优化按压质量" />
          <GoalItem label="体温管理" value="36.0 - 37.5 °C" sub="预防发热，保护神经功能" />
        </ul>
      </div>
    </div>
  );
};

const GoalItem: React.FC<{label: string, value: string, sub: string, isHighlighted?: boolean}> = ({ 
  label, value, sub, isHighlighted 
}) => (
  <li className={`p-4 rounded-xl border transition-all duration-500 ${
    isHighlighted 
      ? 'bg-blue-50 border-blue-500 shadow-lg scale-[1.02] ring-2 ring-blue-500 ring-opacity-20' 
      : 'bg-white border-slate-100 shadow-sm'
  }`}>
    <div className="flex justify-between items-center mb-1">
      <span className={`font-bold ${isHighlighted ? 'text-blue-700' : 'text-slate-700'}`}>{label}</span>
      <span className={`${isHighlighted ? 'text-blue-600' : 'text-green-600'} font-black text-lg`}>{value}</span>
    </div>
    <span className={`${isHighlighted ? 'text-blue-400' : 'text-slate-400'} text-xs`}>{sub}</span>
  </li>
);

export default PhysiologicalGoals;
