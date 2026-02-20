import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Sidebar } from '@/components/dashboard/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const admin = createAdminClient();
  const { data: membership } = await admin
    .from('org_members')
    .select('org_id, role, organizations(name, plan)')
    .eq('user_id', user.id)
    .single();

  if (!membership) redirect('/onboarding');

  const org = membership.organizations as unknown as { name: string; plan: string };

  return (
    <div className="flex h-screen">
      <Sidebar orgName={org.name} plan={org.plan} />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
