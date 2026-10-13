import { Link } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { Arrow } from "../components/Blocks.jsx";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <section className="nf silk">
      <PageTitle title={t.notFound.title} noindex />
      <div className="wrap">
        <div className="nf-no">404</div>
        <h1>{t.notFound.title}</h1>
        <Link className="btn gold" to="/">{t.notFound.back} <Arrow /></Link>
      </div>
    </section>
  );
}
