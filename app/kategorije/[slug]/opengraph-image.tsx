import { ImageResponse } from "next/og";
import {
  findCategoryBySlug,
  getAllCategories,
  getChildCategories,
  stripHtml,
  truncateText,
} from "@/lib/woocommerce";

export const alt = "Živić-Elektro kategorija proizvoda";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const revalidate = 300;
export const runtime = "nodejs";

type CategoryImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const DESCRIPTION_FALLBACK =
  "Organizovan pregled proizvoda i asortimana unutar Živić-Elektro kataloga.";
const MAX_TAGS = 4;

const colors = {
  background: "#0D1321",
  panel: "#1D2D44",
  elevated: "#3E5C76",
  muted: "#748CAB",
  text: "#F0EBD8",
  border: "rgba(116, 140, 171, 0.20)",
  borderStrong: "rgba(116, 140, 171, 0.32)",
  panelSoft: "rgba(29, 45, 68, 0.72)",
  pill: "rgba(29, 45, 68, 0.64)",
};

export default async function CategoryOpengraphImage({
  params,
}: CategoryImageProps) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = findCategoryBySlug(categories, slug);
  const categoryName = category?.name || "Kategorija nije pronađena";
  const titleLines = createTitleLines(categoryName);
  const description = getCategorySupportingText(category?.description);
  const subcategoryLabels = category
    ? getChildCategories(categories, category.id)
        .slice(0, MAX_TAGS)
        .map((childCategory) => childCategory.name)
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          padding: "54px 58px",
          background: colors.background,
          backgroundImage: [
            "radial-gradient(circle at 18% 14%, rgba(116, 140, 171, 0.13), transparent 26%)",
            "radial-gradient(circle at 78% 82%, rgba(62, 92, 118, 0.16), transparent 30%)",
            "linear-gradient(160deg, #0D1321 0%, #132033 58%, #0D1321 100%)",
          ].join(", "),
          color: colors.text,
          fontFamily:
            '"Geist", "Arial", "Helvetica Neue", Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "36px",
            borderRadius: "32px",
            border: `1px solid ${colors.border}`,
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 32px 80px rgba(3, 6, 11, 0.26)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "860px",
            }}
          >
            <span
              style={{
                display: "flex",
                marginBottom: "28px",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: colors.muted,
              }}
            >
              Kategorija proizvoda
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                maxWidth: "900px",
              }}
            >
              {titleLines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  style={{
                    display: "block",
                    fontSize: "62px",
                    lineHeight: 1.02,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: colors.text,
                  }}
                >
                  {line}
                </span>
              ))}
            </div>

            <p
              style={{
                display: "flex",
                maxWidth: "760px",
                marginTop: "26px",
                marginBottom: "0",
                fontSize: "25px",
                lineHeight: 1.45,
                fontWeight: 500,
                color: colors.muted,
              }}
            >
              {description}
            </p>

            {subcategoryLabels.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "28px",
                  maxWidth: "820px",
                }}
              >
                {subcategoryLabels.map((subcategory) => (
                  <span
                    key={subcategory}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px 18px",
                      borderRadius: "999px",
                      border: `1px solid ${colors.borderStrong}`,
                      background: colors.pill,
                      color: colors.text,
                      fontSize: "20px",
                      lineHeight: 1,
                      fontWeight: 500,
                    }}
                  >
                    {subcategory}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "6px",
                padding: "18px 20px",
                borderRadius: "22px",
                border: `1px solid ${colors.border}`,
                background: colors.panelSoft,
              }}
            >
              <span
                style={{
                  display: "flex",
                  fontSize: "24px",
                  lineHeight: 1.2,
                  fontWeight: 600,
                  color: colors.text,
                }}
              >
                Živić-Elektro
              </span>
              <span
                style={{
                  display: "flex",
                  fontSize: "19px",
                  lineHeight: 1.2,
                  fontWeight: 500,
                  color: colors.muted,
                }}
              >
                zivic-elektro.com
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "112px",
            right: "92px",
            width: "260px",
            height: "260px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(116, 140, 171, 0.10) 0%, rgba(116, 140, 171, 0.02) 44%, transparent 74%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "84px",
            left: "78px",
            width: "340px",
            height: "220px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(62, 92, 118, 0.12) 0%, rgba(62, 92, 118, 0.02) 48%, transparent 78%)",
          }}
        />
      </div>
    ),
    size,
  );
}

function getCategorySupportingText(description?: string): string {
  const cleanDescription = stripHtml(description || "").trim();

  if (!cleanDescription) {
    return DESCRIPTION_FALLBACK;
  }

  return truncateText(cleanDescription, 150);
}

function createTitleLines(title: string): [string, string?] {
  const truncated = truncateTitle(title, 62);
  const words = truncated.split(/\s+/).filter(Boolean);

  if (words.length <= 2) {
    return [truncated];
  }

  const totalLength = words.join(" ").length;
  const midpoint = Math.ceil(totalLength / 2);
  const firstLineWords: string[] = [];
  let consumedLength = 0;

  for (const word of words) {
    const nextLength =
      consumedLength === 0 ? word.length : consumedLength + 1 + word.length;

    if (nextLength > midpoint && firstLineWords.length > 0) {
      break;
    }

    firstLineWords.push(word);
    consumedLength = nextLength;
  }

  const secondLineWords = words.slice(firstLineWords.length);

  if (secondLineWords.length === 0) {
    return [firstLineWords.join(" ")];
  }

  return [firstLineWords.join(" "), secondLineWords.join(" ")];
}

function truncateTitle(title: string, maxLength: number): string {
  if (title.length <= maxLength) {
    return title;
  }

  const truncated = title.slice(0, maxLength).trimEnd();
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.6) {
    return `${truncated.slice(0, lastSpace)}…`;
  }

  return `${truncated}…`;
}
