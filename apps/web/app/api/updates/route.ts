import { NextResponse } from 'next/server';
import { parseCsv } from '@/lib/csv';

// Home page "What's Moving?" carousel, sourced from a Google Sheet published
// to the web as CSV (File > Share > Publish to web > CSV). Expected columns,
// in order, with a header row: Image URL | Title | Details | Link | Status.
// Status is one of Upcoming / Live / Ended (case-insensitive); Ended rows are
// dropped here so they never reach the browser. Anything else (blank, typo)
// is treated as Live so a bad status value never hides real content.
export interface SheetUpdateCard {
  id: string;
  imageUrl: string;
  title: string;
  details: string;
  link: string;
  status: 'upcoming' | 'live';
}

const CSV_URL = process.env.GOOGLE_SHEET_UPDATES_CSV_URL;

// Without this, Next.js treats a parameter-less GET route as static and
// caches this handler's own response indefinitely (separately from, and on
// top of, the `fetch()` cache below) — the client's 5-minute poll would keep
// getting the same frozen JSON forever. Forcing it dynamic means every poll
// re-runs this function; the fetch()'s own `revalidate` below is what
// actually controls how often the Google Sheet gets hit.
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!CSV_URL) {
    return NextResponse.json({ cards: [] }, { status: 200 });
  }

  try {
    // The client already polls this route every 5 minutes (UpdatesCarousel.tsx)
    // — that's the one place refresh timing is controlled. Caching the sheet
    // fetch here too would stack a second, independent delay on top of it.
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);

    const text = await res.text();
    const rows = parseCsv(text).slice(1); // drop header row

    const cards: SheetUpdateCard[] = rows
      .map((row, i) => {
        const [imageUrl = '', title = '', details = '', link = '', statusRaw = ''] = row;
        const status = statusRaw.trim().toLowerCase();
        return {
          id: `sheet-${i}`,
          imageUrl: imageUrl.trim(),
          title: title.trim(),
          details: details.trim(),
          link: link.trim(),
          status: status === 'upcoming' ? ('upcoming' as const) : ('live' as const),
          _rawStatus: status,
        };
      })
      .filter((c) => c._rawStatus !== 'ended' && c.title)
      .map(({ _rawStatus, ...c }) => c);

    return NextResponse.json({ cards }, { status: 200 });
  } catch (err) {
    console.error('updates feed fetch failed', err);
    return NextResponse.json({ cards: [] }, { status: 200 });
  }
}
