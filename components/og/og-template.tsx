interface OgTemplateProps {
  title: string;
  subtitle?: string;
  image?: string; // Logo
  backgroundImage?: string; // Optional full background
  siteName?: string;
}

export function OgTemplate({
  title,
  subtitle,
  image = "https://eternalcode.pl/logo.svg",
  backgroundImage,
  siteName = "EternalCode.pl",
}: OgTemplateProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        fontFamily: '"Geist"',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background: Subtle Dot Pattern instead of Grid for a cleaner look */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          opacity: 0.4,
        }}
      />

      {/* Background: Ambient Gradient Blobs for depth */}
      {/* Top Left - Soft Blue */}
      <div
        style={{
          position: "absolute",
          top: "-300px",
          left: "-200px",
          width: "1000px",
          height: "1000px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      {/* Bottom Right - Subtle Violet for contrast */}
      <div
        style={{
          position: "absolute",
          bottom: "-300px",
          right: "-200px",
          width: "1000px",
          height: "1000px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Featured Image Background Override */}
      {!!backgroundImage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: Required for background image simulation */}
          {/* biome-ignore lint/correctness/useImageSize: Background image simulation */}
          <img
            alt="background"
            src={backgroundImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.08, // Very subtle to keep text legible
              filter: "blur(12px)", // Strong blur for abstract feel
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.95) 100%)",
            }}
          />
        </div>
      )}

      {/* Content Wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          padding: "60px 100px",
          zIndex: 10,
        }}
      >
        {/* Brand Pill - Refined Glassmorphism */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "56px",
            padding: "10px 24px",
            background: "rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(226, 232, 240, 0.8)", // slate-200
            borderRadius: "100px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: ImageResponse */}
          <img alt="Logo" height={32} src={image} style={{ objectFit: "contain" }} width={32} />
          <div style={{ width: "1px", height: "16px", background: "#cbd5e1" }} />
          <span
            style={{
              color: "#475569", // slate-600
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {siteName}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "80px", // Large but safe title size
            fontWeight: 900, // Extra heavy
            textAlign: "center",
            lineHeight: 1.05,
            maxWidth: "900px",
            color: "#020617", // Deep slate color
            margin: "0 0 32px 0",
            letterSpacing: "-0.04em",
            padding: "0 60px",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {!!subtitle && (
          <p
            style={{
              fontSize: "40px",
              color: "#64748b", // slate-500
              textAlign: "center",
              maxWidth: "1000px",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
