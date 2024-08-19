import OrbitingCircles from './orbiting-circles';
import person1 from '../assets/person1.svg';
import person2 from '../assets/person2.svg';
import person3 from '../assets/person3.svg';
import person4 from '../assets/person4.svg';
import person5 from '../assets/person5.svg';
import person6 from '../assets/person6.svg';

export function Orbits() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Inner Circles */}
      <OrbitingCircles className="size-[56px] bg-transparent" duration={20} delay={20} radius={50}>
        <img src={person1} alt="person1" />
      </OrbitingCircles>
      <OrbitingCircles className="size-[56px] bg-transparent" duration={20} delay={10} radius={50}>
        <img src={person2} alt="person2" />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles className="size-[56px] bg-transparent" radius={100} duration={20} reverse>
        <img src={person3} alt="person3" />
      </OrbitingCircles>
      <OrbitingCircles className="size-[56px] bg-transparent" radius={100} duration={20} delay={20} reverse>
        <img src={person4} alt="person4" />
      </OrbitingCircles>

      {/* outer outer Circles */}
      <OrbitingCircles className="size-[56px] bg-transparent" duration={20} delay={20} radius={150}>
        <img src={person5} alt="person5" />
      </OrbitingCircles>
      <OrbitingCircles className="size-[56px] bg-transparent" duration={20} delay={10} radius={150}>
        <img src={person6} alt="person6" />
      </OrbitingCircles>
    </div>
  );
}
