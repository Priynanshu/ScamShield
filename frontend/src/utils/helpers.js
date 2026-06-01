/**
 * ScamShield helper functions
 */

export function timeAgo(dateInput) {
  if (!dateInput) return "Some time ago";
  
  const now = new Date();
  const past = new Date(dateInput);
  const diffMs = now - past;
  
  if (isNaN(diffMs)) return "Some time ago";
  
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) {
    return "Now";
  } else if (diffMin < 60) {
    return `${diffMin} min ago`;
  } else if (diffHr < 24) {
    return `${diffHr} hours ago`;
  } else {
    return `${diffDay} days ago`;
  }
}

export function getVerdictColor(verdict) {
  const v = (verdict || "").toUpperCase();
  if (v === "SCAM") {
    return "red-600"; // SCAM is red-600
  } else if (v === "SUSPICIOUS") {
    return "yellow-500"; // SUSPICIOUS is yellow-500
  } else {
    return "green-600"; // SAFE is green-600
  }
}

export function getVerdictIcon(verdict) {
  const v = (verdict || "").toUpperCase();
  if (v === "SCAM") {
    return "ShieldAlert";
  } else if (v === "SUSPICIOUS") {
    return "AlertTriangle";
  } else {
    return "ShieldCheck";
  }
}

export function truncateText(text, maxLength = 120) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
