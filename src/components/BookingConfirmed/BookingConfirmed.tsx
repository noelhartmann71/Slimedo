import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure"; // adjust path as needed

type AppointmentData = {
  doctorName?: string;
  patientName?: string;
  date?: string;
  time?: string;
  specialty?: string;
  appointmentId?: string;
  [key: string]: unknown;
};

const BookingConfirmed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("error");
      return;
    }

    axiosSecure
      .post("/appointment/payment-success", { session_id: sessionId })
      .then((res) => {
        setAppointmentData(res.data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [axiosSecure, sessionId]);

  /* ── Loading ── */
  if (status === "loading") {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={styles.pulseRing} />
          <div style={styles.pulseCore} />
          <p style={styles.loadingText}>Termin wird bestätigt…</p>
        </div>
        <style>{css}</style>
      </div>
    );
  }

  /* ── Error ── */
  if (status === "error") {
    return (
      <div style={styles.root}>
        <div style={{ ...styles.card, borderColor: "#fca5a5" }}>
          <div style={styles.errorIcon}>✕</div>
          <h2 style={{ ...styles.heading, color: "#ef4444" }}>
            Etwas ist schiefgelaufen
          </h2>
          <p style={styles.subText}>
            Wir konnten Ihre Buchung nicht bestätigen. Bitte kontaktieren Sie den Support.
          </p>
          <button style={styles.btn} onClick={() => navigate("/")}>
            Zur Startseite
          </button>
        </div>
        <style>{css}</style>
      </div>
    );
  }

  /* ── Success ── */
  return (
    <div style={styles.root}>
      <div style={styles.card} className="card-enter">
        {/* Green tick */}
        <div style={styles.tickWrap}>
          <svg viewBox="0 0 52 52" style={styles.tickSvg}>
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <path
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27l8 8 16-16"
              className="tick-path"
            />
          </svg>
        </div>

        <h1 style={styles.heading}>Buchung bestätigt!</h1>
        <p style={styles.subText}>
          Ihr Termin wurde erfolgreich gebucht und die Zahlung ist eingegangen.
        </p>

        {/* Details grid */}
        <div style={styles.grid}>
          {appointmentData?.doctorName && (
            <Detail
              icon="👨‍⚕️"
              label="Arzt"
              value={appointmentData.doctorName}
            />
          )}
          {appointmentData?.specialty && (
            <Detail
              icon="🏥"
              label="Fachrichtung"
              value={appointmentData.specialty}
            />
          )}
          {appointmentData?.date && (
            <Detail icon="📅" label="Datum" value={appointmentData.date} />
          )}
          {appointmentData?.time && (
            <Detail icon="🕐" label="Uhrzeit" value={appointmentData.time} />
          )}
          {appointmentData?.patientName && (
            <Detail
              icon="👤"
              label="Patient"
              value={appointmentData.patientName}
            />
          )}
          {appointmentData?.appointmentId && (
            <Detail
              icon="🔖"
              label="Buchungs-ID"
              value={`#${appointmentData.appointmentId}`}
            />
          )}
        </div>

        {/* Session ID pill */}
        <div style={styles.sessionPill}>
          <span style={styles.sessionLabel}>Sitzung</span>
          <span style={styles.sessionId}>{sessionId?.slice(0, 28)}…</span>
        </div>

        <div style={styles.btnRow}>
          <button style={styles.btn} onClick={() => navigate("/")}>
            Zurück zur Startseite
          </button>
        </div>
      </div>
      <style>{css}</style>
    </div>
  );
};

/* ── Small detail card ── */
const Detail = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <div style={styles.detailCard}>
    <span style={styles.detailIcon}>{icon}</span>
    <div>
      <p style={styles.detailLabel}>{label}</p>
      <p style={styles.detailValue}>{value}</p>
    </div>
  </div>
);

/* ── Inline styles ── */
const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0f9ff 100%)",
    padding: "24px",
    fontFamily: "'Nunito', 'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "48px 40px",
    maxWidth: "520px",
    width: "100%",
    boxShadow: "0 25px 60px rgba(0,0,0,0.10)",
    border: "1px solid #bbf7d0",
    textAlign: "center",
  },
  tickWrap: {
    width: "72px",
    height: "72px",
    margin: "0 auto 24px",
  },
  tickSvg: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: "1.75rem",
    fontWeight: 800,
    color: "#14532d",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  subText: {
    fontSize: "0.95rem",
    color: "#6b7280",
    marginBottom: "28px",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "20px",
    textAlign: "left",
  },
  detailCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    background: "#f0fdf4",
    borderRadius: "12px",
    padding: "12px 14px",
    border: "1px solid #bbf7d0",
  },
  detailIcon: { fontSize: "1.2rem", marginTop: "1px" },
  detailLabel: {
    fontSize: "0.7rem",
    color: "#6b7280",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: 600,
  },
  detailValue: {
    fontSize: "0.88rem",
    color: "#166534",
    margin: 0,
    fontWeight: 700,
  },
  sessionPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#f8fafc",
    border: "1px dashed #cbd5e1",
    borderRadius: "999px",
    padding: "6px 16px",
    marginBottom: "28px",
  },
  sessionLabel: {
    fontSize: "0.72rem",
    color: "#94a3b8",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  sessionId: { fontSize: "0.75rem", color: "#64748b", fontFamily: "monospace" },
  btnRow: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btn: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 24px",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "opacity 0.2s",
  },
  btnOutline: {
    background: "transparent",
    color: "#16a34a",
    border: "2px solid #22c55e",
    borderRadius: "12px",
    padding: "12px 24px",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  errorIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "#fee2e2",
    color: "#ef4444",
    fontSize: "1.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontWeight: 900,
  },
  loadingText: { color: "#6b7280", marginTop: "24px", fontSize: "0.95rem" },
  pulseRing: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "3px solid #22c55e",
    margin: "0 auto",
    animation: "pulse-ring 1.4s ease-in-out infinite",
  },
  pulseCore: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#22c55e",
    margin: "-52px auto 0",
    animation: "pulse-core 1.4s ease-in-out infinite",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

  @keyframes pulse-ring {
    0%   { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes pulse-core {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(0.85); }
  }
  .card-enter {
    animation: card-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes card-in {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  .tick-path {
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: tick-draw 0.6s 0.3s ease forwards;
  }
  @keyframes tick-draw {
    to { stroke-dashoffset: 0; }
  }
`;

export default BookingConfirmed;
