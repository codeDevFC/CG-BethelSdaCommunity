"use client";
import React, { useState, useEffect } from 'react';
import { Lock, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  seriesName: string;
  seriesPrefix: string;
  lessonNumber: number;
  expectedCode: string;
}

export function UnlockModal({ 
  isOpen, 
  onClose, 
  onVerify, 
  seriesName, 
  seriesPrefix,
  lessonNumber,
  expectedCode
}: UnlockModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCode('');
      setError('');
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (!code.trim()) {
      setError('Please enter the access code');
      return;
    }
    
    const entered = code.trim().toUpperCase();
    
    if (entered === expectedCode.toUpperCase()) {
      setIsSuccess(true);
      setTimeout(() => {
        onVerify(code);
      }, 800);
    } else {
      setError(`Invalid code. The correct code is "${expectedCode}"`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSuccess) {
      handleVerify();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl"
          >
            {!isSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">Unlock Lesson</h2>
                  <p className="text-gray-500 text-sm">
                    Enter the access code for <span className="font-bold text-gray-800">{seriesName}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Lesson {lessonNumber}
                  </p>
                  <div className="mt-3 inline-block bg-gray-100 px-3 py-1 rounded-full">
                    <code className="text-xs font-mono font-bold text-gray-700">{expectedCode}</code>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder={`Enter code (e.g., ${expectedCode})`}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 text-center text-xl font-mono font-black mb-4 focus:border-emerald-500 outline-none transition-colors uppercase"
                  autoFocus
                />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-xl mb-4"
                  >
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-black text-sm hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerify}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black text-sm hover:from-emerald-700 hover:to-teal-700 transition shadow-md"
                  >
                    Unlock Lesson
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-black text-green-600 mb-2">Unlocked!</h2>
                <p className="text-gray-500">Redirecting to lesson...</p>
                <div className="mt-4 flex justify-center">
                  <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}

            <p className="text-[10px] text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
              <Shield size={10} /> Codes provided by your group leader
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
