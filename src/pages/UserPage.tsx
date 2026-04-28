import { useEffect, useState } from 'react';

import type { User } from '@/types/user';
import { getUserProfile } from '@/services/userApi';

import ErrorMessage from '@/components/ui/ErrorMessage';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserProfile()
      .then(setUser)
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <main className="mx-auto max-w-xl px-4 py-8">
        <ErrorMessage error={error} />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-4 py-8">
        <span className="loading loading-spinner loading-md" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <section className="card bg-base-100 w-full shadow-md">
        <div className="card-body">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="card-title text-2xl">
                {user.name || 'User Profile'}
              </h1>
              <p className="text-base-content/70">{user.email}</p>
            </div>

            <span
              className={
                user.isActive ? 'badge badge-success' : 'badge badge-outline'
              }
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="divider" />

          <dl className="space-y-3">
            <div className="flex justify-between gap-4">
              <dt className="font-medium">User ID</dt>
              <dd>{user.id}</dd>
            </div>

            {user.createdAt && (
              <div className="flex justify-between gap-4">
                <dt className="font-medium">Created</dt>
                <dd>{formatDate(user.createdAt)}</dd>
              </div>
            )}

            {user.updatedAt && (
              <div className="flex justify-between gap-4">
                <dt className="font-medium">Updated</dt>
                <dd>{formatDate(user.updatedAt)}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </main>
  );
};

export default UserPage;
