import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: 'Александр',
    lastName: 'Петров',
    phone: '+7 (903) 123-45-67',
    email: 'alex@example.com',
    birthDate: '1990-05-15',
    passport: '1234 567890',
    address: 'Москва, ул. Примерная, 123',
    creditRating: 785,
    accountStatus: 'verified'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    marketing: false
  });

  const [security, setSecurity] = useState({
    twoFA: false,
    biometric: true,
    autoLogout: true
  });

  const [documents] = useState([
    {
      id: 1,
      type: 'passport',
      name: 'Паспорт РФ',
      status: 'verified',
      uploadDate: '2024-01-15',
      expiryDate: '2025-05-15'
    },
    {
      id: 2,
      type: 'snils',
      name: 'СНИЛС',
      status: 'verified',
      uploadDate: '2024-01-15',
      expiryDate: null
    },
    {
      id: 3,
      type: 'income',
      name: 'Справка о доходах',
      status: 'pending',
      uploadDate: '2024-07-10',
      expiryDate: '2025-01-10'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Проверен';
      case 'pending': return 'На проверке';
      case 'expired': return 'Просрочен';
      default: return 'Неизвестно';
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика обновления профиля
    console.log('Updating profile:', profile);
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityToggle = (key: string) => {
    setSecurity(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Banknote" className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">МФО Лайт</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
                К займам
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="text-lg">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold mb-1">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{profile.email}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Статус аккаунта</span>
                    <Badge className={getStatusColor(profile.accountStatus)}>
                      {profile.accountStatus === 'verified' ? 'Верифицирован' : 'Не верифицирован'}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Кредитный рейтинг</span>
                      <span className="text-sm font-semibold text-green-600">
                        {profile.creditRating}
                      </span>
                    </div>
                    <Progress value={profile.creditRating / 10} className="h-2" />
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  <Icon name="Camera" className="h-4 w-4 mr-2" />
                  Изменить фото
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Профиль</TabsTrigger>
                <TabsTrigger value="documents">Документы</TabsTrigger>
                <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                <TabsTrigger value="security">Безопасность</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="User" className="h-5 w-5" />
                      Личные данные
                    </CardTitle>
                    <CardDescription>
                      Обновите вашу личную информацию
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Имя</Label>
                          <Input
                            id="firstName"
                            value={profile.firstName}
                            onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Фамилия</Label>
                          <Input
                            id="lastName"
                            value={profile.lastName}
                            onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="birthDate">Дата рождения</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profile.birthDate}
                          onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit">
                          <Icon name="Save" className="h-4 w-4 mr-2" />
                          Сохранить изменения
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="FileText" className="h-5 w-5" />
                      Документы
                    </CardTitle>
                    <CardDescription>
                      Управление загруженными документами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <Card key={doc.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Icon name="FileText" className="h-8 w-8 text-blue-600" />
                                <div>
                                  <h4 className="font-semibold">{doc.name}</h4>
                                  <p className="text-sm text-gray-600">
                                    Загружен: {new Date(doc.uploadDate).toLocaleDateString()}
                                  </p>
                                  {doc.expiryDate && (
                                    <p className="text-sm text-gray-600">
                                      Действителен до: {new Date(doc.expiryDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(doc.status)}>
                                  {getStatusText(doc.status)}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  <Icon name="Download" className="h-4 w-4 mr-1" />
                                  Скачать
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Icon name="Upload" className="h-4 w-4 mr-1" />
                                  Обновить
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <Icon name="Upload" className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 mb-2">Загрузить новый документ</p>
                      <Button variant="outline">
                        <Icon name="Plus" className="h-4 w-4 mr-2" />
                        Выбрать файл
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Bell" className="h-5 w-5" />
                      Уведомления
                    </CardTitle>
                    <CardDescription>
                      Настройте способы получения уведомлений
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email уведомления</Label>
                          <p className="text-sm text-gray-600">
                            Получать уведомления о платежах и займах на email
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={() => handleNotificationToggle('email')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications">SMS уведомления</Label>
                          <p className="text-sm text-gray-600">
                            Получать SMS о важных событиях
                          </p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={() => handleNotificationToggle('sms')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications">Push уведомления</Label>
                          <p className="text-sm text-gray-600">
                            Получать push уведомления в приложении
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={() => handleNotificationToggle('push')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing-notifications">Маркетинговые уведомления</Label>
                          <p className="text-sm text-gray-600">
                            Получать информацию о новых продуктах и акциях
                          </p>
                        </div>
                        <Switch
                          id="marketing-notifications"
                          checked={notifications.marketing}
                          onCheckedChange={() => handleNotificationToggle('marketing')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Shield" className="h-5 w-5" />
                      Безопасность
                    </CardTitle>
                    <CardDescription>
                      Настройки безопасности вашего аккаунта
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-fa">Двухфакторная аутентификация</Label>
                          <p className="text-sm text-gray-600">
                            Дополнительная защита с помощью SMS-кодов
                          </p>
                        </div>
                        <Switch
                          id="two-fa"
                          checked={security.twoFA}
                          onCheckedChange={() => handleSecurityToggle('twoFA')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="biometric">Биометрическая аутентификация</Label>
                          <p className="text-sm text-gray-600">
                            Вход с помощью отпечатка пальца или Face ID
                          </p>
                        </div>
                        <Switch
                          id="biometric"
                          checked={security.biometric}
                          onCheckedChange={() => handleSecurityToggle('biometric')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-logout">Автоматический выход</Label>
                          <p className="text-sm text-gray-600">
                            Автоматический выход из системы при бездействии
                          </p>
                        </div>
                        <Switch
                          id="auto-logout"
                          checked={security.autoLogout}
                          onCheckedChange={() => handleSecurityToggle('autoLogout')}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Изменить пароль</h4>
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="current-password">Текущий пароль</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="new-password">Новый пароль</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="w-fit">
                          <Icon name="Lock" className="h-4 w-4 mr-2" />
                          Изменить пароль
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Alert>
                      <Icon name="AlertTriangle" className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Удаление аккаунта:</strong> Если вы хотите удалить свой аккаунт, 
                        обратитесь в службу поддержки. Это действие необратимо.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}