
export enum PatientType {
  INFANT = '婴儿 (<1岁)',
  CHILD = '儿童 (1岁至青春期)',
  ADULT = '成人 (青春期及以上)'
}

export enum TabType {
  ALGORITHM = '决策流程',
  GOALS = '生理目标',
  CHECKLIST = '核查清单',
  CALCULATION = '计算联动',
  THEORY = '理论要点'
}

export interface PatientState {
  age: number; // 岁
  weight: number; // kg
  isInfant: boolean;
  isPuberty: boolean;
  rescuers: 1 | 2;
}

export interface CalculationResult {
  compressionDepth: string;
  ratio: string;
  aedPads: string;
  respiratoryRate: string;
  epinephrineIV: string;
  epinephrineET: string;
  fluidBolus: string;
}
