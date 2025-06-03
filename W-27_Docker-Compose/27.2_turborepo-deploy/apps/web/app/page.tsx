import { prismaClient } from "db/client";

interface User {
  id: string;
  username: string;
  password: string;
}

export default async function Page() {
  const users = await prismaClient.user.findMany();

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      padding: '2rem'
    }}>
      {/* Header */}
      <header style={{
        maxWidth: '800px',
        margin: '0 auto 2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #1e293b'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: '700',
          color: '#f8fafc',
          marginBottom: '0.5rem'
        }}>User Management</h1>
        <p style={{
          color: '#94a3b8',
          margin: 0
        }}>{users.length} registered users</p>
      </header>

      {/* Users Container */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {users.map((user: User) => (
          <div 
            key={user.id}
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              marginBottom: '1rem',
              borderLeft: '4px solid #7c3aed',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <h2 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#f8fafc',
                margin: 0
              }}>{user.username}</h2>
              <span style={{
                fontSize: '0.75rem',
                color: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px'
              }}>Active</span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '0.75rem'
            }}>
              <div>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '0.25rem'
                }}>User ID</p>
                <p style={{
                  color: '#e2e8f0',
                  margin: 0,
                  fontFamily: 'monospace'
                }}>{user.id}</p>
              </div>
              
              <div>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '0.25rem'
                }}>Password</p>
                <p style={{
                  color: '#e2e8f0',
                  margin: 0,
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>{user.password}</p>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer style={{
        maxWidth: '800px',
        margin: '2rem auto 0',
        paddingTop: '1rem',
        borderTop: '1px solid #1e293b',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        © {new Date().getFullYear()} User Dashboard
      </footer>
    </div>
  );
}