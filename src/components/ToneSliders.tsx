import { OverrideProfile } from "@/lib/types";

interface ToneSlidersProps {
  tone: { harshness: number; darkness: number; elegance: number };
  onChange: (tone: { harshness: number; darkness: number; elegance: number }) => void;
}

export function ToneSliders({ tone, onChange }: ToneSlidersProps) {
  const handleChange = (key: keyof typeof tone, value: number) => {
    onChange({ ...tone, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-1">Tone Adjustments</h3>
        <p className="text-sm text-gray-400">Override the preset's emotional tone</p>
      </div>
      
      <div className="space-y-5 bg-white/5 border border-white/10 p-5 rounded-xl">
        {(["harshness", "darkness", "elegance"] as const).map((key) => (
          <div key={key} className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-300 capitalize">{key}</span>
              <span className="text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {tone[key].toFixed(2)}
              </span>
            </div>
            <input
              id={`slider-tone-${key}`}
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={tone[key]}
              onChange={(e) => handleChange(key, parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500 transition-all hover:accent-purple-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
