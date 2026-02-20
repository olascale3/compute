'use client';

import { useEffect, useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  last_used_at: string | null;
  revoked_at: string | null;
  created_at: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKey, setShowNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  async function loadKeys() {
    const res = await fetch('/api/v1/keys');
    const data = await res.json();
    setKeys(data.keys ?? []);
    setLoading(false);
  }

  useEffect(() => { loadKeys(); }, []);

  async function createKey() {
    setCreating(true);
    const res = await fetch('/api/v1/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newKeyName || 'Untitled' }),
    });
    const data = await res.json();
    if (res.ok) {
      setShowNewKey(data.apiKey);
      setNewKeyName('');
      setShowDialog(false);
      await loadKeys();
    }
    setCreating(false);
  }

  async function revokeKey(id: string) {
    if (!confirm('Are you sure you want to revoke this API key? This cannot be undone.')) return;
    await fetch(`/api/v1/keys?id=${id}`, { method: 'DELETE' });
    await loadKeys();
  }

  function handleCopy() {
    if (showNewKey) {
      navigator.clipboard.writeText(showNewKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-[#ddd8d0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
          API Keys
        </h1>
        <button
          onClick={() => setShowDialog(true)}
          className="px-4 py-2 bg-[#ff8c3c] text-[#06080c] font-bold text-xs rounded-md hover:bg-[#ffb87a] transition-colors"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          Create New Key
        </button>
      </div>

      {/* New key display */}
      {showNewKey && (
        <div className="mb-6 bg-[rgba(255,140,60,0.08)] border border-[rgba(255,140,60,0.25)] rounded-lg p-5">
          <p className="text-sm text-[#ffb87a] mb-2" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Your new API key (copy it now — it won&apos;t be shown again):
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.25)] rounded text-[#ff8c3c] text-xs break-all" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              {showNewKey}
            </code>
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-[rgba(255,140,60,0.12)] text-[#ff8c3c] text-xs rounded hover:bg-[rgba(255,140,60,0.2)] transition-colors flex-shrink-0"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button
            onClick={() => setShowNewKey(null)}
            className="mt-3 text-xs text-[#5a554e] hover:text-[#8a8379] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Create dialog */}
      {showDialog && (
        <div className="mb-6 bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg p-5">
          <h3 className="text-sm text-[#8a8379] mb-3" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Create API Key</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name (e.g., Production)"
              className="flex-1 px-3 py-2 bg-[#06080c] border border-[rgba(255,140,60,0.15)] rounded-md text-[#ddd8d0] text-sm focus:outline-none focus:border-[#ff8c3c] transition-colors"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            />
            <button
              onClick={createKey}
              disabled={creating}
              className="px-4 py-2 bg-[#ff8c3c] text-[#06080c] font-bold text-xs rounded-md hover:bg-[#ffb87a] transition-colors disabled:opacity-50"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {creating ? '...' : 'Create'}
            </button>
            <button
              onClick={() => setShowDialog(false)}
              className="px-3 py-2 text-[#5a554e] text-xs hover:text-[#8a8379] transition-colors"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Keys list */}
      {loading ? (
        <div className="text-center text-[#5a554e] py-8" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Loading...</div>
      ) : (
        <div className="bg-[rgba(255,255,255,0.022)] border border-[rgba(255,140,60,0.08)] rounded-lg overflow-hidden">
          <table className="w-full" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '12px' }}>
            <thead>
              <tr className="border-b border-[rgba(255,140,60,0.08)]">
                <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Name</th>
                <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Key</th>
                <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Created</th>
                <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Last Used</th>
                <th className="text-left px-4 py-3 text-[#5a554e] font-medium text-xs">Status</th>
                <th className="text-right px-4 py-3 text-[#5a554e] font-medium text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => (
                <tr key={key.id} className="border-b border-[rgba(255,255,255,0.03)]">
                  <td className="px-4 py-3 text-[#ddd8d0]">{key.name}</td>
                  <td className="px-4 py-3 text-[#8a8379]">{key.key_prefix}</td>
                  <td className="px-4 py-3 text-[#5a554e]">
                    {new Date(key.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-[#5a554e]">
                    {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-4 py-3">
                    {key.revoked_at ? (
                      <span className="text-red-400">Revoked</span>
                    ) : (
                      <span className="text-[#3ec96a]">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!key.revoked_at && (
                      <button
                        onClick={() => revokeKey(key.id)}
                        className="text-red-400 hover:text-red-300 text-xs transition-colors"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {keys.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#5a554e]">No API keys yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
