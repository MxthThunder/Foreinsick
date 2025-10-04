import { useState, useEffect } from 'react';
import { Calendar, Play, Pause } from 'lucide-react';

interface TemporalSliderProps {
  minDate: Date;
  maxDate: Date;
  onDateChange: (date: Date) => void;
  activeConnections: number;
  floating?: boolean;
}

export default function TemporalSlider({ minDate, maxDate, onDateChange, activeConnections, floating = false }: TemporalSliderProps) {
  const [currentDate, setCurrentDate] = useState<Date>(maxDate);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentDay = Math.ceil((currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentDate(prev => {
        const nextDay = new Date(prev);
        nextDay.setDate(nextDay.getDate() + 1);

        if (nextDay > maxDate) {
          setIsPlaying(false);
          return maxDate;
        }

        return nextDay;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, maxDate]);

  useEffect(() => {
    onDateChange(currentDate);
  }, [currentDate, onDateChange]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = parseInt(e.target.value);
    const newDate = new Date(minDate);
    newDate.setDate(newDate.getDate() + day);
    setCurrentDate(newDate);
    setIsPlaying(false);
  };

  const containerClass = floating
    ? 'fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#FF9AA2] shadow-2xl z-40'
    : 'bg-card border rounded-lg';

  return (
    <div className={containerClass}>
      <div className={floating ? 'max-w-7xl mx-auto px-6 py-4' : 'px-4 py-4'}>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-shrink-0 p-3 bg-[#FF9AA2] text-white rounded-lg hover:bg-[#FF8A94] transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-sm font-semibold text-[#333333]">
                  {currentDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="text-sm font-medium text-[#333333]">
                Active Connections: <span className="text-[#FF9AA2] font-bold">{activeConnections}</span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max={totalDays}
              value={currentDay}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer temporal-slider"
              style={{
                background: `linear-gradient(to right, #FF9AA2 0%, #FF9AA2 ${(currentDay / totalDays) * 100}%, #E5E5E5 ${(currentDay / totalDays) * 100}%, #E5E5E5 100%)`
              }}
            />

            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">
                {minDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-xs text-gray-500">
                {maxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
