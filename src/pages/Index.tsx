import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import HomeTab from '@/components/HomeTab';
import SettingsTab from '@/components/SettingsTab';
import { StatusTab, ServersTab, LogsTab, HelpTab } from '@/components/OtherTabs';

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

          <TabsContent value="home">
            <HomeTab
              isConnected={isConnected}
              handleConnectionToggle={handleConnectionToggle}
              stats={stats}
              speedData={speedData}
              latencyData={latencyData}
              exportStats={exportStats}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab
              autoConnect={autoConnect}
              setAutoConnect={setAutoConnect}
            />
          </TabsContent>

          <TabsContent value="status">
            <StatusTab />
          </TabsContent>

          <TabsContent value="servers">
            <ServersTab servers={servers} />
          </TabsContent>

          <TabsContent value="logs">
            <LogsTab logs={logs} />
          </TabsContent>

          <TabsContent value="help">
            <HelpTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
