import { X, Send } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

export default function SuggestionModal({ isOpen, onClose, prompt }) {
  const [suggestionText, setSuggestionText] = useState(prompt?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitSuggestion } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!suggestionText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      submitSuggestion(prompt.id, suggestionText);
      setIsSubmitting(false);
      setSuggestionText('');
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            className="relative w-full max-w-2xl bg-white border border-black/[0.07] rounded-2xl shadow-[0_20px_60px_rgba(30,30,30,0.12)] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-[#FBFAF7]">
              <h3 className="text-base font-semibold text-[#252525]">Suggest an Edit</h3>
              <button onClick={onClose} className="text-[#8A8881] hover:text-[#252525] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#44423E] mb-2">
                  How would you improve "{prompt?.title}"?
                </label>
                <textarea
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  placeholder="Paste your improved prompt here..."
                  rows={6}
                  className="w-full bg-[#FBFAF7] border border-black/[0.08] rounded-xl p-4 text-sm font-mono text-[#252525] placeholder-[#AAA79F] focus:outline-none focus:border-black/[0.2] focus:bg-white transition-all resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-[#8A8881]">Your suggestion will be sent to the author for review.</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-[#77756F] hover:bg-[#F5F4F0] hover:text-[#252525] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !suggestionText.trim()}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#252525] hover:bg-[#111] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    {isSubmitting
                      ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <><Send className="w-4 h-4" />Submit</>}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
