"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PRESETS } from "@/lib/presets";
import { GeneratedName, OverrideProfile, LanguageProfile } from "@/lib/types";
import { PresetCard } from "@/components/PresetCard";
import { ToneSliders } from "@/components/ToneSliders";
import { NameList } from "@/components/NameList";
import { Sparkles, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("noble");
  const [overrideTone, setOverrideTone] = useState({
    harshness: PRESETS["noble"].tone.harshness,
    darkness: PRESETS["noble"].tone.darkness,
    elegance: PRESETS["noble"].tone.elegance
  });
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customConsonants, setCustomConsonants] = useState("");
  const [customVowels, setCustomVowels] = useState("");
  const [customPresetName, setCustomPresetName] = useState("");
  const [customPresets, setCustomPresets] = useState<Record<string, LanguageProfile>>({});

  // Load custom presets on mount
  useEffect(() => {
    const saved = localStorage.getItem("aetheria_custom_presets");
    if (saved) {
      try {
        setCustomPresets(JSON.parse(saved));
      } catch(e) { console.error(e); }
    }
  }, []);

  const allPresets = { ...PRESETS, ...customPresets };

  const handlePresetSelect = (id: string) => {
    const profile = allPresets[id];
    if (profile) {
      setSelectedPresetId(id);
      setOverrideTone({ ...profile.tone });
      // Clear custom phoneme inputs when switching presets
      setCustomConsonants(profile.phonemes.consonants && id.startsWith("custom_") 
        ? profile.phonemes.consonants.join(", ") 
        : "");
      setCustomVowels(profile.phonemes.vowels && id.startsWith("custom_") 
        ? profile.phonemes.vowels.join(", ") 
        : "");
    }
  };

  const handleDeleteCustomPreset = (id: string) => {
    const updatedPresets = { ...customPresets };
    delete updatedPresets[id];
    setCustomPresets(updatedPresets);
    localStorage.setItem("aetheria_custom_presets", JSON.stringify(updatedPresets));
    if (selectedPresetId === id) {
      handlePresetSelect("noble");
    }
  };

  const handleSaveCustomPreset = () => {
    if (!customPresetName.trim()) return;
    
    const baseProfile = allPresets[selectedPresetId];
    const newId = `custom_${Date.now()}`;
    
    const newProfile: LanguageProfile = {
      ...baseProfile,
      id: newId,
      name: customPresetName.trim(),
      tone: { ...overrideTone },
    };

    if (customConsonants.trim()) {
      newProfile.phonemes = { ...newProfile.phonemes, consonants: customConsonants.split(",").map(s => s.trim()) };
    }
    if (customVowels.trim()) {
      newProfile.phonemes = { ...newProfile.phonemes, vowels: customVowels.split(",").map(s => s.trim()) };
    }

    const updatedPresets = { ...customPresets, [newId]: newProfile };
    setCustomPresets(updatedPresets);
    localStorage.setItem("aetheria_custom_presets", JSON.stringify(updatedPresets));
    setSelectedPresetId(newId);
    setCustomPresetName("");
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const override: OverrideProfile = { tone: overrideTone };
      if (customConsonants.trim()) {
        override.phonemes = { ...override.phonemes, consonants: customConsonants.split(",").map(s => s.trim()) };
      }
      if (customVowels.trim()) {
        override.phonemes = { ...override.phonemes, vowels: customVowels.split(",").map(s => s.trim()) };
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preset: selectedPresetId,
          count: 8,
          withMeaning: true,
          override
        })
      });
      const data = await response.json();
      if (data.results) {
        setNames(data.results);
      }
    } catch (error) {
      console.error("Failed to generate names:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-200 p-6 md:p-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        <nav className="flex items-center justify-between pb-6 border-b border-white/10 z-20 relative">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-br from-white to-purple-400 bg-clip-text text-transparent">
              Aetheria Forge
            </span>
          </div>
          <Link 
            href="/api-docs" 
            className="text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors"
          >
            API
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Select Origin</h2>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-medium tracking-wide">
                  {Object.keys(allPresets).length} PRESETS
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {Object.values(allPresets).map(preset => (
                  <PresetCard
                    key={preset.id}
                    preset={preset}
                    isSelected={selectedPresetId === preset.id}
                    onClick={() => handlePresetSelect(preset.id)}
                    isCustom={preset.id.startsWith("custom_")}
                    onDelete={preset.id.startsWith("custom_") ? () => handleDeleteCustomPreset(preset.id) : undefined}
                  />
                ))}
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">Fine-tune</h2>
                </div>
                <button 
                  id="btn-toggle-advanced"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  {showAdvanced ? "Hide Advanced" : "Show Advanced"}
                </button>
              </div>
              
              <ToneSliders tone={overrideTone} onChange={setOverrideTone} />
              
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="pt-6 border-t border-white/10 overflow-hidden space-y-4"
                  >
                     <div>
                       <label className="block text-sm text-gray-400 mb-1">Custom Consonants (comma separated)</label>
                       <input 
                         type="text" 
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" 
                         placeholder="e.g. k, th, r, z"
                         value={customConsonants}
                         onChange={(e) => setCustomConsonants(e.target.value)}
                       />
                     </div>
                     <div>
                       <label className="block text-sm text-gray-400 mb-1">Custom Vowels (comma separated)</label>
                       <input 
                         type="text" 
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" 
                         placeholder="e.g. a, o, u"
                         value={customVowels}
                         onChange={(e) => setCustomVowels(e.target.value)}
                       />
                     </div>
                     <div className="pt-4 border-t border-white/5 space-y-3">
                       <label className="block text-sm text-gray-400">Save Configuration</label>
                       <div className="flex gap-2">
                         <input 
                           type="text" 
                           className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" 
                           placeholder="Preset Name"
                           value={customPresetName}
                           onChange={(e) => setCustomPresetName(e.target.value)}
                         />
                         <button
                           onClick={handleSaveCustomPreset}
                           disabled={!customPresetName.trim()}
                           className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                         >
                           Save Preset
                         </button>
                       </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <button
              id="btn-generate"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full relative group overflow-hidden rounded-2xl p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 opacity-70 group-hover:opacity-100 group-hover:blur-md blur-sm transition-all duration-500" />
              <div className="relative flex items-center justify-center gap-3 bg-black px-8 py-4 rounded-2xl transition-all duration-300 group-hover:bg-opacity-80">
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 text-purple-300" />
                )}
                <span className="font-bold text-lg text-white">
                  {isGenerating ? "Forging Names..." : "Generate Names"}
                </span>
              </div>
            </button>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#0A0A0F]/90 border border-white/10 rounded-3xl p-6 md:p-8 min-h-[600px] shadow-2xl backdrop-blur-xl relative overflow-hidden h-full flex flex-col">
               <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
               
               <div className="relative z-10 flex-1 flex flex-col">
                 <NameList names={names} />
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
