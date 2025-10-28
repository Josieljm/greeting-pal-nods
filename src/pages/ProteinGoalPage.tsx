import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const ProteinGoalPage = () => {
  const navigate = useNavigate();

  const macros = {
    protein: { current: 85, goal: 120, unit: "g" },
    carbs: { current: 180, goal: 220, unit: "g" },
    fats: { current: 45, goal: 60, unit: "g" },
  };

  const weeklyProtein = [
    { day: "Seg", value: 110 },
    { day: "Ter", value: 125 },
    { day: "Qua", value: 95 },
    { day: "Qui", value: 120 },
    { day: "Sex", value: 85 },
    { day: "Sáb", value: 130 },
    { day: "Dom", value: 105 },
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
            <h1 className="text-3xl font-bold">Metas de Macronutrientes</h1>
            <p className="text-muted-foreground">Acompanhe sua ingestão diária</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                Macros de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-secondary">{macros.protein.current}g</div>
                <div className="text-sm text-muted-foreground">Proteína</div>
                <div className="text-xs text-green-500 mt-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% vs ontem
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Proteína</span>
                    <span>{macros.protein.current}g / {macros.protein.goal}g</span>
                  </div>
                  <Progress 
                    value={(macros.protein.current / macros.protein.goal) * 100} 
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Carboidratos</span>
                    <span>{macros.carbs.current}g / {macros.carbs.goal}g</span>
                  </div>
                  <Progress 
                    value={(macros.carbs.current / macros.carbs.goal) * 100} 
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Gorduras</span>
                    <span>{macros.fats.current}g / {macros.fats.goal}g</span>
                  </div>
                  <Progress 
                    value={(macros.fats.current / macros.fats.goal) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Histórico Semanal - Proteína</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProtein.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.day}</span>
                      <span className="font-medium">{item.value}g / {macros.protein.goal}g</span>
                    </div>
                    <Progress 
                      value={(item.value / macros.protein.goal) * 100} 
                      className="h-1"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Ajustar Metas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Personalize suas metas de macronutrientes de acordo com seu objetivo.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Meta de Proteína</label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="flex-1">100g</Button>
                    <Button variant="nutrition" className="flex-1">120g</Button>
                    <Button variant="outline" className="flex-1">150g</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Objetivo</label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="flex-1">Perda</Button>
                    <Button variant="outline" className="flex-1">Manutenção</Button>
                    <Button variant="nutrition" className="flex-1">Ganho</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProteinGoalPage;
