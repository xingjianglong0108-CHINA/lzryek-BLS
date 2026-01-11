
import React, { useState } from 'react';

interface ChecklistItem {
  id: string;
  category: 'PRE' | 'DURING' | 'POST';
  text: string;
  subtext?: string;
  checked: boolean;
}

const ChecklistView: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<'PRE' | 'DURING' | 'POST' | null>('PRE');
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', category: 'PRE', text: '环境安全与个人防护 (PPE)', subtext: '确保施救者安全，佩戴手套/口罩', checked: false },
    { id: '2', category: 'PRE', text: '反应与呼吸/脉搏双重评估', subtext: '10秒内完成；婴儿查肱动脉，儿童查颈/股动脉', checked: false },
    { id: '3', category: 'PRE', text: '激活应急反应系统 (EMS/AED)', subtext: '呼叫他人获取 AED，启动院内/院外抢救程序', checked: false },
    { id: '4', category: 'DURING', text: '按压频率 100-120 次/分', subtext: '避免过快或过慢', checked: false },
    { id: '5', category: 'DURING', text: '按压深度达 1/3 前后径', subtext: '婴儿约4cm，儿童约5cm', checked: false },
    { id: '6', category: 'DURING', text: '确保胸廓完全回弹', subtext: '避免按压间隙倚靠患儿胸壁', checked: false },
    { id: '7', category: 'DURING', text: '减少中断 < 10 秒', subtext: '按压分数 (CCF) 目标 > 60%', checked: false },
    { id: '8', category: 'DURING', text: '正确技术 (婴儿禁止2指)', subtext: '推荐双拇指环绕或单手技术', checked: false },
    { id: '9', category: 'DURING', text: '人工呼吸频率 20-30 次/分', subtext: '营救通气或高级气道建立后频率', checked: false },
    { id: '10', category: 'POST', text: '气道维持与氧合管理', subtext: 'SpO2 目标 94-99%，PaCO2 35-45mmHg', checked: false },
    { id: '11', category: 'POST', text: '循环支持与血压目标', subtext: '维持 SBP > 70 + (2 × 岁)', checked: false },
    { id: '12', category: 'POST', text: '核心温管理与脑保护', subtext: '预防发热，目标体温 36.0-37.5°C', checked: false },
    { id: '13', category: 'POST', text: '可逆原因回溯 (H\'s & T\'s)', subtext: '排除低血糖、低血容量、缺氧等', checked: false }
  ]);

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

  const renderSection = (title: string, category: 'PRE' | 'DURING' | 'POST', color: string) => {
    const isOpen = openCategory === category;
    const categoryItems = items.filter(i => i.category === category);
    const completedCount = categoryItems.filter(i => i.checked).length;

    return (
      <div className="group">
        <button
          onClick={() => setOpenCategory(isOpen ? null : category)}
          className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 shadow-sm border ${
            isOpen 
              ? 'bg-blue-600 text-white border-blue-600 scale-[1.01]' 
              : 'bg-white text-slate-800 border-slate-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${isOpen ? 'bg-white/20' : 'bg-slate-100'}`}>
              {completedCount}/{categoryItems.length}
            </div>
            <span className="text-base font-black tracking-tight">{title}</span>
          </div>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-slate-300'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="bg-white rounded-b-3xl border-x border-b border-slate-100 p-4 -mt-3 pt-8 space-y-2 animate-in slide-in-from-top-2">
            {categoryItems.map(item => (
              <label 
                key={item.id} 
                className={`flex items-start p-3 rounded-xl cursor-pointer border transition-all duration-200 ${
                  item.checked ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-transparent'
                }`}
                onClick={(e) => toggleCheck(item.id, e as any)}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mr-3 mt-0.5 transition-colors shrink-0 ${
                  item.checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-white'
                }`}>
                  {item.checked && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <div>
                  <div className={`text-sm font-bold leading-tight ${item.checked ? 'text-blue-900' : 'text-slate-700'}`}>
                    {item.text}
                  </div>
                  {item.subtext && (
                    <div className="text-[9px] text-slate-400 mt-0.5 font-medium leading-tight">
                      {item.subtext}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end px-1">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">复苏全流程核查</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AHA 2025 Clinical Checklist</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-blue-600">{progress}%</span>
          <div className="text-[9px] font-black text-slate-400 uppercase">已完成</div>
        </div>
      </div>

      {/* Progress Mini Bar */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-3">
        {renderSection('第一阶段：评估与启动', 'PRE', 'bg-emerald-500')}
        {renderSection('第二阶段：复苏质量监控', 'DURING', 'bg-red-500')}
        {renderSection('第三阶段：复苏后管理', 'POST', 'bg-blue-500')}
      </div>

      <button 
        onClick={() => setItems(items.map(i => ({...i, checked: false})))}
        className="w-full py-4 text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-1 border-2 border-dashed border-slate-100 rounded-2xl"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        清空并重置核查进度
      </button>
    </div>
  );
};

export default ChecklistView;
