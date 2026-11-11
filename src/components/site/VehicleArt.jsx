const bodyGradient = (
  <defs>
    <linearGradient id="karnail-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FDFCF9" />
      <stop offset="72%" stopColor="#F8F6F0" />
      <stop offset="100%" stopColor="#E5E8E3" />
    </linearGradient>
    <linearGradient id="karnail-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#477D7B" />
      <stop offset="100%" stopColor="#203E40" />
    </linearGradient>
  </defs>
);

function Ground() {
  return (
    <>
      <path
        d="M16 236 C 120 204, 196 254, 300 224 S 486 188, 624 218"
        fill="none"
        stroke="#E9874D"
        strokeOpacity="0.32"
        strokeWidth="2"
        strokeDasharray="5 9"
        strokeLinecap="round"
      />
      <ellipse cx="322" cy="240" rx="232" ry="10" fill="#203E40" opacity="0.35" />
    </>
  );
}

function Wheel({ cx, cy, r = 30 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#26383B" />
      <circle cx={cx} cy={cy} r={r - 7} fill="#E5E8E3" />
      <circle cx={cx} cy={cy} r={r - 15} fill="#26383B" />
      <circle cx={cx} cy={cy} r="4" fill="#E9874D" />
    </g>
  );
}

function Sedan() {
  return (
    <>
      {bodyGradient}
      <Ground />
      <g className="transition-transform duration-700 ease-smooth group-hover:translate-x-1.5">
        <path
          d="M60 198 C60 180 74 171 98 167 L180 158 C205 128 238 114 282 114 L372 114 C412 114 442 128 468 154 L548 165 C570 169 582 178 582 196 L582 204 L60 204 Z"
          fill="url(#karnail-body)"
        />
        <path d="M210 154 C232 132 254 123 286 123 L316 123 L316 154 Z" fill="url(#karnail-glass)" />
        <path d="M328 123 L370 123 C400 123 424 133 444 154 L328 154 Z" fill="url(#karnail-glass)" />
        <rect x="321" y="123" width="6" height="31" fill="#F8F6F0" />
        <path d="M330 158 L330 198" stroke="#26383B" strokeOpacity="0.14" strokeWidth="2" />
        <rect x="284" y="166" width="20" height="3" rx="1.5" fill="#26383B" opacity="0.22" />
        <rect x="374" y="166" width="20" height="3" rx="1.5" fill="#26383B" opacity="0.22" />
        <path d="M96 188 H540" stroke="#E9874D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M570 172 L582 175 L582 183 L568 180 Z" fill="#E9874D" />
        <rect x="58" y="172" width="6" height="9" rx="2" fill="#B85C33" />
        <Wheel cx={176} cy={201} />
        <Wheel cx={470} cy={201} />
      </g>
    </>
  );
}

function Suv() {
  return (
    <>
      {bodyGradient}
      <Ground />
      <g className="transition-transform duration-700 ease-smooth group-hover:translate-x-1.5">
        <path
          d="M54 198 C54 180 68 171 92 167 L166 158 L196 112 C206 98 218 92 236 92 L424 92 C444 92 456 100 466 114 L494 158 L558 166 C578 170 590 178 590 196 L590 204 L54 204 Z"
          fill="url(#karnail-body)"
        />
        <path d="M208 154 L232 110 C236 103 242 100 250 100 L300 100 L300 154 Z" fill="url(#karnail-glass)" />
        <path d="M312 100 L396 100 L396 154 L312 154 Z" fill="url(#karnail-glass)" />
        <path d="M408 100 L430 100 C440 100 447 104 452 112 L474 154 L408 154 Z" fill="url(#karnail-glass)" />
        <rect x="304" y="100" width="6" height="54" fill="#F8F6F0" />
        <rect x="400" y="100" width="6" height="54" fill="#F8F6F0" />
        <path d="M330 158 L330 198" stroke="#26383B" strokeOpacity="0.14" strokeWidth="2" />
        <rect x="280" y="164" width="22" height="3" rx="1.5" fill="#26383B" opacity="0.22" />
        <rect x="420" y="164" width="22" height="3" rx="1.5" fill="#26383B" opacity="0.22" />
        <path d="M86 188 H566" stroke="#E9874D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M578 172 L590 175 L590 183 L576 180 Z" fill="#E9874D" />
        <rect x="52" y="170" width="6" height="10" rx="2" fill="#B85C33" />
        <path d="M196 112 H224" stroke="#26383B" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
        <Wheel cx={166} cy={201} r={32} />
        <Wheel cx={480} cy={201} r={32} />
      </g>
    </>
  );
}

function Innova() {
  return (
    <>
      {bodyGradient}
      <Ground />
      <g className="transition-transform duration-700 ease-smooth group-hover:translate-x-1.5">
        <path
          d="M46 200 C46 182 60 173 84 169 L146 160 L194 114 C206 102 220 96 238 96 L442 96 C462 96 476 104 486 118 L524 158 L566 166 C586 170 598 180 598 198 L598 206 L46 206 Z"
          fill="url(#karnail-body)"
        />
        <path d="M206 156 L230 114 C234 107 240 104 248 104 L298 104 L298 156 Z" fill="url(#karnail-glass)" />
        <path d="M310 104 L390 104 L390 156 L310 156 Z" fill="url(#karnail-glass)" />
        <path d="M402 104 L436 104 C446 104 453 108 458 116 L480 156 L402 156 Z" fill="url(#karnail-glass)" />
        <rect x="302" y="104" width="6" height="52" fill="#F8F6F0" />
        <rect x="394" y="104" width="6" height="52" fill="#F8F6F0" />
        <path d="M330 160 L330 200" stroke="#26383B" strokeOpacity="0.14" strokeWidth="2" />
        <rect x="278" y="166" width="22" height="3" rx="1.5" fill="#26383B" opacity="0.22" />
        <rect x="424" y="166" width="22" height="3" rx="1.5" fill="#26383B" opacity="0.22" />
        <path d="M78 190 H574" stroke="#E9874D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M586 174 L598 177 L598 185 L584 182 Z" fill="#E9874D" />
        <rect x="44" y="172" width="6" height="10" rx="2" fill="#B85C33" />
        <Wheel cx={156} cy={203} r={31} />
        <Wheel cx={490} cy={203} r={31} />
      </g>
    </>
  );
}

function Tempo() {
  return (
    <>
      {bodyGradient}
      <Ground />
      <g className="transition-transform duration-700 ease-smooth group-hover:translate-x-1.5">
        <path
          d="M40 202 C40 184 54 175 78 171 L112 171 L142 106 C150 92 164 84 182 84 L522 84 C550 84 564 98 564 122 L564 202 L40 202 Z"
          fill="url(#karnail-body)"
        />
        <path d="M120 168 L146 112 C149 104 155 100 164 100 L178 100 L178 168 Z" fill="url(#karnail-glass)" />
        <rect x="192" y="104" width="74" height="52" rx="4" fill="url(#karnail-glass)" />
        <rect x="278" y="104" width="74" height="52" rx="4" fill="url(#karnail-glass)" />
        <rect x="364" y="104" width="74" height="52" rx="4" fill="url(#karnail-glass)" />
        <rect x="450" y="104" width="74" height="52" rx="4" fill="url(#karnail-glass)" />
        <rect x="186" y="104" width="6" height="52" fill="#F8F6F0" />
        <rect x="272" y="104" width="6" height="52" fill="#F8F6F0" />
        <rect x="358" y="104" width="6" height="52" fill="#F8F6F0" />
        <rect x="444" y="104" width="6" height="52" fill="#F8F6F0" />
        <path d="M62 186 H548" stroke="#E9874D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M548 170 L564 174 L564 184 L548 180 Z" fill="#E9874D" />
        <rect x="38" y="170" width="6" height="11" rx="2" fill="#B85C33" />
        <rect x="64" y="196" width="30" height="6" rx="2" fill="#26383B" opacity="0.18" />
        <Wheel cx={150} cy={201} r={30} />
        <Wheel cx={474} cy={201} r={30} />
      </g>
    </>
  );
}

const art = { sedan: Sedan, suv: Suv, innova: Innova, tempo: Tempo };

export default function VehicleArt({ type = 'sedan', className }) {
  const Art = art[type] || Sedan;
  return (
    <svg viewBox="0 0 640 280" className={className} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
