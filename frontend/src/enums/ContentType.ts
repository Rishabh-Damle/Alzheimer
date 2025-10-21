export const ContentType = {
  Youtube: "Youtube",
  Twitter: "Twitter",
  Documents: "Documents",
  Github: "Github",
  Instagram: "Instagram",
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];
