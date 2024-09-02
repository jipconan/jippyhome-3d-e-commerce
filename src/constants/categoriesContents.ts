import {
  CategoriesPopOverContents,
  HomePageContentType,
  HomePageBenefitType,
} from "../types/categoryTypes";

// HomePage Category Contents
export const homePageCategoryContent: HomePageContentType[] = [
  {
    _id: "1",
    name: "Sofas",
    image: "/media/iconimages/fabricsofa-image-1.jpg",
  },
  {
    _id: "2",
    name: "Beds",
    image: "/media/iconimages/metalbedframe-image-1.jpg",
  },
  {
    _id: "3",
    name: "Mirrors",
    image: "/media/iconimages/mirror-image-1.jpg",
  },
  {
    _id: "4",
    name: "Chairs",
    image: "/media/iconimages/woodenchair-image-1.jpg",
  },
  {
    _id: "5",
    name: "Recliners",
    image: "/media/iconimages/reclinerchair-image-1.JPG",
  },
  {
    _id: "6",
    name: "Dining Chairs",
    image: "/media/iconimages/dininggreychair-image-1.JPG",
  },
  {
    _id: "7",
    name: "Cabinets",
    image: "/media/iconimages/cabinet-image-1.jpg",
  },
  {
    _id: "8",
    name: "Wardrobes",
    image: "/media/iconimages/wardrobe-image-1.jpg",
  },
  {
    _id: "9",
    name: "Shelves",
    image: "/media/iconimages/shelve-image-1.jpg",
  },
  {
    _id: "10",
    name: "Lamps",
    image: "/media/iconimages/lamp-image-1.jpg",
  },
  {
    _id: "11",
    name: "Rugs",
    image: "/media/iconimages/rug-image-1.jpg",
  },
  {
    _id: "12",
    name: "Tables",
    image: "/media/iconimages/woodenroundtable-image-1.JPG",
  },
];

// HomePage Benefits Contents
export const homePageBenefitsContent: HomePageBenefitType[] = [
  {
    image: "https://www.svgrepo.com/show/456869/dollar-paper.svg",
    heading: "Price Match Guarantee",
    description: "Found a better price? We’ll match it!",
  },
  {
    image: "https://www.svgrepo.com/show/395397/calender.svg",
    heading: "Furniture Protection",
    description: "Coverage starts the day your furniture arrives.",
  },
  {
    image: "https://www.svgrepo.com/show/532329/shield-check.svg",
    heading: "Easy Returns",
    description: "Not satisfied? Return within 30 days",
  },
  {
    image: "https://www.svgrepo.com/show/521010/truck-speed.svg",
    heading: "Expert Delivery and Setup",
    description: "Skilled professionals handle delivery and installation.",
  },
];

// CategoryBar Category Contents
export const categoriesContents: CategoriesPopOverContents = [
  {
    _id: "1",
    name: "Sofas",
    images: [
      "/media/categoryimages/sofa-image-1.JPG",
      "/media/categoryimages/sofa-image-2.JPG",
      "/media/categoryimages/sofa-image-3.JPG",
    ],
    subcategories: [
      {
        _id: "1-1",
        name: "Sofa by Material",
        subcategories: [
          { _id: "1-1-1", name: "Leather Sofas" },
          { _id: "1-1-2", name: "Fabric Sofas" },
          { _id: "1-1-3", name: "Rattan Sofas" },
        ],
      },
      {
        _id: "1-2",
        name: "Sofa by Type",
        subcategories: [
          { _id: "1-2-1", name: "Recliner Sofas" },
          { _id: "1-2-2", name: "Sleeper Sofas" },
          { _id: "1-2-3", name: "Sofa Beds" },
        ],
      },
    ],
  },
  {
    _id: "2",
    name: "Tables",
    images: [
      "/media/categoryimages/table-image-1.JPG",
      "/media/categoryimages/table-image-2.JPG",
      "/media/categoryimages/table-image-3.JPG",
    ],
    subcategories: [
      {
        _id: "2-1",
        name: "Table by Material",
        subcategories: [
          { _id: "2-1-1", name: "Wooden Tables" },
          { _id: "2-1-2", name: "Glass Tables" },
          { _id: "2-1-3", name: "Metal Tables" },
        ],
      },
      {
        _id: "2-2",
        name: "Table by Type",
        subcategories: [
          { _id: "2-2-1", name: "Coffee Tables" },
          { _id: "2-2-2", name: "Dining Tables" },
          { _id: "2-2-3", name: "Side Tables" },
        ],
      },
    ],
  },
  {
    _id: "3",
    name: "Chairs",
    images: [
      "/media/categoryimages/chair-image-1.JPG",
      "/media/categoryimages/chair-image-2.JPG",
      "/media/categoryimages/chair-image-3.JPG",
    ],
    subcategories: [
      {
        _id: "3-1",
        name: "Chair by Material",
        subcategories: [
          { _id: "3-1-1", name: "Leather Chairs" },
          { _id: "3-1-2", name: "Fabric Chairs" },
          { _id: "3-1-3", name: "Wooden Chairs" },
          { _id: "3-1-4", name: "Plastic Chairs" },
        ],
      },
      {
        _id: "3-2",
        name: "Chair by Type",
        subcategories: [
          { _id: "3-2-1", name: "Office Chairs" },
          { _id: "3-2-2", name: "Dining Chairs" },
          { _id: "3-2-3", name: "Recliners" },
        ],
      },
    ],
  },
  {
    _id: "4",
    name: "Beds",
    images: [
      "/media/categoryimages/bed-image-1.JPG",
      "/media/categoryimages/bed-image-2.JPG",
      "/media/categoryimages/bed-image-3.JPG",
    ],
    subcategories: [
      {
        _id: "4-1",
        name: "Bed frames by Style",
        subcategories: [
          { _id: "4-1-1", name: "Wooden Bed Frames" },
          { _id: "4-1-2", name: "Metal Bed Frames" },
          { _id: "4-1-3", name: "Bunk Bed Frames" },
        ],
      },
      {
        _id: "4-2",
        name: "Mattress by Size",
        subcategories: [
          { _id: "4-2-1", name: "King Mattress" },
          { _id: "4-2-2", name: "Queen Mattress" },
          { _id: "4-2-3", name: "Twin Mattress" },
          { _id: "4-2-4", name: "Single Mattress" },
        ],
      },
    ],
  },
  {
    _id: "5",
    name: "Storages",
    images: [
      "/media/categoryimages/storage-image-1.JPG",
      "/media/categoryimages/storage-image-2.JPG",
      "/media/categoryimages/storage-image-3.JPG",
    ],
    subcategories: [
      {
        _id: "5-1",
        name: "Storage by Type",
        subcategories: [
          { _id: "5-1-1", name: "Wardrobes" },
          { _id: "5-1-2", name: "Shelves" },
          { _id: "5-1-3", name: "Cabinets" },
        ],
      },
      {
        _id: "5-2",
        name: "Storage by Material",
        subcategories: [
          { _id: "5-2-1", name: "Wooden Storages" },
          { _id: "5-2-2", name: "Metal Storages" },
          { _id: "5-2-3", name: "Plastic Storages" },
        ],
      },
    ],
  },
  {
    _id: "6",
    name: "Decors",
    images: [
      "/media/categoryimages/decor-image-1.JPG",
      "/media/categoryimages/decor-image-2.JPG",
      "/media/categoryimages/decor-image-3.JPG",
    ],
    subcategories: [
      { _id: "6-1-1", name: "Lamps" },
      { _id: "6-1-2", name: "Mirrors" },
      { _id: "6-1-3", name: "Rugs" },
    ],
  },
  {
    _id: "7",
    name: "Spaces",
    images: [
      "/media/categoryimages/space-image-1.JPG",
      "/media/categoryimages/space-image-2.JPG",
      "/media/categoryimages/space-image-3.JPG",
    ],
    subcategories: [
      { _id: "7-1-1", name: "Living Room" },
      { _id: "7-1-2", name: "Bed room" },
      { _id: "7-1-3", name: "Kids Room" },
    ],
  },
];
