import Marquee from '../components/marquee';
import { integrations } from '../services/data/integrations';

export const MarqueeIntegrations = () => {
  console.log(integrations);
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:60s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-16 h-16" />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:50s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-16 h-16" />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:40s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-16 h-16" />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {integrations.map((item) => (
          <img key={item.name} src={item.img} alt={item.name} className="w-16 h-16" />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-100 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-100 dark:from-background"></div>
    </div>
  );
};
