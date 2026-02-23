import * as prismic from "@prismicio/client";

/**
 * Prismic configuration
 *
 * ✅ Works on Vercel (server env vars) and locally (.env.local)
 * ✅ Accepts either PRISMIC_REPO_NAME or NEXT_PUBLIC_PRISMIC_REPO_NAME
 * ✅ Accepts either PRISMIC_ACCESS_TOKEN or PRISMIC_TOKEN
 */
export const repositoryName =
  process.env.PRISMIC_REPO_NAME || process.env.NEXT_PUBLIC_PRISMIC_REPO_NAME;

export const accessToken =
  process.env.PRISMIC_ACCESS_TOKEN || process.env.PRISMIC_TOKEN;

export const createClient = () => {
  if (!repositoryName) {
    throw new Error(
      [
        "Missing Prismic repository name.",
        "Set PRISMIC_REPO_NAME in Vercel → Project → Settings → Environment Variables (and in .env.local for local dev).",
        "Example: PRISMIC_REPO_NAME=your-repo-name",
      ].join(" ")
    );
  }

  const endpoint = prismic.getRepositoryEndpoint(repositoryName);

  return prismic.createClient(endpoint, {
    accessToken,
  });
};

export { prismic };
