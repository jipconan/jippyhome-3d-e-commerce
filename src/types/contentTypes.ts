// Defines possible types of content like headings, text, and links.
export type ContentType =
  | "heading"
  | "text"
  | "bold"
  | "underline"
  | "link"
  | "question"
  | "answer";

// Represents basic content structure with optional type and required text.
export type BaseContent = {
  type?: ContentType;
  text: string;
};

// Extends BaseContent with font styling for headings.
export type HeadingContent = BaseContent & {
  type: "heading";
};

// Represents plain text content without additional styling.
export type TextContent = BaseContent & {
  type?: "text";
};

// Represents bold text content with optional font styling.
export type BoldTextContent = BaseContent & {
  type: "bold";
};

export type UnderlineTextContent = BaseContent & {
  type: "underline";
};

// Represents content with a link including URL and attributes.
export type LinkContent = BaseContent & {
  type: "link";
  href: string;
  target: string;
  rel: string;
};

// Represents a question in FAQ content.
export type QuestionContent = BaseContent & {
  type: "question";
};

// Represents an answer in FAQ content.
export type AnswerContent = BaseContent & {
  type: "answer";
};

// Defines a collection of different content types used in a page.
export type PageContent = (
  | HeadingContent
  | TextContent
  | BoldTextContent
  | UnderlineTextContent
  | LinkContent
  | QuestionContent
  | AnswerContent
)[];
