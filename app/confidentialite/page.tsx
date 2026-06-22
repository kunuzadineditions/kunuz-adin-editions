import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles, KUNUZ ADIN ÉDITIONS.",
};

export default function ConfidentialitePage() {
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
            Politique de confidentialité
          </h1>
          <p className="text-text-secondary text-sm">
            Dernière mise à jour : juin 2025. Conformément au Règlement Général
            sur la Protection des Données (RGPD, UE 2016/679).
          </p>
          <div className="h-px w-24 bg-gold-dark mt-8" />
        </div>

        <div className="flex flex-col gap-10 text-text-secondary text-sm leading-relaxed">

          {/* 1 */}
          <Section title="1. Responsable du traitement">
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            <dl className="flex flex-col gap-3 mt-4">
              {[
                ["Raison sociale", "KOMBOKOM"],
                ["SIRET", "94921598200032"],
                ["Siège social", "Annonay (07100), France"],
                ["Contact", "contact@kunuz-adin-editions.com", "mailto:contact@kunuz-adin-editions.com"],
              ].map(([label, value, href]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-6">
                  <dt className="w-40 flex-shrink-0 text-[11px] tracking-[0.2em] text-gold/80 uppercase pt-0.5">
                    {label}
                  </dt>
                  <dd>
                    {href ? (
                      <a href={href} className="hover:text-gold transition-colors duration-300 underline underline-offset-2">
                        {value}
                      </a>
                    ) : value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4">
              Le site est exploité sous la marque éditoriale{" "}
              <strong className="text-text font-medium">KUNUZ ADIN ÉDITIONS</strong>.
            </p>
          </Section>

          {/* 2 */}
          <Section title="2. Données collectées">
            <p>
              KUNUZ ADIN ÉDITIONS collecte uniquement les données suivantes, dans le cadre
              de la liste d&rsquo;attente de lancement du site :
            </p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 pl-2">
              <li>Adresse email</li>
            </ul>
            <p className="mt-3">
              Ces données sont transmises et stockées via le service Brevo (anciennement Sendinblue),
              prestataire de marketing par email. Aucune autre donnée (nom, adresse postale,
              données bancaires) n&rsquo;est collectée à ce stade.
            </p>
          </Section>

          {/* 3 */}
          <Section title="3. Finalité du traitement">
            <p>Les données collectées sont utilisées pour :</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 pl-2">
              <li>Informer les inscrits de l&rsquo;ouverture du site et des nouveautés</li>
              <li>Envoyer des communications liées aux publications de KUNUZ ADIN ÉDITIONS</li>
            </ul>
          </Section>

          {/* 4 */}
          <Section title="4. Base légale">
            <p>
              Le traitement repose sur votre <strong className="text-text font-medium">consentement</strong> (article 6.1.a du RGPD),
              exprimé au moment de la soumission du formulaire d&rsquo;inscription.
              Vous pouvez retirer ce consentement à tout moment.
            </p>
          </Section>

          {/* 5 */}
          <Section title="5. Durée de conservation">
            <p>
              Vos données sont conservées jusqu&rsquo;à votre désinscription ou jusqu&rsquo;à
              ce que vous exerciez votre droit à l&rsquo;effacement. En l&rsquo;absence de
              désinscription, les données sont conservées pour une durée maximale de{" "}
              <strong className="text-text font-medium">3 ans</strong> à compter du dernier
              contact.
            </p>
          </Section>

          {/* 6 */}
          <Section title="6. Destinataires des données">
            <p>
              Vos données sont transmises à notre prestataire d&rsquo;emailing :{" "}
              <strong className="text-text font-medium">Brevo SAS</strong> (7 rue de Madrid,
              75008 Paris), qui agit en tant que sous-traitant dans le cadre d&rsquo;un
              contrat conforme au RGPD. Aucune donnée n&rsquo;est vendue ni cédée à des tiers.
            </p>
          </Section>

          {/* 7 */}
          <Section title="7. Vos droits">
            <p>
              Conformément au RGPD, vous disposez des droits suivants concernant vos données :
            </p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 pl-2">
              <li>Droit d&rsquo;accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l&rsquo;effacement (« droit à l&rsquo;oubli »)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&rsquo;opposition</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à{" "}
              <a
                href="mailto:contact@kunuz-adin-editions.com"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                contact@kunuz-adin-editions.com
              </a>
              . Vous pouvez également introduire une réclamation auprès de la{" "}
              <strong className="text-text font-medium">CNIL</strong> (Commission Nationale de
              l&rsquo;Informatique et des Libertés, cnil.fr).
            </p>
          </Section>

          {/* 8 */}
          <Section title="8. Cookies">
            <p>
              KUNUZ ADIN ÉDITIONS n&rsquo;utilise pas de cookies publicitaires ou de traçage
              tiers. Des cookies techniques strictement nécessaires au bon fonctionnement du
              site peuvent être déposés sur votre terminal.
            </p>
          </Section>

          {/* 9 */}
          <Section title="9. Sécurité">
            <p>
              KUNUZ ADIN ÉDITIONS met en œuvre les mesures techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non autorisé, perte ou
              divulgation. Le site est hébergé sur des serveurs IONOS SE situés en Europe.
            </p>
          </Section>

          {/* 10 */}
          <Section title="10. Contact">
            <p>
              Pour toute question relative à la présente politique, écrivez-nous à :{" "}
              <a
                href="mailto:contact@kunuz-adin-editions.com"
                className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-2"
              >
                contact@kunuz-adin-editions.com
              </a>
            </p>
          </Section>

        </div>

        {/* Back */}
        <div className="mt-14 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-4">
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
