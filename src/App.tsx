import { useEffect, useState, ReactNode, FormEvent, createContext, useContext } from 'react';
import { 
  Check, 
  Search, 
  ShoppingBag, 
  Star, 
  User, 
  Phone, 
  MapPin, 
  Building2, 
  Navigation, 
  Mail, 
  Calendar,
  Package,
  Truck,
  ChevronDown,
  Menu,
  X,
  Plus,
  Minus,
  Quote,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

// --- Translations ---
const TRANSLATIONS = {
  it: {
    nav: {
      home: "Home",
      product: "Well Up Cintura",
      about: "Chi siamo",
      payment: "Metodo di pagamento",
      contact: "Contattaci"
    },
    notFound: {
      title: "404 - Pagina Non Trovata",
      message: "Oops! La pagina che stai cercando sembra essere scomparsa nel nulla.",
      backHome: "Torna alla Home"
    },
    hero: {
      title: "Comfort Rinnovato",
      subtitle: "Trasforma Ogni Giorno in Pura Magia.",
      cta: "Acquistare Ora"
    },
    ticker: {
      shipping: "SPEDIZIONE VELOCE 72 ORE",
      guarantee: "SODDISFATTO O RIMBORSATO",
      easy: "ORDINE FACILE"
    },
    benefits: {
      title: "Sperimenta Vantaggi Ineguagliabili",
      desc: "L'essenza di Well Up Cintura risiede nei suoi vantaggi multifaccettati. Ogni aspetto della nostra cintura può portare un cambiamento trasformativo nella tua vita quotidiana attraverso una compressione mirata.",
      list: ["Sollievo Immediato", "Design Confortevole", "Sciatica e Lombalgia", "Durabilità e Longevità"]
    },
    order: {
      formTitle: "Riempi il formulario! Ti contatteremo per confermare le tue informazioni prima di spedire il prodotto 📞✅",
      addToCart: "Aggiungi al carrello",
      orOrder: "Oppure Ordina Direttamente",
      name: "Nome completo",
      tel: "Telefono",
      addr: "Indirizzo",
      city: "Città",
      prov: "Provincia",
      cap: "Codice Postale",
      qty: "Quantità",
      submit: "CLICCA PER COMPLETARE L'ORDINE",
      processing: "ELABORAZIONE...",
      delivered: "Consegnato",
      save: "RISPARMIA"
    },
    announcement: [
      "⏱ CONSEGNA IN 3 GIORNI IN TUTTA ITALIA",
      "💳 PAGAMENTO E CONSEGNA",
      "🚚 SPEDIZIONE GRATUITA"
    ],
    features: {
      title: "\"Comfort Istantaneo e Durabilità: Cintura Well Up\"",
      relief: "Sollievo Immediato",
      reliefDesc: "La cintura Well Up Cintura offre un rapido sollievo dal dolore, alleviando rapidamente i disagi associati a problemi come la sciatica e la lombalgia.",
      design: "Design Confortevole",
      designDesc: "Progettata con un design ergonomico, la cintura assicura un comfort ottimale durante l'uso quotidiano, consentendo una vestibilità piacevole e una sensazione di sollievo.",
      sciatica: "Risolvere Problemi di Sciatica e Lombalgia",
      sciaticaDesc: "Grazie al suo supporto lombare e alla compressione mirata, la cintura affronta efficacemente problemi come la sciatica e la lombalgia, migliorando il benessere complessivo della schiena.",
      durability: "Durabilità e Longevità",
      durabilityDesc: "Realizzata con materiali di alta qualità, la cintura è progettata per resistere a un utilizzo prolungato nel tempo, garantendo una durata eccezionale e una performance affidabile nel tempo."
    },
    stats: {
      title: "Guarisci Come Non Mai",
      s1: "Sollievo immediato tra i pazienti con mal di schiena e sciatica.",
      s2: "Sciatica eliminata in sole 2 settimane d'uso costante.",
      s3: "Mal di schiena cronico risolto dopo 14 giorni di trattamento."
    },
    faq: {
      title: "FAQs",
      items: [
        { q: "Che cos'è Well Up Cintura?", a: "È un supporto lombare pneumatico progettato per decomprimere la colonna vertebrale e fornire sollievo immediato dal dolore." },
        { q: "Quanto tempo devo indossare Well Up Cintura per vedere i risultati?", a: "Consigliamo l'uso per 2 ore al giorno. Molti utenti avvertono benefici già dalle prime due settimane." },
        { q: "Ci sono effetti collaterali nell'utilizzo della Well Up Cintura?", a: "No, è un dispositivo non invasivo. Tuttavia, consulta sempre un medico per condizioni preesistenti gravi." },
        { q: "Well Up Cintura può sostituire le visite dal chiropratico o altri trattamenti?", a: "Può essere un eccellente supporto complementare, ma non deve sostituire il parere clinico specialistico." },
        { q: "Come funziona esattamente Well Up Cintura?", a: "Utilizza 52 colonne d'aria che, una volta gonfiate, sollevano delicatamente la parte superiore del corpo allontanandola dal bacino." }
      ]
    },
    aboutS: {
      title: "Chi Siamo",
      mission: "\"La nostra missione è ridefinire il benessere lombare attraverso l'innovazione tecnologica e il design ergonomico.\"",
      historyTitle: "La Nostra Storia",
      history: "Well Up nasce dall'esigenza di offrire una soluzione reale e non invasiva a chi soffre di dolori cronici alla schiena. Abbiamo collaborato con esperti di biomeccanica per creare una cintura che non fosse solo un supporto, ma un vero sistema di decompressione portatile.",
      whyWellupTitle: "Perché Well Up?",
      whyWellup: "A differenza dei supporti tradizionali, la Well Up Cintura utilizza 52 colonne d'aria dinamiche. Questo approccio ad \"alta densità\" garantisce una distribuzione uniforme del peso e una decompressione millimetrica delle vertebre.",
      certTitle: "Certificazione di Qualità",
      cert: "Ogni cintura Well Up è testata individualmente per mantenere una pressione costante di 0.2MPa per 24 ore."
    },
    thankYou: {
      orderId: "Ordine",
      thanks: "Grazie",
      confirmed: "Il tuo ordine è confermato",
      message: "Potresti ricevere un messaggio quando il tuo ordine è pronto. Spedizione prevista: 72 ore.",
      summary: "Riepilogo",
      shipping: "Spedizione",
      free: "GRATUITA",
      total: "Totale",
      paymentMethod: "Metodo di Pagamento",
      cod: "Contrassegno (Pagamento alla Consegna)",
      backHome: "Torna alla Home"
    },
    useCases: {
      tabs: ['Sciatica', 'Lavoro Sedentario', 'Lavoro Attivo'],
      sciaticaText: "Senti il dolore della sciatica a causa della tua vecchiaia",
      defaultText: "Supporto ottimale per le tue attività quotidiane."
    },
    reviews: {
      count: "15 Recensioni",
      write: "scrivi la tua recensione"
    },
    paymentDetailed: {
      title: "Pagamento",
      codTitle: "Contrassegno (COD)",
      codDesc: "Per garantire la massima sicurezza ai nostri clienti, utilizziamo esclusivamente il modello di pagamento alla consegna.",
      codList: ["Nessun pagamento anticipato", "Paghi solo quando ricevi", "Corriere SDA / GLS"],
      howTitle: "Come Funziona?",
      howDesc: "Una volta confermato l'ordine tramite il nostro modulo, il prodotto verrà preparato e spedito entro 24 ore. Riceverai un codice di tracking via SMS.",
      safetyTitle: "Sicurezza dei Dati",
      safetyDesc: "I tuoi dati sono protetti e crittografati. Li utilizziamo esclusivamente per finalizzare la consegna del tuo ordine Well Up."
    },
    contactDetailed: {
      title: "Contattaci",
      email: "Email",
      hours: "Orari",
      hoursVal: "Lun - Ven: 09:00 - 18:00",
      social: "Social",
      form: {
        name: "NOME",
        email: "EMAIL",
        help: "COME POSSIAMO AIUTARTI?",
        submit: "Invia Messaggio"
      }
    },
    privacyDetailed: {
      title: "Privacy Policy",
      content: "La tua privacy è importante per noi. Questa politica spiega come Well Up raccoglie, utilizza e protegge le tue informazioni personali quando visiti il nostro sito o effettui un ordine.",
      s1: {
        t: "1. Informazioni Raccolte",
        p: "Raccogliamo solo i dati necessari per elaborare il tuo ordine e fornirti il supporto necessario: Nome, Numero di Telefono, Indirizzo di Spedizione e Codice Postale."
      },
      s2: {
        t: "2. Uso dei Dati",
        p: "I tuoi dati vengono utilizzati esclusivamente per la spedizione del prodotto e per la conferma dell'ordine tramite telefono o SMS. Non vendiamo né condividiamo i tuoi dati con terze parti per scopi di marketing."
      },
      s3: {
        t: "3. Sicurezza",
        p: "Adottiamo misure di sicurezza avanzate per proteggere i tuoi dati durante la trasmissione e la conservazione. Tutti i dati sono memorizzati in server sicuri crittografati."
      }
    },
    termsDetailed: {
      title: "Termini e Condizioni",
      content: "Accedendo al sito Well Up, accetti i seguenti termini e condizioni di utilizzo.",
      s1: {
        t: "1. Ordini e Pagamenti",
        p: "Well Up opera esclusivamente tramite pagamento alla consegna (Contrassegno). L'ordine si considera finalizzato dopo la conferma telefonica da parte del nostro team."
      },
      s2: {
        t: "2. Spedizione",
        p: "La spedizione è gratuita in tutta Italia. I tempi di consegna stimati sono di 3-4 giorni lavorativi. Non siamo responsabili per ritardi causati da terzi (corrieri)."
      },
      s3: {
        t: "3. Politica di Reso",
        p: "Ai sensi della normativa vigente, hai il diritto di recedere dall'acquisto entro 14 giorni dal ricevimento della merce. Il prodotto deve essere restituito integro nel suo imballaggio originale."
      }
    },
    cartDetailed: {
      title: "Il Mio Carrello",
      empty: "Il carrello è vuoto",
      startShopping: "Inizia gli acquisti",
      subtotal: "Subtotale",
      shipping: "Spedizione",
      free: "GRATIS",
      total: "Totale",
      checkout: "Vai al Checkout"
    },
    footerDetailed: {
      rights: "Tutti i diritti riservati.",
      privacy: "Privacy",
      terms: "Termini",
      contact: "Contattaci"
    }
  },
  en: {
    nav: {
      home: "Home",
      product: "Well Up Belt",
      about: "About Us",
      payment: "Payment Method",
      contact: "Contact Us"
    },
    notFound: {
      title: "404 - Page Not Found",
      message: "Oops! The page you're looking for seems to have vanished into thin air.",
      backHome: "Back to Home"
    },
    hero: {
      title: "Renewed Comfort",
      subtitle: "Transform Every Day into Pure Magic.",
      cta: "Buy Now"
    },
    ticker: {
      shipping: "FAST 72H SHIPPING",
      guarantee: "MONEY BACK GUARANTEE",
      easy: "EASY ORDERING"
    },
    benefits: {
      title: "Experience Unparalleled Benefits",
      desc: "The essence of Well Up Belt lies in its multifaceted benefits. Every aspect of our belt can bring a transformative change to your daily life through targeted compression.",
      list: ["Immediate Relief", "Comfortable Design", "Sciatica & Back Pain", "Durability & Longevity"]
    },
    order: {
      formTitle: "Fill out the form! We will contact you to confirm your information before shipping the product 📞✅",
      addToCart: "Add to Cart",
      orOrder: "Or Order Directly",
      name: "Full Name",
      tel: "Phone Number",
      addr: "Address",
      city: "City",
      prov: "Province / State",
      cap: "ZIP Code",
      qty: "Quantity",
      submit: "CLICK TO COMPLETE ORDER",
      processing: "PROCESSING...",
      delivered: "Delivered",
      save: "SAVE"
    },
    announcement: [
      "⏱ DELIVERY IN 3 DAYS WORLDWIDE",
      "💳 CASH ON DELIVERY AVAILABLE",
      "🚚 FREE SHIPPING"
    ],
    features: {
      title: "\"Instant Comfort and Durability: Well Up Belt\"",
      relief: "Immediate Relief",
      reliefDesc: "The Well Up Belt offers rapid pain relief, quickly alleviating discomfort associated with issues like sciatica and lower back pain.",
      design: "Comfortable Design",
      designDesc: "Designed with an ergonomic shape, the belt ensures optimal comfort during daily use, allowing for a pleasant fit and a feeling of relief.",
      sciatica: "Solving Sciatica and Lower Back Problems",
      sciaticaDesc: "Thanks to its lumbar support and targeted compression, the belt effectively addresses issues like sciatica and lower back pain, improving overall back health.",
      durability: "Durability and Longevity",
      durabilityDesc: "Made with high-quality materials, the belt is designed to withstand prolonged use over time, ensuring exceptional durability and reliable performance."
    },
    stats: {
      title: "Heal Like Never Before",
      s1: "Immediate relief among patients with back pain and sciatica.",
      s2: "Sciatica eliminated in just 2 weeks of consistent use.",
      s3: "Chronic back pain resolved after 14 days of treatment."
    },
    faq: {
      title: "FAQs",
      items: [
        { q: "What is the Well Up Belt?", a: "It is a pneumatic lumbar support designed to decompress the spine and provide immediate pain relief." },
        { q: "How long should I wear the Well Up Belt to see results?", a: "We recommend using it for 2 hours a day. Many users feel benefits within the first two weeks." },
        { q: "Are there any side effects to using the Well Up Belt?", a: "No, it is a non-invasive device. However, always consult a doctor for serious pre-existing conditions." },
        { q: "Can the Well Up Belt replace chiropractor visits or other treatments?", a: "It can be an excellent complementary support, but should not replace clinical specialist advice." },
        { q: "How exactly does the Well Up Belt work?", a: "It uses 52 air columns that, once inflated, gently lift the upper body away from the pelvis." }
      ]
    },
    aboutS: {
      title: "About Us",
      mission: "\"Our mission is to redefine lumbar wellness through technological innovation and ergonomic design.\"",
      historyTitle: "Our History",
      history: "Well Up was born from the need to offer a real, non-invasive solution to those suffering from chronic back pain. We collaborated with biomechanics experts to create a belt that wasn't just a support, but a true portable decompression system.",
      whyWellupTitle: "Why Well Up?",
      whyWellup: "Unlike traditional supports, the Well Up Belt uses 52 dynamic air columns. This 'high density' approach ensures uniform weight distribution and millimeter decompression of the vertebrae.",
      certTitle: "Quality Certification",
      cert: "Each Well Up belt is individually tested to maintain a constant pressure of 0.2MPa for 24 hours."
    },
    thankYou: {
      orderId: "Order",
      thanks: "Thanks",
      confirmed: "Your order is confirmed",
      message: "You may receive a message when your order is ready. Expected delivery: 72 hours.",
      summary: "Summary",
      shipping: "Shipping",
      free: "FREE",
      total: "Total",
      paymentMethod: "Payment Method",
      cod: "Cash on Delivery",
      backHome: "Back to Home"
    },
    useCases: {
      tabs: ['Sciatica', 'Sedentary Work', 'Active Work'],
      sciaticaText: "Feel the pain of sciatica because of your age",
      defaultText: "Optimal support for your daily activities."
    },
    reviews: {
      count: "15 Reviews",
      write: "write your review"
    },
    paymentDetailed: {
      title: "Payment",
      codTitle: "Cash on Delivery (COD)",
      codDesc: "To ensure maximum security for our customers, we exclusively use the cash on delivery payment model.",
      codList: ["No advance payment", "Pay only when you receive", "Express Courier"],
      howTitle: "How It Works?",
      howDesc: "Once the order is confirmed through our form, the product will be prepared and shipped within 24 hours. You will receive a tracking code via SMS.",
      safetyTitle: "Data Security",
      safetyDesc: "Your data is protected and encrypted. We use it exclusively to finalize the delivery of your Well Up order."
    },
    contactDetailed: {
      title: "Contact Us",
      email: "Email",
      hours: "Hours",
      hoursVal: "Mon - Fri: 09:00 - 18:00",
      social: "Social",
      form: {
        name: "NAME",
        email: "EMAIL",
        help: "HOW CAN WE HELP YOU?",
        submit: "Send Message"
      }
    },
    privacyDetailed: {
      title: "Privacy Policy",
      content: "Your privacy is important to us. This policy explains how Well Up collects, uses, and protects your personal information when you visit our site or place an order.",
      s1: {
        t: "1. Collected Information",
        p: "We only collect the data necessary to process your order: Name, Phone Number, Shipping Address, and ZIP Code."
      },
      s2: {
        t: "2. Use of Data",
        p: "Your data is used exclusively for shipping and order confirmation. We do not sell or share your data with third parties for marketing purposes."
      },
      s3: {
        t: "3. Security",
        p: "We adopt advanced security measures to protect your data. All data is stored on secure encrypted servers."
      }
    },
    termsDetailed: {
      title: "Terms and Conditions",
      content: "By accessing the Well Up site, you accept the following terms and conditions of use.",
      s1: {
        t: "1. Orders and Payments",
        p: "Well Up operates exclusively through cash on delivery. The order is considered finalized after phone confirmation from our team."
      },
      s2: {
        t: "2. Shipping",
        p: "Shipping is free worldwide. Estimated delivery times are 3-4 business days."
      },
      s3: {
        t: "3. Return Policy",
        p: "You have the right to withdraw from the purchase within 14 days of receiving the goods. The product must be returned intact in its original packaging."
      }
    },
    cartDetailed: {
      title: "My Cart",
      empty: "Cart is empty",
      startShopping: "Start Shopping",
      subtotal: "Subtotal",
      shipping: "Shipping",
      free: "FREE",
      total: "Total",
      checkout: "Go to Checkout"
    },
    footerDetailed: {
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact Us"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      product: "Ceinture Well Up",
      about: "À propos",
      payment: "Mode de paiement",
      contact: "Contactez-nous"
    },
    notFound: {
      title: "404 - Page Non Trouvée",
      message: "Oups ! La page que vous recherchez semble avoir disparu dans la nature.",
      backHome: "Retour à l'accueil"
    },
    hero: {
      title: "Confort Renouvelé",
      subtitle: "Transformez chaque jour en pure magie.",
      cta: "Acheter maintenant"
    },
    ticker: {
      shipping: "LIVRAISON RAPIDE 72H",
      guarantee: "SATISFAIT OU REMBOURSÉ",
      easy: "COMMANDE FACILE"
    },
    benefits: {
      title: "Découvrez des avantages inégalés",
      desc: "L'essence de la ceinture Well Up réside dans ses avantages multiples. Chaque aspect de notre ceinture peut apporter un changement transformateur dans votre vie quotidienne.",
      list: ["Soulagement immédiat", "Conception confortable", "Sciatique et mal de dos", "Durabilité et longévité"]
    },
    order: {
      formTitle: "Remplissez le formulaire ! Nous vous contacterons pour confirmer vos informations avant d'expédier le produit 📞✅",
      addToCart: "Ajouter au panier",
      orOrder: "Ou commandez directement",
      name: "Nom complet",
      tel: "Téléphone",
      addr: "Adresse",
      city: "Ville",
      prov: "Province / État",
      cap: "Code postal",
      qty: "Quantité",
      submit: "CLIQUEZ POUR TERMINER LA COMMANDE",
      processing: "TRAITEMENT...",
      delivered: "Livré",
      save: "ÉCONOMISER"
    },
    announcement: [
      "⏱ LIVRAISON EN 3 JOURS",
      "💳 PAIEMENT À LA LIVRAISON",
      "🚚 LIVRAISON GRATUITE"
    ],
    features: {
      title: "\"Confort instantané et durabilité : Ceinture Well Up\"",
      relief: "Soulagement immédiat",
      reliefDesc: "La ceinture Well Up offre un soulagement rapide de la douleur, atténuant rapidement l'inconfort associé à des problèmes tels que la sciatique et les lombalgies.",
      design: "Conception confortable",
      designDesc: "Conçue avec une forme ergonomique, la ceinture assure un confort optimal lors d'une utilisation quotidienne, permettant un ajustement agréable et une sensation de soulagement.",
      sciatica: "Résoudre les problèmes de sciatique et de zone lombaire",
      sciaticaDesc: "Grâce à son soutien lombaire et à sa compression ciblée, la ceinture s'attaque efficacement aux problèmes tels que la sciatique et les lombalgies, améliorant ainsi la santé globale du dos.",
      durability: "Durabilité et longévité",
      durabilityDesc: "Fabriquée avec des matériaux de haute qualité, la ceinture est conçue pour résister à une utilisation prolongée dans le temps, garantissant une durabilité exceptionnelle et des performances fiables."
    },
    stats: {
      title: "Guérissez comme jamais auparavant",
      s1: "Soulagement immédiat chez les patients souffrant de maux de dos et de sciatique.",
      s2: "Sciatique éliminée en seulement 2 semaines d'utilisation constante.",
      s3: "Maux de dos chroniques résolus après 14 jours de traitement."
    },
    faq: {
      title: "FAQs",
      items: [
        { q: "Qu'est-ce que la ceinture Well Up ?", a: "C'est un support lombaire pneumatique conçu pour décomprimer la colonne vertébrale et soulager immédiatement la douleur." },
        { q: "Combien de temps dois-je porter la ceinture Well Up pour voir des résultats ?", a: "Nous recommandons de l'utiliser 2 heures par jour. De nombreux utilisateurs ressentent des bénéfices dès les deux premières semaines." },
        { q: "Y a-t-il des effets secondaires à l'utilisation de la ceinture Well Up ?", a: "Non, c'est un dispositif non invasif. Cependant, consultez toujours un médecin pour des conditions préexistantes graves." },
        { q: "La ceinture Well Up peut-elle remplacer les visites chez le chiropracteur ?", a: "Elle peut être un excellent support complémentaire, mais ne doit pas remplacer un avis clinique spécialisé." },
        { q: "Comment fonctionne exactement la ceinture Well Up ?", a: "Elle utilise 52 colonnes d'air qui, une fois gonflées, soulèvent délicatement le haut du corps en l'éloignant du bassin." }
      ]
    },
    aboutS: {
      title: "À propos de nous",
      mission: "\"Notre mission est de redéfinir le bien-être lombaire grâce à l'innovation technologique et à la conception ergonomique.\"",
      historyTitle: "Notre histoire",
      history: "Well Up est né du besoin d'offrir une solution réelle et non invasive à ceux qui souffrent de maux de dos chroniques. Nous avons collaboré avec des experts en biomécanique pour créer une ceinture qui n'était pas seulement un support, mais un véritable système de décompression portable.",
      whyWellupTitle: "Pourquoi Well Up ?",
      whyWellup: "Contrairement aux supports traditionnels, la ceinture Well Up utilise 52 colonnes d'air dynamiques. Cette approche 'haute densité' assure une répartition uniforme du poids et une décompression millimétrique des vertèbres.",
      certTitle: "Certification de qualité",
      cert: "Chaque ceinture Well Up est testée individuellement pour maintenir une pression constante de 0,2 MPa pendant 24 heures."
    },
    thankYou: {
      orderId: "Commande",
      thanks: "Merci",
      confirmed: "Votre commande est confirmée",
      message: "Vous recevrez peut-être un message lorsque votre commande sera prête. Livraison prévue : 72 heures.",
      summary: "Résumé",
      shipping: "Livraison",
      free: "GRATUITE",
      total: "Total",
      paymentMethod: "Mode de paiement",
      cod: "Paiement à la livraison",
      backHome: "Retour à l'accueil"
    },
    useCases: {
      tabs: ['Sciatique', 'Travail sédentaire', 'Travail actif'],
      sciaticaText: "Ressentez la douleur de la sciatique à cause de votre âge",
      defaultText: "Un soutien optimal pour vos activités quotidiennes."
    },
    reviews: {
      count: "15 Avis",
      write: "rédiger votre avis"
    },
    paymentDetailed: {
      title: "Paiement",
      codTitle: "Paiement à la livraison",
      codDesc: "Pour garantir une sécurité maximale à nos clients, nous utilisons exclusivement le modèle de paiement à la livraison.",
      codList: ["Aucun paiement d'avance", "Payez seulement à la réception", "Courrier express"],
      howTitle: "Comment ça fonctionne ?",
      howDesc: "Une fois la commande confirmée via notre formulaire, le produit sera préparé et expédié sous 24 heures. Vous recevrez un code de suivi par SMS.",
      safetyTitle: "Sécurité des données",
      safetyDesc: "Vos données sont protégées et cryptées. Nous les utilisons exclusivement pour finaliser la livraison de votre commande Well Up."
    },
    contactDetailed: {
      title: "Contactez-nous",
      email: "Email",
      hours: "Horaires",
      hoursVal: "Lun - Ven : 09:00 - 18:00",
      social: "Social",
      form: {
        name: "NOM",
        email: "EMAIL",
        help: "COMMENT POUVONS-NOUS VOUS AIDER ?",
        submit: "Envoyer le message"
      }
    },
    privacyDetailed: {
      title: "Politique de confidentialité",
      content: "Votre vie privée est importante pour nous. Cette politique explique comment Well Up collecte, utilise et protège vos informations personnelles lorsque vous visitez notre site ou passez une commande.",
      s1: {
        t: "1. Informations collectées",
        p: "Nous ne collectons que les données nécessaires au traitement de votre commande : Nom, Numéro de téléphone, Adresse de livraison et Code postal."
      },
      s2: {
        t: "2. Utilisation des données",
        p: "Vos données sont utilisées exclusivement pour l'expédition et la confirmation de la commande. Nous ne vendons ni ne partageons vos données avec des tiers à des fins de marketing."
      },
      s3: {
        t: "3. Sécurité",
        p: "Nous adoptons des mesures de sécurité avancées pour protéger vos données. Toutes les données sont stockées sur des serveurs sécurisés et cryptés."
      }
    },
    termsDetailed: {
      title: "Termes et conditions",
      content: "En accédant au site Well Up, vous acceptez les termes et conditions d'utilisation suivants.",
      s1: {
        t: "1. Commandes et paiements",
        p: "Well Up fonctionne exclusivement par paiement à la livraison. La commande est considérée comme finalisée après confirmation téléphonique de notre équipe."
      },
      s2: {
        t: "2. Expédition",
        p: "La livraison est gratuite dans le monde entier. Les délais de livraison estimés sont de 3 à 4 jours ouvrables."
      },
      s3: {
        t: "3. Politique de retour",
        p: "Vous avez le droit de vous rétracter de l'achat dans les 14 jours suivant la réception des marchandises. Le produit doit être retourné intact dans son emballage d'origine."
      }
    },
    cartDetailed: {
      title: "Mon panier",
      empty: "Le panier est vide",
      startShopping: "Commencer les achats",
      subtotal: "Sous-total",
      shipping: "Livraison",
      free: "GRATUIT",
      total: "Total",
      checkout: "Passer à la caisse"
    },
    footerDetailed: {
      rights: "Tous droits réservés.",
      privacy: "Confidentialité",
      terms: "Conditions",
      contact: "Contact"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      product: "Well Up Gürtel",
      about: "Über uns",
      payment: "Zahlungsmethode",
      contact: "Kontakt"
    },
    notFound: {
      title: "404 - Seite nicht gefunden",
      message: "Hoppla! Die Seite, nach der Sie suchen, scheint wie vom Erdboden verschluckt zu sein.",
      backHome: "Zurück zur Startseite"
    },
    hero: {
      title: "Erneuerter Komfort",
      subtitle: "Verwandeln Sie jeden Tag in pure Magie.",
      cta: "Jetzt kaufen"
    },
    ticker: {
      shipping: "SCHNELLER 72H VERSAND",
      guarantee: "GELD-ZURÜCK-GARANTIE",
      easy: "EINFACHE BESTELLUNG"
    },
    benefits: {
      title: "Erleben Sie beispiellose Vorteile",
      desc: "Das Wesen des Well Up Gürtels liegt in seinen vielfältigen Vorteilen. Jeder Aspekt unseres Gürtels kann durch gezielte Kompression lebensverändernd wirken.",
      list: ["Sofortige Linderung", "Komfortables Design", "Ischias & Rückenschmerzen", "Haltbarkeit & Langlebigkeit"]
    },
    order: {
      formTitle: "Füllen Sie das Formular aus! Wir werden Sie kontaktieren, um Ihre Informationen zu bestätigen, bevor wir das Produkt versenden 📞✅",
      addToCart: "In den Warenkorb",
      orOrder: "Oder direkt bestellen",
      name: "Vollständiger Name",
      tel: "Telefonnummer",
      addr: "Adresse",
      city: "Stadt",
      prov: "Provinz / Bundesland",
      cap: "Postleitzahl",
      qty: "Menge",
      submit: "KLICKEN, UM DIE BESTELLUNG ABZUSCHLIESSEN",
      processing: "VERARBEITUNG...",
      delivered: "Geliefert",
      save: "SPAREN"
    },
    announcement: [
      "⏱ LIEFERUNG IN 3 TAGEN",
      "💳 BARZAHLUNG BEI LIEFERUNG",
      "🚚 KOSTENLOSER VERSAND"
    ],
    features: {
      title: "\"Sofortiger Komfort und Haltbarkeit: Well Up Gürtel\"",
      relief: "Sofortige Linderung",
      reliefDesc: "Der Well Up Gürtel bietet eine schnelle Schmerzlinderung und lindert rasch Beschwerden, die mit Problemen wie Ischias und Schmerzen im unteren Rückenbereich verbunden sind.",
      design: "Komfortables Design",
      designDesc: "Ergonomisch gestaltet, sorgt der Gürtel für optimalen Komfort bei täglichem Gebrauch und ermöglicht eine angenehme Passform und ein Gefühl der Erleichterung.",
      sciatica: "Lösung von Ischias- und Rückenproblemen",
      sciaticaDesc: "Dank seiner Lendenstütze und der gezielten Kompression bekämpft der Gürtel effektiv Probleme wie Ischias und Schmerzen im unteren Rückenbereich und verbessert die allgemeine Rückengesundheit.",
      durability: "Haltbarkeit und Langlebigkeit",
      durabilityDesc: "Hergestellt aus hochwertigen Materialien, ist der Gürtel für eine längere Nutzung über die Zeit konzipiert und gewährleistet eine außergewöhnliche Haltbarkeit und zuverlässige Leistung."
    },
    stats: {
      title: "Heilen Sie wie nie zuvor",
      s1: "Sofortige Linderung bei Patienten mit Rückenschmerzen und Ischias.",
      s2: "Ischias in nur 2 Wochen konsequenter Anwendung eliminiert.",
      s3: "Chronische Rückenschmerzen nach 14 Tagen Behandlung behoben."
    },
    faq: {
      title: "FAQs",
      items: [
        { q: "Was ist der Well Up Gürtel?", a: "Es ist eine pneumatische Lendenwirbelstütze, die die Wirbelsäule dekomprimiert und sofortige Schmerzlinderung bietet." },
        { q: "Wie lange sollte ich den Well Up Gürtel tragen, um Ergebnisse zu sehen?", a: "Wir empfehlen die Anwendung für 2 Stunden am Tag. Viele Anwender spüren bereits in den ersten zwei Wochen erste Vorteile." },
        { q: "Gibt es Nebenwirkungen bei der Verwendung des Well Up Gürtels?", a: "Nein, es ist ein nicht-invasives Gerät. Konsultieren Sie jedoch bei schwerwiegenden Vorerkrankungen immer einen Arzt." },
        { q: "Kann der Well Up Gürtel Besuche beim Chiropraktiker ersetzen?", a: "Er kann eine hervorragende ergänzende Unterstützung sein, sollte jedoch keinen klinischen Fachrat ersetzen." },
        { q: "Wie genau funktioniert der Well Up Gürtel?", a: "Er verwendet 52 Luftsäulen, die nach dem Aufpumpen den Oberkörper sanft vom Becken wegheben." }
      ]
    },
    aboutS: {
      title: "Über uns",
      mission: "\"Unsere Mission ist es, das Wohlbefinden im Lendenwirbelbereich durch technologische Innovation und ergonomisches Design neu zu definieren.\"",
      historyTitle: "Unsere Geschichte",
      history: "Well Up entstand aus dem Bedürfnis heraus, Menschen mit chronischen Rückenschmerzen eine echte, nicht-invasive Lösung anzubieten. Wir haben mit Biomechanik-Experten zusammengearbeitet, um einen Gürtel zu entwickeln, der nicht nur eine Stütze, sondern ein echtes tragbares Dekompressionssystem ist.",
      whyWellupTitle: "Warum Well Up?",
      whyWellup: "Im Gegensatz zu herkömmlichen Stützen verwendet der Well Up Gürtel 52 dynamische Luftsäulen. Dieser 'High-Density'-Ansatz sorgt für eine gleichmäßige Gewichtsverteilung und eine millimetergenaue Dekompression der Wirbel.",
      certTitle: "Qualitätszertifizierung",
      cert: "Jeder Well Up Gürtel wird einzeln getestet, um über 24 Stunden einen konstanten Druck von 0,2 MPa aufrechtzuerhalten."
    },
    thankYou: {
      orderId: "Bestellung",
      thanks: "Danke",
      confirmed: "Ihre Bestellung ist bestätigt",
      message: "Sie erhalten möglicherweise eine Nachricht, wenn Ihre Bestellung abholbereit ist. Voraussichtliche Lieferung: 72 Stunden.",
      summary: "Zusammenfassung",
      shipping: "Versand",
      free: "KOSTENLOS",
      total: "Gesamt",
      paymentMethod: "Zahlungsmethode",
      cod: "Nachnahme (Barzahlung bei Lieferung)",
      backHome: "Zurück zur Startseite"
    },
    useCases: {
      tabs: ['Ischias', 'Sedentäre Arbeit', 'Aktive Arbeit'],
      sciaticaText: "Spüren Sie den Ischias-Schmerz aufgrund Ihres Alters",
      defaultText: "Optimale Unterstützung für Ihre täglichen Aktivitäten."
    },
    reviews: {
      count: "15 Bewertungen",
      write: "Schreiben Sie eine Bewertung"
    },
    paymentDetailed: {
      title: "Zahlung",
      codTitle: "Nachnahme",
      codDesc: "Um maximale Sicherheit für unsere Kunden zu gewährleisten, nutzen wir ausschließlich das Zahlungsmodell bei Lieferung.",
      codList: ["Keine Vorauszahlung", "Zahlen Sie erst bei Erhalt", "Express-Kurier"],
      howTitle: "Wie funktioniert es?",
      howDesc: "Sobald die Bestellung über unser Formular bestätigt wurde, wird das Produkt innerhalb von 24 Stunden vorbereitet und versendet. Sie erhalten einen Tracking-Code per SMS.",
      safetyTitle: "Datensicherheit",
      safetyDesc: "Ihre Daten sind geschützt und verschlüsselt. Wir verwenden sie ausschließlich zur Abwicklung der Lieferung Ihrer Well Up Bestellung."
    },
    contactDetailed: {
      title: "Kontakt",
      email: "Email",
      hours: "Öffnungszeiten",
      hoursVal: "Mo - Fr: 09:00 - 18:00",
      social: "Social Media",
      form: {
        name: "NAME",
        email: "EMAIL",
        help: "WIE KÖNNEN WIR IHNEN HELFEN?",
        submit: "Nachricht senden"
      }
    },
    privacyDetailed: {
      title: "Datenschutzbestimmungen",
      content: "Ihr Datenschutz ist uns wichtig. In dieser Richtlinie wird erläutert, wie Well Up Ihre personenbezogenen Daten sammelt, verwendet und schützt, wenn Sie unsere Website besuchen oder eine Bestellung aufgeben.",
      s1: {
        t: "1. Gesammelte Informationen",
        p: "Wir sammeln nur die für die Bearbeitung Ihrer Bestellung erforderlichen Daten: Name, Telefonnummer, Lieferadresse und Postleitzahl."
      },
      s2: {
        t: "2. Verwendung der Daten",
        p: "Ihre Daten werden ausschließlich für den Versand und die Bestellbestätigung verwendet. Wir verkaufen oder teilen Ihre Daten nicht mit Dritten zu Marketingzwecken."
      },
      s3: {
        t: "3. Sicherheit",
        p: "Wir setzen fortschrittliche Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen. Alle Daten werden auf sicheren, verschlüsselten Servern gespeichert."
      }
    },
    termsDetailed: {
      title: "Allgemeine Geschäftsbedingungen",
      content: "Durch den Zugriff auf die Well Up Website akzeptieren Sie die folgenden Nutzungsbedingungen.",
      s1: {
        t: "1. Bestellungen und Zahlungen",
        p: "Well Up arbeitet ausschließlich per Nachnahme. Die Bestellung gilt nach telefonischer Bestätigung durch unser Team als abgeschlossen."
      },
      s2: {
        t: "2. Versand",
        p: "Der Versand ist weltweit kostenlos. Die geschätzte Lieferzeit beträgt 3-4 Werktage."
      },
      s3: {
        t: "3. Rückgaberecht",
        p: "Sie haben das Recht, innerhalb von 14 Tagen nach Erhalt der Ware vom Kauf zurückzutreten. Das Produkt muss unversehrt in der Originalverpackung zurückgegeben werden."
      }
    },
    cartDetailed: {
      title: "Mein Warenkorb",
      empty: "Warenkorb ist leer",
      startShopping: "Einkauf starten",
      subtotal: "Zwischensumme",
      shipping: "Versand",
      free: "KOSTENLOS",
      total: "Gesamt",
      checkout: "Zur Kasse"
    },
    footerDetailed: {
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "Bedingungen",
      contact: "Kontakt"
    }
  }
};

type Language = 'it' | 'en' | 'fr' | 'de';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof TRANSLATIONS['it'];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const LanguageSelector = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ] as const;

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const changeLanguage = (newLangCode: string) => {
    const currentBase = location.pathname.replace(/^\/(eng|fr|de)/, '');
    const prefix = newLangCode === 'it' ? '' : newLangCode === 'en' ? '/eng' : `/${newLangCode}`;
    const newPath = `${prefix}${currentBase || (prefix ? '' : '/')}`;
    navigate(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-brand-blue transition-all bg-white shadow-sm"
      >
        <span className="text-lg leading-none">{currentLang.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 p-1"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold uppercase transition-all rounded-lg ${lang === l.code ? 'bg-brand-blue/5 text-brand-blue' : 'hover:bg-gray-50 text-brand-dark'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span className="tracking-tight">{l.name}</span>
                </div>
                {lang === l.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Images based on the request (simulated URLs or using the provided descriptions)
const IMAGES = {
  hero: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/Hero%20image.jpg",
  productHero: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/ceinture-lombaire-gonflable-1.webp",
  productLifestyle: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/women%20on%20a%20couch.jpg",
  productHowTo: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/Steps.png",
  productDiagram: "https://imagedelivery.net/az7A-j5Hj99v9EIn9p71zQ/9804c865-c7e4-474c-4a37-674b971a5c00/public",
  productStructure: "https://imagedelivery.net/az7A-j5Hj99v9EIn9p71zQ/6e838641-4796-41b4-2195-207907572700/public",
  productBox: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/ceinture-lombaire-gonflable-1.webp",
  useCaseSciatica: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/Sciatica.webp",
  useCaseSedentary: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/sedentary%20work.jpg",
  useCaseActive: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/active%20work%20a.webp",
  useCasePain: "https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/Use.png",
  reviewGrid: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1544126592-807daf21565c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1518611012118-29fa11345f14?auto=format&fit=crop&q=80&w=400"
  ]
};

const AnnouncementBar = () => {
  const { t } = useLanguage();
  const items = t.announcement;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-blue text-white py-2 text-center text-xs font-semibold tracking-wide uppercase overflow-hidden whitespace-nowrap">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ cartQuantity, onCartClick }: { cartQuantity: number, onCartClick: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang } = useLanguage();
  const location = useLocation();

  const getLocalizedPath = (path: string) => {
    const prefix = lang === 'it' ? '' : lang === 'en' ? '/eng' : `/${lang}`;
    if (path === '/') return prefix || '/';
    return `${prefix}${path}`;
  };

  const navLinks = [
    { id: 'home', label: t.nav.home, path: '/' },
    { id: 'product', label: t.nav.product, path: '/product' },
    { id: 'about', label: t.nav.about, path: '/about' },
    { id: 'payment', label: t.nav.payment, path: '/payment' },
    { id: 'contact', label: t.nav.contact, path: '/contact' }
  ];

  const currentPageMatch = (path: string) => {
    // Basic match check
    const current = location.pathname;
    const localized = getLocalizedPath(path);
    if (path === '/') {
       return current === '/' || current === '/eng' || current === '/fr' || current === '/de';
    }
    return current.endsWith(path);
  };

  return (
    <nav className="h-16 sticky top-0 z-50 bg-white border-b border-gray-100 px-4 md:px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <button id="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 -ml-2">
          <Menu className="w-6 h-6 text-brand-dark" />
        </button>
        <Link to={getLocalizedPath('/')} className="flex items-center gap-2">
          <img 
            src="https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/Logo%20svg.svg" 
            alt="Wellup Logo" 
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 text-[13px] font-medium">
        {navLinks.map(link => (
          <Link
            key={link.id}
            to={getLocalizedPath(link.path)}
            className={`transition-colors h-full flex items-center px-4 py-1.5 rounded-full ${currentPageMatch(link.path) ? 'bg-brand-blue text-white' : 'hover:text-brand-blue shadow-none hover:shadow-none bg-transparent'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 text-lg">
        <LanguageSelector />
        <div className="relative cursor-pointer" onClick={onCartClick}>
          <ShoppingBag className="w-5 h-5 text-gray-500" />
          {cartQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-brand-green text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {cartQuantity}
            </span>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-50 bg-white p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-brand-blue">Wellup</span>
              <X className="w-6 h-6" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.id}
                  to={getLocalizedPath(link.path)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left text-lg font-bold border-b border-gray-100 pb-2 ${currentPageMatch(link.path) ? 'text-brand-blue' : 'text-brand-dark'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TrustTicker = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-brand-blue py-3 overflow-hidden border-t border-brand-blue/20">
      <div className="animate-ticker-fast whitespace-nowrap flex items-center gap-12 text-white font-bold uppercase tracking-widest text-sm">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t.ticker.shipping}</span>
            <span>·</span>
            <span>{t.ticker.guarantee}</span>
            <span>·</span>
            <span>{t.ticker.easy}</span>
            <span>·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const HeroSection = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[60vh] md:h-[65vh] flex overflow-hidden border-b border-gray-100">
      <div className="w-full md:w-1/2 relative bg-gray-50 flex flex-col justify-center px-6 md:px-20 py-16 md:py-10 z-10 text-center md:text-left">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 md:hidden" style={{ backgroundImage: `url(${IMAGES.hero})` }}></div>
        <div className="relative z-20 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-7xl font-black text-brand-dark leading-tight uppercase"
          >
            {t.hero.title.split(' ')[0]}<br />{t.hero.title.split(' ')[1]}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-700 italic font-medium"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.button 
            id="hero-cta-button"
            onClick={(e) => {
              e.preventDefault();
              onCtaClick();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-8 border-2 border-brand-dark text-brand-dark w-full md:w-max px-10 py-4 font-bold uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition-all shadow-lg active:scale-95"
          >
            {t.hero.cta}
          </motion.button>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 relative">
        <img src={IMAGES.hero} alt="Comfort Rinnovato" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent" />
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  const { t } = useLanguage();
  return (
    <section id="benefits" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-center border-b border-gray-100 pb-16">
          <div className="w-full md:w-1/3 aspect-square bg-gray-50 flex items-center justify-center rounded-2xl border border-gray-100 p-6 shadow-sm">
            <img src={IMAGES.productHero} alt="Well Up Cintura" className="max-h-full object-contain" />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-base md:text-lg font-black uppercase tracking-wider text-brand-dark">{t.benefits.title}</h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              {t.benefits.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs md:text-sm font-bold uppercase tracking-tight text-gray-700">
              {t.benefits.list.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-brand-green">✅</span> 
                  <span className="opacity-90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

// Symbols and state management for the order flow
const ThankYouPage = ({ name, total }: { name: string, total: string }) => {
  const { t } = useLanguage();
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-20 px-6 max-w-4xl mx-auto text-center"
    >
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-12 space-y-8">
          <div className="w-20 h-20 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-100">
            <Check className="w-10 h-10" />
          </div>
          <div>
            <p className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] mb-2">{t.thankYou.orderId} #112292</p>
            <h2 className="text-4xl font-black text-brand-dark">{t.thankYou.thanks}, {name}!</h2>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col items-center gap-4">
            <div className="w-full h-48 bg-gray-200 rounded-2xl relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" alt="Map" className="w-full h-full object-cover grayscale opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-3 rounded-full shadow-xl">
                   <MapPin className="w-6 h-6 text-brand-blue" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                {t.thankYou.confirmed}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              {t.thankYou.message}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left border-t border-gray-100 pt-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.thankYou.summary}</h4>
              <div className="flex justify-between items-center text-sm font-bold text-brand-dark">
                <span>Well Up Cintura</span>
                <span>{total}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                <span>{t.thankYou.shipping}</span>
                <span className="text-brand-green font-black">{t.thankYou.free}</span>
              </div>
              <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-brand-blue">{t.thankYou.total}</span>
                <span className="text-xl font-black text-brand-dark">{total}</span>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.thankYou.paymentMethod}</h4>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <Truck className="w-5 h-5 text-brand-blue" />
                <span className="text-xs font-bold text-brand-dark uppercase">{t.thankYou.cod}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-10 py-4 bg-brand-blue text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-dark transition-all"
          >
            {t.thankYou.backHome}
          </button>
        </div>
      </div>
    </motion.section>
  );
};

const ProductPage = ({ onOrderSuccess, onAddToCart }: { onOrderSuccess: (name: string, total: string) => void, onAddToCart: (q: number) => void }) => {
  const { t } = useLanguage();
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ nome: '', tel: '', ind: '', citta: '', prov: '', cap: '' });

  const basePrice = 79.95;
  const totalPrice = (basePrice * quantity).toFixed(2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(formData.nome, `€${totalPrice}`);
    }, 2000);
  };

  const gallery = [
    { src: IMAGES.hero, alt: "Well Up Comfort" },
    { src: IMAGES.productHero, alt: "Well Up Cintura Hero" },
    { src: IMAGES.productHowTo, alt: "Come usare la cintura" },
    { src: IMAGES.productLifestyle, alt: "Lifestyle uso cintura" },
    { src: IMAGES.useCasePain, alt: "Well Up In Uso" }
  ];

  const Accordion = ({ title, children }: { title: string, children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-gray-100 last:border-0">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 flex justify-between items-center text-left font-bold uppercase text-[10px] tracking-widest text-brand-dark"
        >
          {title}
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-4 text-[11px] text-gray-500 leading-relaxed font-medium"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="product" className="py-8 md:py-12 bg-white px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-4 md:p-6 shadow-sm">
            <motion.img 
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={gallery[activeImg].src} 
              alt={gallery[activeImg].alt} 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {gallery.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-50 rounded-lg border-2 transition-all overflow-hidden ${activeImg === i ? 'border-brand-blue shadow-md' : 'border-transparent opacity-60'}`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Form */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue uppercase leading-[1.1]">Well Up Cintura</h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="text-orange-400 text-sm">⭐⭐⭐⭐⭐</div>
                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{t.reviews.count}</span>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 pt-2 sm:pt-0">
              <div className="flex flex-col sm:items-end">
                <div className="text-gray-400 line-through text-xs md:text-sm italic">€119,99</div>
                <div className="text-2xl md:text-3xl font-black text-brand-dark leading-tight">€79,95</div>
              </div>
              <div className="bg-brand-green/10 text-brand-green text-[10px] font-black px-3 py-1 rounded-full border border-brand-green/30 uppercase tracking-widest">
                {t.order.save} €40,04
              </div>
            </div>
          </div>

          <div className="p-4 md:p-5 border-2 border-brand-blue/30 bg-blue-50/20 rounded-xl space-y-4">
            <p className="text-xs font-bold text-brand-blue uppercase text-center leading-tight">
              {t.order.formTitle}
            </p>
            
            <form id="order-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 pb-2">
                <motion.button 
                  id="add-to-cart-button"
                  type="button"
                  onClick={() => onAddToCart(quantity)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="col-span-2 py-5 bg-brand-blue text-white font-black rounded-lg uppercase tracking-widest text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t.order.addToCart}
                </motion.button>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-blue/10"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black text-brand-blue bg-blue-50/50 px-2 w-max mx-auto">{t.order.orOrder}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t.order.name} className="w-full text-base p-4 bg-white border border-gray-300 rounded-xl focus:border-brand-blue outline-none shadow-sm" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                <input type="tel" placeholder={t.order.tel} className="w-full text-base p-4 bg-white border border-gray-300 rounded-xl focus:border-brand-blue outline-none shadow-sm" required value={formData.tel} onChange={e => setFormData({...formData, tel: e.target.value})} />
                <input type="text" placeholder={t.order.addr} className="md:col-span-2 w-full text-base p-4 bg-white border border-gray-300 rounded-xl focus:border-brand-blue outline-none shadow-sm" required value={formData.ind} onChange={e => setFormData({...formData, ind: e.target.value})} />
                <input type="text" placeholder={t.order.city} className="w-full text-base p-4 bg-white border border-gray-300 rounded-xl focus:border-brand-blue outline-none shadow-sm" required value={formData.citta} onChange={e => setFormData({...formData, citta: e.target.value})} />
                <input type="text" placeholder={t.order.prov} className="w-full text-base p-4 bg-white border border-gray-300 rounded-xl focus:border-brand-blue outline-none shadow-sm" required value={formData.prov} onChange={e => setFormData({...formData, prov: e.target.value})} />
                <input type="text" placeholder={t.order.cap} className="md:col-span-2 w-full text-base p-4 bg-white border border-gray-300 rounded-xl focus:border-brand-blue outline-none shadow-sm" required value={formData.cap} onChange={e => setFormData({...formData, cap: e.target.value})} />
              </div>

              <div className="flex items-center justify-between py-4 border-t border-brand-blue/10">
                <span className="text-xs font-black uppercase text-brand-blue tracking-[0.2em]">{t.order.qty}</span>
                <div className="flex items-center gap-8 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 rounded-xl transition-colors"><Minus className="w-5 h-5 text-brand-blue" /></button>
                  <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 rounded-xl transition-colors"><Plus className="w-5 h-5 text-brand-blue" /></button>
                </div>
              </div>

              <motion.button 
                id="submit-order-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 text-white font-black rounded-xl shadow-xl hover:shadow-2xl transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3 ${isSubmitting ? 'bg-gray-400' : 'bg-brand-green'}`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><ShoppingBag className="w-5 h-5" /></motion.div>
                    {t.order.processing}
                  </>
                ) : (
                  <>{t.order.submit} - €{totalPrice}</>
                )}
              </motion.button>
            </form>

            <div className="flex justify-between px-2 pt-6 pb-2">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm mb-2 shadow-lg">🛒</div>
                <span className="text-[9px] font-black text-gray-400 uppercase">Jun 1st</span>
              </div>
              <div className="flex-1 h-[2px] bg-gray-100 mt-5 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm mb-2 shadow-lg">📦</div>
                <span className="text-[9px] font-black text-gray-400 uppercase">Jun 2nd</span>
              </div>
              <div className="flex-1 h-[2px] bg-gray-100 mt-5 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center text-sm mb-2 shadow-lg">🏠</div>
                <span className="text-[9px] font-black text-brand-green uppercase tracking-tighter">Consegnato</span>
              </div>
            </div>
          </div>

          <p className="mt-4 italic text-[11px] text-gray-600 border-t pt-4">
            "Ho mal di schiena e indosso la cintura ed è fantastico." — <span className="font-bold text-brand-dark uppercase">Miles ⭐⭐⭐⭐⭐</span>
          </p>

          <div className="mt-4">
            <Accordion title="PAGAMENTO E CONSEGNA">
              Offriamo spedizione rapida in tutta Italia in 3 giorni lavorativi. Pagamento alla consegna (Contrassegno) disponibile per la tua sicurezza.
            </Accordion>
            <Accordion title="POLITICA DI RESO">
              Puoi restituire il prodotto entro 14 giorni se non sei soddisfatto dei risultati. Contatta il nostro supporto per avviare la procedura.
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

const UseCaseTabs = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(t.useCases.tabs[0]);
  const tabs = t.useCases.tabs;
  
  const getUseCaseImage = (tab: string) => {
    if (tab === tabs[0]) return IMAGES.useCaseSciatica;
    if (tab === tabs[1]) return IMAGES.useCaseSedentary;
    if (tab === tabs[2]) return IMAGES.useCaseActive;
    return IMAGES.useCasePain;
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20 max-w-7xl mx-auto px-6"
    >
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${activeTab === tab ? 'bg-brand-blue text-white border-brand-blue' : 'text-brand-blue border-brand-blue/20 hover:border-brand-blue/50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 items-center gap-12 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative group cursor-zoom-in"
        >
          <img src={getUseCaseImage(activeTab)} alt={activeTab} className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full aspect-video object-cover" />
          <div className="absolute top-4 left-4 bg-black/20 p-2 rounded-full backdrop-blur-sm"><Search className="w-5 h-5 text-white" /></div>
        </motion.div>
        <motion.div 
           key={`${activeTab}-text`}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="text-gray-500 text-lg md:text-xl font-light italic"
        >
          {activeTab === tabs[0] ? t.useCases.sciaticaText : t.useCases.defaultText}
        </motion.div>
      </div>
    </motion.section>
  );
};

const FeaturesBanner = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-brand-blue py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
          {t.features.title}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{t.features.relief}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{t.features.reliefDesc}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{t.features.design}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{t.features.designDesc}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl overflow-hidden">
            <img src={IMAGES.productBox} alt="Well Up Box" className="w-full max-w-sm" />
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{t.features.sciatica}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{t.features.sciaticaDesc}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{t.features.durability}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{t.features.durabilityDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const { t } = useLanguage();
  const StatsRing = ({ percentage, text, colorClass }: { percentage: number, text: string, colorClass: string }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex items-center gap-8 py-8 border-b border-gray-100 last:border-0 group">
        <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
          <svg className="w-full h-full -rotate-90">
            {/* Background Circle (Track) */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-100"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={colorClass}
              style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
            />
          </svg>
          <span className="absolute text-lg font-black text-brand-dark">{percentage}%</span>
        </div>
        <p className="text-sm md:text-base leading-relaxed font-bold text-gray-600 max-w-2xl">{text}</p>
      </div>
    );
  };

  return (
    <section id="stats" className="bg-white py-16 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight leading-tight">
          {t.stats.title}
        </h2>
        <span className="text-3xl">💝</span>
      </div>
      <div className="flex flex-col">
        <StatsRing percentage={95} colorClass="border-brand-blue/10 text-brand-blue" text={t.stats.s1} />
        <StatsRing percentage={90} colorClass="border-brand-blue/10 text-brand-blue" text={t.stats.s2} />
        <StatsRing percentage={75} colorClass="border-brand-blue/10 text-brand-blue" text={t.stats.s3} />
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = t.faq.items;

  return (
    <section id="faq" className="bg-brand-blue py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-white text-center mb-12 uppercase tracking-tighter">{t.faq.title}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-4">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left py-4 text-base text-white font-bold tracking-tight hover:opacity-80 transition-opacity"
              >
                <span className="flex items-center gap-4">
                  <div className="bg-white/10 p-2 rounded-full"><Plus className={`w-4 h-4 transition-transform ${openIndex === i ? 'rotate-45' : ''}`} /></div>
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden text-white/70 text-sm leading-relaxed italic pb-4 pl-14"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 mb-16">
        <div>
           <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
            <span className="text-4xl md:text-5xl font-black text-brand-dark italic">5.0</span>
            <div className="flex text-brand-blue">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
           </div>
           <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">{t.reviews.count}</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-4 bg-brand-dark text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-blue transition-all shadow-lg active:scale-95">{t.reviews.write}</button>
          <button className="p-4 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"><Menu className="w-5 h-5 text-brand-dark" /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {IMAGES.reviewGrid.map((img, i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden group">
            <img src={img} alt="Recensione utente" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutUs = () => {
  const { t } = useLanguage();
  return (
    <motion.section 
      id="about"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl md:text-5xl font-black text-brand-blue uppercase mb-8 md:mb-12 tracking-tight">{t.aboutS.title}</h2>
      <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
        <p className="text-base md:text-lg italic font-medium border-l-4 border-brand-blue pl-6 py-2">
          {t.aboutS.mission}
        </p>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-4 md:pt-8">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue">{t.aboutS.historyTitle}</h3>
            <p className="text-sm">{t.aboutS.history}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue">{t.aboutS.whyWellupTitle}</h3>
            <p className="text-sm">{t.aboutS.whyWellup}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 md:p-8 rounded-2xl flex items-center gap-6 md:gap-8 mt-12">
          <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-10 h-10 text-brand-blue" />
          </div>
          <div>
            <h4 className="font-bold text-brand-dark mb-1">{t.aboutS.certTitle}</h4>
            <p className="text-xs text-gray-500 font-medium">{t.aboutS.cert}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const PaymentMethod = () => {
  const { t } = useLanguage();
  return (
    <motion.section 
      id="payment-info"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl md:text-5xl font-black text-brand-blue uppercase mb-8 md:mb-12 tracking-tight">{t.paymentDetailed.title}</h2>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-brand-blue text-white p-8 md:p-10 rounded-3xl space-y-6">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold italic">{t.paymentDetailed.codTitle}</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            {t.paymentDetailed.codDesc}
          </p>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
            {t.paymentDetailed.codList.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-3">✅ {item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-brand-blue tracking-widest">{t.paymentDetailed.howTitle}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{t.paymentDetailed.howDesc}</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-brand-blue tracking-widest">{t.paymentDetailed.safetyTitle}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{t.paymentDetailed.safetyDesc}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const ContactUs = () => {
  const { t } = useLanguage();
  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl md:text-5xl font-black text-brand-blue uppercase mb-8 md:mb-12 tracking-tight">{t.contactDetailed.title}</h2>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-10">
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#28A745] mb-3">{t.contactDetailed.email}</h4>
            <p className="text-sm md:text-base font-bold text-brand-dark">supporto@wellup.shop</p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#28A745] mb-3">{t.contactDetailed.hours}</h4>
            <p className="text-sm md:text-base font-bold text-brand-dark">{t.contactDetailed.hoursVal}</p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#28A745] mb-3">{t.contactDetailed.social}</h4>
            <div className="flex gap-4 mt-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-brand-blue hover:text-white transition-all"><User className="w-5 h-5" /></div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-brand-blue hover:text-white transition-all"><User className="w-5 h-5" /></div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <form className="space-y-4 bg-gray-50 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder={t.contactDetailed.form.name} className="w-full text-base p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-brand-blue transition-all" />
              <input type="email" placeholder={t.contactDetailed.form.email} className="w-full text-base p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-brand-blue transition-all" />
            </div>
            <textarea placeholder={t.contactDetailed.form.help} rows={5} className="w-full text-base p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-brand-blue transition-all resize-none"></textarea>
            <button className="w-full py-5 bg-brand-dark text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-blue transition-all shadow-lg">{t.contactDetailed.form.submit}</button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 className="text-5xl font-black text-brand-blue uppercase mb-12 tracking-tight">{t.privacyDetailed.title}</h2>
      <div className="space-y-6 text-[13px] text-gray-600 leading-relaxed font-medium">
        <p>{t.privacyDetailed.content}</p>
        
        <h3 className="text-lg font-black text-brand-dark uppercase pt-4">{t.privacyDetailed.s1.t}</h3>
        <p>{t.privacyDetailed.s1.p}</p>
        
        <h3 className="text-lg font-black text-brand-dark uppercase pt-4">{t.privacyDetailed.s2.t}</h3>
        <p>{t.privacyDetailed.s2.p}</p>
        
        <h3 className="text-lg font-black text-brand-dark uppercase pt-4">{t.privacyDetailed.s3.t}</h3>
        <p>{t.privacyDetailed.s3.p}</p>
      </div>
    </motion.section>
  );
};

const Termini = () => {
  const { t } = useLanguage();
  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 className="text-5xl font-black text-brand-blue uppercase mb-12 tracking-tight">{t.termsDetailed.title}</h2>
      <div className="space-y-6 text-[13px] text-gray-600 leading-relaxed font-medium">
        <p>{t.termsDetailed.content}</p>
        
        <h3 className="text-lg font-black text-brand-dark uppercase pt-4">{t.termsDetailed.s1.t}</h3>
        <p>{t.termsDetailed.s1.p}</p>
        
        <h3 className="text-lg font-black text-brand-dark uppercase pt-4">{t.termsDetailed.s2.t}</h3>
        <p>{t.termsDetailed.s2.p}</p>
        
        <h3 className="text-lg font-black text-brand-dark uppercase pt-4">{t.termsDetailed.s3.t}</h3>
        <p>{t.termsDetailed.s3.p}</p>
      </div>
    </motion.section>
  );
};

const CartDrawer = ({ isOpen, onClose, quantity, setQuantity, onCheckout }: { isOpen: boolean, onClose: () => void, quantity: number, setQuantity: (q: number) => void, onCheckout: () => void }) => {
  const { t } = useLanguage();
  const price = 79.95;
  const total = (price * quantity).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-tight">{t.cartDetailed.title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {quantity === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.cartDetailed.empty}</p>
                  <button 
                    onClick={onClose}
                    className="text-xs font-black text-brand-blue uppercase tracking-widest hover:underline"
                  >
                    {t.cartDetailed.startShopping}
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 p-4 border rounded-2xl bg-gray-50/50">
                  <div className="w-24 h-24 bg-white rounded-xl border p-2 flex items-center justify-center">
                    <img src={IMAGES.productHero} alt="Product" className="max-h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-black text-brand-dark uppercase tracking-tight">Well Up Cintura</h3>
                      <button onClick={() => setQuantity(0)} className="text-gray-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[10px] text-brand-blue font-black uppercase">Standard Size / Beige</p>
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-0.5"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="p-0.5"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-black text-brand-dark">€{total}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {quantity > 0 && (
              <div className="p-6 border-t bg-gray-50 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <span>{t.cartDetailed.subtotal}</span>
                    <span>€{total}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-brand-green uppercase tracking-widest">
                    <span>{t.cartDetailed.shipping}</span>
                    <span>{t.cartDetailed.free}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-brand-dark uppercase tracking-tight pt-2 border-t">
                    <span>{t.cartDetailed.total}</span>
                    <span>€{total}</span>
                  </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-brand-green text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t.cartDetailed.checkout}
                </button>
                <div className="flex justify-center items-center gap-4 opacity-50 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const { t, lang } = useLanguage();
  const getLocalizedPath = (path: string) => {
    const prefix = lang === 'it' ? '' : lang === 'en' ? '/eng' : `/${lang}`;
    if (path === '/') return prefix || '/';
    return `${prefix}${path}`;
  };

  return (
    <footer className="bg-brand-blue py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
           <Link to={getLocalizedPath('/')} className="flex items-center gap-2">
             <img 
              src="https://zbchgawobsnnegnsmuyc.supabase.co/storage/v1/object/public/Wellup%20Project/Logo%20svg.svg" 
              alt="Wellup Logo" 
              className="h-6 w-auto brightness-0 invert"
            />
            <span className="text-xl font-bold text-white tracking-widest uppercase">Wellup</span>
          </Link>
          <p className="text-white/50 text-xs tracking-tight">© 2026 Well Up Cintura. {t.footerDetailed.rights}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white/70 text-xs font-medium uppercase tracking-widest">
          <Link to={getLocalizedPath('/privacy')} className="hover:text-white transition-colors py-2 px-1">{t.footerDetailed.privacy}</Link>
          <Link to={getLocalizedPath('/termini')} className="hover:text-white transition-colors py-2 px-1">{t.footerDetailed.terms}</Link>
          <Link to={getLocalizedPath('/contact')} className="hover:text-white transition-colors py-2 px-1">{t.footerDetailed.contact}</Link>
        </div>
      </div>
    </footer>
  );
};

const NotFound = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const getLocalizedPath = (path: string) => {
    const prefix = lang === 'it' ? '' : lang === 'en' ? '/eng' : `/${lang}`;
    if (path === '/') return prefix || '/';
    return `${prefix}${path}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      <motion.div
        initial={{ scale: 0.8, rotate: -5, y: 20 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="relative mb-12"
      >
        <div className="text-[140px] md:text-[220px] font-black text-gray-50/80 leading-none select-none tracking-tighter">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Search className="w-24 h-24 md:w-36 h-36 text-brand-blue opacity-30" />
          </motion.div>
        </div>
      </motion.div>
      
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight mb-4 max-w-xl mx-auto">
          {t.notFound.title}
        </h1>
        <p className="text-gray-500 max-w-md mb-12 font-medium text-lg md:text-xl">
          {t.notFound.message}
        </p>
        
        <button 
          onClick={() => navigate(getLocalizedPath('/'))}
          className="group relative bg-brand-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-blue/30 overflow-hidden"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 block">
            {t.notFound.backHome}
          </span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [lang, setLang] = useState<Language>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/eng')) return 'en';
    if (path.startsWith('/fr')) return 'fr';
    if (path.startsWith('/de')) return 'de';
    return 'it';
  });

  const [orderInfo, setOrderInfo] = useState<{ name: string, total: string } | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getLocalizedPath = (path: string, l = lang) => {
    const prefix = l === 'it' ? '' : l === 'en' ? '/eng' : `/${l}`;
    if (path === '/') return prefix || '/';
    return `${prefix}${path}`;
  };

  useEffect(() => {
    // Sync language state with URL if it changes externally or on mount
    const path = location.pathname;
    let newLang: Language = 'it';
    if (path.startsWith('/eng')) newLang = 'en';
    else if (path.startsWith('/fr')) newLang = 'fr';
    else if (path.startsWith('/de')) newLang = 'de';
    
    if (newLang !== lang) {
      setLang(newLang);
    }
  }, [location.pathname]);

  const handleOrderSuccess = (name: string, total: string) => {
    setOrderInfo({ name, total });
    navigate(getLocalizedPath('/success'));
  };

  const handleAddToCart = (q: number) => {
    setCartQuantity(prev => prev + q);
    setIsCartOpen(true);
  };

  const HomeRoutes = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeroSection onCtaClick={() => navigate(getLocalizedPath('/product'))} />
      <TrustTicker />
      <BenefitsSection />
      <StatsSection />
      <UseCaseTabs />
      <FeaturesBanner />
      <ReviewsSection />
      <FAQSection />
    </motion.div>
  );

  const ProductRoutes = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ProductPage onOrderSuccess={handleOrderSuccess} onAddToCart={handleAddToCart} />
      <FeaturesBanner />
      <StatsSection />
      <FAQSection />
    </motion.div>
  );

  const AppRoutes = () => (
    <Routes>
      {/* Root redirects or layouts depending on lang prefix */}
      {['/', '/eng', '/fr', '/de'].map(p => (
        <Route key={p} path={p} element={<HomeRoutes />} />
      ))}
      
      {['/product', '/eng/product', '/fr/product', '/de/product'].map(p => (
        <Route key={p} path={p} element={<ProductRoutes />} />
      ))}

      {['/about', '/eng/about', '/fr/about', '/de/about'].map(p => (
        <Route key={p} path={p} element={<AboutUs />} />
      ))}

      {['/payment', '/eng/payment', '/fr/payment', '/de/payment'].map(p => (
        <Route key={p} path={p} element={<PaymentMethod />} />
      ))}

      {['/contact', '/eng/contact', '/fr/contact', '/de/contact'].map(p => (
        <Route key={p} path={p} element={<ContactUs />} />
      ))}

      {['/privacy', '/eng/privacy', '/fr/privacy', '/de/privacy'].map(p => (
        <Route key={p} path={p} element={<PrivacyPolicy />} />
      ))}

      {['/termini', '/eng/termini', '/fr/termini', '/de/termini'].map(p => (
        <Route key={p} path={p} element={<Termini />} />
      ))}

      {['/success', '/eng/success', '/fr/success', '/de/success'].map(p => (
        <Route key={p} path={p} element={orderInfo ? <ThankYouPage name={orderInfo.name} total={orderInfo.total} /> : <Navigate to="/" />} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] || TRANSLATIONS.it }}>
      <div className="min-h-screen bg-white font-sans text-brand-dark overflow-x-hidden">
        <AnnouncementBar />
        <Navbar 
          cartQuantity={cartQuantity}
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          quantity={cartQuantity}
          setQuantity={setCartQuantity}
          onCheckout={() => {
            setIsCartOpen(false);
            navigate(getLocalizedPath('/product'));
            setTimeout(() => {
              document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
          }}
        />

        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
