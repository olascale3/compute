import { redirect } from 'next/navigation';
import { getSessionUser, getUserOrg } from '@/lib/auth';
import { Sidebar } from '@/components/dashboard/sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const membership = await getUserOrg(user.id);
  if (!membership) redirect('/onboarding');

  return (
    <div className="flex h-screen">
      <Sidebar orgName={membership.org_name} plan={membership.plan} />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
