import { Lightbulb } from "lucide-react";
import type { Reason } from "@models/types";
import IconCircle from "@components/common/IconCircle";

interface ReasonsSectionProps {
    title: string,
    reasons: Reason[]
}

const MissionSection = ({title, reasons}: ReasonsSectionProps) => {
    return (
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="mb-8 flex justify-center">
                    <IconCircle 
                        icon={Lightbulb}
                        bgColor="secondary"
                        circleSize={16}
                        iconSize={8}
                        iconColor="text-text-light"
                    />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-dark">
                  {title}
                </h2>
              </div>
              <div className="space-y-8">
                {
                  reasons.map((reason, index) => (
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                        <span className="text-text-light font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-text-dark">{reason.title}</h3>
                        <p className="text-gray-600">{reason.description}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
    );
}

export default MissionSection;