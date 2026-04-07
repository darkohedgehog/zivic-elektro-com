import { permanentRedirect } from "next/navigation";

export default function TermsPage() {
  permanentRedirect("/pravila-privatnosti#uvjeti-koristenja");
}
