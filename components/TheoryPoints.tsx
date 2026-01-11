
import React, { useState } from 'react';

interface TheorySection {
  id: string;
  title: string;
  tag?: string;
  tagColor?: string;
  content: React.ReactNode;
}

const SECTIONS: TheorySection[] = [
  {
    id: 'RESPIRATORY_FAILURE',
    title: '呼吸衰竭的治疗与开放气道',
    tag: '首要任务',
    tagColor: 'bg-blue-100 text-blue-700',
    content: (
      <div className="space-y-4 text-sm">
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <h5 className="font-black text-blue-900 mb-2">【开放气道技术】</h5>
          <ul className="space-y-2 font-bold text-slate-700">
            <li className="flex gap-2"><span className="text-blue-500">•</span> 仰头提颏法：适用于无脊柱损伤嫌疑的患儿。</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span> 推下颌法：怀疑有颈椎损伤时使用，减少颈部移动。</li>
          </ul>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <h5 className="font-black text-slate-900 mb-2">【有脉搏但呼吸不足】</h5>
          <p className="font-bold text-slate-700 leading-relaxed mb-3">若脉搏 ≥ 60 次/分但呼吸异常：</p>
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
            <div className="text-2xl">🌬️</div>
            <div>
              <div className="font-black text-blue-600 text-lg">20 - 30 次/分</div>
              <div className="text-[10px] text-slate-400 font-black uppercase">即每 2-3 秒 1 次通气</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'FBAO_DETAILS',
    title: '气道异物梗阻 (FBAO) 处理',
    tag: '分龄施救',
    tagColor: 'bg-orange-100 text-orange-700',
    content: (
      <div className="space-y-4 text-sm">
        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
          <h5 className="font-black text-orange-900 mb-2 uppercase text-[10px] tracking-widest">婴儿 (&lt;1岁)</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl text-center shadow-sm">
              <div className="font-black text-orange-600">5次背部拍击</div>
              <div className="text-[9px] text-slate-400">头低位，支撑下颌</div>
            </div>
            <div className="bg-white p-3 rounded-xl text-center shadow-sm">
              <div className="font-black text-orange-600">5次胸部冲击</div>
              <div className="text-[9px] text-slate-400">避开剑突</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <h5 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest">儿童 (1岁-青春期)</h5>
          <p className="font-bold text-slate-700 leading-relaxed">
            实施 <span className="text-orange-600">Heimlich 手法</span>：施救者跪在患儿身后，一手握拳置于脐上剑突下，另一手握住此拳，快速向内向上冲击。
          </p>
        </div>
        <div className="p-3 bg-red-50 rounded-xl border border-red-100">
          <p className="text-[10px] text-red-600 font-black mb-1">意识丧失后：</p>
          <p className="font-bold text-red-800">立即开始 CPR！每次人工呼吸前检查口腔内是否有可见异物。</p>
        </div>
      </div>
    )
  },
  {
    id: 'CPR_TECHNIQUE_2025',
    title: '高质量 CPR 序列与技术',
    tag: '核心标准',
    tagColor: 'bg-emerald-100 text-emerald-700',
    content: (
      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <h6 className="text-[9px] font-black text-emerald-700 mb-1">抢救序列</h6>
            <div className="text-lg font-black text-slate-900">C - A - B</div>
            <p className="text-[8px] text-slate-500 font-bold leading-tight">按压 - 气道 - 呼吸</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <h6 className="text-[9px] font-black text-slate-500 mb-1">支撑平面</h6>
            <div className="text-sm font-black text-slate-900">必须在硬质平面</div>
            <p className="text-[8px] text-slate-500 font-bold leading-tight">床垫需使用硬板</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <h5 className="font-black text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            婴儿按压技术更新
          </h5>
          <div className="space-y-2 font-bold text-slate-600">
            <p className="flex items-start gap-2">
              <span className="text-red-500">✕</span>
              <span><span className="text-red-600 underline">不再推荐双指按压</span>，因其深度常不足 4cm。</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>首选<span className="text-emerald-600">双拇指环绕法</span>，由 1 人或 2 人施救均可。</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>备选单手技术（类似成人）。</span>
            </p>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
          <h5 className="font-black text-emerald-900 mb-2">【高质量 CPR 五要素】</h5>
          <ul className="grid grid-cols-1 gap-2 text-[11px] font-bold text-slate-700">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 频率：100 - 120 次/分</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 深度：至少 1/3 前后径</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 确保：胸廓完全回弹，不倚靠</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 减少：按压中断时间 &lt; 10 秒</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 避免：过度通气</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'SHOCKABLE_MANAGEMENT',
    title: '可电击心律与除颤管理',
    tag: '除颤规范',
    tagColor: 'bg-red-100 text-red-700',
    content: (
      <div className="space-y-4 text-sm">
        <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
          <h5 className="font-black text-red-900 mb-2 uppercase text-[10px] tracking-widest">电击与 CPR 协调</h5>
          <p className="font-bold text-slate-700 leading-relaxed mb-2">
            成功的关键在于<span className="text-red-600">最小化电击前后中断</span>。电击前充电时应持续按压，电击后立即恢复按压，严禁评估脉搏。
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <h5 className="font-black text-slate-900 mb-3 text-[10px] uppercase tracking-widest">电极片选择 (Size & Type)</h5>
          <div className="space-y-3 font-bold">
            <div className="flex justify-between items-center p-2 bg-white rounded-xl shadow-sm">
              <span className="text-slate-500 italic">体重 &gt; 10 kg</span>
              <span className="text-slate-900">成人电极片 (8-12 cm)</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-xl shadow-sm">
              <span className="text-slate-500 italic">体重 &lt; 10 kg</span>
              <span className="text-slate-900">婴儿/儿科专用片</span>
            </div>
            <div className="text-[10px] text-slate-400 px-1 italic">注：若无儿科片，成人片亦可使用，确保互不接触。</div>
          </div>
        </div>

        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
          <h5 className="font-black text-blue-900 mb-2 text-[10px] tracking-widest uppercase">除颤器类型</h5>
          <ul className="space-y-2 font-bold text-slate-700">
            <li className="flex gap-2">
              <span className="text-blue-500">•</span>
              手动除颤器：首选，可根据体重精确调能（2-4-6-10 J/kg）。
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500">•</span>
              AED：适用于 1 岁以上儿童。婴儿（&lt;1岁）首选手动或带减能器的 AED。
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'ALGORITHM_KEY_POINTS',
    title: 'BLS 算法要点 (单人 vs 多人)',
    tag: '决策引导',
    tagColor: 'bg-purple-100 text-purple-700',
    content: (
      <div className="space-y-4 text-sm">
        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
          <h5 className="font-black text-purple-900 mb-2">【启动 CPR 关键指标】</h5>
          <p className="font-bold text-slate-700 leading-relaxed mb-3">当患儿出现以下情况时启动 CPR：</p>
          <ul className="space-y-2 text-xs font-black">
            <li className="bg-white p-2 rounded-lg text-slate-800 border-l-4 border-red-500">无呼吸 或 仅有喘息。</li>
            <li className="bg-white p-2 rounded-lg text-slate-800 border-l-4 border-red-500">无脉搏 或 心率 &lt; 60 次/分 且灌注良好迹象缺失。</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase mb-1">单人施救者</div>
            <div className="text-xl font-black text-purple-600">30 : 2</div>
            <div className="text-[8px] text-slate-400 font-bold mt-1 tracking-tighter">常规 CPR 比例</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase mb-1">2人以上施救者</div>
            <div className="text-xl font-black text-purple-600">15 : 2</div>
            <div className="text-[8px] text-slate-400 font-bold mt-1 tracking-tighter">儿科专用比例</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h5 className="font-black text-slate-900 mb-2 uppercase text-[10px]">抢救顺序 (Sequence)</h5>
          <ol className="space-y-2 font-bold text-slate-600 list-decimal pl-4">
            <li>确认环境安全。</li>
            <li>检查反应及呼吸。</li>
            <li>呼救、启动 EMS 并获取 AED。</li>
            <li>10秒内检查脉搏。</li>
            <li>根据是否有脉搏/呼吸进入相应支路。</li>
          </ol>
        </div>
      </div>
    )
  }
];

const TheoryPoints: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('RESPIRATORY_FAILURE');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="px-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">2025 PBLS 核心理论</h2>
        <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Major Concepts & Detailed Guidelines</p>
      </div>
      
      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isOpen = openSection === section.id;
          return (
            <div key={section.id} className="group">
              <button
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 shadow-sm border ${
                  isOpen 
                    ? 'bg-blue-600 text-white border-blue-600 scale-[1.01] shadow-blue-100' 
                    : 'bg-white text-slate-800 border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-start gap-1">
                  {section.tag && (
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest ${isOpen ? 'bg-white/20 text-white' : section.tagColor || 'bg-slate-100 text-slate-500'}`}>
                      {section.tag}
                    </span>
                  )}
                  <span className="text-base font-black tracking-tight">{section.title}</span>
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
                <div className="bg-white rounded-b-3xl border-x border-b border-slate-100 p-6 -mt-3 pt-8 shadow-inner animate-in slide-in-from-top-2">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-slate-100 rounded-3xl border border-slate-200">
        <h4 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          核心复盘考点
        </h4>
        <ul className="space-y-3 text-sm font-bold text-slate-700">
          <li className="flex gap-2">
            <span className="text-blue-500">#1</span>
            儿科心肺复苏的关键在于解决缺氧——高质量按压与有效通气同等重要。
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">#2</span>
            即便在建立高级气道后，也应维持 20-30 次/分的通气频率。
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">#3</span>
            电击后立即恢复按压，绝不能在此时评估心律。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TheoryPoints;
