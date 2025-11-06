// in components/subscribe-button.tsx
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';

export async function SubscribeButton() {
  const session = await auth();
  if (!session?.user?.id) {
    return <div>Not logged in</div>;
  }

  const userId = session.user.id;

  // Check the database for their *current* status
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { razorpaySubscriptionId: true }
  });

  // --- 1. IF THEY ARE ALREADY SUBSCRIBED ---
  // Show a "Manage/Cancel" button
  if (user?.razorpaySubscriptionId) {
    return (
      <div>
        <p><strong>Status: Pro User</strong></p>
        <form action={async () => {
          'use server';
          // This is a MOCK "Cancel" action
          await prisma.user.update({
            where: { id: userId },
            data: {
              razorpaySubscriptionId: null,
              razorpayPlanId: null
            }
          });

          // Refresh the page to show the new state
          revalidatePath('/dashboard');
        }}>
          <Button type="submit" variant="secondary">Cancel Subscription (Mock)</Button>
        </form>
      </div>
    );
  }

  // --- 2. IF THEY ARE NOT SUBSCRIBED ---
  // Show the "Subscribe" button
  return (
    <form action={async () => {
      'use server';

      // Simulate network delay for the "payment"
      await new Promise(res => setTimeout(res, 1000));

      // Update the database. This is the "payment success" step.
      await prisma.user.update({
        where: { id: userId },
        data: {
          razorpaySubscriptionId: `sub_mock_${Date.now()}`,
          razorpayPlanId: 'pro_plan_mock'
        }
      });

      // Refresh the page to show the new state
      revalidatePath('/dashboard');
    }}>
      <Button type="submit">Subscribe to Pro (Mock)</Button>
    </form>
  );
}