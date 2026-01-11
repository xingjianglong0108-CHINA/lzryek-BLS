
import React, { useState, useMemo, useEffect } from 'react';
import { TabType, PatientState, CalculationResult } from './types';
import HeaderSection from './components/HeaderSection';
import AlgorithmView from './components/AlgorithmView';
import PhysiologicalGoals from './components/PhysiologicalGoals';
import ChecklistView from './components/ChecklistView';
import CalculationLinkage from './components/CalculationLinkage';
import TheoryPoints from './components/TheoryPoints';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [age, setAge] = useState<string>('5');
  const [weight, setWeight] = useState<string>('20');
  const [rescuers, setRescuers] = useState<1 | 2>(1);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ALGORITHM);
  const [highlightedGoal, setHighlightedGoal] = useState<string | null>(null);
  
  // Timer State
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setSeconds(0);
    setTimerActive(false);
  };

  const patientState = useMemo((): PatientState => {
    const a = parseFloat(age) || 0;
    const w = parseFloat(weight) || 0;
    return {
      age: a,
      weight: w,
      isInfant: a < 1,
      isPuberty: a >= 13,
      rescuers
    };
  }, [age, weight, rescuers]);

  const handleNavigateToGoal = (goalKey: string) => {
    setHighlightedGoal(goalKey);
    setActiveTab(TabType.GOALS);
  };

  const calculations = useMemo((): CalculationResult => {
    const { age, weight, isInfant, isPuberty, rescuers } = patientState;
    
    let depth = "1/3 前后径";
    if (isInfant) depth = "约 4 cm";
    else if (!isPuberty) depth = "约 5 cm";
    else depth = "5 - 6 cm";

    const ratio = rescuers === 1 ? "30:2" : "15:2";
    const aed = age < 8 ? "儿科型" : "成人型";
    const rr = "20-30 次/分";
    // 肾上腺素计算 (1:10000 浓度)
    const epiIV = `${(weight * 0.1).toFixed(1)} ml`;
    const epiET = `${(weight * 1.0).toFixed(1)} ml`;
    const ns = `${(weight * 20).toFixed(0)} ml`;

    return {
      compressionDepth: depth,
      ratio,
      aedPads: aed,
      respiratoryRate: rr,
      epinephrineIV: epiIV,
      epinephrineET: epiET,
      fluidBolus: ns
    };
  }, [patientState]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center pb-24">
      <div className="w-full max-w-lg space-y-4 px-4 pt-6">
        
        {/* Header with Inputs & Quick Stats */}
        <HeaderSection 
          age={age} 
          setAge={setAge}
          weight={weight} 
          setWeight={setWeight}
          rescuers={rescuers}
          setRescuers={setRescuers}
          calculations={calculations}
        />

        {/* Timer Section */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">总时长</div>
              <div className="text-2xl font-black text-blue-600 font-mono tracking-tighter">{formatTime(seconds)}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setTimerActive(!timerActive)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${timerActive ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}
            >
              {timerActive ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              )}
            </button>
            <button 
              onClick={resetTimer}
              className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <main className="min-h-[400px]">
          {activeTab === TabType.ALGORITHM && (
            <AlgorithmView 
              patientState={patientState} 
              onStartTimer={() => setTimerActive(true)} 
              onResetTimer={resetTimer}
            />
          )}
          {activeTab === TabType.GOALS && <PhysiologicalGoals patientState={patientState} highlightedGoal={highlightedGoal} onClearHighlight={() => setHighlightedGoal(null)} />}
          {activeTab === TabType.CHECKLIST && <ChecklistView />}
          {activeTab === TabType.THEORY && <TheoryPoints />}
          {activeTab === TabType.CALCULATION && <CalculationLinkage patientState={patientState} onNavigateToGoal={handleNavigateToGoal} />}
        </main>

      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setHighlightedGoal(null); }} />
    </div>
  );
};

export default App;
