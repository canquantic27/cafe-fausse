import { useCallback, useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";
import usePageTitle from "../components/usePageTitle";
import { images } from "../data/site";

const photos = [
  { src: images.tableSetting, alt: "A table set for dinner with glasses and fresh flowers", caption: "Every table is set fresh for you" },
  { src: images.diningRoom, alt: "The main dining room in the evening", caption: "The main dining room" },
  { src: images.bar, alt: "The bar with warm lighting", caption: "Our cosy bar, mocktails included" },
  { src: images.interior, alt: "Bright restaurant interior with wooden tables", caption: "Plenty of space for families and groups" },
  { src: images.plated, alt: "A beautifully plated dish", caption: "Fresh from the kitchen" },
  { src: images.kitchen, alt: "Chefs at work in the kitchen", caption: "Our chefs at work" },
];

export default function Gallery() {
  usePageTitle("Gallery");
  const [index, setIndex] = useState(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((delta) => setIndex((i) => (i + delta + photos.length) % photos.length), []);

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  const current = index === null ? null : photos[index];

  return (
    <section className="page-section">
      <PageHeading eyebrow="Take a look inside" title="Gallery">
        A peek at our dining room, our kitchen and the food we love to share. Tap any photo to see it bigger.
      </PageHeading>

      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <button className={`gallery-item gallery-${i + 1}`} key={photo.caption} onClick={() => setIndex(i)}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <span>{photo.caption}</span>
          </button>
        ))}
      </div>

      {current && (
        <div className="modal-backdrop" onClick={close}>
          <div
            className="image-modal"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={current.src} alt={current.alt} />
            <p>{current.caption}</p>
            <div className="modal-controls">
              <button onClick={() => step(-1)} aria-label="Previous photo">‹ Previous</button>
              <button onClick={close} autoFocus>Close</button>
              <button onClick={() => step(1)} aria-label="Next photo">Next ›</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
