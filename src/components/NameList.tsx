import { GeneratedName } from "@/lib/types";
import { Copy, Check, Download, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NameListProps {
  names: GeneratedName[];
}

const STORAGE_KEY = "aetheria_forge_history";

export function NameList({ names }: NameListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<GeneratedName[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // When new names arrive, prepend them to history and save
  useEffect(() => {
    if (names.length > 0) {
      setHistory(prev => {
        const newHistory = [...names, ...prev].slice(0, 100); // Keep last 100
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, [names]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const removeName = (indexToRemove: number) => {
    setHistory(prev => {
      const newHistory = prev.filter((_, idx) => idx !== indexToRemove);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExport = () => {
    const text = history.map(n => `${n.singular} (pl. ${n.plural})${n.meaning ? ` - meaning: ${n.meaning}` : ""}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fantasy-names-history.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/5 h-full">
        <p>No names generated yet.</p>
        <p className="text-sm mt-1">Select a preset and click Generate</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-between items-end mb-2 border-b border-white/10 pb-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Generated History</h2>
          <p className="text-sm text-gray-400 mt-1">{history.length} names saved locally</p>
        </div>
        <div className="flex gap-2">
          <button
            id="btn-clear-history"
            onClick={clearHistory}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-lg border border-red-500/20 transition-all font-medium"
            title="Clear History"
          >
            <Trash2 size={16} />
          </button>
          <button
            id="btn-export-names"
            onClick={handleExport}
            className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 px-4 py-2 rounded-lg border border-purple-500/20 transition-all font-medium"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 flex-1 pb-4 custom-scrollbar">
        <AnimatePresence>
          {history.map((name, idx) => (
            <motion.div
              key={idx + name.singular}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm shadow-sm"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-xl font-bold text-white">{name.singular}</span>
                  <span className="text-sm text-gray-400 bg-black/40 px-2 py-0.5 rounded-full border border-white/5">pl. {name.plural}</span>
                </div>
                {name.meaning && (
                  <div className="text-sm text-purple-300/80 mt-2 flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:bg-purple-400 before:rounded-full">
                    {name.meaning}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => removeName(idx)}
                  className="p-2.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Remove from history"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  id={`btn-copy-name-${idx}`}
                  onClick={() => copyToClipboard(name.singular, idx)}
                  className="p-2.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedIndex === idx ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
