import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agenda Ativa",
    short_name: "Agenda Ativa",
    description: "Aceda às suas edições e ao conteúdo pronto a publicar.",
    start_url: "/minha-agenda",
    display: "standalone",
    background_color: "#fbf8f2",
    theme_color: "#b08d57",
    icons: [{ src: "/aa-monogram-premium.png", sizes: "512x512", type: "image/png" }]
  };
}
