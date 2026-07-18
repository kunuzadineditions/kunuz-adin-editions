import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de KUNUZ ADIN ÉDITIONS : commandes, livraison, droit de rétractation et remboursement.",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold-dark" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Légal</p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-text font-light mb-4">
            Conditions générales de vente
          </h1>
          <p className="text-text-secondary text-sm">
            KOMBOKOM / KUNUZ ADIN ÉDITIONS · Annonay (07100), France
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        {/* Bannière document en cours */}
        <div className="border border-gold/30 bg-gold/5 rounded-lg px-5 py-4 mb-12">
          <p className="text-gold text-xs tracking-widest uppercase mb-1">Document en cours de finalisation</p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Ces conditions générales de vente sont publiées à titre indicatif avant l&rsquo;ouverture
            officielle de la boutique. Elles seront complétées et définitivement validées
            au moment du lancement des ventes.
          </p>
        </div>

        <div className="flex flex-col gap-10 text-text-secondary text-sm leading-relaxed">

          <Section title="1. Vendeur">
            <dl className="flex flex-col gap-3">
              {[
                ["Raison sociale", "KOMBOKOM"],
                ["Forme juridique", "Entreprise individuelle"],
                ["SIRET", "94921598200032"],
                ["Siège social", "Annonay (07100), France"],
                ["Marque éditoriale", "KUNUZ ADIN ÉDITIONS"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-6">
                  <dt className="w-44 flex-shrink-0 text-[11px] tracking-[0.2em] text-gold/80 uppercase pt-0.5">
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:gap-6">
                <dt className="w-44 flex-shrink-0 text-[11px] tracking-[0.2em] text-gold/80 uppercase pt-0.5">
                  Contact
                </dt>
                <dd>
                  <a
                    href="mailto:contact@kunuz-adin-editions.com"
                    className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
                  >
                    contact@kunuz-adin-editions.com
                  </a>
                </dd>
              </div>
            </dl>
          </Section>

          <Section title="2. Champ d'application">
            <p>
              Les présentes conditions générales de vente s&rsquo;appliquent à toute commande
              passée sur le site kunuz-adin-editions.com par un consommateur, au sens de
              l&rsquo;article liminaire du Code de la consommation, agissant à des fins
              non professionnelles.
            </p>
            <p>
              Toute commande implique l&rsquo;acceptation pleine et entière des présentes
              conditions générales de vente. KUNUZ ADIN ÉDITIONS se réserve le droit de
              les modifier à tout moment, la version applicable étant celle en vigueur
              à la date de la commande.
            </p>
          </Section>

          <Section title="3. Produits et prix">
            <p>
              KUNUZ ADIN ÉDITIONS commercialise des ouvrages imprimés et des carnets
              édités sous la marque KUNUZ ADIN ÉDITIONS. Les caractéristiques essentielles
              des produits sont présentées sur chaque fiche produit du site.
            </p>
            <p>
              Les prix sont indiqués en euros toutes taxes comprises. KUNUZ ADIN ÉDITIONS
              se réserve le droit de modifier ses prix à tout moment, le prix applicable
              étant celui affiché au moment de la validation de la commande.
            </p>
            <p>
              Les frais de livraison sont calculés et affichés lors de la validation du
              panier, avant confirmation de commande.
            </p>
          </Section>

          <Section title="4. Commande">
            <p>
              Pour passer commande, le client sélectionne les produits souhaités, les ajoute
              au panier, puis procède au paiement via la page de paiement sécurisée Stripe.
              La commande est confirmée après réception du paiement, par l&rsquo;envoi
              d&rsquo;un email de confirmation à l&rsquo;adresse fournie.
            </p>
            <p>
              KUNUZ ADIN ÉDITIONS se réserve le droit de refuser ou d&rsquo;annuler toute
              commande en cas de problème de paiement, de commande anormale ou de rupture
              de stock, le client étant informé par email et remboursé sans délai.
            </p>
          </Section>

          <Section title="5. Paiement">
            <p>
              Le paiement s&rsquo;effectue en ligne par carte bancaire via la plateforme
              sécurisée Stripe. Les données de paiement sont traitées directement par Stripe
              et ne transitent pas par les serveurs de KUNUZ ADIN ÉDITIONS.
            </p>
            <p>
              La commande est débitée au moment de la validation de la commande.
            </p>
          </Section>

          <Section title="6. Livraison">
            <p>
              Les commandes sont expédiées à l&rsquo;adresse indiquée lors de la commande.
              Les délais d&rsquo;expédition sont indiqués sur le site à titre indicatif et
              peuvent varier. KUNUZ ADIN ÉDITIONS ne saurait être tenu responsable des
              retards imputables au transporteur.
            </p>
            <p>
              En cas de colis perdu ou endommagé, le client est invité à contacter
              KUNUZ ADIN ÉDITIONS à{" "}
              <a
                href="mailto:contact@kunuz-adin-editions.com"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                contact@kunuz-adin-editions.com
              </a>{" "}
              dans les meilleurs délais.
            </p>
          </Section>

          <Section title="7. Droit de rétractation">
            <p>
              Conformément aux articles L. 221-18 et suivants du Code de la consommation,
              le consommateur dispose d&rsquo;un délai de{" "}
              <strong className="text-text font-medium">14 jours</strong> à compter de la
              réception du produit pour exercer son droit de rétractation, sans avoir à
              motiver sa décision.
            </p>
            <p>
              Le client peut notifier sa décision au moyen de la fonctionnalité de
              rétractation en ligne disponible sur le site (page{" "}
              <Link
                href="/retractation"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                /retractation
              </Link>
              ), par email à{" "}
              <a
                href="mailto:contact@kunuz-adin-editions.com"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                contact@kunuz-adin-editions.com
              </a>
              , ou à l&rsquo;aide du formulaire type de rétractation disponible sur
              la page /retractation.
            </p>
          </Section>

          <Section title="8. Retour du produit">
            <p>
              En cas de rétractation, le client renvoie le produit sans retard excessif
              et au plus tard dans les{" "}
              <strong className="text-text font-medium">14 jours</strong> suivant la
              communication de sa décision de rétractation.
            </p>
            <p>
              Les frais directs de renvoi du produit sont à la charge du client, sauf si
              KUNUZ ADIN ÉDITIONS décide de les prendre en charge à titre commercial.
            </p>
            <p>
              L&rsquo;adresse de retour est communiquée par email après réception de la
              demande de rétractation.
            </p>
          </Section>

          <Section title="9. Remboursement">
            <p>
              Le remboursement de la totalité des sommes versées, frais de livraison
              initiaux inclus, intervient sans retard excessif et au plus tard dans les
              14 jours à compter de la réception de la décision de rétractation.
              KUNUZ ADIN ÉDITIONS peut différer le remboursement jusqu&rsquo;à récupération
              du produit ou jusqu&rsquo;à ce que le client ait fourni une preuve de
              l&rsquo;expédition, la date retenue étant celle du premier de ces faits.
            </p>
            <p>
              Le remboursement est effectué par le même moyen de paiement que celui utilisé
              lors de l&rsquo;achat.
            </p>
            <p>
              La responsabilité du client peut être engagée en cas de dépréciation du
              produit résultant de manipulations dépassant ce qui est nécessaire pour
              établir la nature, les caractéristiques et le bon fonctionnement du bien :
              dans ce cas, le remboursement pourra être réduit à hauteur de la dépréciation
              constatée, dans les limites prévues par la loi.
            </p>
          </Section>

          <Section title="10. Exceptions au droit de rétractation">
            <p>
              Conformément à l&rsquo;article L. 221-28 du Code de la consommation, le droit
              de rétractation ne s&rsquo;applique pas aux produits confectionnés selon les
              spécifications du client ou nettement personnalisés (par exemple, ouvrages
              dédicacés ou personnalisés à la demande).
            </p>
          </Section>

          <Section title="11. Garanties légales">
            <p>
              Indépendamment du droit de rétractation, tout acheteur bénéficie des garanties
              légales suivantes, conformément au Code de la consommation et au Code civil :
            </p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 pl-2">
              <li>
                Garantie légale de conformité (articles L. 217-1 et suivants du Code de la
                consommation) : 2 ans à compter de la délivrance du bien.
              </li>
              <li>
                Garantie contre les vices cachés (articles 1641 et suivants du Code civil) :
                action à intenter dans les 2 ans à compter de la découverte du vice.
              </li>
            </ul>
            <p className="mt-3">
              Pour toute réclamation au titre de ces garanties, contactez KUNUZ ADIN ÉDITIONS
              à{" "}
              <a
                href="mailto:contact@kunuz-adin-editions.com"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                contact@kunuz-adin-editions.com
              </a>.
            </p>
          </Section>

          <Section title="12. Données personnelles">
            <p>
              Les données personnelles collectées lors d&rsquo;une commande (nom, adresse,
              email) sont traitées conformément à la{" "}
              <Link
                href="/confidentialite"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                politique de confidentialité
              </Link>{" "}
              de KUNUZ ADIN ÉDITIONS.
            </p>
          </Section>

          <Section title="13. Droit applicable et litiges">
            <p>
              Les présentes conditions générales de vente sont soumises au droit français.
              En cas de litige, une solution amiable sera recherchée en priorité.
              À défaut, le client peut recourir gratuitement à un médiateur de la
              consommation. Les coordonnées du médiateur compétent seront communiquées
              sur demande à{" "}
              <a
                href="mailto:contact@kunuz-adin-editions.com"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                contact@kunuz-adin-editions.com
              </a>.
            </p>
            <p>
              La Commission européenne met à disposition une plateforme de règlement en
              ligne des litiges (RLL) accessible à l&rsquo;adresse{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                ec.europa.eu/consumers/odr
              </a>.
            </p>
          </Section>

        </div>

        {/* Back */}
        <div className="mt-14 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/retractation"
              className="text-xs tracking-widest text-text-secondary hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2"
            >
              Exercer mon droit de rétractation →
            </Link>
            <Link
              href="/mentions-legales"
              className="text-xs tracking-widest text-text-secondary hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2"
            >
              Mentions légales →
            </Link>
            <Link
              href="/"
              className="text-xs tracking-widest text-text-secondary hover:text-gold uppercase transition-colors duration-300 inline-flex items-center gap-2"
            >
              ← Retour à l&rsquo;accueil
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl text-text font-light mb-5 pb-3 border-b border-border">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
