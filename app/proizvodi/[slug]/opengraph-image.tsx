import { ImageResponse } from "next/og";
import { getProductBySlug, getProductImage } from "@/lib/woocommerce";

export const alt = "Živić-Elektro katalog proizvoda";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const revalidate = 300;
export const runtime = "nodejs";

const ALLOWED_PRODUCT_IMAGE_HOSTS = new Set([
  "localhost",
  "wp.zivic-elektro.shop",
  "res.cloudinary.com",
  "images.unsplash.com",
  "assets.aceternity.com",
  "api.microlink.io",
]);

type ProductImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const colors = {
  background: "#0D1321",
  panel: "#1D2D44",
  panelSoft: "rgba(29, 45, 68, 0.78)",
  frame: "#F4F1E8",
  frameInner: "#FBF8F1",
  frameBorder: "rgba(13, 19, 33, 0.08)",
  text: "#F0EBD8",
  muted: "#748CAB",
  mutedSoft: "rgba(116, 140, 171, 0.18)",
  shadow: "rgba(3, 6, 11, 0.34)",
};

export default async function ProductOpengraphImage({
  params,
}: ProductImageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const image = product ? getProductImage(product) : null;
  const imageSource = await createDataUrlFromImage(image?.src);
  const title = product?.name || "Proizvod nije pronađen";
  const titleLines = createTitleLines(title);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          padding: "52px 56px",
          background: colors.background,
          backgroundImage: [
            "radial-gradient(circle at 16% 18%, rgba(116, 140, 171, 0.12), transparent 28%)",
            "radial-gradient(circle at 80% 18%, rgba(29, 45, 68, 0.34), transparent 34%)",
            "linear-gradient(180deg, #0D1321 0%, #101828 55%, #0D1321 100%)",
          ].join(", "),
          color: colors.text,
          fontFamily:
            '"Geist", "Arial", "Helvetica Neue", Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0) 35%)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: "72px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "500px",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: "26px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                maxHeight: "480px",
                borderRadius: "36px",
                border: `1px solid ${colors.frameBorder}`,
                background: [
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(240, 235, 216, 0.98))",
                  colors.frame,
                ].join(", "),
                boxShadow: [
                  "0 30px 60px rgba(3, 6, 11, 0.22)",
                  "0 10px 24px rgba(3, 6, 11, 0.12)",
                  "inset 0 1px 0 rgba(255, 255, 255, 0.68)",
                ].join(", "),
                overflow: "hidden",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "18px",
                  display: "flex",
                  borderRadius: "26px",
                  border: `1px solid rgba(13, 19, 33, 0.06)`,
                  background: [
                    "radial-gradient(circle at top, rgba(255, 255, 255, 0.72), transparent 48%)",
                    `linear-gradient(180deg, ${colors.frameInner} 0%, ${colors.frame} 100%)`,
                  ].join(", "),
                }}
              />

              {imageSource ? (
                <img
                  src={imageSource}
                  alt={title}
                  style={{
                    display: "flex",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "54px",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "18px",
                    width: "100%",
                    height: "100%",
                    padding: "48px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "110px",
                      height: "110px",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "30px",
                      background: "rgba(13, 19, 33, 0.05)",
                      color: colors.panel,
                      fontSize: "34px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    ZE
                  </div>
                  <span
                    style={{
                      display: "flex",
                      maxWidth: "280px",
                      color: colors.panel,
                      fontSize: "24px",
                      lineHeight: 1.3,
                      fontWeight: 600,
                    }}
                  >
                    Vizual proizvoda trenutno nije dostupan
                  </span>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "34px 0 26px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "26px",
                paddingTop: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {titleLines.map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                    style={{
                      display: "block",
                      maxWidth: "520px",
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

              <span
                style={{
                  display: "flex",
                  fontSize: "26px",
                  lineHeight: 1.3,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: colors.muted,
                }}
              >
                Živić-Elektro katalog
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  display: "flex",
                  fontSize: "19px",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
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
            inset: "40px",
            borderRadius: "32px",
            border: `1px solid ${colors.mutedSoft}`,
            boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 24px 80px ${colors.shadow}`,
          }}
        />
      </div>
    ),
    size,
  );
}

async function createDataUrlFromImage(
  imageUrl?: string | null,
): Promise<string | null> {
  if (!imageUrl) {
    return null;
  }

  try {
    const parsedImageUrl = new URL(imageUrl);

    if (
      !["http:", "https:"].includes(parsedImageUrl.protocol) ||
      !ALLOWED_PRODUCT_IMAGE_HOSTS.has(parsedImageUrl.hostname)
    ) {
      return null;
    }

    const response = await fetch(parsedImageUrl, {
      headers: {
        Accept: "image/*",
      },
      next: {
        revalidate,
      },
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const imageBuffer = Buffer.from(await response.arrayBuffer());

    return `data:${contentType};base64,${imageBuffer.toString("base64")}`;
  } catch {
    return null;
  }
}

function createTitleLines(title: string): [string, string?] {
  const maxCharacters = 68;
  const truncated = truncateTitle(title, maxCharacters);
  const words = truncated.split(/\s+/).filter(Boolean);

  if (words.length <= 2) {
    return [truncated];
  }

  const totalLength = words.join(" ").length;
  const midpoint = Math.ceil(totalLength / 2);
  const firstLineWords: string[] = [];
  let consumedLength = 0;

  for (const word of words) {
    const nextLength = consumedLength === 0
      ? word.length
      : consumedLength + 1 + word.length;

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
