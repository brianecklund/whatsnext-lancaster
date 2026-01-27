import * as prismic from "@prismicio/client";

export const repositoryName = process.env.PRISMIC_REPO_NAME;

export const createClient = () => {
  if (!repositoryName) {
    throw new Error(
      "Missing PRISMIC_REPO_NAME. Set it in .env.local (local) or Netlify environment variables."
    );
  }

  return prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  });
};

export { prismic };
