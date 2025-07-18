import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Dashboard() {
  const [user] = useState({
    name: 'Александр Петров',
    phone: '+7 (903) 123-45-67',
    email: 'alex@example.com',
    creditRating: 785,
    totalLoans: 3,
    totalAmount: 150000
  });

  const [activeLoans] = useState([
    {
      id: 1,
      amount: 50000,
      remainingAmount: 35000,
      rate: 1.5,
      nextPayment: 15500,
      nextPaymentDate: '2024-08-15',
      status: 'active',
      term: 12,
      remainingTerm: 8
    },
    {
      id: 2,
      amount: 100000,
      remainingAmount: 80000,
      rate: 1.8,
      nextPayment: 18200,
      nextPaymentDate: '2024-08-20',
      status: 'active',
      term: 24,
      remainingTerm: 18
    }
  ]);

  const [transactions] = useState([
    {
      id: 1,
      type: 'payment',
      amount: 15500,
      date: '2024-07-15',
      description: 'Погашение займа #1',
      status: 'completed'
    },
    {
      id: 2,
      type: 'loan',
      amount: 100000,
      date: '2024-07-10',
      description: 'Получение займа #2',
      status: 'completed'
    },
    {
      id: 3,
      type: 'payment',
      amount: 18200,
      date: '2024-07-05',
      description: 'Погашение займа #2',
      status: 'completed'
    },
    {
      id: 4,
      type: 'fee',
      amount: 500,
      date: '2024-06-28',
      description: 'Комиссия за досрочное погашение',
      status: 'completed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment': return 'ArrowDown';
      case 'loan': return 'ArrowUp';
      case 'fee': return 'Minus';
      default: return 'DollarSign';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payment': return 'text-red-600';
      case 'loan': return 'text-green-600';
      case 'fee': return 'text-orange-600';
      default: return 'text-gray-600';
    }
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
                <Icon name="Bell" className="h-4 w-4 mr-2" />
                Уведомления
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.phone}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Кредитный рейтинг</p>
                  <p className="text-2xl font-bold text-green-600">{user.creditRating}</p>
                </div>
                <Icon name="TrendingUp" className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Активные займы</p>
                  <p className="text-2xl font-bold">{activeLoans.length}</p>
                </div>
                <Icon name="FileText" className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Общая сумма займов</p>
                  <p className="text-2xl font-bold">{user.totalAmount.toLocaleString()} ₽</p>
                </div>
                <Icon name="DollarSign" className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Доступный лимит</p>
                  <p className="text-2xl font-bold text-green-600">350 000 ₽</p>
                </div>
                <Icon name="CreditCard" className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Loans */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="h-5 w-5" />
                  Активные займы
                </CardTitle>
                <CardDescription>
                  Управление текущими займами и платежами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeLoans.map((loan) => (
                    <Card key={loan.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">Займ #{loan.id}</h4>
                            <Badge className={getStatusColor(loan.status)}>
                              {loan.status === 'active' ? 'Активный' : 'Просроченный'}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{loan.amount.toLocaleString()} ₽</p>
                            <p className="text-sm text-gray-600">Ставка: {loan.rate}%</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Погашено</span>
                              <span>{((loan.amount - loan.remainingAmount) / loan.amount * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={(loan.amount - loan.remainingAmount) / loan.amount * 100} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Остаток к погашению</p>
                              <p className="font-semibold">{loan.remainingAmount.toLocaleString()} ₽</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Следующий платеж</p>
                              <p className="font-semibold">{loan.nextPayment.toLocaleString()} ₽</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div>
                              <p className="text-sm text-gray-600">Дата следующего платежа</p>
                              <p className="font-medium">{new Date(loan.nextPaymentDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Icon name="DollarSign" className="h-4 w-4 mr-1" />
                                Оплатить
                              </Button>
                              <Button size="sm" variant="outline">
                                <Icon name="FileText" className="h-4 w-4 mr-1" />
                                Детали
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button className="w-full">
                    <Icon name="Plus" className="h-4 w-4 mr-2" />
                    Оформить новый займ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" className="h-5 w-5" />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Calculator" className="h-4 w-4 mr-2" />
                  Калькулятор займа
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Download" className="h-4 w-4 mr-2" />
                  Скачать справку
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="MessageCircle" className="h-4 w-4 mr-2" />
                  Поддержка
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Settings" className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
              </CardContent>
            </Card>

            {/* Payment Reminder */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Icon name="Clock" className="h-5 w-5" />
                  Напоминание
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 mb-3">
                  Следующий платеж через 3 дня
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Сумма:</span>
                    <span className="font-semibold">15 500 ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Дата:</span>
                    <span className="font-semibold">15 августа</span>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3 bg-orange-600 hover:bg-orange-700">
                  Оплатить сейчас
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="History" className="h-5 w-5" />
                История операций
              </CardTitle>
              <CardDescription>
                Последние транзакции по вашим займам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Тип</TableHead>
                    <TableHead>Описание</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon 
                            name={getTransactionIcon(transaction.type)} 
                            className={`h-4 w-4 ${getTransactionColor(transaction.type)}`} 
                          />
                          <span className="capitalize text-sm">
                            {transaction.type === 'payment' ? 'Платеж' : 
                             transaction.type === 'loan' ? 'Займ' : 'Комиссия'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell className={`text-right font-medium ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === 'payment' || transaction.type === 'fee' ? '-' : '+'}
                        {transaction.amount.toLocaleString()} ₽
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          Выполнено
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}