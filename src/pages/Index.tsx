
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InboxContent } from "@/components/InboxContent";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">LinkedIn CRM</h1>
            <div className="flex gap-4">
              <Link to="/">
                <Button variant="ghost">Inbox</Button>
              </Link>
              <Link to="/accounts">
                <Button variant="ghost">Accounts</Button>
              </Link>
              <Link to="/leads">
                <Button variant="ghost">Leads</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/accounts">
                <Button className="w-full justify-start" variant="outline">
                  Manage Accounts
                </Button>
              </Link>
              <Link to="/leads">
                <Button className="w-full justify-start" variant="outline">
                  Add Leads
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No recent activity to display.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <InboxContent />
        </div>
      </div>
    </div>
  );
}
