import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import { useMembership } from "../db/membership";

export default function MembershipBadge() {
  const member = useMembership();
  return (
    <Link
      className="member-badge"
      to="/settings"
      aria-label={`0979 会员等级 ${member.code} ${member.title}，前往设置与账号`}
    >
      <Crown size={16} aria-hidden="true" />
      <span className="member-code">0979</span>
      <span className="member-tier">{member.code}</span>
      <span className="member-title">{member.title}</span>
    </Link>
  );
}
