import { LanguageProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface PresetCardProps {
  preset: LanguageProfile;
  isSelected: boolean;
  onClick: () => void;
  isCustom?: boolean;
  onDelete?: () => void;
}

export function PresetCard({ preset, isSelected, onClick, isCustom = false, onDelete }: PresetCardProps) {
  return (
    <button
      id={`btn-preset-${preset.id}`}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 w-full min-w-0",
        "hover:shadow-lg hover:border-purple-500/50 hover:bg-purple-500/5",
        isSelected 
          ? "border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/50" 
          : "border-white/10 bg-black/40"
      )}
    >
      <div className="flex items-center gap-2 truncate">
        <h3 className="text-sm font-bold text-gray-100 truncate">{preset.name}</h3>
        {isCustom && (
          <span className="shrink-0 text-[10px] font-bold tracking-wider bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30 uppercase">
            Custom
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-3">
        <div className="flex gap-1.5 text-[10px] text-gray-400">
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-center min-w-[3ch]" title="Harshness">H:{preset.tone.harshness.toFixed(1)}</span>
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-center min-w-[3ch]" title="Darkness">D:{preset.tone.darkness.toFixed(1)}</span>
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-center min-w-[3ch]" title="Elegance">E:{preset.tone.elegance.toFixed(1)}</span>
        </div>
        {isCustom && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded transition-colors ml-1"
            title="Delete Custom Preset"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </button>
  );
}
