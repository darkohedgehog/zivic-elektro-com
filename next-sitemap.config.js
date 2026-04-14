/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const nodePath = require("node:path");

const SITE_URL = "https://www.zivic-elektro.com";

const STATIC_ROUTE_SETTINGS = {
  "/": { changefreq: "weekly", priority: 1.0 },
  "/o-nama": { changefreq: "monthly", priority: 0.8 },
  "/usluge": { changefreq: "monthly", priority: 0.8 },
  "/kontakt": { changefreq: "monthly", priority: 0.8 },
  "/kategorije": { changefreq: "daily", priority: 0.9 },
  "/proizvodi": { changefreq: "daily", priority: 0.9 },
  "/pravila-privatnosti": { changefreq: "yearly", priority: 0.5 },
  "/prigovor": { changefreq: "yearly", priority: 0.5 },
  "/uvjeti-koristenja": { changefreq: "yearly", priority: 0.4 },
};

function parseDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((accumulator, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return accumulator;
      }

      const separatorIndex = trimmedLine.indexOf("=");

      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "");

      accumulator[key] = value;
      return accumulator;
    }, {});
}

const localEnv = parseDotEnvFile(nodePath.join(process.cwd(), ".env.local"));

function readEnv(name) {
  return process.env[name] || localEnv[name];
}

function createLastmod(config) {
  return config.autoLastmod ? new Date().toISOString() : undefined;
}

function createUrlEntry(config, routePath, overrides = {}) {
  return {
    loc: routePath,
    changefreq: overrides.changefreq || config.changefreq,
    priority:
      typeof overrides.priority === "number" ? overrides.priority : config.priority,
    lastmod: createLastmod(config),
  };
}

function createWooRequestError(response) {
  return new Error(
    `WooCommerce sitemap request failed with status ${response.status} ${response.statusText}.`,
  );
}

async function fetchWooAllPages(endpoint) {
  const baseUrl = readEnv("WC_BASE_URL");
  const consumerKey = readEnv("WC_CONSUMER_KEY") || readEnv("WC_KEY");
  const consumerSecret =
    readEnv("WC_CONSUMER_SECRET") || readEnv("WC_SECRET");

  if (!baseUrl || !consumerKey || !consumerSecret) {
    throw new Error(
      "Missing WooCommerce environment variables needed for sitemap generation.",
    );
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const authorization = Buffer.from(
    `${consumerKey}:${consumerSecret}`,
  ).toString("base64");
  const items = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const response = await fetch(
      `${normalizedBaseUrl}/wp-json/wc/v3${endpoint}${separator}page=${page}`,
      {
        headers: {
          Authorization: `Basic ${authorization}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw createWooRequestError(response);
    }

    const pageItems = await response.json();

    items.push(...pageItems);
    totalPages = Number(response.headers.get("x-wp-totalpages") || "1");
    page += 1;
  }

  return items;
}

async function getDynamicRouteEntries() {
  const [categories, products] = await Promise.all([
    fetchWooAllPages(
      "/products/categories?per_page=100&hide_empty=true&orderby=name&order=asc",
    ),
    fetchWooAllPages(
      "/products?per_page=100&status=publish&orderby=date&order=desc",
    ),
  ]);

  return [
    ...categories.map((category) => ({
      path: `/kategorije/${category.slug}`,
      changefreq: "weekly",
      priority: category.parent === 0 ? 0.8 : 0.7,
    })),
    ...products.map((product) => ({
      path: `/proizvodi/${product.slug}`,
      changefreq: "weekly",
      priority: 0.7,
    })),
  ];
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  autoLastmod: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  transform: async (config, routePath) => {
    return createUrlEntry(
      config,
      routePath,
      STATIC_ROUTE_SETTINGS[routePath],
    );
  },
  additionalPaths: async (config) => {
    const dynamicEntries = await getDynamicRouteEntries();

    return dynamicEntries.map((entry) =>
      createUrlEntry(config, entry.path, entry),
    );
  },
};
