"use client";

import { useEffect, useMemo, useState } from 'react';

type VenueSearchResult = {
  id: string;
  source: string;
  key: string;
  name: string;
  address?: string | null;
  website?: string | null;
  phone?: string | null;
  rating?: number | null;
  category?: string | null;
};

export default function VenueSearchAdminPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<VenueSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      setError(null);
      return () => controller.abort();
    }

    setLoading(true);
    setError(null);

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/venues/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok || !data?.ok) {
          throw new Error(data?.error || 'Unable to search venues');
        }
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        setResults([]);
        setError(err?.message || 'Unable to search venues');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const helpText = useMemo(() => {
    if (!query.trim()) return 'Type at least 2 characters to search the cached venue feed.';
    if (loading) return 'Searching cached venues…';
    if (error) return error;
    return `${results.length} venue${results.length === 1 ? '' : 's'} found.`;
  }, [query, loading, error, results.length]);

  async function copyFields(result: VenueSearchResult) {
    const payload = `venue_name: ${result.name}\nvenue_place_id: ${result.id}`;
    await navigator.clipboard.writeText(payload);
    setCopied(result.id);
    window.setTimeout(() => setCopied((current) => (current === result.id ? null : current)), 1500);
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#f5f1ea', padding: '32px 20px 80px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.68 }}>Admin</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, margin: '10px 0 12px' }}>Venue search helper</h1>
          <p style={{ maxWidth: 720, color: 'rgba(245,241,234,0.74)', lineHeight: 1.6 }}>
            Search the cached directory feed, then copy the values into Prismic. Paste the venue name into <strong>venue_name</strong> and the venue ID into <strong>venue_place_id</strong> on either an event or a custom location page.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search venues, for example West Art"
            aria-label="Search venues"
            style={{
              width: '100%',
              borderRadius: 16,
              border: '1px solid rgba(245,241,234,0.16)',
              background: 'rgba(255,255,255,0.04)',
              color: 'inherit',
              padding: '16px 18px',
              fontSize: 18,
              outline: 'none',
            }}
          />
          <div style={{ fontSize: 14, color: 'rgba(245,241,234,0.65)' }}>{helpText}</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {results.map((result) => (
            <article
              key={result.key}
              style={{
                borderRadius: 20,
                border: '1px solid rgba(245,241,234,0.14)',
                background: 'rgba(255,255,255,0.03)',
                padding: 18,
                display: 'grid',
                gap: 12,
              }}
            >
              <div style={{ display: 'grid', gap: 4 }}>
                <div style={{ fontSize: 24, fontWeight: 600 }}>{result.name}</div>
                <div style={{ color: 'rgba(245,241,234,0.7)' }}>{result.address || 'No address in cache'}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.55 }}>venue_name</div>
                  <div>{result.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.55 }}>venue_place_id</div>
                  <div style={{ wordBreak: 'break-all' }}>{result.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.55 }}>category</div>
                  <div>{result.category || '—'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.55 }}>rating</div>
                  <div>{typeof result.rating === 'number' ? result.rating.toFixed(1) : '—'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => copyFields(result)}
                  style={{
                    borderRadius: 999,
                    padding: '10px 16px',
                    border: '1px solid rgba(245,241,234,0.18)',
                    background: copied === result.id ? '#f5f1ea' : 'transparent',
                    color: copied === result.id ? '#111' : '#f5f1ea',
                    cursor: 'pointer',
                  }}
                >
                  {copied === result.id ? 'Copied' : 'Copy venue fields'}
                </button>
                {result.website ? (
                  <a
                    href={result.website}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      borderRadius: 999,
                      padding: '10px 16px',
                      border: '1px solid rgba(245,241,234,0.18)',
                      color: '#f5f1ea',
                      textDecoration: 'none',
                    }}
                  >
                    Visit website
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
