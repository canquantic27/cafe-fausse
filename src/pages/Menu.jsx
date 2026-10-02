import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import usePageTitle from "../components/usePageTitle";
import { menuCategories, menuItems, tagLabels } from "../data/menu";

const filters = [
  ["all", "Everything"],
  ["V", "Vegetarian"],
  ["GF", "Gluten-free"],
];

export default function Menu() {
  usePageTitle("Menu");
  const [diet, setDiet] = useState("all");

  const visible = (item) => diet === "all" || item.tags.includes(diet);

  return (
    <section className="page-section">
      <PageHeading eyebrow="Our menu" title="Something for every appetite">
        Seasonal French cooking with plenty of familiar favourites. Not sure what to choose? Just ask, we love
        helping.
      </PageHeading>

      <div className="menu-toolbar">
        <nav className="category-jump" aria-label="Menu sections">
          {menuCategories.map((category) => (
            <a key={category.id} href={`#${category.id}`}>{category.label}</a>
          ))}
        </nav>
        <div className="diet-filter" role="group" aria-label="Filter by diet">
          {filters.map(([id, label]) => (
            <button
              key={id}
              className={diet === id ? "chip selected" : "chip"}
              aria-pressed={diet === id}
              onClick={() => setDiet(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {menuCategories.map((category) => {
        const items = menuItems.filter((item) => item.category === category.id && visible(item));
        return (
          <section key={category.id} id={category.id} className="menu-category">
            <h2>{category.label}</h2>
            <p className="menu-category-note">{category.note}</p>
            {items.length === 0 ? (
              <p className="menu-empty">Nothing here matches that filter, but ask us. The kitchen can often adapt a dish.</p>
            ) : (
              <div className="menu-list">
                {items.map((item) => (
                  <article className="menu-item" key={item.name}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      {item.tags.length > 0 && (
                        <ul className="tags">
                          {item.tags.map((tag) => (
                            <li key={tag} className={`tag tag-${tag}`} title={tagLabels[tag]}>{tagLabels[tag]}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <strong className="price">${item.price}</strong>
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}

      <aside className="menu-note">
        <h2>Good to know</h2>
        <p>
          Please tell us about any allergies or dietary needs and we'll take care of you. Large-print menus are
          available at the table, and our chef's tasting menu is served every evening for the adventurous.
        </p>
        <Link to="/reservations" className="btn btn-primary">Book a table</Link>
      </aside>
    </section>
  );
}
