import BookCard from "@/components/ui/BookCard";

const books = [
  {
    title: "Tu pries mais tu ne t'apaises pas",
    subtitle: "Essai spirituel",
    price: "26,50 €",
    summary:
      "Une exploration profonde du paradoxe de la prière sans paix intérieure. Pourquoi le cœur reste-t-il agité malgré la salah ? Un livre qui interroge la présence, la sincérité et la guérison par l'acte d'adoration.",
    amazonUrl: "#",
    coverColor: "#13100A",
  },
  {
    title: "Carnet Cœur Vivant",
    subtitle: "Collection Cœur Vivant — Carnet de pratique",
    price: "16,90 €",
    summary:
      "Un carnet de travail spirituel conçu pour accompagner la purification du cœur au quotidien. Réflexions guidées, espaces d'écriture et extraits des maîtres de la tradition islamique.",
    amazonUrl: "#",
    coverColor: "#0E1210",
  },
];

export default function FeaturedBooks() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">
            Notre catalogue
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-text font-light">
            Livres en vedette
          </h2>
          <div className="h-px w-16 bg-gold-dark mx-auto mt-6" />
        </div>

        {/* Book cards */}
        <div className="flex flex-col gap-6">
          {books.map((book) => (
            <BookCard key={book.title} {...book} />
          ))}
        </div>

        {/* Link to full catalogue */}
        <div className="text-center mt-12">
          <a
            href="/livres"
            className="text-sm tracking-widest text-gold uppercase hover:text-gold-light transition-colors duration-300 inline-flex items-center gap-2"
          >
            Voir tout le catalogue
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
