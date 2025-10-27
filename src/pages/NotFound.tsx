import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SEO 
        title="404 - Page Not Found | BetterFocus"
        description="The page you're looking for doesn't exist. Return to BetterFocus home page."
      />
      <Card className="max-w-md w-full p-8 glass text-center space-y-6 animate-scale-in">
        <div className="text-primary text-8xl font-bold glow-text animate-pulse-slow">404</div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-gradient-primary glow-primary w-full sm:w-auto hover-lift">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="hover-lift">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
