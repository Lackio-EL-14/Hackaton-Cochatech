interface TurtleMascotProps {
  size?: number;
  variant?: 'default' | 'laptop' | 'phone' | 'wave' | 'chart';
  className?: string;
}

export function TurtleMascot({ size = 160, variant = 'default', className = '' }: TurtleMascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shadow */}
      <ellipse cx="100" cy="185" rx="45" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* Shell */}
      <ellipse cx="100" cy="115" rx="55" ry="45" fill="#19350C" />
      <ellipse cx="100" cy="113" rx="48" ry="38" fill="#2D5A1A" />

      {/* Shell pattern */}
      <ellipse cx="100" cy="110" rx="22" ry="18" fill="#3A7022" />
      <ellipse cx="72" cy="100" rx="14" ry="12" fill="#3A7022" />
      <ellipse cx="128" cy="100" rx="14" ry="12" fill="#3A7022" />
      <ellipse cx="82" cy="130" rx="14" ry="12" fill="#3A7022" />
      <ellipse cx="118" cy="130" rx="14" ry="12" fill="#3A7022" />

      {/* Shell outline */}
      <ellipse cx="100" cy="113" rx="48" ry="38" stroke="#19350C" strokeWidth="2" fill="none" />

      {/* Front legs */}
      <ellipse cx="52" cy="140" rx="14" ry="10" fill="#5A9A3A" transform="rotate(-25 52 140)" />
      <ellipse cx="148" cy="140" rx="14" ry="10" fill="#5A9A3A" transform="rotate(25 148 140)" />

      {/* Back legs */}
      <ellipse cx="62" cy="162" rx="12" ry="9" fill="#5A9A3A" transform="rotate(-15 62 162)" />
      <ellipse cx="138" cy="162" rx="12" ry="9" fill="#5A9A3A" transform="rotate(15 138 162)" />

      {/* Tail */}
      <ellipse cx="100" cy="172" rx="8" ry="5" fill="#5A9A3A" />

      {/* Neck */}
      <rect x="82" y="68" width="36" height="28" rx="16" fill="#6DB84A" />

      {/* Head */}
      <ellipse cx="100" cy="62" rx="30" ry="26" fill="#6DB84A" />

      {/* Face - left eye area */}
      <ellipse cx="88" cy="58" rx="10" ry="11" fill="white" />
      {/* Face - right eye area */}
      <ellipse cx="112" cy="58" rx="10" ry="11" fill="white" />

      {/* Glasses frames */}
      <rect x="78" y="50" width="20" height="16" rx="8" fill="none" stroke="#FF6B35" strokeWidth="2.5" />
      <rect x="102" y="50" width="20" height="16" rx="8" fill="none" stroke="#FF6B35" strokeWidth="2.5" />
      {/* Glasses bridge */}
      <line x1="98" y1="58" x2="102" y2="58" stroke="#FF6B35" strokeWidth="2.5" />
      {/* Glasses arms */}
      <line x1="78" y1="58" x2="70" y2="56" stroke="#FF6B35" strokeWidth="2.5" />
      <line x1="122" y1="58" x2="130" y2="56" stroke="#FF6B35" strokeWidth="2.5" />

      {/* Eyes */}
      <ellipse cx="88" cy="58" rx="6" ry="7" fill="#1A2E05" />
      <ellipse cx="112" cy="58" rx="6" ry="7" fill="#1A2E05" />
      <ellipse cx="90" cy="56" rx="2" ry="2" fill="white" />
      <ellipse cx="114" cy="56" rx="2" ry="2" fill="white" />

      {/* Smile */}
      <path d="M 92 74 Q 100 80 108 74" stroke="#2D5A1A" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Nostrils */}
      <ellipse cx="97" cy="70" rx="2" ry="1.5" fill="#2D5A1A" />
      <ellipse cx="103" cy="70" rx="2" ry="1.5" fill="#2D5A1A" />

      {variant === 'phone' && (
        <g transform="translate(130, 100) rotate(15)">
          <rect x="0" y="0" width="28" height="42" rx="4" fill="#19350C" />
          <rect x="2" y="6" width="24" height="30" rx="2" fill="#6FA9BB" />
          <rect x="10" y="38" width="8" height="2" rx="1" fill="#687D31" />
          <rect x="10" y="2" width="8" height="2" rx="1" fill="#687D31" />
        </g>
      )}

      {variant === 'wave' && (
        <g>
          <line x1="52" y1="140" x2="32" y2="110" stroke="#5A9A3A" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="30" cy="107" rx="8" ry="6" fill="#6DB84A" />
        </g>
      )}

      {variant === 'laptop' && (
        <g transform="translate(55, 140)">
          <rect x="0" y="0" width="70" height="42" rx="4" fill="#19350C" />
          <rect x="3" y="3" width="64" height="32" rx="2" fill="#6FA9BB" />
          <rect x="0" y="42" width="70" height="5" rx="2" fill="#2D5A1A" />
          <line x1="20" y1="47" x2="50" y2="47" stroke="#406768" strokeWidth="2" />
          {/* Screen content */}
          <rect x="8" y="8" width="20" height="3" rx="1" fill="#F5F3EE" opacity="0.8" />
          <rect x="8" y="14" width="35" height="2" rx="1" fill="#F5F3EE" opacity="0.5" />
          <rect x="8" y="19" width="28" height="2" rx="1" fill="#F5F3EE" opacity="0.5" />
        </g>
      )}

      {variant === 'chart' && (
        <g transform="translate(55, 145)">
          <rect x="0" y="0" width="70" height="38" rx="4" fill="#19350C" />
          <rect x="3" y="3" width="64" height="28" rx="2" fill="#F5F3EE" />
          {/* Bar chart */}
          <rect x="10" y="22" width="8" height="6" fill="#687D31" />
          <rect x="22" y="16" width="8" height="12" fill="#FF6B35" />
          <rect x="34" y="10" width="8" height="18" fill="#687D31" />
          <rect x="46" y="13" width="8" height="15" fill="#6FA9BB" />
        </g>
      )}
    </svg>
  );
}
