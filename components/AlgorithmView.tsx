
import React, { useState } from 'react';
import { PatientState } from '../types';

interface Step {
  id: string;
  stage: number;
  title: string;
  desc: string;
  options: { label: string; nextId: string; color: string }[];
  guidelines: string[];
  alert?: string;
  drugAlert?: string; // 肾上腺素提醒
  airwayAlert?: string; // 气道提醒
}

interface AlgorithmViewProps {
  patientState: PatientState;
  onStartTimer: () => void;
  onResetTimer?: () => void;
}

const AlgorithmView: React.FC<AlgorithmViewProps> = ({ patientState, onStartTimer, onResetTimer }) => {
  const [currentStepId, setCurrentStepId] = useState<string>('SCENE_SAFETY');

  const steps: Record<string, Step> = {
    SCENE_SAFETY: {
      id: 'SCENE_SAFETY',
      stage: 0,
      title: '环境安全评估',
      desc: '确认现场环境安全，做好个人防护。',
      guidelines: [
        '确认周围环境对施救者及患儿安全',
        '如有其他施救者，呼叫并寻求帮助',
        '准备/启动应急反应系统 (AED/EMS)'
      ],
      options: [
        { label: '现场安全，进入评估', nextId: 'ASSESS', color: 'bg-blue-600' }
      ]
    },
    ASSESS: {
      id: 'ASSESS',
      stage: 0,
      title: '呼吸与脉搏评估',
      desc: '医务人员应在 10 秒内同时检查呼吸和脉搏。',
      alert: '注意：检查时间不可超过 10 秒！',
      guidelines: [
        '拍打足底或摇晃肩部检查反应',
        '观察胸廓起伏（呼吸）',
        '触摸脉搏：婴儿（肱动脉），儿童（颈/股动脉）'
      ],
      options: [
        { label: '呼吸平稳/有脉搏', nextId: 'POST_ROSC', color: 'bg-emerald-500' },
        { label: '异常呼吸/有脉搏', nextId: 'RESCUE_BREATHING', color: 'bg-amber-500' },
        { label: '无呼吸/无脉搏', nextId: 'START_CPR', color: 'bg-red-600' }
      ]
    },
    RESCUE_BREATHING: {
      id: 'RESCUE_BREATHING',
      stage: 1,
      title: '人工呼吸 (营救通气)',
      desc: '有脉搏但呼吸异常。',
      guidelines: [
        '每 2-3 秒给予 1 次呼吸 (20-30 次/分)',
        '每 2 分钟重新评估脉搏和呼吸',
        '若心率 < 60 bpm 且灌注不良：启动 CPR'
      ],
      options: [
        { label: '2分到，重新评估', nextId: 'ASSESS', color: 'bg-amber-600' },
        { label: '心率<60/灌注不良', nextId: 'START_CPR', color: 'bg-red-600' }
      ]
    },
    START_CPR: {
      id: 'START_CPR',
      stage: 2,
      title: '高质量 CPR 循环',
      desc: `比例: ${patientState.rescuers === 1 ? '30:2' : '15:2'}，按压频率 100-120 次/分。`,
      airwayAlert: '若 BVM 通气困难或复苏延长，考虑建立高级气道 (气管插管)。',
      guidelines: [
        `深度: ${patientState.isInfant ? '约 4cm' : '约 5cm'} (前后径1/3)`,
        'AED 抵达后立即分析，不要中断按压',
        '建立高级气道后：20-30次/分连续通气，不停止按压'
      ],
      options: [
        { label: 'AED 抵达/准备分析', nextId: 'AED_ANALYSIS', color: 'bg-pink-600' },
        { label: '2分钟完成，评估脉搏', nextId: 'ASSESS', color: 'bg-amber-600' }
      ]
    },
    AED_ANALYSIS: {
      id: 'AED_ANALYSIS',
      stage: 3,
      title: 'AED 心律分析',
      desc: '分析心律中，所有人离开。',
      guidelines: [
        '识别是否为室颤(VF)或无脉室速(pVT)',
        '分析时严禁接触或移动患儿',
        '若不建议电击：立即恢复 CPR'
      ],
      options: [
        { label: '建议电击 (Shockable)', nextId: 'SHOCK', color: 'bg-red-500' },
        { label: '不建议电击', nextId: 'NO_SHOCK', color: 'bg-slate-500' }
      ]
    },
    SHOCK: {
      id: 'SHOCK',
      stage: 2,
      title: '给予电击',
      desc: '电击完成，立即恢复按压。',
      drugAlert: '对于可电击心律：在第 2 次电击后的 CPR 循环中给予肾上腺素。',
      guidelines: [
        '电击后立即 CPR 2 分钟，不检查脉搏',
        '准备后续药物：胺碘酮或利多卡因',
        '尽可能减少电击前后的按压中断时间'
      ],
      options: [
        { label: '立即开始 2 分钟 CPR', nextId: 'START_CPR', color: 'bg-red-600' }
      ]
    },
    NO_SHOCK: {
      id: 'NO_SHOCK',
      stage: 2,
      title: '非电击心律 (Asystole/PEA)',
      desc: '立即恢复 CPR 2 分钟。',
      drugAlert: '关键：对于非电击心律，应尽早给予第一剂肾上腺素！',
      airwayAlert: '持续复苏时考虑气管插管以优化通气和 EtCO2 监测。',
      guidelines: [
        '每 3-5 分钟重复给药一次肾上腺素',
        '每 2 分钟重新分析心律',
        '寻找 H\'s & T\'s 可逆转原因'
      ],
      options: [
        { label: '恢复 2 分钟 CPR', nextId: 'START_CPR', color: 'bg-red-600' }
      ]
    },
    POST_ROSC: {
      id: 'POST_ROSC',
      stage: 0,
      title: 'ROSC 复苏后管理',
      desc: '已恢复自主循环。',
      airwayAlert: '若尚未插管且意识未恢复，应立即评估气管插管指征。',
      guidelines: [
        '维持 SpO2 94-99%, PaCO2 35-45mmHg',
        '维持 SBP > 70 + (2×岁)',
        '预防发热，目标体温 36-37.5°C'
      ],
      options: [
        { label: '转运/交接完成', nextId: 'COMPLETED', color: 'bg-emerald-600' },
        { label: '生命体征再次消失', nextId: 'START_CPR', color: 'bg-red-600' }
      ]
    },
    COMPLETED: {
      id: 'COMPLETED',
      stage: 0,
      title: '流程结束',
      desc: '基础生命支持任务已完成。',
      guidelines: [
        '团队复盘 (Debriefing)',
        '记录给药时间与除颤能量',
        '施救者心理支持'
      ],
      options: [
        { label: '返回初始评估', nextId: 'SCENE_SAFETY', color: 'bg-slate-500' }
      ]
    }
  };

  const currentStep = steps[currentStepId];
  const stages = ['评估', '通气', '按压', '分析'];

  const handleAction = (nextId: string) => {
    if (currentStepId === 'SCENE_SAFETY') onStartTimer();
    if (nextId === 'SCENE_SAFETY') onResetTimer?.();
    setCurrentStepId(nextId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-10">
      {/* Progress Steps */}
      <div className="flex justify-between px-2">
        {stages.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div className={`h-1 w-full rounded-full transition-colors ${i <= currentStep.stage ? 'bg-blue-500' : 'bg-slate-200'}`} />
            <span className={`text-[10px] font-bold ${i === currentStep.stage ? 'text-blue-600' : 'text-slate-400'}`}>{s}</span>
          </div>
        ))}
      </div>

      {/* Decision Alerts */}
      <div className="space-y-2">
        {currentStep.alert && (
          <div className="bg-red-50 border border-red-100 p-3 rounded-2xl flex items-center gap-2 animate-pulse">
            <span className="text-[10px] font-black text-red-600 uppercase">紧急：{currentStep.alert}</span>
          </div>
        )}
        {currentStep.drugAlert && (
          <div className="bg-rose-50 border border-rose-100 p-3 rounded-2xl flex items-start gap-3">
            <div className="p-1.5 bg-rose-500 rounded-lg text-white">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.818 14.766 2.163 18 4.735 18h10.53c2.572 0 3.917-3.234 2.028-5.121l-4.001-4a1 1 0 01-.292-.707V4.414l.707-.707A1 1 0 0013 2H7zm2 2h2v4.586l.707.707L14.5 12h-9l2.793-2.707L9 8.586V4z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <div className="text-[10px] font-black text-rose-700 uppercase tracking-tight">肾上腺素提醒</div>
              <p className="text-[11px] font-bold text-rose-600 leading-tight mt-0.5">{currentStep.drugAlert}</p>
            </div>
          </div>
        )}
        {currentStep.airwayAlert && (
          <div className="bg-cyan-50 border border-cyan-100 p-3 rounded-2xl flex items-start gap-3">
            <div className="p-1.5 bg-cyan-500 rounded-lg text-white">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
            <div>
              <div className="text-[10px] font-black text-cyan-700 uppercase tracking-tight">气道决策建议</div>
              <p className="text-[11px] font-bold text-cyan-600 leading-tight mt-0.5">{currentStep.airwayAlert}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Action Card */}
      <div className={`rounded-3xl p-6 shadow-sm border relative overflow-hidden transition-colors ${currentStepId === 'POST_ROSC' ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'}`}>
        <div className="text-center">
          <div className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[9px] font-black rounded-full uppercase mb-2 tracking-widest">
            {currentStepId.replace('_', ' ')}
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{currentStep.title}</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed px-4">{currentStep.desc}</p>
        </div>
        
        <div className="space-y-3">
          {currentStep.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAction(opt.nextId)}
              className={`w-full ${opt.color} text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-slate-200 transition-all active:scale-95 text-base`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Execution Details List */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">关键操作指引</span>
        </div>
        <ul className="space-y-3">
          {currentStep.guidelines.map((g, i) => (
            <li key={i} className="flex gap-3 text-xs font-bold text-slate-600 leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlgorithmView;
