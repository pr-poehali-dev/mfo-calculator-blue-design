import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Login() {
  const [loginData, setLoginData] = useState({
    phone: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация входа в систему
    console.log('Login:', loginData);
    // Здесь будет переход в личный кабинет
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация регистрации
    console.log('Register:', registerData);
    // Здесь будет переход в личный кабинет
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Banknote" className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">МФО Лайт</h1>
          </div>
          <p className="text-gray-600">Войдите в личный кабинет</p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-0">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Вход в систему</CardTitle>
                  <CardDescription>
                    Введите телефон и пароль для входа
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-phone">Номер телефона</Label>
                    <Input
                      id="login-phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={loginData.phone}
                      onChange={(e) => setLoginData({...loginData, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Введите пароль"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Запомнить меня</Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm text-primary">
                      Забыли пароль?
                    </Button>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Icon name="LogIn" className="h-4 w-4 mr-2" />
                    Войти
                  </Button>
                </form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Или войдите через</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <Icon name="Smartphone" className="h-4 w-4 mr-2" />
                      SMS
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Fingerprint" className="h-4 w-4 mr-2" />
                      Биометрия
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Регистрация</CardTitle>
                  <CardDescription>
                    Создайте аккаунт для управления займами
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="register-firstName">Имя</Label>
                      <Input
                        id="register-firstName"
                        placeholder="Имя"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-lastName">Фамилия</Label>
                      <Input
                        id="register-lastName"
                        placeholder="Фамилия"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="register-phone">Номер телефона</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Придумайте пароль"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Повторите пароль"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      Я согласен с{' '}
                      <Button variant="link" className="p-0 h-auto text-sm text-primary">
                        условиями использования
                      </Button>
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Icon name="UserPlus" className="h-4 w-4 mr-2" />
                    Создать аккаунт
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <Button variant="link" className="text-gray-600">
            <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
}