import React, { useState, useEffect, CSSProperties } from "react";

const BUMP_BLUE = "#3D5AFE";
const BUMP_BLUE_LIGHT = "#E8ECFF";

const users = [
  { id: 1, name: "Michael", time: "6:04 PM", color: "#3D5AFE", bg: "#ffffff", dot: "#3D5AFE" },
  { id: 2, name: "Roman",   time: "6:04 PM", color: "#FF6B6B", bg: "#f8f8f8", dot: "#FF6B6B" },
  { id: 3, name: "Samir",   time: "6:04 PM", color: "#00C897", bg: "#ffffff", dot: "#00C897" },
  { id: 4, name: "Cynthia", time: "6:04 PM", color: "#A259FF", bg: "#f8f8f8", dot: "#A259FF" },
  { id: 5, name: "Yi",      time: "6:04 PM", color: "#FF9F43", bg: "#ffffff", dot: "#FF9F43" },
];

function StatusBar() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px 10px",
      backgroundColor: "#ffffff",
    }}>
      {/* Time */}
      <span style={{
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: "-0.3px",
        color: "#111",
      }}>9:41</span>

      {/* Bump Logo Pill */}
      <div style={{
        backgroundColor: BUMP_BLUE,
        borderRadius: 20,
        padding: "5px 14px",
        display: "flex",
        alignItems: "center",
        gap: 5,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white"/>
        </svg>
        <span style={{
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 800,
          fontSize: 13,
          color: "#ffffff",
          letterSpacing: "0.5px",
        }}>BUMP</span>
      </div>

      {/* Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#111">
          <rect x="0" y="6" width="3" height="6" rx="1"/>
          <rect x="4.5" y="4" width="3" height="8" rx="1"/>
          <rect x="9" y="2" width="3" height="10" rx="1"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 24 17" fill="none">
          <path d="M12 13.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#111"/>
          <path d="M12 9c-2 0-3.8.8-5.1 2.1l1.4 1.4C9.4 11.6 10.6 11 12 11s2.6.6 3.7 1.5l1.4-1.4C15.8 9.8 14 9 12 9z" fill="#111"/>
          <path d="M12 5c-3.1 0-5.9 1.3-7.9 3.3l1.4 1.4C7.1 8 9.4 7 12 7s4.9 1 6.5 2.7l1.4-1.4C17.9 6.3 15.1 5 12 5z" fill="#111"/>
          <path d="M12 1C7.8 1 4 2.7 1.2 5.5l1.4 1.4C5.1 4.3 8.4 3 12 3s6.9 1.3 9.4 3.9l1.4-1.4C20 2.7 16.2 1 12 1z" fill="#111"/>
        </svg>
        {/* Battery */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            width: 25, height: 12,
            border: "1.5px solid #111",
            borderRadius: 3,
            padding: 1.5,
            position: "relative",
          }}>
            <div style={{
              width: "90%", height: "100%",
              backgroundColor: "#111",
              borderRadius: 1.5,
            }}/>
          </div>
          <div style={{
            width: 2, height: 5,
            backgroundColor: "#111",
            borderRadius: "0 1px 1px 0",
            marginLeft: 1,
          }}/>
        </div>
      </div>
    </div>
  );
}

function BellHero({ visible }: { visible: boolean }) {
  return (
    <div style={{
      height: 220,
      backgroundColor: "#fafafa",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Soft radial glow */}
      <div style={{
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(61,90,254,0.08) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}/>

      {/* Bell SVG */}
      <div style={{
        fontSize: 90,
        lineHeight: 1,
        filter: "drop-shadow(0 8px 24px rgba(61,90,254,0.2))",
        transform: visible ? "translateY(0) rotate(-8deg)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        animation: visible ? "bellRing 2s ease-in-out 0.8s infinite" : "none",
      }}>
        🔔
      </div>

      <style>{`
        @keyframes bellRing {
          0%, 90%, 100% { transform: rotate(-8deg); }
          10%, 30% { transform: rotate(8deg); }
          20%, 40% { transform: rotate(-6deg); }
        }
      `}</style>
    </div>
  );
}

function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <div style={{
      width: 44,
      height: 44,
      borderRadius: "50%",
      backgroundColor: color + "22",
      border: `2px solid ${color}44`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 700,
        fontSize: 16,
        color: color,
      }}>
        {name[0]}
      </span>
    </div>
  );
}

type User = { id: number; name: string; time: string; color: string; bg: string; dot: string };

function NotificationCard({ user, index, visible }: { user: User; index: number; visible: boolean }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: user.bg,
        padding: "0",
        transform: visible
          ? pressed ? "scale(0.98)" : "translateX(0)"
          : "translateX(40px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.45s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.07}s, opacity 0.45s ease ${index * 0.07}s, background 0.15s ease`,
        cursor: "pointer",
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        gap: 12,
        position: "relative",
      }}>
        <Avatar name={user.name} color={user.color} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name + time */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 2,
          }}>
            <span style={{
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#1c1c1e",
            }}>{user.name}</span>
            <span style={{
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 12,
              color: "#8e8e93",
            }}>• {user.time}</span>
          </div>

          {/* Title */}
          <div style={{
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: BUMP_BLUE,
            lineHeight: 1.3,
            marginBottom: 2,
          }}>
            {user.name} just joined your friend list
          </div>

          {/* Subtitle */}
          <div style={{
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 13,
            color: "#8e8e93",
            lineHeight: 1.3,
          }}>
            See what they're up to right now!
          </div>
        </div>

        {/* Dot indicator */}
        <div style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: user.dot,
          flexShrink: 0,
          boxShadow: `0 0 6px ${user.dot}88`,
        }}/>
      </div>

      {/* Divider */}
      <div style={{
        height: 0.5,
        backgroundColor: "#e5e5ea",
        marginLeft: 72,
      }}/>
    </div>
  );
}

function BottomBar() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px 28px",
      backgroundColor: "#ffffff",
      borderTop: "0.5px solid #e5e5ea",
    }}>
      <span style={{
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 700,
        fontSize: 16,
        color: "#1c1c1e",
      }}>Bump</span>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 12,
          color: "#8e8e93",
        }}>curated by</span>
        <div style={{
          backgroundColor: "#1c1c1e",
          borderRadius: 4,
          padding: "2px 7px",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
          }}/>
          <span style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: "#ffffff",
            letterSpacing: "0.3px",
          }}>Mobbin</span>
        </div>
      </div>
    </div>
  );
}

export default function BumpNotificationFeed() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#e5e5ea",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      padding: "40px 0",
    }}>
      {/* Phone frame */}
      <div style={{
        width: 390,
        borderRadius: 44,
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)",
        backgroundColor: "#ffffff",
        position: "relative",
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 34,
          backgroundColor: "#000",
          borderRadius: 20,
          zIndex: 10,
        }}/>

        <StatusBar />

        <div style={{
          overflowY: "auto",
          maxHeight: "75vh",
          scrollbarWidth: "none",
        }}>
          <BellHero visible={visible} />

          <div style={{ backgroundColor: "#ffffff" }}>
            {users.map((user, i) => (
              <NotificationCard
                key={user.id}
                user={user}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}
