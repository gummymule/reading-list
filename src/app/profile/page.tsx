'use client';

import { BookOpen, Calendar, LogOut, Mail, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useReadingGoal } from '@/hooks/useReadingGoal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SetGoalDialog } from '@/components/SetGoalDialog';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { goal } = useReadingGoal();

  if (!user) return null; // RequireAuth sudah handle redirect, ini cuma jaga-jaga

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-serif text-3xl font-semibold">Profile</h1>

      <Card className="mb-4">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 font-serif text-xl font-semibold text-orange-700">
            {initials}
          </div>
          <div>
            <p className="font-serif text-lg font-semibold">{user.name}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Joined {joinedDate}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Reading Goal</p>
              <p className="text-sm text-muted-foreground">
                {goal
                  ? `${goal.current} / ${goal.target} books this year`
                  : 'Loading...'}
              </p>
            </div>
          </div>
          <SetGoalDialog />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Account</p>
              <p className="text-sm text-muted-foreground">Log out of your account</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => logout()}>
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}