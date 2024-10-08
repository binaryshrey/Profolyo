import Marquee from '../components/marquee';
import { integrations } from '../services/data/integrations';

export const MarqueeIntegrations = () => {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:60s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-12 h-12" />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:50s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-12 h-12" />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:40s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-12 h-12" />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-12 h-12" />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-profolyo dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-profolyo dark:from-background"></div>
    </div>
  );
};
