export interface Items {
  id: bigint;
  name: string;
  topic: string;
  picture: string;
  cost: bigint;
  info: string;
  country: string;
  release: bigint;
  badges: {
    id: bigint;
    material: string;
    kind: string;
    fastening: string;
    badgesTags: {
      id: bigint;
    };
  };
  books: {
    id: bigint;
    author: string;
    pages: bigint;
    publishingHouse: string;
    booksTags: {
      id: bigint;
    };
  };
  coins: {
    id: bigint;
    kind: string;
    size: bigint;
    metal: string;
    coinsTags: {
      id: bigint;
    };
  };
  stamps: {
    id: bigint;
    perforation: boolean;
    value: bigint;
    color: string;
    stampsTags: {
      id: bigint;
    };
  };
  wine: {
    id: bigint;
    alcohol: bigint;
    sugar: bigint;
    kind: string;
    wineTags: {
      id: bigint;
    };
  };
}
