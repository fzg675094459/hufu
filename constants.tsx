
import { DayRoutine, SkincareStep, BodyCareRoutine } from './types';

const MONDAY_AM: SkincareStep[] = [
  { step: '1. 自备温和氨基酸洁面', dosage: '黄豆大小', detail: '全脸清洁，脸颊快速带过' },
  { step: '2. Torriden桃瑞丹玻尿酸棉片', dosage: '1片', detail: '轻擦全脸（脸颊轻带、T区着重）' },
  { step: '3. 珀莱雅双抗精华', dosage: '2滴', detail: '全脸薄涂，避破痘' },
  { step: '4. 理肤泉B5修复霜', dosage: '豌豆大小', detail: '仅涂脸颊' },
  { step: '5. 自备物化防晒', dosage: '硬币大小', detail: '全脸均匀涂' }
];

const MONDAY_PM: SkincareStep[] = [
  { step: '1. 自备温和卸妆油 + 氨基酸洁面', dosage: '2泵 + 绿豆大小', detail: '仅涂防晒/化妆时用卸妆油，二次清洁' },
  { step: '2. Torriden桃瑞丹玻尿酸棉片', dosage: '1片', detail: '轻拍全脸' },
  { step: '3. 雅漾活泉修复精华', dosage: '2滴', detail: '重点涂脸颊泛红处' },
  { step: '4. 珀莱雅双抗精华', dosage: '2滴', detail: '全脸薄涂' },
  { step: '5. 卡尼尔10%VC精华', dosage: '1滴', detail: '局部点涂痘印' },
  { step: '6. 理肤泉B5修复霜', dosage: '樱桃大小', detail: '脸颊厚涂+T区薄涂' }
];

const ACID_PM: SkincareStep[] = [
  { step: '1. 自备温和卸妆油 + 氨基酸洁面', dosage: '2泵 + 绿豆大小', detail: 'T区轻揉10秒' },
  { step: '2. DR.WU达尔肤杏仁酸精华', dosage: '浸湿棉角', detail: '仅擦T区痘粉刺处，停留30秒冲净' },
  { step: '3. 理肤泉B5修复精华', dosage: '3滴', detail: '全脸厚涂' },
  { step: '4. 理肤泉B5修复霜', dosage: '草莓大小', detail: '全脸厚涂' }
];

const SUNDAY_PM: SkincareStep[] = [
  { step: '1. 自备温和卸妆油 + 氨基酸洁面', dosage: '2泵 + 绿豆大小', detail: '全脸轻柔清洁' },
  { step: '2. Torriden桃瑞丹玻尿酸棉片', dosage: '2片', detail: '浸湿后分别敷在脸颊+T区，静置3分钟' },
  { step: '3. 雅漾活泉修复精华', dosage: '2滴', detail: '全脸涂抹' },
  { step: '4. 理肤泉B5修复霜', dosage: '樱桃大小', detail: '全脸厚涂' }
];

export const SKINCARE_SCHEDULE: DayRoutine[] = [
  { day: '周一', label: '修护日', morning: MONDAY_AM, evening: MONDAY_PM, note: '非酸日，侧重屏障修护，不叠加过多功效产品', isAcidDay: false },
  { day: '周二', label: '修护日', morning: MONDAY_AM, evening: MONDAY_PM, note: '延续修护节奏，观察痘粉刺红肿变化', isAcidDay: false },
  { day: '周三', label: '酸类日', morning: MONDAY_AM, evening: ACID_PM, note: '酸类疏通毛孔，后续厚敷修护，不叠加其他功效精华', isAcidDay: true },
  { day: '周四', label: '酸后修护', morning: MONDAY_AM, evening: MONDAY_PM, note: '酸后修护日，重点补水舒缓，减轻酸类刺激', isAcidDay: false },
  { day: '周五', label: '稳定日', morning: MONDAY_AM, evening: MONDAY_PM, note: '维持皮肤稳定，为周末酸类护理做准备', isAcidDay: false },
  { day: '周六', label: '酸类日', morning: MONDAY_AM, evening: ACID_PM, note: '第二次酸类护理，避开新长的破损痘痘', isAcidDay: true },
  { day: '周日', label: '舒缓日', morning: MONDAY_AM, evening: SUNDAY_PM, note: '精简步骤，集中补水修护，缓解一周屏障负担', isAcidDay: false },
];

export const BODY_CARE_SCHEDULE: BodyCareRoutine[] = [
  { day: '周一', products: 'SA Lotion + 蓝瓶' },
  { day: '周二', products: 'SA Lotion + 蓝瓶' },
  { day: '周三', products: '只蓝瓶' },
  { day: '周四', products: '12% 果酸 + 蓝瓶' },
  { day: '周五', products: 'SA Lotion + 蓝瓶' },
  { day: '周六', products: 'Dove 磨砂 + 蓝瓶' },
  { day: '周日', products: 'SA Lotion + 蓝瓶' },
];
