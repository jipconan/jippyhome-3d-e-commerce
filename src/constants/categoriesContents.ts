import { HomeCategoryProps } from "../types/propsTypes";
import { CategoriesPopOverContents } from "../types/categoryTypes";

// HomePage Category Contents
export const homePageCategoryContent: HomeCategoryProps[] = [
  {
    src: "/media/homepagebutton1.png",
    alt: "Category1",
    link: "/store/category1",
    buttonText: "Category1",
  },
  {
    src: "/media/homepagebutton2.png",
    alt: "Category2",
    link: "/store/category2",
    buttonText: "Category2",
  },
  {
    src: "/media/homepagebutton3.png",
    alt: "Category3",
    link: "/store/category3",
    buttonText: "Category3",
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
          { _id: "1-1-1", name: "Leather Sofa" },
          { _id: "1-1-2", name: "Fabric Sofa" },
          { _id: "1-1-3", name: "Rattan Sofa" },
        ],
      },
      {
        _id: "1-2",
        name: "Sofa by Type",
        subcategories: [
          { _id: "1-2-1", name: "Sectional Sofa" },
          { _id: "1-2-2", name: "Sleeper Sofa" },
          { _id: "1-2-3", name: "Recliner Sofa" },
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
          { _id: "2-1-1", name: "Wooden Table" },
          { _id: "2-1-2", name: "Glass Table" },
          { _id: "2-1-3", name: "Metal Table" },
        ],
      },
      {
        _id: "2-2",
        name: "Table by Type",
        subcategories: [
          { _id: "2-2-1", name: "Coffee Table" },
          { _id: "2-2-2", name: "Dining Table" },
          { _id: "2-2-3", name: "Side Table" },
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
          { _id: "3-1-1", name: "Leather Chair" },
          { _id: "3-1-2", name: "Fabric Chair" },
          { _id: "3-1-3", name: "Wooden Chair" },
        ],
      },
      {
        _id: "3-2",
        name: "Chair by Type",
        subcategories: [
          { _id: "3-2-1", name: "Office Chair" },
          { _id: "3-2-2", name: "Dining Chair" },
          { _id: "3-2-3", name: "Accent Chair" },
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
        name: "Bed by Size",
        subcategories: [
          { _id: "4-1-1", name: "King Bed" },
          { _id: "4-1-2", name: "Queen Bed" },
          { _id: "4-1-3", name: "Twin Bed" },
        ],
      },
      {
        _id: "4-2",
        name: "Bed by Style",
        subcategories: [
          { _id: "4-2-1", name: "Platform Bed" },
          { _id: "4-2-2", name: "Sleigh Bed" },
          { _id: "4-2-3", name: "Canopy Bed" },
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
          { _id: "5-1-1", name: "Wardrobe" },
          { _id: "5-1-2", name: "Bookshelf" },
          { _id: "5-1-3", name: "Cabinet" },
        ],
      },
      {
        _id: "5-2",
        name: "Storage by Material",
        subcategories: [
          { _id: "5-2-1", name: "Wooden Storage" },
          { _id: "5-2-2", name: "Metal Storage" },
          { _id: "5-2-3", name: "Plastic Storage" },
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
