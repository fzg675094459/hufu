
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SKINCARE_SCHEDULE, BODY_CARE_SCHEDULE } from './constants';
import { DayRoutine, ChatMessage, BodyCareRoutine } from './types';

// Icons as components
const SunIcon = () => (
  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
);
const MoonIcon = () => (
  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
);
const SparklesIcon = () => (
  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
);
const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
);

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayRoutine>(SKINCARE_SCHEDULE[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMsg: ChatMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: inputValue,
        config: {
          systemInstruction: `你是 GlowGuide 的专业护肤助手。
          当前用户的面部护肤日程是：${JSON.stringify(SKINCARE_SCHEDULE)}。
          当前用户的身体护理日程是：${JSON.stringify(BODY_CARE_SCHEDULE)}。
          请根据该日程，回答用户关于产品成分、使用顺序、皮肤状况（如过敏、爆痘）的处理建议，包括面部和身体护理。
          你的语气应该是专业、温和且具有鼓励性的。如果用户提到严重的过敏或皮肤损伤，请务必建议其咨询皮肤科医生。`,
        },
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || '抱歉，我现在无法回答。' }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "网络连接似乎有点问题，请稍后再试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30 px-4 py-4 md:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-xl text-white">
              <SparklesIcon />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">GlowGuide <span className="text-emerald-500 font-normal">智能护肤管家</span></h1>
          </div>
          <div className="hidden md:block text-sm text-slate-500">
            今天是：{new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly View (Sidebar/Top Section) */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-slate-700 mb-4 px-1">本周计划</h2>
          <div className="grid grid-cols-1 gap-3">
            {SKINCARE_SCHEDULE.map((item) => (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item)}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 border text-left ${
                  selectedDay.day === item.day 
                    ? 'bg-emerald-50 border-emerald-200 shadow-sm' 
                    : 'bg-white border-slate-100 hover:border-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${selectedDay.day === item.day ? 'text-emerald-600' : 'text-slate-500'}`}>{item.day}</span>
                    {item.isAcidDay && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-rose-100 text-rose-600 rounded-full font-bold uppercase tracking-wider">刷酸日</span>
                    )}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{item.label}</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${selectedDay.day === item.day ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Daily Detail View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  {selectedDay.day} 流程汇总
                  {selectedDay.isAcidDay && <SparklesIcon />}
                </h3>
                <p className="text-slate-500 mt-2 flex items-center gap-2 italic">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  {selectedDay.note}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Morning Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-500 font-bold text-lg border-b border-amber-50 pb-2">
                  <SunIcon /> 晨间护肤
                </div>
                <div className="space-y-3">
                  {selectedDay.morning.map((step, i) => (
                    <div key={i} className="group p-4 bg-amber-50/30 rounded-2xl border border-transparent hover:border-amber-100 transition-colors">
                      <div className="text-slate-800 font-semibold text-sm mb-1">{step.step}</div>
                      <div className="flex items-center gap-2 text-xs text-amber-700 mb-2">
                        <span className="bg-white/80 px-2 py-0.5 rounded-full border border-amber-100">用量: {step.dosage}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-indigo-600 font-bold text-lg border-b border-indigo-50 pb-2">
                  <MoonIcon /> 晚间护肤
                </div>
                <div className="space-y-3">
                  {selectedDay.evening.map((step, i) => (
                    <div key={i} className="p-4 bg-indigo-50/30 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
                      <div className="text-slate-800 font-semibold text-sm mb-1">{step.step}</div>
                      <div className="flex items-center gap-2 text-xs text-indigo-700 mb-2">
                        <span className="bg-white/80 px-2 py-0.5 rounded-full border border-indigo-100">用量: {step.dosage}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Body Care Section */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg shadow-purple-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg">身体护理</h4>
            </div>
            <div className="space-y-2">
              {BODY_CARE_SCHEDULE.map((bodyCare) => (
                <div 
                  key={bodyCare.day}
                  className={`flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm ${
                    selectedDay.day === bodyCare.day ? 'bg-white/20 ring-2 ring-white/50' : ''
                  }`}
                >
                  <span className="font-semibold text-sm">{bodyCare.day}</span>
                  <span className="text-sm text-purple-50">{bodyCare.products}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200/50">
             <div className="flex items-center gap-3 mb-3">
               <div className="p-2 bg-white/20 rounded-lg">
                 <SparklesIcon />
               </div>
               <h4 className="font-bold text-lg">护肤小锦囊</h4>
             </div>
             <p className="text-emerald-50 text-sm leading-relaxed">
               {selectedDay.isAcidDay 
                 ? "今日为刷酸日，请特别注意T区的油脂堆积，避开脸颊薄弱部位。刷酸后加强理肤泉B5的修护，不要在这个时候尝试美白类刺激产品。"
                 : "今日重点在于修护屏障。如果感到皮肤有微微刺痛或发红，可适当增加B5修复霜的用量并厚敷在不适处。"}
             </p>
          </div>
        </div>
      </main>

      {/* Floating Chat Interface */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${chatOpen ? 'scale-100' : 'scale-0'}`}>
        <div className="w-[90vw] md:w-96 h-[60vh] bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-100 overflow-hidden">
          <div className="bg-emerald-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChatIcon />
              <span className="font-bold">护肤助手 AI</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.length === 0 && (
              <div className="text-center mt-10">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                  <SparklesIcon />
                </div>
                <p className="text-sm text-slate-500 px-8">你可以问我关于如何正确刷酸、某款产品怎么用，或者皮肤过敏了怎么办。</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-emerald-500 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="咨询 AI 助手..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2 group"
      >
        <ChatIcon />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">有问题问助手</span>
      </button>
    </div>
  );
};

export default App;
