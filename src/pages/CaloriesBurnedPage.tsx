import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Flame, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const CaloriesBurnedPage = () => {
  const navigate = useNavigate();

  const weeklyData = [
    { day: "Seg", calories: 350 },
    { day: "Ter", calories: 420 },
    { day: "Qua", calories: 380 },
    { day: "Qui", calories: 450 },
    { day: "Sex", calories: 420 },
    { day: "Sáb", calories: 500 },
    { day: "Dom", calories: 300 },
  ];

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Calorias Queimadas</h1>
            <p className="text-muted-foreground">Histórico de atividades e metas</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary" />
                Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary">420</div>
                <div className="text-sm text-muted-foreground">kcal queimadas</div>
                <div className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% vs ontem
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meta Diária</span>
                  <span>420 / 500 kcal</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Histórico Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.day}</span>
                      <span className="font-medium">{item.calories} kcal</span>
                    </div>
                    <Progress value={(item.calories / 500) * 100} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Ajustar Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Sua meta atual é queimar 500 kcal por dia. Ajuste conforme seu objetivo fitness.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">300 kcal</Button>
                <Button variant="outline" className="flex-1">500 kcal</Button>
                <Button variant="fitness" className="flex-1">700 kcal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CaloriesBurnedPage;
