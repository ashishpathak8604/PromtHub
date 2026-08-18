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
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-2xl glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white">Suggest Edit to Author</h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  How would you improve "{prompt?.title}"?
                </label>
                <textarea
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  placeholder="Paste your optimized prompt here..."
                  rows={6}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all resize-none font-mono text-sm leading-relaxed"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <p className="text-xs text-zinc-500">
                  Your suggestion will be sent to the author for review.
                </p>
                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !suggestionText.trim()}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Suggestion
                      </>
                    )}
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
