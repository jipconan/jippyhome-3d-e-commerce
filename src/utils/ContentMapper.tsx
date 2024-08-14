// src/utils/contentMapper.tsx
import { Heading, Text } from "@chakra-ui/react";
import {
  LinkContent,
  HeadingContent,
  BoldTextContent,
  UnderlineTextContent,
  TextContent,
  QuestionContent,
  AnswerContent,
} from "../types/contentTypes";

// Define a mapper function for different content types
export const contentMapper = (
  content:
    | HeadingContent
    | BoldTextContent
    | UnderlineTextContent
    | TextContent
    | LinkContent
    | QuestionContent
    | AnswerContent
) => {
  switch (content.type) {
    // Render a heading element with large font size and bold weight
    case "heading":
      return (
        <Heading fontSize="4xl" fontWeight="bold" py={8}>
          {content.text}
        </Heading>
      );

    // Render bold text
    case "bold":
      return <Text fontWeight="bold">{content.text}</Text>;

    // Render bold text
    case "underline":
      return <Text textDecoration="underline">{content.text}</Text>;

    // Render normal text
    case "text":
      return <Text>{content.text}</Text>;

    // Render a link with specific attributes and styling
    case "link":
      return (
        <a
          href={content.href}
          target={content.target}
          rel={content.rel}
          style={{
            color: "black",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          {content.text}
        </a>
      );

    // Render a question with larger font size and bold weight
    case "question":
      return (
        <Text fontSize="2xl" fontWeight="bold">
          {content.text}
        </Text>
      );

    // Render an answer with larger font size
    case "answer":
      return <Text fontSize="2xl">{content.text}</Text>;

    // Return null for unsupported content types
    default:
      return null;
  }
};
