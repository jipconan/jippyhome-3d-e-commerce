// Represents a subcategory with an optional array of further subcategories.
export type Subcategory = {
  _id: string;
  name: string;
  parentId?: string | null;
  description: string;
  categoryType: string;
  level: number;
  landingPageImage: string;
  thumbnailImage: string;
  gridImages: string[];
  iconImage: string;
  backgroundImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subcategories?: Subcategory[];
};

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Represents a subcategory with array of mini categories. (popover content)
export type SubCategoryPopOver = {
  _id: string;
  name: string;
  subcategories?: SubCategoryPopOver[];
};

// Represents a main category with an array of subcategories. (popover content)
export type CategoryPopOver = {
  _id: string;
  name: string;
  images: string[];
  subcategories?: SubCategoryPopOver[];
};

// Represents the structure of all categories content. (popover content)
export type CategoriesPopOverContents = CategoryPopOver[];

// Represents a subcategory with array of mini categories. (HomePage content)
export type HomePageContentType = {
  _id: string;
  name: string;
  image: string;
};

export type HomePageBenefitType = {
  image: string;
  heading: string;
  description: string;
};
