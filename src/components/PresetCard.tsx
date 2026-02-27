import { LanguageProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PresetCardProps {
  preset: LanguageProfile;
  isSelected: boolean;
  onClick: () => void;
}

export function PresetCard({ preset, isSelected, onClick }: PresetCardProps) {
  return (
    <button
      id={`btn-preset-${preset.id}`}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-300 w-full",
        "hover:shadow-lg hover:border-purple-500/50 hover:bg-purple-500/5",
        isSelected 
          ? "border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/50" 
          : "border-white/10 bg-black/40"
      )}
    >
      <h3 className="text-lg font-bold text-gray-100 mb-1">{preset.name}</h3>
      <div className="flex gap-2 text-xs text-gray-400 mt-2">
        <span className="bg-white/5 px-2 py-1 rounded-md border border-white/5">H: {preset.tone.harshness}</span>
        <span className="bg-white/5 px-2 py-1 rounded-md border border-white/5">D: {preset.tone.darkness}</span>
        <span className="bg-white/5 px-2 py-1 rounded-md border border-white/5">E: {preset.tone.elegance}</span>
      </div>
    </button>
  );
}
