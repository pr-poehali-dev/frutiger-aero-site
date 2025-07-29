import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  album: string;
  plays: number;
  likes: number;
  shares: number;
}

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([30]);

  const tracks: Track[] = [
    {
      id: 1,
      title: "Crystalline Dreams",
      artist: "Aurora Synthesis",
      duration: "3:42",
      album: "Digital Nature",
      plays: 1240,
      likes: 89,
      shares: 12
    },
    {
      id: 2,
      title: "Floating Memories",
      artist: "Ethereal Flow",
      duration: "4:15",
      album: "Weightless",
      plays: 890,
      likes: 156,
      shares: 24
    },
    {
      id: 3,
      title: "Neon Waters",
      artist: "Liquid Light",
      duration: "2:58",
      album: "Aqua Vibes",
      plays: 2150,
      likes: 203,
      shares: 31
    },
    {
      id: 4,
      title: "Glass Harmony",
      artist: "Transparent Soul",
      duration: "5:22",
      album: "Vista Dreams",
      plays: 567,
      likes: 78,
      shares: 9
    }
  ];

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleShare = (track: Track) => {
    navigator.clipboard.writeText(`Слушаю "${track.title}" от ${track.artist}`);
  };

  return (
    <div className="min-h-screen p-4 overflow-hidden relative">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 bg-frutiger-cyan/30 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-frutiger-purple/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-frutiger-green/25 rounded-full animate-bubble" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-frutiger-coral/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-frutiger-cyan to-frutiger-purple bg-clip-text text-transparent mb-2">
            Frutiger Media Player
          </h1>
          <p className="text-white/70">Погрузись в кристально чистое звучание</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Controls */}
          <div className="lg:col-span-2">
            <Card className="glass p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-frutiger-cyan to-frutiger-purple rounded-xl flex items-center justify-center animate-glow">
                  <Icon name="Music" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {currentTrack?.title || "Выберите трек"}
                  </h3>
                  <p className="text-white/70">
                    {currentTrack?.artist || "Исполнитель"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-sm">
                    {currentTrack?.duration || "0:00"}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/50 mt-1">
                  <span>1:15</span>
                  <span>{currentTrack?.duration || "0:00"}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button className="glass-button">
                  <Icon name="SkipBack" size={20} />
                </Button>
                <Button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="glass-button w-12 h-12 rounded-full bg-gradient-to-r from-frutiger-cyan to-frutiger-purple hover:from-frutiger-cyan/80 hover:to-frutiger-purple/80"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                </Button>
                <Button className="glass-button">
                  <Icon name="SkipForward" size={20} />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Icon name="Volume2" size={16} className="text-white/70" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-white/70 text-sm w-8">{volume[0]}%</span>
              </div>
            </Card>

            {/* Library */}
            <Card className="glass p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="Library" size={24} />
                Библиотека
              </h2>
              <div className="space-y-3">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className={`glass p-4 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer ${
                      currentTrack?.id === track.id ? 'bg-white/25 border-frutiger-cyan' : ''
                    }`}
                    onClick={() => handlePlay(track)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-frutiger-purple to-frutiger-coral rounded-lg flex items-center justify-center">
                        <Icon name="Music" size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{track.title}</h4>
                        <p className="text-white/70 text-sm">{track.artist} • {track.album}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/70 text-sm">{track.duration}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-white/50">{track.plays} plays</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Social Panel */}
          <div className="space-y-6">
            {/* Now Playing Social */}
            {currentTrack && (
              <Card className="glass p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Icon name="Share2" size={20} />
                  Поделиться
                </h3>
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleShare(currentTrack)}
                    className="glass-button w-full justify-start gap-2"
                  >
                    <Icon name="Copy" size={16} />
                    Копировать ссылку
                  </Button>
                  <Button className="glass-button w-full justify-start gap-2">
                    <Icon name="MessageCircle" size={16} />
                    В социальные сети
                  </Button>
                  <Button className="glass-button w-full justify-start gap-2">
                    <Icon name="Send" size={16} />
                    Отправить другу
                  </Button>
                </div>
              </Card>
            )}

            {/* Stats */}
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Статистика
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Прослушано сегодня</span>
                  <span className="text-frutiger-cyan font-semibold">24 трека</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Любимый жанр</span>
                  <span className="text-frutiger-purple font-semibold">Ambient</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Время прослушивания</span>
                  <span className="text-frutiger-green font-semibold">2ч 15м</span>
                </div>
              </div>
            </Card>

            {/* Popular Tracks */}
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Icon name="Star" size={20} />
                Популярное
              </h3>
              <div className="space-y-3">
                {tracks.slice(0, 3).map((track, index) => (
                  <div key={track.id} className="glass p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-frutiger-cyan to-frutiger-coral rounded-lg flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">{track.title}</p>
                        <p className="text-white/60 text-xs">{track.artist}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Heart" size={12} className="text-frutiger-coral" />
                        <span className="text-xs text-white/70">{track.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;