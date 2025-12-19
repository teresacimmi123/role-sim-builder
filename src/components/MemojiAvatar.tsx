import { Gender } from "@/types/simulation";

interface MemojiAvatarProps {
  gender: Gender;
  expression: "happy" | "sad" | "neutral";
  size?: number;
}

const MemojiAvatar = ({ gender, expression, size = 64 }: MemojiAvatarProps) => {
  // Base colors based on gender
  const skinColor = "#F5D0B9";
  const hairColor = gender === "donna" ? "#4A3728" : gender === "uomo" ? "#2C1810" : "#6B5B4F";
  const shirtColor = gender === "donna" ? "#E91E63" : gender === "uomo" ? "#2196F3" : "#9C27B0";
  
  // Expression-based elements
  const getEyeExpression = () => {
    if (expression === "happy") {
      return (
        <>
          {/* Happy eyes - curved upward */}
          <path d="M18 22 Q22 18 26 22" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M38 22 Q42 18 46 22" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </>
      );
    } else if (expression === "sad") {
      return (
        <>
          {/* Sad eyes - slightly droopy */}
          <ellipse cx="22" cy="22" rx="4" ry="4" fill="#2C1810"/>
          <ellipse cx="42" cy="22" rx="4" ry="4" fill="#2C1810"/>
          <path d="M16 18 Q20 20 26 18" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
          <path d="M38 18 Q42 20 48 18" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
        </>
      );
    }
    return (
      <>
        {/* Neutral eyes */}
        <ellipse cx="22" cy="22" rx="4" ry="4" fill="#2C1810"/>
        <ellipse cx="42" cy="22" rx="4" ry="4" fill="#2C1810"/>
        <circle cx="23" cy="21" r="1.5" fill="white"/>
        <circle cx="43" cy="21" r="1.5" fill="white"/>
      </>
    );
  };

  const getMouthExpression = () => {
    if (expression === "happy") {
      return (
        <>
          {/* Big smile */}
          <path d="M24 38 Q32 48 40 38" stroke="#C0392B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Blush */}
          <ellipse cx="14" cy="32" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
          <ellipse cx="50" cy="32" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
        </>
      );
    } else if (expression === "sad") {
      return (
        <>
          {/* Sad mouth - slight frown */}
          <path d="M26 42 Q32 38 38 42" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>
      );
    }
    return (
      <path d="M26 40 L38 40" stroke="#C0392B" strokeWidth="2" strokeLinecap="round"/>
    );
  };

  const getHairStyle = () => {
    if (gender === "donna") {
      return (
        <>
          {/* Long wavy hair */}
          <ellipse cx="32" cy="8" rx="26" ry="12" fill={hairColor}/>
          <path d="M6 12 Q4 35 10 55" stroke={hairColor} strokeWidth="14" fill="none" strokeLinecap="round"/>
          <path d="M58 12 Q60 35 54 55" stroke={hairColor} strokeWidth="14" fill="none" strokeLinecap="round"/>
          <path d="M10 20 Q8 30 12 40" stroke={hairColor} strokeWidth="8" fill="none"/>
          <path d="M54 20 Q56 30 52 40" stroke={hairColor} strokeWidth="8" fill="none"/>
        </>
      );
    } else if (gender === "uomo") {
      return (
        <>
          {/* Short hair */}
          <ellipse cx="32" cy="10" rx="24" ry="14" fill={hairColor}/>
          <rect x="10" y="8" width="44" height="8" rx="4" fill={hairColor}/>
        </>
      );
    }
    return (
      <>
        {/* Neutral/androgynous short-medium hair */}
        <ellipse cx="32" cy="8" rx="25" ry="13" fill={hairColor}/>
        <path d="M8 15 Q6 25 10 35" stroke={hairColor} strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M56 15 Q58 25 54 35" stroke={hairColor} strokeWidth="10" fill="none" strokeLinecap="round"/>
      </>
    );
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill={`${shirtColor}22`}/>
      
      {/* Hair (back layer) */}
      {getHairStyle()}
      
      {/* Face */}
      <ellipse cx="32" cy="30" rx="22" ry="24" fill={skinColor}/>
      
      {/* Ears */}
      <ellipse cx="10" cy="28" rx="4" ry="6" fill={skinColor}/>
      <ellipse cx="54" cy="28" rx="4" ry="6" fill={skinColor}/>
      
      {/* Eyebrows */}
      <path d="M16 16 Q22 14 28 16" stroke={hairColor} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M36 16 Q42 14 48 16" stroke={hairColor} strokeWidth="2" fill="none" strokeLinecap="round"/>
      
      {/* Eyes */}
      {getEyeExpression()}
      
      {/* Nose */}
      <path d="M32 26 L30 34 Q32 36 34 34 L32 26" fill="#E8B9A0"/>
      
      {/* Mouth */}
      {getMouthExpression()}
      
      {/* Shirt collar */}
      <path d="M18 52 Q32 58 46 52 L50 64 L14 64 Z" fill={shirtColor}/>
      
      {/* Neck */}
      <rect x="26" y="48" width="12" height="8" fill={skinColor}/>
    </svg>
  );
};

export default MemojiAvatar;
