import React, { useState, useEffect } from 'react';
import { Camera, Heart, Lock, Bell, Music, Droplet, Package, ArrowRight, Paperclip } from 'lucide-react';

export default function LuminaClone() {
  const [step, setStep] = useState('MAKER'); // MAKER, LOCKSCREEN, LETTER, BOARD
  const [formData, setFormData] = useState({
    toName: 'Bub',
    fromName: 'Vijay',
    message: `I know I don't say it enough, so let me say it properly today: you are, hands down, the best part of my life. 
      
      You turn the most ordinary days into something worth remembering - a random day feels a little more magical just because you're in it. Your laugh is my favorite sound and your hugs are my favorite place.
      Thank you for choosing me, again and again, even on the days I don't make it easy. I promise to keep choosing you right back — today, tomorrow, and every ordinary Tuesday after that.

      Happy Girlfriend's Day, my love. You're stuck with me forever now. 💕`,
      photos: [
        "/1.jpeg", 
        "/2.jpg", 
        "/3.jpeg"
      ]
  });

  const handlePhotoUpload = (index: number, e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotos = [...formData.photos];
      newPhotos[index] = URL.createObjectURL(file);
      setFormData({ ...formData, photos: newPhotos });
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-gray-900 selection:bg-pink-200 overflow-hidden flex justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl relative overflow-y-auto">
        {step === 'MAKER' && (
          <MakerView 
            formData={formData} 
            setFormData={setFormData} 
            onUpload={handlePhotoUpload} 
            onNext={() => setStep('LOCKSCREEN')} 
          />
        )}
        {step === 'LOCKSCREEN' && (
          <LockscreenView onOpen={() => setStep('LETTER')} />
        )}
        {step === 'LETTER' && (
          <LetterView 
            formData={formData} 
            onNext={() => setStep('BOARD')} 
          />
        )}
        {step === 'BOARD' && (
          <BoardView 
            formData={formData} 
            onReset={() => setStep('MAKER')} 
          />
        )}
      </div>
    </div>
  );
}

// --- 1. MAKER VIEW ---
function MakerView({ formData, setFormData, onUpload, onNext }) {
  return (
    <div className="p-6 pb-24">
      <div className="text-center mb-8 pt-8">
        <h1 className="text-3xl font-serif italic text-pink-600 mb-2">Make Her Surprise</h1>
        <p className="text-gray-500 text-sm">Three photos, a few words — that's all it takes.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Three photos for the board</label>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <label key={i} className="aspect-square border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition overflow-hidden relative group">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(i, e)} />
                {formData.photos[i] ? (
                  <img src={formData.photos[i]} alt="Upload preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className="w-6 h-6 text-pink-300 mb-1 group-hover:text-pink-500 transition" />
                    <span className="text-[10px] text-gray-400">Photo {i + 1}</span>
                  </>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Her Name</label>
            <input type="text" value={formData.toName} onChange={(e) => setFormData({...formData, toName: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-pink-400 bg-gray-50 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Your Name</label>
            <input type="text" value={formData.fromName} onChange={(e) => setFormData({...formData, fromName: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-pink-400 bg-gray-50 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Your Message</label>
          <textarea 
            rows="6"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-pink-400 bg-gray-50 text-sm resize-none leading-relaxed"
          ></textarea>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button onClick={onNext} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2">
          Preview the Surprise <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// --- 2. LOCKSCREEN VIEW ---
function LockscreenView({ onOpen }) {
  return (
    <div className="h-full min-h-[100dvh] bg-slate-900 relative overflow-hidden flex flex-col items-center">
      {/* Fake Lockscreen Wallpaper */}
      <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="wallpaper" />
      
      <div className="relative z-10 w-full p-6 pt-16 flex flex-col items-center h-full">
        <Lock className="w-5 h-5 text-white mb-2" />
        <h1 className="text-6xl font-light text-white tracking-tight mb-2">11:11</h1>
        <p className="text-white/80 text-sm font-medium mb-12">Girlfriend's Day</p>

        <div className="w-full space-y-3 mt-auto mb-8">
          {/* Decoy Notifications */}
          <Notification icon={<Package className="w-5 h-5 text-blue-500" />} title="Delivery" time="2m" message="Your package is out for delivery, arriving today." />
          <Notification icon={<Droplet className="w-5 h-5 text-cyan-500" />} title="Reminder" time="6m" message="Hydration check! Drink some water." />
          
          {/* The Special Glow Notification */}
          <div onClick={onOpen} className="relative group cursor-pointer animate-fade-in-up mt-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl blur opacity-75 animate-pulse"></div>
            <div className="relative bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex gap-4 items-center transform transition-transform group-active:scale-95">
              <div className="bg-pink-100 p-2 rounded-full">
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900 text-sm">Someone special</span>
                  <span className="text-xs text-gray-500">Now</span>
                </div>
                <p className="text-sm text-gray-700">sent you something 💕 tap to open</p>
              </div>
            </div>
            <p className="text-center text-xs text-white/70 mt-3 animate-bounce">tap the glowing one</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Notification({ icon, title, time, message }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl shadow-sm flex gap-3 items-center">
      <div className="bg-white p-1.5 rounded-lg shadow-sm">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-xs text-gray-600 line-clamp-1">{message}</p>
      </div>
    </div>
  );
}

// --- 3. LETTER VIEW ---
function LetterView({ formData, onNext }) {
  return (
    <div className="h-full min-h-[100dvh] bg-rose-50 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{backgroundImage: 'radial-gradient(#fbcfe8 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
      
      <div className="w-full bg-white p-8 rounded-xl shadow-lg relative z-10 animate-fade-in-up border border-rose-100">
        <div className="text-center mb-6">
          <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">welcome, love</span>
          <h2 className="text-2xl font-serif italic text-gray-800 mt-4 mb-1">a warm hug 💕</h2>
        </div>
        
        <div className="prose prose-pink text-gray-600 text-sm leading-relaxed mb-8">
          <p>Pyaari {formData.toName} 😉 ,</p>
          <p className="whitespace-pre-wrap">{formData.message}</p>
          <p className="font-medium">— {formData.fromName}</p>
        </div>

        <button onClick={onNext} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
          Open the board <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// --- 4. BOARD / SCRAPBOOK VIEW ---
function BoardView({ formData, onReset }) {
  // Use user photos, fallback to placeholders if they skipped uploading
  const getPhoto = (i) => formData.photos[i] || `https://images.unsplash.com/photo-1518199268815-f55347460d29?q=80&w=400&auto=format&fit=crop&sig=${i}`;

  return (
    <div className="min-h-[100dvh] bg-[#fdfbf7] p-6 pb-24 relative">
      <div className="text-center pt-8 pb-4">
        <h2 className="text-2xl font-serif italic text-gray-800">every little moment, with you</h2>
        <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">pinned</p>
      </div>

      <div className="relative mt-4 space-y-6">
        
        {/* Sticky Note 1 */}
        <div className="bg-yellow-100 w-48 p-4 shadow-md rotate-3 mx-auto relative z-10 border border-yellow-200">
          <h3 className="font-bold text-gray-800 text-sm mb-2 border-b border-yellow-200 pb-1">Reasons Why I Love You</h3>
          <ul className="text-xs text-gray-700 space-y-1.5 leading-snug list-disc pl-3">
            <li>You understand me like no one else</li>
            <li>You make me smile every day</li>
            <li>You're my peace in the chaos</li>
          </ul>
        </div>

        {/* Photo 1 - Tilted Left */}
        <div className="bg-white p-3 pb-8 shadow-xl -rotate-6 w-3/4 mr-auto relative -mt-4 border border-gray-100 z-20">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Paperclip className="w-6 h-6 text-gray-400 -rotate-12" /></div>
          <img src={getPhoto(0)} className="w-full h-48 object-cover rounded-sm" alt="Memory 1" />
          <p className="absolute bottom-2.5 left-0 right-0 text-center font-serif text-sm text-gray-700 italic">For my Love</p>
        </div>

        {/* Photo 2 - Tilted Right */}
        <div className="bg-white p-3 pb-8 shadow-xl rotate-3 w-3/4 ml-auto relative -mt-8 border border-gray-100 z-30">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Paperclip className="w-6 h-6 text-gray-400 rotate-12" /></div>
          <img src={getPhoto(1)} className="w-full h-48 object-cover rounded-sm" alt="Memory 2" />
          <p className="absolute bottom-2.5 left-0 right-0 text-center font-serif text-sm text-gray-700 italic">My Happiness</p>
        </div>

        {/* Sticky Note 2 */}
        <div className="bg-blue-50 w-56 p-4 shadow-md -rotate-2 mx-auto relative z-10 -mt-6 border border-blue-100">
          <h3 className="font-bold text-gray-800 text-sm mb-2 border-b border-blue-100 pb-1">You + Me</h3>
          <p className="text-xs text-gray-700 leading-relaxed italic">
            "You're not just my girlfriend — you're my best friend, my safe place, and my greatest blessing."
          </p>
        </div>

        {/* Photo 3 - Straight */}
        <div className="bg-white p-3 pb-8 shadow-xl rotate-1 w-full relative border border-gray-100 z-20">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Paperclip className="w-6 h-6 text-gray-400" /></div>
          <img src={getPhoto(2)} className="w-full h-56 object-cover rounded-sm" alt="Memory 3" />
          <p className="absolute bottom-2.5 left-0 right-0 text-center font-serif text-sm text-gray-700 italic">The Goal</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7] to-transparent z-50">
        <button onClick={onReset} className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
          Start Over
        </button>
      </div>
    </div>
  );
}
