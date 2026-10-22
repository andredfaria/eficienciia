import { fontVars } from './fonts';
import { Nav } from './nav';
import { Footer } from './footer';

// Header e rodapé padrão para as páginas internas (calculadora, blog, valores, projetos, privacidade).
// Os links do menu apontam para as seções da home.

export function SiteHeader() {
  return (
    <div className={`ef ${fontVars} !bg-transparent`}>
      <Nav anchorBase="/" />
    </div>
  );
}

export function SiteFooter() {
  return (
    <div className={`ef ${fontVars}`}>
      <Footer />
    </div>
  );
}
