
export interface SkincareStep {
  step: string;
  dosage: string;
  detail: string;
}

export interface DayRoutine {
  day: string;
  label: string;
  morning: SkincareStep[];
  evening: SkincareStep[];
  note: string;
  isAcidDay: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface BodyCareRoutine {
  day: string;
  products: string;
}
