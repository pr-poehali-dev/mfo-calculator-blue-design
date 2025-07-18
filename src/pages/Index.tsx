import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [loanAmount, setLoanAmount] = useState([50000]);
  const [loanTerm, setLoanTerm] = useState([30]);
  const [documentStatus, setDocumentStatus] = useState('pending');
  const [applicationStep, setApplicationStep] = useState(1);

  const calculatePayment = () => {
    const principal = loanAmount[0];
    const rate = 0.015; // 1.5% в месяц
    const term = loanTerm[0];
    const monthlyPayment = Math.round(principal * (rate + (rate / (Math.pow(1 + rate, term) - 1))));
    const totalPayment = monthlyPayment * term;
    const overpayment = totalPayment - principal;
    
    return { monthlyPayment, totalPayment, overpayment };
  };

  const { monthlyPayment, totalPayment, overpayment } = calculatePayment();

  const faqData = [
    {
      question: "Какие документы нужны для получения займа?",
      answer: "Для получения займа необходимы: паспорт РФ, СНИЛС, справка о доходах или трудовая книжка. Дополнительно может потребоваться справка из банка о движении средств."
    },
    {
      question: "За какое время рассматривается заявка?",
      answer: "Заявка рассматривается в течение 15 минут. После одобрения деньги поступают на карту в течение 1 часа."
    },
    {
      question: "Можно ли досрочно погасить займ?",
      answer: "Да, досрочное погашение возможно без штрафов и комиссий. Проценты пересчитываются за фактический период пользования займом."
    },
    {
      question: "Какая максимальная сумма займа?",
      answer: "Максимальная сумма займа составляет 500 000 рублей для постоянных клиентов. Для новых клиентов лимит может быть ограничен."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Banknote" className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">МФО Лайт</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#calculator" className="text-gray-600 hover:text-primary transition-colors">Калькулятор</a>
              <a href="#application" className="text-gray-600 hover:text-primary transition-colors">Заявка</a>
              <a href="#conditions" className="text-gray-600 hover:text-primary transition-colors">Условия</a>
              <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
              <a href="#contacts" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="Phone" className="h-4 w-4 mr-2" />
              Позвонить
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Займы до 500 000 ₽
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Быстрое решение за 15 минут. Деньги на карту в течение часа.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Icon name="Calculator" className="h-5 w-5 mr-2" />
                Рассчитать займ
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Icon name="FileText" className="h-5 w-5 mr-2" />
                Подать заявку
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Калькулятор займа</h3>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" className="h-6 w-6" />
                  Рассчитайте условия займа
                </CardTitle>
                <CardDescription>
                  Настройте параметры займа и получите расчет платежей
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Сумма займа: {loanAmount[0].toLocaleString()} ₽
                      </Label>
                      <Slider
                        value={loanAmount}
                        onValueChange={setLoanAmount}
                        max={500000}
                        min={10000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>10 000 ₽</span>
                        <span>500 000 ₽</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Срок займа: {loanTerm[0]} дней
                      </Label>
                      <Slider
                        value={loanTerm}
                        onValueChange={setLoanTerm}
                        max={365}
                        min={7}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>7 дней</span>
                        <span>365 дней</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">Расчет платежей</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Ежемесячный платеж:</span>
                        <span className="font-bold text-primary">{monthlyPayment.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Общая сумма к возврату:</span>
                        <span className="font-bold">{totalPayment.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Переплата:</span>
                        <span className="text-red-600 font-bold">{overpayment.toLocaleString()} ₽</span>
                      </div>
                      <div className="pt-3 border-t">
                        <Badge variant="secondary" className="w-full justify-center">
                          Ставка: 1.5% в месяц
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Icon name="Send" className="h-5 w-5 mr-2" />
                    Подать заявку на этих условиях
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="application" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Подача заявки</h3>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" className="h-6 w-6" />
                  Заявка на займ
                </CardTitle>
                <CardDescription>
                  Шаг {applicationStep} из 3 - Заполните данные для получения займа
                </CardDescription>
                <Progress value={applicationStep * 33.33} className="mt-2" />
              </CardHeader>
              <CardContent>
                <Tabs value={`step-${applicationStep}`} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="step-1">Личные данные</TabsTrigger>
                    <TabsTrigger value="step-2">Документы</TabsTrigger>
                    <TabsTrigger value="step-3">Подтверждение</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="step-1" className="space-y-4 mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Имя</Label>
                        <Input id="firstName" placeholder="Введите ваше имя" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input id="lastName" placeholder="Введите вашу фамилию" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" placeholder="+7 (___) ___-__-__" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="passport">Серия и номер паспорта</Label>
                      <Input id="passport" placeholder="1234 567890" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={() => setApplicationStep(2)}>
                        Далее
                        <Icon name="ChevronRight" className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="step-2" className="space-y-4 mt-6">
                    <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <Icon name="Upload" className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium mb-2">Загрузите документы</h4>
                      <p className="text-gray-600 mb-4">Перетащите файлы сюда или нажмите для выбора</p>
                      <Button variant="outline">
                        <Icon name="Camera" className="h-4 w-4 mr-2" />
                        Выбрать файлы
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon name="IdCard" className="h-8 w-8 text-blue-600" />
                            <div>
                              <h5 className="font-medium">Паспорт РФ</h5>
                              <p className="text-sm text-gray-600">Разворот с фото</p>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              {documentStatus === 'pending' ? 'Ожидает' : 'Проверено'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon name="CreditCard" className="h-8 w-8 text-green-600" />
                            <div>
                              <h5 className="font-medium">СНИЛС</h5>
                              <p className="text-sm text-gray-600">Обе стороны</p>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              {documentStatus === 'pending' ? 'Ожидает' : 'Проверено'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setApplicationStep(1)}>
                        <Icon name="ChevronLeft" className="h-4 w-4 mr-2" />
                        Назад
                      </Button>
                      <Button onClick={() => setApplicationStep(3)}>
                        Далее
                        <Icon name="ChevronRight" className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="step-3" className="space-y-4 mt-6">
                    <div className="text-center p-8">
                      <Icon name="CheckCircle" className="h-16 w-16 mx-auto text-green-600 mb-4" />
                      <h4 className="text-xl font-bold mb-2">Заявка готова к отправке</h4>
                      <p className="text-gray-600 mb-6">
                        Проверьте данные перед отправкой. Решение будет принято в течение 15 минут.
                      </p>
                      
                      <div className="bg-blue-50 p-6 rounded-lg mb-6">
                        <h5 className="font-medium mb-4">Система проверки данных</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Icon name="Shield" className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Проверка в БКИ</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Database" className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Верификация документов</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="TrendingUp" className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Анализ платежеспособности</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setApplicationStep(2)}>
                          <Icon name="ChevronLeft" className="h-4 w-4 mr-2" />
                          Назад
                        </Button>
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                          <Icon name="Send" className="h-5 w-5 mr-2" />
                          Отправить заявку
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Условия займа</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Zap" className="h-6 w-6 text-yellow-500" />
                    Быстро
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="Clock" className="h-4 w-4 text-green-600" />
                      <span>Решение за 15 минут</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CreditCard" className="h-4 w-4 text-green-600" />
                      <span>Деньги на карту за 1 час</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Smartphone" className="h-4 w-4 text-green-600" />
                      <span>Онлайн заявка</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Percent" className="h-6 w-6 text-blue-500" />
                    Выгодно
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="TrendingDown" className="h-4 w-4 text-green-600" />
                      <span>Ставка от 1.5% в месяц</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Ban" className="h-4 w-4 text-green-600" />
                      <span>Без скрытых комиссий</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="RotateCcw" className="h-4 w-4 text-green-600" />
                      <span>Досрочное погашение</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Shield" className="h-6 w-6 text-green-500" />
                    Надежно
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="Award" className="h-4 w-4 text-green-600" />
                      <span>Лицензия ЦБ РФ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Lock" className="h-4 w-4 text-green-600" />
                      <span>Защита данных</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Users" className="h-4 w-4 text-green-600" />
                      <span>500 000+ клиентов</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h3>
            
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-12">Контакты</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Phone" className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Телефон</h4>
                  <p className="text-gray-600">8 (800) 555-0123</p>
                  <p className="text-sm text-gray-500">Звонок по России бесплатный</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Mail" className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-gray-600">info@mfo-light.ru</p>
                  <p className="text-sm text-gray-500">Ответим в течение часа</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="MapPin" className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Адрес</h4>
                  <p className="text-gray-600">Москва, ул. Примерная, 123</p>
                  <p className="text-sm text-gray-500">Офис открыт 24/7</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Banknote" className="h-6 w-6" />
                <h4 className="text-xl font-bold">МФО Лайт</h4>
              </div>
              <p className="text-gray-400">
                Быстрые займы с выгодными условиями и надежной защитой данных.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Займы физлицам</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Рефинансирование</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Автокредиты</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Информация</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Лицензии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Конфиденциальность</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 МФО Лайт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}