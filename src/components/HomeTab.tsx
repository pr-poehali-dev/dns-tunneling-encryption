import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface HomeTabProps {
  isConnected: boolean;
  handleConnectionToggle: () => void;
  stats: {
    speed: string;
    latency: string;
    uptime: string;
    dataSaved: string;
  };
  speedData: Array<{ time: string; speed: number }>;
  latencyData: Array<{ time: string; latency: number }>;
  exportStats: (format: 'json' | 'csv' | 'txt') => void;
}

const HomeTab = ({ 
  isConnected, 
  handleConnectionToggle, 
  stats, 
  speedData, 
  latencyData, 
  exportStats 
}: HomeTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glassmorphism p-8 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
            isConnected ? 'animate-pulse-glow gradient-primary' : 'bg-muted'
          }`}>
            <Icon 
              name={isConnected ? "Shield" : "ShieldOff"} 
              size={64} 
              className="text-white"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {isConnected ? 'Защита активна' : 'Не защищено'}
            </h2>
            <Badge variant={isConnected ? "default" : "secondary"} className="text-lg px-4 py-1">
              {isConnected ? 'Подключено' : 'Отключено'}
            </Badge>
          </div>

          <Button
            size="lg"
            onClick={handleConnectionToggle}
            className={`w-64 h-14 text-lg font-semibold transition-all duration-300 ${
              isConnected 
                ? 'gradient-primary hover:opacity-90' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {isConnected ? 'Отключить' : 'Подключить'}
          </Button>
        </div>
      </Card>

      {isConnected && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
            <Card className="glassmorphism p-6">
              <div className="flex items-center space-x-3">
                <Icon name="Zap" size={24} className="text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Скорость</p>
                  <p className="text-xl font-bold">{stats.speed}</p>
                </div>
              </div>
            </Card>
            
            <Card className="glassmorphism p-6">
              <div className="flex items-center space-x-3">
                <Icon name="Timer" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Задержка</p>
                  <p className="text-xl font-bold">{stats.latency}</p>
                </div>
              </div>
            </Card>
            
            <Card className="glassmorphism p-6">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={24} className="text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Время работы</p>
                  <p className="text-xl font-bold">{stats.uptime}</p>
                </div>
              </div>
            </Card>
            
            <Card className="glassmorphism p-6">
              <div className="flex items-center space-x-3">
                <Icon name="Database" size={24} className="text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Данные</p>
                  <p className="text-xl font-bold">{stats.dataSaved}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            <Card className="glassmorphism p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">График скорости</h3>
                <Icon name="TrendingUp" size={20} className="text-accent" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={speedData}>
                  <defs>
                    <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 52%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(199, 89%, 52%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 18%)" />
                  <XAxis dataKey="time" stroke="hsl(240, 5%, 64.9%)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="hsl(240, 5%, 64.9%)" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(240, 10%, 8%)', 
                      border: '1px solid hsl(240, 6%, 18%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="speed" 
                    stroke="hsl(199, 89%, 52%)" 
                    strokeWidth={2}
                    fill="url(#speedGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="glassmorphism p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">График задержки</h3>
                <Icon name="Activity" size={20} className="text-primary" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 18%)" />
                  <XAxis dataKey="time" stroke="hsl(240, 5%, 64.9%)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="hsl(240, 5%, 64.9%)" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(240, 10%, 8%)', 
                      border: '1px solid hsl(240, 6%, 18%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    stroke="hsl(263, 70%, 63%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(263, 70%, 63%)', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="glassmorphism p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Экспорт статистики</h3>
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => exportStats('json')} variant="outline" className="flex-1 min-w-[120px]">
                <Icon name="FileJson" size={16} className="mr-2" />
                JSON
              </Button>
              <Button onClick={() => exportStats('csv')} variant="outline" className="flex-1 min-w-[120px]">
                <Icon name="Sheet" size={16} className="mr-2" />
                CSV
              </Button>
              <Button onClick={() => exportStats('txt')} variant="outline" className="flex-1 min-w-[120px]">
                <Icon name="FileText" size={16} className="mr-2" />
                TXT
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default HomeTab;
