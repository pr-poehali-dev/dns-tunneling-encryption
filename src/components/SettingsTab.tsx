import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface SettingsTabProps {
  autoConnect: boolean;
  setAutoConnect: (value: boolean) => void;
}

const SettingsTab = ({ autoConnect, setAutoConnect }: SettingsTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
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
    </div>
  );
};

export default SettingsTab;
