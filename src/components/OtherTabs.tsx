import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StatusTabProps {
  // No props needed for now
}

export const StatusTab = ({}: StatusTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};

interface ServersTabProps {
  servers: Array<{
    name: string;
    load: number;
    ping: number;
    status: string;
  }>;
}

export const ServersTab = ({ servers }: ServersTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};

interface LogsTabProps {
  logs: Array<{
    time: string;
    type: string;
    message: string;
  }>;
}

export const LogsTab = ({ logs }: LogsTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};

interface HelpTabProps {
  // No props needed for now
}

export const HelpTab = ({}: HelpTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};
