import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { noteRoutes, type NoteRoute } from "./noteRoutes";

const normalizeSearchText = (value: string) => value.trim().toLowerCase();

function NoteContent({ note }: { note: NoteRoute }) {
  return (
    <article className="note-page">
      <header className="note-header">
        <p className="note-label">{note.label}</p>
        <h1>{note.title}</h1>
        <p className="note-description">{note.description}</p>
      </header>
      <section className="note-demo" aria-label={`${note.title} 示例`}>
        {note.content}
      </section>
    </article>
  );
}

function App() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredRoutes = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) {
      return noteRoutes;
    }

    return noteRoutes.filter((note) =>
      [note.title, note.label, ...note.keywords]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <button
        className={`mobile-menu-button ${
          isSidebarOpen ? "mobile-menu-button-open" : ""
        }`}
        type="button"
        aria-expanded={isSidebarOpen}
        aria-controls="notes-sidebar"
        onClick={() => setIsSidebarOpen((current) => !current)}
      >
        {isSidebarOpen ? "关闭目录" : "打开目录"}
      </button>

      {isSidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="关闭目录遮罩"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        id="notes-sidebar"
        className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}
      >
        <div className="brand">
          <span className="brand-mark">R/V</span>
          <div>
            <strong>React × Vue</strong>
            <span>差异笔记</span>
          </div>
        </div>

        <label className="route-search">
          <span className="sr-only">搜索笔记路由</span>
          <input
            type="search"
            value={query}
            placeholder="搜索路由..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <nav className="route-nav" aria-label="笔记目录">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((note) => (
              <NavLink
                key={note.path}
                to={note.path}
                className={({ isActive }) =>
                  `route-link ${isActive ? "route-link-active" : ""}`
                }
              >
                <span>{note.title}</span>
                <small>{note.label}</small>
              </NavLink>
            ))
          ) : (
            <div className="empty-search">
              <strong>没有匹配的路由</strong>
              <span>换一个关键词试试</span>
            </div>
          )}
        </nav>

        <p className="route-count">
          {query ? `${filteredRoutes.length} 条结果` : `${noteRoutes.length} 条笔记`}
        </p>
      </aside>

      <main className="content-panel">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={noteRoutes[0].path} replace />}
          />
          {noteRoutes.map((note) => (
            <Route
              key={note.path}
              path={note.path}
              element={<NoteContent note={note} />}
            />
          ))}
          <Route
            path="*"
            element={<Navigate to={noteRoutes[0].path} replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
