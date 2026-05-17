export const springs = {
  press: { duration: 120, easing: "cubic-bezier(0.2, 0, 0, 1)" },
  hover: { duration: 150, easing: "cubic-bezier(0.3, 0, 0, 1)" },
  reveal: { duration: 180, easing: "cubic-bezier(0.3, 0, 0, 1)" },
} as const;

export type SpringPreset = keyof typeof springs;
