export const ContentType = {
  Youtube: "Youtube",
  Twitter: "Twitter",
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];
