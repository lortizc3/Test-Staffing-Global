import { useEffect, useState } from 'react';
import { usersApi } from '../../api/users.api';
import type { User } from '../../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    usersApi
      .list()
      .then(setUsers)
      .finally(() => setIsLoading(false));
  }, []);

  return { users, isLoading };
}
