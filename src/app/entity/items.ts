export interface Items {
  id: bigint;
  name: string;
  topic: string;
  picture: string;
  cost: string;
  info: string;
  country: string;
  release: string;
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
    pages: string;
    publishingHouse: string;
    booksTags: {
      id: bigint;
    };
  };
  coins: {
    id: bigint;
    kind: string;
    size: string;
    metal: string;
    coinsTags: {
      id: bigint;
    };
  };
  stamps: {
    id: bigint;
    perforation: string;
    value: string;
    color: string;
    stampsTags: {
      id: bigint;
    };
  };
  wine: {
    id: bigint;
    alcohol: string;
    sugar: string;
    kind: string;
    wineTags: {
      id: bigint;
    };
  };
}
