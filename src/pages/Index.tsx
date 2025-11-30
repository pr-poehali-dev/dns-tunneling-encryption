import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

type TabType = 'home' | 'settings' | 'status' | 'servers' | 'logs' | 'help';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isConnected, setIsConnected] = useState(false);
  const [autoConnect, setAutoConnect] = useState(true);
  const [speedData, setSpeedData] = useState<Array<{ time: string; speed: number }>>([]);
  const [latencyData, setLatencyData] = useState<Array<{ time: string; latency: number }>>([]);

  const stats = {
    speed: '128.5 Mbps',
    latency: '12 ms',
    uptime: '4h 32m',
    dataSaved: '2.4 GB'
  };

  const servers = [
    { name: 'Москва #1', load: 45, ping: 8, status: 'online' },
    { name: 'Санкт-Петербург', load: 62, ping: 15, status: 'online' },
    { name: 'Казань', load: 34, ping: 22, status: 'online' },
    { name: 'Владивосток', load: 78, ping: 89, status: 'online' }
  ];

  const logs = [
    { time: '14:32:18', type: 'success', message: 'DNS запрос успешно зашифрован' },
    { time: '14:32:15', type: 'info', message: 'Подключение к серверу установлено' },
    { time: '14:32:10', type: 'warning', message: 'Попытка блокировки обнаружена и обойдена' },
    { time: '14:31:55', type: 'success', message: 'Туннель активирован' }
  ];

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        
        setSpeedData(prev => {
          const newData = [...prev, { time: timeStr, speed: Math.floor(Math.random() * 50) + 100 }];
          return newData.slice(-20);
        });
        
        setLatencyData(prev => {
          const newData = [...prev, { time: timeStr, latency: Math.floor(Math.random() * 10) + 8 }];
          return newData.slice(-20);
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const handleConnectionToggle = () => {
    const newState = !isConnected;
    setIsConnected(newState);
    
    if (newState) {
      toast({
        title: "✅ Подключено",
        description: "DNS Shield активирован. Ваше соединение защищено.",
      });
    } else {
      toast({
        title: "⚠️ Отключено",
        description: "DNS Shield деактивирован. Соединение не защищено.",
        variant: "destructive"
      });
      setSpeedData([]);
      setLatencyData([]);
    }
  };

  const exportStats = (format: 'json' | 'csv' | 'txt') => {
    const statsData = {
      timestamp: new Date().toISOString(),
      status: isConnected ? 'connected' : 'disconnected',
      speed: stats.speed,
      latency: stats.latency,
      uptime: stats.uptime,
      dataSaved: stats.dataSaved,
      servers,
      logs
    };

    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'json') {
      content = JSON.stringify(statsData, null, 2);
      filename = `dns-shield-stats-${Date.now()}.json`;
      mimeType = 'application/json';
    } else if (format === 'csv') {
      content = `Параметр,Значение\nСтатус,${statsData.status}\nСкорость,${stats.speed}\nЗадержка,${stats.latency}\nВремя работы,${stats.uptime}\nДанные,${stats.dataSaved}`;
      filename = `dns-shield-stats-${Date.now()}.csv`;
      mimeType = 'text/csv';
    } else {
      content = `DNS Shield - Статистика\n\nДата: ${new Date().toLocaleString()}\nСтатус: ${statsData.status}\nСкорость: ${stats.speed}\nЗадержка: ${stats.latency}\nВремя работы: ${stats.uptime}\nДанные: ${stats.dataSaved}`;
      filename = `dns-shield-stats-${Date.now()}.txt`;
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "📥 Экспорт завершён",
      description: `Статистика сохранена в формате ${format.toUpperCase()}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <div className="container mx-auto p-4 max-w-6xl">
        <header className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold gradient-text mb-2">DNS Shield</h1>
          <p className="text-muted-foreground">Безопасный DNS с шифрованием и туннелированием</p>
        </header>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full glassmorphism p-1">
            <TabsTrigger value="home" className="data-[state=active]:gradient-primary">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:gradient-primary">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:gradient-primary">
              <Icon name="Activity" size={18} className="mr-2" />
              Статус
            </TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:gradient-primary">
              <Icon name="Server" size={18} className="mr-2" />
              Серверы
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:gradient-primary">
              <Icon name="FileText" size={18} className="mr-2" />
              Логи
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:gradient-primary">
              <Icon name="HelpCircle" size={18} className="mr-2" />
              Справка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 animate-fade-in">
            <Card className="glassmorphism p-6">
              <h3 className="text-xl font-bold mb-4">Основные настройки</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Power" size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold">Автоматическое подключение</p>
                      <p className="text-sm text-muted-foreground">Включать при запуске приложения</p>
                    </div>
                  </div>
                  <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Lock" size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold">DNS-over-HTTPS (DoH)</p>
                      <p className="text-sm text-muted-foreground">Шифрование DNS запросов</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold">Блокировка рекламы</p>
                      <p className="text-sm text-muted-foreground">Фильтровать рекламные запросы</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Shuffle" size={20} className="text-primary" />
                    <div>
                      <p className="font-semibold">Ротация серверов</p>
                      <p className="text-sm text-muted-foreground">Автоматическая смена для надёжности</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-4 animate-fade-in">
            <Card className="glassmorphism p-6">
              <h3 className="text-xl font-bold mb-4">Статус соединения</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Качество соединения</span>
                    <span className="text-sm text-muted-foreground">Отлично</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Уровень шифрования</span>
                    <span className="text-sm text-muted-foreground">256-bit AES</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Загрузка сервера</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle2" size={20} className="text-green-500" />
                    <span className="text-sm">IPv4 защищён</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle2" size={20} className="text-green-500" />
                    <span className="text-sm">IPv6 защищён</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle2" size={20} className="text-green-500" />
                    <span className="text-sm">DNS утечек нет</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle2" size={20} className="text-green-500" />
                    <span className="text-sm">WebRTC защищён</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="servers" className="space-y-4 animate-fade-in">
            <Card className="glassmorphism p-6">
              <h3 className="text-xl font-bold mb-4">Доступные серверы</h3>
              
              <div className="space-y-3">
                {servers.map((server, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card/70 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <Icon name="Server" size={24} className="text-primary" />
                      <div>
                        <p className="font-semibold">{server.name}</p>
                        <p className="text-sm text-muted-foreground">Ping: {server.ping} ms</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Загрузка</p>
                        <p className="font-semibold">{server.load}%</p>
                      </div>
                      <Badge variant={server.status === 'online' ? 'default' : 'secondary'}>
                        {server.status === 'online' ? 'Онлайн' : 'Офлайн'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4 animate-fade-in">
            <Card className="glassmorphism p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Журнал событий</h3>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт
                </Button>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-all"
                  >
                    <span className="text-muted-foreground">{log.time}</span>
                    <Icon
                      name={
                        log.type === 'success' ? 'CheckCircle2' :
                        log.type === 'warning' ? 'AlertTriangle' :
                        'Info'
                      }
                      size={16}
                      className={
                        log.type === 'success' ? 'text-green-500 mt-0.5' :
                        log.type === 'warning' ? 'text-yellow-500 mt-0.5' :
                        'text-blue-500 mt-0.5'
                      }
                    />
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-4 animate-fade-in">
            <Card className="glassmorphism p-6">
              <h3 className="text-xl font-bold mb-4">Справка и поддержка</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card/50">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
                    Что такое DNS Shield?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    DNS Shield — это приложение для защиты ваших DNS-запросов с помощью шифрования и туннелирования. 
                    Оно помогает обходить блокировки операторов и защищает вашу приватность в интернете.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card/50">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Icon name="Shield" size={20} className="mr-2 text-primary" />
                    Как это работает?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Приложение шифрует все DNS-запросы по протоколу DNS-over-HTTPS (DoH) и направляет их через защищённые серверы, 
                    делая невозможным их перехват или блокировку.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card/50">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Icon name="Mail" size={20} className="mr-2 text-primary" />
                    Техническая поддержка
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Если у вас возникли проблемы или вопросы, свяжитесь с нами:
                  </p>
                  <div className="flex flex-col space-y-2">
                    <a href="mailto:support@dnsshield.com" className="text-sm text-primary hover:underline">
                      support@dnsshield.com
                    </a>
                    <a href="https://t.me/dnsshield" className="text-sm text-primary hover:underline">
                      Telegram: @dnsshield
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-lg gradient-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Версия приложения</p>
                      <p className="text-sm text-white/80">v1.0.0 (build 2024.11)</p>
                    </div>
                    <Icon name="Package" size={32} className="text-white/50" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;