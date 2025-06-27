import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "@/pages/Home";
import Results from "@/pages/Results";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/results/:shareUrl" component={Results} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-cosmic-dark">
        <Navigation />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
