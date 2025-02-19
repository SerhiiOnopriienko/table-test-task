import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserStore {
  users: User[];
  error: string | null;
  displayCount: number;
  currentPage: number;
  fetchUsers: () => Promise<void>;
  setDisplayCount: (count: number) => void;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  sortUsersFromBigger: () => void;
  sortUsersFromLower: () => void;
}

const useStore = create<UserStore>((set, get) => ({
  users: [],
  error: null,
  displayCount: 5,
  currentPage: 1,
  fetchUsers: async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const users = await response.json();
      set({ users: users });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  setDisplayCount: (count) => set({ displayCount: count, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  nextPage: () => {
    const { currentPage, displayCount, users } = get();
    const totalPages = Math.ceil(users.length / displayCount);
    if (currentPage < totalPages) {
      set({ currentPage: currentPage + 1 });
    }
  },
  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },
  sortUsersFromBigger: () => {
    set((state) => ({
      users: state.users.sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        } else if (a.id < b.id) {
          return 1;
        } else {
          return 0;
        }
      }),
    }));
  },
  sortUsersFromLower: () => {
    set((state) => ({
      users: state.users.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      }),
    }));
  },
}));

export default useStore;
