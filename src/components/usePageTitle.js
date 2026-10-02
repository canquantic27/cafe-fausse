import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Café Fausse` : "Café Fausse · French cooking for every generation";
  }, [title]);
}
