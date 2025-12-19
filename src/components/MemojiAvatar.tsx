import { Gender } from "@/types/simulation";

interface MemojiAvatarProps {
  gender: Gender;
  expression: "happy" | "sad" | "neutral";
  size?: number;
}

const MemojiAvatar = ({ gender, expression, size = 64 }: MemojiAvatarProps) => {
  // Apple Memoji style colors
  const skinTone = {
    base: "#F5D0C5",
    shadow: "#E8B9A8",
    highlight: "#FDE8E0",
  };
  
  const hairColors = {
    donna: { base: "#2C1810", highlight: "#4A3020" },
    uomo: { base: "#1A0F0A", highlight: "#3A2515" },
    neutral: { base: "#4A3728", highlight: "#6B5040" },
  };
  
  const hair = hairColors[gender];
  
  // Cheek blush color
  const blushColor = "#FFB5B5";
  
  // Lip colors
  const lipColor = gender === "donna" ? "#E85A71" : "#D4847C";

  const renderEyes = () => {
    if (expression === "happy") {
      return (
        <>
          {/* Happy closed eyes - curved smile eyes */}
          <path 
            d="M22 32 Q27 26 32 32" 
            stroke="#2C1810" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
          />
          <path 
            d="M48 32 Q53 26 58 32" 
            stroke="#2C1810" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
          />
          {/* Eyelashes for happy eyes */}
          {gender === "donna" && (
            <>
              <path d="M20 30 L18 27" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M27 26 L27 23" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M34 30 L36 27" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M46 30 L44 27" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M53 26 L53 23" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M60 30 L62 27" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
            </>
          )}
        </>
      );
    } else if (expression === "sad") {
      return (
        <>
          {/* Sad eyes - slightly droopy */}
          <ellipse cx="27" cy="32" rx="6" ry="7" fill="white"/>
          <ellipse cx="53" cy="32" rx="6" ry="7" fill="white"/>
          {/* Iris */}
          <ellipse cx="27" cy="33" rx="4" ry="5" fill="#4A3020"/>
          <ellipse cx="53" cy="33" rx="4" ry="5" fill="#4A3020"/>
          {/* Pupil */}
          <circle cx="27" cy="33" r="2.5" fill="#1A0F0A"/>
          <circle cx="53" cy="33" r="2.5" fill="#1A0F0A"/>
          {/* Eye shine */}
          <circle cx="29" cy="31" r="1.5" fill="white"/>
          <circle cx="55" cy="31" r="1.5" fill="white"/>
          {/* Sad eyebrows */}
          <path d="M18 24 Q23 28 34 26" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M62 24 Q57 28 46 26" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Upper eyelid droopy */}
          <path d="M21 28 Q27 26 33 28" stroke={skinTone.shadow} strokeWidth="2" fill="none"/>
          <path d="M47 28 Q53 26 59 28" stroke={skinTone.shadow} strokeWidth="2" fill="none"/>
        </>
      );
    }
    
    // Neutral expression
    return (
      <>
        {/* Eye whites */}
        <ellipse cx="27" cy="32" rx="6" ry="7" fill="white"/>
        <ellipse cx="53" cy="32" rx="6" ry="7" fill="white"/>
        {/* Iris - brown */}
        <ellipse cx="27" cy="32" rx="4" ry="5" fill="#6B4423"/>
        <ellipse cx="53" cy="32" rx="4" ry="5" fill="#6B4423"/>
        {/* Pupil */}
        <circle cx="27" cy="32" r="2.5" fill="#1A0F0A"/>
        <circle cx="53" cy="32" r="2.5" fill="#1A0F0A"/>
        {/* Eye shine - Apple style double highlight */}
        <circle cx="29" cy="30" r="2" fill="white"/>
        <circle cx="25" cy="34" r="1" fill="white" opacity="0.5"/>
        <circle cx="55" cy="30" r="2" fill="white"/>
        <circle cx="51" cy="34" r="1" fill="white" opacity="0.5"/>
        {/* Upper eyelid line */}
        <path d="M21 26 Q27 24 33 26" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M47 26 Q53 24 59 26" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Eyelashes for women */}
        {gender === "donna" && (
          <>
            <path d="M21 26 L19 23" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M27 24 L27 21" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M33 26 L35 23" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M47 26 L45 23" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M53 24 L53 21" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M59 26 L61 23" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        )}
        {/* Eyebrows */}
        <path d="M18 22 Q24 19 34 22" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M46 22 Q56 19 62 22" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </>
    );
  };

  const renderMouth = () => {
    if (expression === "happy") {
      return (
        <>
          {/* Big smile with teeth */}
          <path 
            d="M30 52 Q40 64 50 52" 
            fill="white"
            stroke={lipColor}
            strokeWidth="2"
          />
          {/* Upper lip */}
          <path 
            d="M30 52 Q40 48 50 52" 
            fill={lipColor}
            stroke={lipColor}
            strokeWidth="1"
          />
          {/* Teeth line */}
          <path d="M32 54 L48 54" stroke="#E8E8E8" strokeWidth="1"/>
          {/* Lower lip shadow */}
          <path 
            d="M32 58 Q40 62 48 58" 
            stroke={gender === "donna" ? "#C94A5C" : "#B5736B"}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    } else if (expression === "sad") {
      return (
        <>
          {/* Slight frown */}
          <path 
            d="M32 56 Q40 50 48 56" 
            stroke={lipColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    }
    
    // Neutral - slight smile
    return (
      <>
        <path 
          d="M32 52 Q40 58 48 52" 
          stroke={lipColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </>
    );
  };

  const renderHair = () => {
    if (gender === "donna") {
      return (
        <>
          {/* Long flowing hair - back layer */}
          <defs>
            <linearGradient id="hairGradientF" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={hair.highlight}/>
              <stop offset="50%" stopColor={hair.base}/>
              <stop offset="100%" stopColor={hair.highlight}/>
            </linearGradient>
          </defs>
          {/* Hair back */}
          <path 
            d="M12 35 Q8 50 12 75 Q20 85 40 88 Q60 85 68 75 Q72 50 68 35" 
            fill="url(#hairGradientF)"
          />
          {/* Hair top volume */}
          <ellipse cx="40" cy="14" rx="30" ry="16" fill={hair.base}/>
          {/* Hair sides */}
          <path d="M10 20 Q6 35 10 55 Q12 60 15 55 Q12 35 14 22 Z" fill={hair.base}/>
          <path d="M70 20 Q74 35 70 55 Q68 60 65 55 Q68 35 66 22 Z" fill={hair.base}/>
          {/* Hair shine */}
          <path d="M25 8 Q35 4 50 10" stroke={hair.highlight} strokeWidth="3" fill="none" opacity="0.6"/>
          {/* Bangs */}
          <path d="M20 18 Q25 28 30 24 Q35 20 40 24 Q45 28 50 22 Q55 18 60 20" 
                fill={hair.base} stroke={hair.base} strokeWidth="2"/>
        </>
      );
    } else if (gender === "uomo") {
      return (
        <>
          <defs>
            <linearGradient id="hairGradientM" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={hair.highlight}/>
              <stop offset="100%" stopColor={hair.base}/>
            </linearGradient>
          </defs>
          {/* Short styled hair */}
          <path 
            d="M14 30 Q10 18 20 10 Q30 4 40 4 Q50 4 60 10 Q70 18 66 30 Q60 20 40 18 Q20 20 14 30 Z" 
            fill="url(#hairGradientM)"
          />
          {/* Hair texture/volume on top */}
          <path d="M20 12 Q30 6 40 8 Q50 6 58 12" fill={hair.base}/>
          {/* Styled part */}
          <path d="M25 10 Q35 5 45 10" stroke={hair.highlight} strokeWidth="2" fill="none" opacity="0.4"/>
          {/* Side fade */}
          <path d="M14 28 Q12 22 16 16" stroke={hair.base} strokeWidth="4" fill="none"/>
          <path d="M66 28 Q68 22 64 16" stroke={hair.base} strokeWidth="4" fill="none"/>
        </>
      );
    }
    
    // Neutral - medium length modern style
    return (
      <>
        <defs>
          <linearGradient id="hairGradientN" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={hair.highlight}/>
            <stop offset="100%" stopColor={hair.base}/>
          </linearGradient>
        </defs>
        {/* Medium wavy hair */}
        <ellipse cx="40" cy="12" rx="28" ry="14" fill="url(#hairGradientN)"/>
        <path d="M12 18 Q8 30 14 45 Q16 48 20 42 Q14 30 16 20 Z" fill={hair.base}/>
        <path d="M68 18 Q72 30 66 45 Q64 48 60 42 Q66 30 64 20 Z" fill={hair.base}/>
        {/* Texture */}
        <path d="M22 10 Q30 5 40 8 Q50 5 58 10" stroke={hair.highlight} strokeWidth="2" fill="none" opacity="0.5"/>
      </>
    );
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
    >
      <defs>
        {/* Skin gradient for 3D effect */}
        <radialGradient id="skinGradient" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor={skinTone.highlight}/>
          <stop offset="70%" stopColor={skinTone.base}/>
          <stop offset="100%" stopColor={skinTone.shadow}/>
        </radialGradient>
        {/* Nose shadow gradient */}
        <linearGradient id="noseShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={skinTone.shadow} stopOpacity="0.3"/>
          <stop offset="50%" stopColor={skinTone.shadow} stopOpacity="0"/>
          <stop offset="100%" stopColor={skinTone.shadow} stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      
      {/* Hair back layer */}
      {renderHair()}
      
      {/* Ears */}
      <ellipse cx="10" cy="40" rx="5" ry="8" fill={skinTone.base}/>
      <ellipse cx="10" cy="40" rx="3" ry="5" fill={skinTone.shadow} opacity="0.3"/>
      <ellipse cx="70" cy="40" rx="5" ry="8" fill={skinTone.base}/>
      <ellipse cx="70" cy="40" rx="3" ry="5" fill={skinTone.shadow} opacity="0.3"/>
      
      {/* Face shape - Apple Memoji style rounded */}
      <ellipse cx="40" cy="42" rx="28" ry="32" fill="url(#skinGradient)"/>
      
      {/* Face contour shadow */}
      <path 
        d="M15 50 Q12 35 18 25" 
        stroke={skinTone.shadow} 
        strokeWidth="3" 
        fill="none" 
        opacity="0.2"
        strokeLinecap="round"
      />
      <path 
        d="M65 50 Q68 35 62 25" 
        stroke={skinTone.shadow} 
        strokeWidth="3" 
        fill="none" 
        opacity="0.2"
        strokeLinecap="round"
      />
      
      {/* Nose */}
      <ellipse cx="40" cy="44" rx="4" ry="3" fill="url(#noseShadow)"/>
      <path d="M38 42 Q40 46 42 42" stroke={skinTone.shadow} strokeWidth="1.5" fill="none" opacity="0.4"/>
      
      {/* Cheek blush */}
      <ellipse cx="20" cy="46" rx="8" ry="5" fill={blushColor} opacity={expression === "happy" ? "0.5" : "0.25"}/>
      <ellipse cx="60" cy="46" rx="8" ry="5" fill={blushColor} opacity={expression === "happy" ? "0.5" : "0.25"}/>
      
      {/* Eyes */}
      {renderEyes()}
      
      {/* Mouth */}
      {renderMouth()}
      
      {/* Hair front layer for some styles */}
      {gender === "donna" && (
        <path 
          d="M18 22 Q22 28 28 24 Q34 20 40 24 Q46 28 52 22" 
          fill={hairColors.donna.base}
        />
      )}
    </svg>
  );
};

export default MemojiAvatar;
