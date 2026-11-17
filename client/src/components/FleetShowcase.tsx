import { useLang } from '@/context/LanguageContext';
import { SSG_PHOTO_DRILLING_NIGHT, SSG_PHOTO_INDUSTRIAL, SSG_PHOTO_SITE2 } from '@/data/presentationContent';

const CRANE_PHOTO = '/photos/WhatsApp Image 2026-07-25 at 09.55.01 (1).jpeg';

interface FleetItem {
  id: string;
  name: string;
  category: string;
  count: string;
  image: string;
  specs: { label: string; value: string }[];
}

export default function FleetShowcase() {
  const { lang } = useLang();

  const fleet: FleetItem[] = [
    {
      id: 'gnb-vermeer',
      name: 'Установки ГНБ Vermeer D36x50 / D100x120',
      category: 'drilling',
      count: '6 единиц',
      image: SSG_PHOTO_DRILLING_NIGHT,
      specs: [
        { label: 'Тяговое усилие', value: '45,000 кг' },
        { label: 'Макс. диаметр', value: 'до 1200 мм' },
        { label: 'Длина бурения', value: 'до 1500 м' },
      ],
    },
    {
      id: 'excavator-cat',
      name: 'Гусеничные Экскаваторы Komatsu PC300 / CAT 330',
      category: 'earthwork',
      count: '12 единиц',
      image: SSG_PHOTO_SITE2,
      specs: [
        { label: 'Объем ковша', value: '1.6 - 2.1 m³' },
        { label: 'Глубина копания', value: '7.3 м' },
        { label: 'Мощность', value: '270 л.с.' },
      ],
    },
    {
      id: 'pipeline-welding',
      name: 'Самоходные Сварочные Комплексы и Трубоукладчики',
      category: 'pipeline',
      count: '8 единиц',
      image: SSG_PHOTO_INDUSTRIAL,
      specs: [
        { label: 'Грузоподъемность', value: '35 - 70 тонн' },
        { label: 'Контроль шва', value: 'УЗК + Рентген' },
        { label: 'Рабочее давление', value: 'до 12.0 МПа' },
      ],
    },
    {
      id: 'crane-liebherr',
      name: 'Автокраны Liebherr LTM 1050 / 1100',
      category: 'lifting',
      count: '4 единицы',
      image: CRANE_PHOTO,
      specs: [
        { label: 'Грузоподъемность', value: '50 - 100 тонн' },
        { label: 'Длина стрелы', value: '60 м' },
        { label: 'Колесная формула', value: '6x6 / 8x8' },
      ],
    },
  ];

  const heading = lang === 'ru' ? 'Собственная спецтехника и оборудование' : lang === 'kk' ? 'Арнайы техника паркі' : 'Our own machinery and equipment';
  const kicker = lang === 'ru' ? 'Технический парк' : lang === 'kk' ? 'Техникалық парк' : 'Fleet';

  return (
    <div>
      <p className="kicker">{kicker}</p>
      <h2 className="text-4xl md:text-5xl max-w-[20ch]">{heading}</h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
        {fleet.map((item) => (
          <article key={item.id}>
            <div className="aspect-[16/10] overflow-hidden" style={{ background: 'var(--concrete)' }}>
              <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-xl md:text-2xl">{item.name}</h3>
              <span className="shrink-0 font-semibold" style={{ color: 'var(--rust)' }}>{item.count}</span>
            </div>
            <dl className="mt-3 grid grid-cols-3" style={{ borderTop: '1px solid var(--line)' }}>
              {item.specs.map((sp) => (
                <div key={sp.label} className="pt-3 pr-3">
                  <dt className="text-sm" style={{ color: 'var(--muted-ink)' }}>{sp.label}</dt>
                  <dd className="font-semibold">{sp.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
