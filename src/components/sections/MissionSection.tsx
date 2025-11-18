import { Target } from "lucide-react";
import IconCircle from "@components/common/IconCircle";

interface MissionSectionProps {
    title: string,
    description: string,
}

const MissionSection = ({title, description}: MissionSectionProps) => {
    return (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 flex justify-center">
                <IconCircle 
                  icon={Target}
                  bgColor="primary"
                  circleSize={16}
                  iconSize={8}
                  iconColor="text-text-light"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-dark">
                {title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </section>
    );
}

export default MissionSection;