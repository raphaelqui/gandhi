import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_NUMBER = "01627292743"; // Telefonnummer ohne + oder Sonderzeichen

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests } = body;

    // Validierung
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { message: "Alle Felder sind erforderlich." },
        { status: 400 }
      );
    }

    // Nachricht für WhatsApp zusammenstellen
    const message = `
Neue Reservierung:
👤 Name: ${name}
📧 Email: ${email}
📞 Telefon: ${phone}
📅 Datum: ${date}
⏰ Uhrzeit: ${time}
👥 Anzahl Gäste: ${guests}
    `.trim();

    // WhatsApp Link erstellen (alternativ: hier könnte die WhatsApp Business API aufgerufen werden)
    // Für Testzwecke speichern wir die Daten lokal (optional auch in einer Datenbank)

    console.log("Reservierung erhalten:", body);

    // Optional: Daten in eine Datei/Datenbank speichern
    // await saveReservationToDB(body);

    // Antwort mit WhatsApp Link für Benutzer
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    return NextResponse.json(
      {
        message: "Reservierung erfolgreich versendet!",
        whatsappLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fehler bei der Reservierung:", error);
    return NextResponse.json(
      { message: "Fehler beim Verarbeiten der Reservierung." },
      { status: 500 }
    );
  }
}
