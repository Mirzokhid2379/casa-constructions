import { Component } from "react";

// Kutilmagan xato bo‘lsa oq ekran o‘rniga xabar va xato matni ko‘rsatiladi
export default class ErrorBoundary extends Component {
  state = { err: null };
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(e) { console.error(e); }
  render() {
    const { err } = this.state;
    if (!err) return this.props.children;
    return (
      <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "120px 20px", textAlign: "center", fontFamily: "system-ui,sans-serif", background: "#FBF8F2", color: "#10201B" }}>
        <div>
          <h2 style={{ margin: "0 0 12px", fontSize: 26 }}>Sahifani ochishda xatolik</h2>
          <p style={{ margin: "0 0 20px", color: "#5D6A64" }}>Iltimos, sahifani yangilang.</p>
          <button type="button" onClick={() => location.reload()} style={{ padding: "12px 22px", borderRadius: 12, border: 0, background: "#143A31", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Yangilash</button>
          <pre style={{ marginTop: 24, fontSize: 12, color: "#9F7D4F", whiteSpace: "pre-wrap", maxWidth: 640 }}>{String(err && (err.message || err))}</pre>
        </div>
      </div>
    );
  }
}
